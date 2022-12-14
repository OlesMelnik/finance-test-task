import React, { useState } from "react";
import { Badge } from "../Badge";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { ConfirmModal } from "../ConfirmModal";

export const DataTable = ({ data, selectedGroup, onRemove }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState("");
  const openConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => {
    setSelectedTicker("");
    setShowConfirmModal(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {data.map((item) => (
              <TableRow
                hover
                key={item.ticker}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{ height: 40 }} component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    <Badge
                      prefix={item.prefix}
                      prefix_color={item.prefix_color}
                    />
                    <p>{item.name}</p>
                  </Stack>
                </TableCell>
                <TableCell align="right">{item.price} $</TableCell>
                <TableCell align="right">{item.change} $</TableCell>
                <TableCell align="right">{item.change_percent}%</TableCell>
                {selectedGroup && (
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      component="label"
                      onClick={() => {
                        setSelectedTicker(item.name);
                        openConfirmModal();
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmModal
        message="???? ????????????????, ???? ???????????? ???????????????? ???? ???????????????????????"
        open={showConfirmModal}
        onConfirm={() => {
          onRemove(selectedTicker);
          hideConfirmModal();
        }}
        onCancel={hideConfirmModal}
      />
    </>
  );
};
