import React from "react";
import Box from "@mui/material/Box";

export const TickerItem = ({ selected, prefix, color, onSelect }) => {
  return (
    <Box
      data-testid={`${prefix}`}
      onClick={onSelect}
      sx={{
        width: 100,
        height: 100,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        alignItems: "center",
        border: selected ? "2px solid #33bcfc" : "2px solid #e3e3e3",
        borderRadius: 5,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#e9e9e9",
        },
      }}
    >
      <p style={{ color: color }}>{prefix}</p>
    </Box>
  );
};
