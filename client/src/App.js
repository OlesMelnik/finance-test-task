import "./App.css";
import { useState, useEffect } from "react";
import { DataTable, GroupList } from "./components";
import io from "socket.io-client";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { useGlobal } from "./global";

const socket = io("localhost:4000");

function App() {
  const [data, setData] = useState([]);
  const [tickers, setTickers] = useGlobal("tickers");
  const [groups, setGroups] = useGlobal("groups");
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  const selectGroup = (name) => {
    if (name === "All" && !selectedGroup) return;
    if (selectedGroup.name === name || (name === "All" && selectedGroup))
      setSelectedGroup("");
    else setSelectedGroup(groups.find((item) => item.name === name));
  };

  const deleteGroup = () => {
    setGroups(groups.filter((item) => item.name !== selectedGroup.name));
    setSelectedGroup("");
  };

  const removeTicker = (ticker) => {
    setSelectedGroup({
      ...selectedGroup,
      tickers: selectedGroup.tickers.filter((i) => i.name !== ticker),
    });

    setGroups(
      groups.map((item) =>
        item.name === selectedGroup.name
          ? { ...item, tickers: item.tickers.filter((i) => i.name !== ticker) }
          : item
      )
    );
  };

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("start");
    });

    // setGroups([]);
    socket.on("ticker", (data) => {
      setData(data);
      if (loading) {
        setLoading(false);
        setTickers(data);
      }
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
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
