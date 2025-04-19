import React, { useEffect } from "react";
import ScreenDiv from "../Atom/ScreenDiv";
import healthCheck from "../../helpers/healthCheck.helper.js";

function SplashScreen() {
  useEffect(() => {
    console.log(healthCheck())
  },[])
  return (
    <ScreenDiv>
      <img
        src="Dark-Logo.svg"
        alt="Logo Image"
        style={{ 
          borderRadius: "50%",
          border: '1px solid #A1A1AA'

         }}
      />
      <p
        style={{
          color: "rgb(75, 75, 85)",
          fontSize: "1rem",
          fontWeight: "200",
          marginTop: "2rem",
          textAlign: "center",
        }}
      >
        Your Personal Manager To Make
        <br /> You{" "}
        <span style={{ color: "rgb(202, 202, 202)" }}> Limitless</span>
      </p>
    </ScreenDiv>
  );
}

export default SplashScreen;

// boxShadow:'0px 0px 40px 0px'
