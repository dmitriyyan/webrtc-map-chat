import NavBar from "./NavBar";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

type Props = {
  id: string;
  username: string;
};

const Chatbox = ({ id, username }: Props) => {
  return (
    <div className="chatbox_container">
      <NavBar id={id} username={username} />
      <Messages id={id} />
      <NewMessage userId={id} />
    </div>
  );
};

export default Chatbox;
