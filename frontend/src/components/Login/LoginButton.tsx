import React from "react";

type Props = {
  onClickHandler: () => void;
  disabled: boolean;
};

const LoginButton = ({ onClickHandler, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClickHandler}
      className="l_page_login_button"
    >
      Login
    </button>
  );
};

export default LoginButton;
