import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppActions, useAppSelector } from "../../app/hooks";
import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import Logo from "./Logo";

import "./LoginPage.css";

const isUsernameValid = (username: string) => {
  return username.length > 0 && username.length < 10 && !username.includes(" ");
};

const Login = () => {
  const [username, setUsername] = useState("");

  const isLocationError = useAppSelector((state) => state.map.isLocationError);
  const { login } = useAppActions();

  const navigate = useNavigate();

  const handleLogin = () => {
    login(username);
    navigate("/map");
  };

  return (
    <div className="l_page_main_container">
      <div className="l_page_box">
        <Logo />
        <LoginInput username={username} setUsername={setUsername} />
        <LoginButton
          disabled={!isUsernameValid(username) || isLocationError}
          onClickHandler={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;
