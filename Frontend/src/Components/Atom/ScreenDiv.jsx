import React from "react";

function ScreenDiv({ children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
}

export default ScreenDiv;
