import { useAppActions } from "../../app/hooks";
import ChatIcon from "./chat-icon.svg";

type Props = {
  id: string;
  username: string;
};

const ChatButton = ({ id, username }: Props) => {
  const { addChatbox } = useAppActions();

  const handleAddChatbox = () => {
    addChatbox({ id, username });
  };

  return (
    <img
      alt="Call Icon"
      src={ChatIcon}
      className="map_page_card_img"
      onClick={handleAddChatbox}
    ></img>
  );
};

export default ChatButton;
