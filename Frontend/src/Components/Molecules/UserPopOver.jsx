import React,{useEffect} from "react";
import OutlineDiv from "../Atom/OutlineDiv";
import NavText from "../Atom/NavText";

function UserPopOver({ style, options,popoverRef,onClose }) {
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
        padding="2rem"
        style={{ backgroundColor: "#09090B", width: "fit-content",borderRadius:'8px' }}
      >
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
