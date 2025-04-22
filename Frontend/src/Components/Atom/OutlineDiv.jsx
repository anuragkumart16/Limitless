import React from "react";

function OutlineDiv({ children, padding = "2rem 3rem", style }) {
  const defaultStyle = {
    padding: padding,
    boxShadow: "0px 0px 1px 1px #424242",
    borderRadius: "1rem",
  };
  return <div style={{ ...defaultStyle, ...style }}>{children}</div>;
}

export default OutlineDiv;
