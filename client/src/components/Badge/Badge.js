import * as React from "react";
import Box from "@mui/material/Box";

export const Badge = ({ prefix, prefix_color }) => {
  return (
    <Box
      data-testid={`${prefix}`}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: prefix_color,
        borderRadius: 4,
        width: 59,
        height: 22,
      }}
    >
      <p style={{ color: "white", fontSize: 14 }}>{prefix}</p>
    </Box>
  );
};
