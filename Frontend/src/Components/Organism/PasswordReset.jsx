import React, { useRef } from "react";
import OutlineDiv from "../Atom/OutlineDiv";
import SecondaryHeading from "../Atom/SecondaryHeading";
import SmallText from "../Atom/SmallText";
import Input from "../Atom/Input";
import Button from "../Atom/Button";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateUsername,
} from "../../Helpers/validate.helper.js";
import {
  resetPasswordViaEmail,
  resetPasswordViaUsername,
} from "../../Helpers/auth.helper.js";
import { handleSuccess } from "../../Helpers/successfulResponse.helper.js";
import {
  handleError,
  handleResponseError,
} from "../../Helpers/error.helper.js";

function PasswordReset() {
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const [message, setMessage] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleEmail = () => {
    const data = inputRef.current.value;
    if (!data) {
      setError("Email or username is required");
      return;
    }
    if (data.includes("@")) {
      if (!validateEmail(data)) {
        setError("Invalid email format");
        return;
      } else {
        setMessage("Sending a reset link to your email...");
        setError(null);
        resetPasswordViaEmail(data)
          .then((data) => {
            handleSuccess(data, setMessage);
            handleResponseError(data, setError);
          })
          .catch((error) => handleError(error, navigate));
          return
      }
    } else {
      if (!validateUsername(data)) {
        setError("Invalid username format");
        return;
      } else {
        setMessage("Sending a reset link to your email...");
        setError(null);
        resetPasswordViaUsername(data)
          .then((data) => {
            handleSuccess(data, setMessage);
            handleResponseError(data, setError);
          })
          .catch((error) => handleError(error, navigate));
        return;
      }
    }
  };
  return (
    <OutlineDiv
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <SecondaryHeading>Change Password</SecondaryHeading>
      {error && (
        <SmallText color="#7E1E1D" margin={{ margin: "0rem" }}>
          {error}
        </SmallText>
      )}
      {message && (
        <SmallText color="#166434" style={{ margin: "0rem" }}>
          {message}
        </SmallText>
      )}
      <div>
        <SmallText color="#ffffff">Enter email or username</SmallText>
        <Input
          placeholder="Email or username"
          type="text"
          style={{ width: "16rem", fontSize: "1rem" }}
          reference={inputRef}
        />
      </div>
      <div>
        <Button onclick={handleEmail}>Next</Button>
      </div>
    </OutlineDiv>
  );
}

export default PasswordReset;
