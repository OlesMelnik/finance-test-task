import React from "react";
import "./styles.css";

export const TickerItem = ({ selected, prefix, color, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`group-item + ${selected && "selected"}`}
    >
      <p style={{ color: color }}>{prefix}</p>
    </div>
  );
};
