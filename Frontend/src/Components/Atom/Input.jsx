import React from "react";

function Input({ type = "text", name = "", placeholder = "", style }) {
  const defaultStyle = {
    border: "none",
    boxShadow: "0px 0px 1px 1px #424242",
    borderRadius: "6px",
    backgroundColor: "#09090B",
    padding: "0.5rem 0.5rem",
    outline: "none",
    color: "#A1A1AA",
  };
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      style={{ ...defaultStyle, ...style }}
      onFocus={(e) => {
        e.target.style.border = "1px solid #ffffff"
        e.target.style.color = "#ffffff"
      }}
      onBlur={(e) => {
        e.target.style.border = "none"
        e.target.style.color = "#A1A1AA"
      }}
    />
  );
}

export default Input;
