import "./App.css";
import { useState, useEffect } from "react";
import { DataTable, GroupList } from "./components";
import io from "socket.io-client";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { useGlobal, useDispatch } from "./global";
import { deleteGroupReducer, removeTickerReducer } from "./global/reducers";

const socket = io("localhost:4000");

function App() {
  const [data, setData] = useState([]);
  const [, setTickers] = useGlobal("tickers");
  const [groups] = useGlobal("groups");
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("");
  const deleteGroupAction = useDispatch(deleteGroupReducer);
  const removeTickerAction = useDispatch(removeTickerReducer);

  const selectGroup = (name) => {
    if (name === "All" && !selectedGroup) return;
    if (selectedGroup.name === name || (name === "All" && selectedGroup))
      setSelectedGroup("");
    else setSelectedGroup(groups.find((item) => item.name === name));
  };

  const deleteGroup = () => {
    deleteGroupAction({ name: selectedGroup.name });
    setSelectedGroup("");
  };

  const removeTicker = (ticker) => {
    setSelectedGroup((prevState) => {
      return {
        ...prevState,
        tickers: prevState.tickers.filter((i) => i.name !== ticker),
      };
    });

    removeTickerAction({ name: selectedGroup.name, ticker: ticker });
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("start");
    });

    socket.on("ticker", (data) => {
      setData(data);
      if (loading) {
        setLoading(false);
        setTickers(data);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <div className="App">
      {loading && (
        <div className="progress-wrapper">
          <LinearProgress />
        </div>
      )}
      {data && !!data.length && (
        <div className="data-container">
          <Typography variant="subtitle1" component="h1">
            Акції та портфелі, які зазнали найбільших змін
          </Typography>
          <Divider />
          <DataTable
            data={!selectedGroup ? data : selectedGroup.tickers}
            selectedGroup={selectedGroup}
            onRemove={removeTicker}
          />
          <Typography variant="subtitle2" component="h3">
            Ваші списки
          </Typography>
          <GroupList
            tickers={data}
            groups={groups}
            onSelect={selectGroup}
            onDelete={deleteGroup}
            selectedGroup={selectedGroup}
          />
        </div>
      )}
    </div>
  );
}

export default App;
