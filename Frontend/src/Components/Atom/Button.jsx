import React from "react";

function Button({ children, type = "button",style ,onclick}) {
  const defaultStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#ffffff",
    border: "none",
    boxShadow: "0px 0px 1px 1px #424242",
    borderRadius: "6px",
    color: "#09090B",
    fontSize: "1rem",
    width: "100%",
    cursor: "pointer",
  };
  return <button type={type} style={{ ...defaultStyle, ...style }} onClick={onclick} >{children}</button>;
}

export default Button;
