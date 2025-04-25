import React, { useContext, useMemo, useRef, useState } from "react";
import SmallText from "../Atom/SmallText";
import { UserAuthContext } from "../../Contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";
import UserPopOver from "../Molecules/UserPopOver";
import { logoutUser } from "../../Helpers/auth.helper.js";

function Navbar({ style }) {
  const popoverref = useRef(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { isLogin, userData , setIsLogin , setUserData } = useContext(UserAuthContext);
  console.log(isLogin)
  const defaultStyle = {
    padding: "0rem 1rem",
    borderBottom: "1px solid #424242",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  function LogOut() {
    logoutUser()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLogin(false);
        setUserData(null);
        navigate("/auth");
      })
      .catch((error) => {
        console.log(error)
        navigate("/error", { state: { error: "Couldn't log out", message: "Something went wrong. We're working on it!" } });
      });
  }

  const options = useMemo(() => {
    const opts = {};
    if (isLogin) {
      opts["Logout"] = () => {
        LogOut(userData);
        setShowUserMenu(false);
      };
    } else {
      opts["Login"] = () => {
        navigate("/auth/isLogin");
        setShowUserMenu(false);
      };
      opts["Register"] = () => {
        navigate("/auth/register");
        setShowUserMenu(false);
      };
    }
    opts["Settings"] = () => {
      navigate("/settings");
      setShowUserMenu(false);
    };
    return opts;
  }, [isLogin, navigate, userData]);

  return (
    <header style={{ ...defaultStyle, ...style }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <img src="/favicon.svg" style={{ width: "25px", height: "auto" }} />
        <SmallText
          color="#ffffff"
          style={{ userSelect: "none", cursor: "pointer" }}
        >
          Limitless
        </SmallText>
      </div>
      <div style={{ display: "flex", gap: "1rem", position: "relative" }}>
        {isLogin && (
          <img
            src="/UserAvatar.svg"
            style={{
              width: "30px",
              height: "auto",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => setShowUserMenu(!showUserMenu)}
          />
        ) }
        {!isLogin && (
          <img
            src="/NoUserAvatar.svg"
            style={{
              width: "30px",
              height: "auto",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => setShowUserMenu(!showUserMenu)}
          />
        )}
        {showUserMenu && (
          <UserPopOver
            options={options}
            popoverRef={popoverref}
            onClose={() => setShowUserMenu(false)}
          />
        )}
      </div>
    </header>
  );
}

export default Navbar;
