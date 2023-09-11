import { useAppSelector } from "../../app/hooks";
import Chatbox from "./Chatbox/Chatbox";
import "./Messenger.css";

const Messenger = () => {
  const chatboxes = useAppSelector((state) => state.messenger.chatboxes);

  return (
    <div className="messenger_container">
      {chatboxes.map((chatbox) => (
        <Chatbox key={chatbox.id} id={chatbox.id} username={chatbox.username} />
      ))}
    </div>
  );
};

export default Messenger;
