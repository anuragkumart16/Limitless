import React,{useContext, useEffect} from "react";
import OutlineDiv from "../Atom/OutlineDiv";
import NavText from "../Atom/NavText";
import { UserAuthContext } from "../../Contexts/UserAuthContext";
import SmallText from "../Atom/SmallText";

function UserPopOver({ style, options,popoverRef,onClose }) {
  const {userData,isLogin} = useContext(UserAuthContext)
  const defaultStyle = {
    position: "absolute",
    left: "-5rem",
    top: "2.5rem",
    width: "fit-content",
    hieght: "fit-content",
    
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose(); // close function from parent
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose,popoverRef]);
  return (
    <div style={{ ...defaultStyle, ...style }} ref={popoverRef}>
      <OutlineDiv
        padding="1rem"
        style={{ backgroundColor: "#09090B", width: "fit-content",borderRadius:'8px' }}
      >
        {isLogin && <SmallText color="#ffffff" style={{marginBottom:'0.5rem',borderBottom:'1px solid #424242'}}>Hii {userData.username}!</SmallText>}
        {Object.keys(options).map((key) => (
          <NavText key={key} onclick={options[key]} style={{userSelect:'none',cursor:'pointer'}}>
            {key}
          </NavText>
        ))}
      </OutlineDiv>
    </div>
  );
}

export default UserPopOver;
