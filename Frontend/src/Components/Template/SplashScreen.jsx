import React, { useContext, useEffect } from "react";
import ScreenDiv from "../Atom/ScreenDiv.jsx";
import healthCheck from "../../Services/healthCheck.service.js";
import SmallText from "../Atom/SmallText.jsx";
import Span from "../Atom/Span.jsx";
import { handleError } from "../../Helpers/error.helper.js";
import { useNavigate } from "react-router-dom";
import { checkToken , getAccessToken } from "../../Services/auth.service.js";
import { UserAuthContext } from "../../Contexts/UserAuthContext.jsx";

function SplashScreen() {
  const {setIsLogin,setUserData} = useContext(UserAuthContext)
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
          console.log(checkTokenResponse) //this is a log for checking if access token was checked 
          if (checkTokenResponse.success) {
            setIsLogin(true)
            setUserData(checkTokenResponse.data)
            navigate("/dashboard");
          } else {
            getAccessToken() 
            .then((data) => {
              console.log(data) //getAccessToken is fired
              if (data.success) {
                localStorage.setItem("accessToken", data.data.accessToken);
                setUserData(data.data)
                setIsLogin(true)
                navigate("/dashboard");
              }
              else{
                navigate("/auth");
              }
            })
            .catch((error) => {
              handleError(error, navigate);
            });
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
    }, 3000);
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
      <SmallText>Become Productive With <Span>Limitless</Span></SmallText>
      <p
        style={{
          color: "rgb(75, 75, 85)",
          fontSize: "1rem",
          fontWeight: "200",
          marginTop: "2rem",
          textAlign: "center",
        }}
      >
        <span style={{ color: "rgb(202, 202, 202)" }}> Loading... </span>
        <br/> Sometimes it takes longer to start server!
      </p>
    </ScreenDiv>
  );
}

export default SplashScreen;


