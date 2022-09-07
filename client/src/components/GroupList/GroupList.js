import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { GroupDialogs } from "../GroupDialogs";
import { GroupBadge } from "../GroupBadge";
import { ConfirmModal } from "../ConfirmModal";

export const GroupList = ({
  groups,
  tickers,
  onSelect,
  onDelete,
  selectedGroup,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  return (
    <Stack direction="row" spacing={2}>
      <GroupBadge
        onSelect={() => onSelect("All")}
        group={{ name: "All", tickers: tickers }}
        selectedGroup={!selectedGroup && { name: "All" }}
      />
      {groups &&
        !!groups.length &&
        groups.map((group) => (
          <GroupBadge
            onSelect={() => onSelect(group.name)}
            group={group}
            selectedGroup={selectedGroup}
          />
        ))}
      <Button
        startIcon={<AddIcon />}
        style={{ textTransform: "none" }}
        onClick={openDialog}
      >
        Новий список
      </Button>
      {selectedGroup && (
        <>
          <Button
            startIcon={<DeleteIcon />}
            style={{ textTransform: "none" }}
            onClick={openConfirmModal}
            color="error"
          >
            Видалити список
          </Button>
          <ConfirmModal
            message={"Ви впевнені, що хочети видалити цю групу?"}
            open={showConfirmModal}
            onConfirm={() => {
              onDelete();
              hideConfirmModal();
            }}
            onCancel={hideConfirmModal}
          />
        </>
      )}
      <GroupDialogs
        showFirstDialog={showDialog}
        closeFirstDialog={closeDialog}
      />
    </Stack>
  );
};
