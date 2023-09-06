import React from "react";

type Props = {
  username: string;
  setUsername: (value: string) => void;
};

const LoginInput = (props: Props) => {
  const { username, setUsername } = props;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <input
      className="l_page_input"
      value={username}
      onChange={handleValueChange}
    />
  );
};

export default LoginInput;
