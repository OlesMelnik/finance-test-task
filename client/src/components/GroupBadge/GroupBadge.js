import * as React from "react";
import "./styles.css";

export const GroupBadge = ({ group, onSelect, selectedGroup }) => {
  return (
    <div
      className={`group-badge ${
        selectedGroup.name === group.name && "selected-group"
      }`}
      onClick={() => onSelect(group.name)}
    >
      <p>{group.name}</p>
      <p>{group.tickers.length}</p>
    </div>
  );
};
