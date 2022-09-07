import * as React from "react";
import Stack from "@mui/material/Stack";

export const GroupBadge = ({ group, onSelect, selectedGroup }) => {
  return (
    <Stack
      data-testid={`${group.name}`}
      direction="row"
      spacing={2}
      sx={{
        padding: 1,
        paddingLeft: 2,
        paddingRight: 2,
        border: "1px solid #dadce0",
        borderRadius: 5,
        backgroundColor:
          selectedGroup.name === group.name ? "rgb(221, 252, 252)" : "white",
        "&:hover": {
          backgroundColor: "#e9e9e9",
          cursor: "pointer",
        },
      }}
      onClick={onSelect}
    >
      <p>{group.name}</p>
      <p>{group.tickers.length}</p>
    </Stack>
  );
};
