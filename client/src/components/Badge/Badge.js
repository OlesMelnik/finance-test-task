import * as React from "react";
import "./styles.css";

export const Badge = ({ prefix, prefix_color }) => {
  return (
    <div className="badge" style={{ backgroundColor: prefix_color }}>
      <p>{prefix}</p>
    </div>
  );
};
