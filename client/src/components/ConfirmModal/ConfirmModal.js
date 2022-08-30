import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export const ConfirmModal = ({ message, open, onConfirm, onCancel }) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-modal-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="confirm-modal-title">{message}</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>Скасувати</Button>
        <Button onClick={onConfirm} autoFocus>
          Продовжити
        </Button>
      </DialogActions>
    </Dialog>
  );
};
