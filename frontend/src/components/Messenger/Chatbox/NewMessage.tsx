import { useState } from "react";
import { useAppActions, useAppSelector } from "../../../app/hooks";

const NewMessage = ({ userId }: { userId: string }) => {
  const [message, setMessage] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);

  const onlineUsers = useAppSelector((state) => state.map.onlineUsers);
  const myId = useAppSelector((state) => state.user.id);
  const { sendChatMessage } = useAppActions();

  const handleMessageValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" && message.length > 0) {
      proceedChatMessage();
      setMessage("");
    }
  };

  const proceedChatMessage = () => {
    if (onlineUsers.find((user) => user.id === userId)) {
      sendChatMessage({
        content: message,
        receiverId: userId,
        senderId: myId,
        id: crypto.randomUUID(),
      });
    } else {
      setInputDisabled(true);
    }
  };

  return (
    <div className="chatbox_new_message_container">
      <input
        className="chatbox_new_message_input"
        type="text"
        placeholder="Type your message ..."
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
        disabled={inputDisabled}
      />
    </div>
  );
};

export default NewMessage;
