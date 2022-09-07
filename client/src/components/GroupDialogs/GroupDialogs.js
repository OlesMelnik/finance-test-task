import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { TickerItem } from "../TickerItem";
import { useGlobal } from "../../global";

export const GroupDialogs = ({ showFirstDialog, closeFirstDialog }) => {
  const [tickers] = useGlobal("tickers");
  const [groups, setGroups] = useGlobal("groups");
  const [selectedTickers, setSelectedTickers] = useState(
    Array(tickers.length).fill(false)
  );
  const [groupName, setGroupName] = useState("");
  const [showSecondDialog, setShowSecondDialog] = useState(false);
  const openSecondDialog = () => setShowSecondDialog(true);
  const closeSecondDialog = () => setShowSecondDialog(false);
  const selectTicker = (position) => {
    setSelectedTickers((prev) =>
      prev.map((item, index) => (index !== position ? item : !item))
    );
  };
  const createNewGroup = () => {
    setGroups([
      ...groups,
      {
        name: groupName,
        tickers: tickers.filter((item, index) => selectedTickers[index]),
      },
    ]);
    setGroupName("");
    setSelectedTickers(Array(tickers.length).fill(false));
    closeSecondDialog();
  };
  return (
    <>
      <Dialog
        open={showFirstDialog}
        onClose={closeFirstDialog}
        fullWidth
        maxWidth="xs"
        aria-labelledby="group-dialog-title"
        aria-describedby="group-dialog-description"
      >
        <DialogTitle id="group-dialog-title">Створити список</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              label="Назва списку"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              fullWidth
              autoFocus
              margin="dense"
            />
            <Stack direction="row-reverse" spacing={2}>
              <Button
                data-testid="save-btn1"
                disabled={!groupName}
                style={{ textTransform: "none" }}
                variant="contained"
                onClick={() => {
                  closeFirstDialog();
                  openSecondDialog();
                }}
              >
                Зберегти
              </Button>
              <Button
                style={{ textTransform: "none" }}
                onClick={() => {
                  closeFirstDialog();
                  setGroupName("");
                }}
              >
                Скасувати
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showSecondDialog}
        onClose={closeSecondDialog}
        fullWidth
        maxWidth="sm"
        aria-labelledby="select-dialog-title"
        aria-describedby="select-dialog-description"
      >
        <DialogTitle id="select-dialog-title">
          Виберіть інвенстиції для групи
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Grid sx={{ flexGrow: 1 }} container spacing={3}>
              {tickers &&
                tickers.length &&
                tickers.map((value, index) => (
                  <Grid key={value.prefix} item>
                    <TickerItem
                      prefix={value.prefix}
                      selected={selectedTickers[index]}
                      color={value.prefix_color}
                      onSelect={() => selectTicker(index)}
                    />
                  </Grid>
                ))}
            </Grid>

            <Stack direction="row-reverse" spacing={2}>
              <Button
                data-testid="save-btn2"
                disabled={selectedTickers.every((element) => element === false)}
                style={{ textTransform: "none" }}
                variant="contained"
                onClick={createNewGroup}
              >
                Зберегти
              </Button>
              <Button
                style={{ textTransform: "none" }}
                onClick={() => {
                  closeSecondDialog();
                  setGroupName("");
                }}
              >
                Скасувати
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
