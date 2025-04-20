import React, { useEffect } from "react";
import ScreenDiv from "../Atom/ScreenDiv";
import healthCheck from "../../helpers/healthCheck.helper.js";
import {handleError} from "../../helpers/error.helper.js";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../helpers/auth.helper.js";

function SplashScreen() {
  const navigate = useNavigate();

  async function onLoad() {
    try {
      const data = await healthCheck();
      return data;
    } catch (error) {
      handleError(error, navigate);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const healthCheckResponse = await onLoad();
        if (healthCheckResponse.success) {
          const checkTokenResponse = await checkToken();
          console.log(checkTokenResponse,'this is a token response')
          if (checkTokenResponse.success) {
            navigate("/dashboard");
          } else {
            navigate("/auth");
          }
        } else {
          navigate("/error", {
            state: {
              error: "Server Error",
              message: "Something went wrong. We're working on it!",
            },
          });
        }
      })();
    }, 500);
  }, []);
  return (
    <ScreenDiv>
      <img
        src="Dark-Logo.svg"
        alt="Logo Image"
        style={{
          borderRadius: "50%",
          border: "1px solid #A1A1AA",
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


