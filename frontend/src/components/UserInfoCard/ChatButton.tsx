import chatIcon from "./chat-icon.svg";

type Props = {
  id: string;
  username: string;
};

const ChatButton = ({ id, username }: Props) => {
  const handleAddChatbox = () => {};

  return (
    <img
      alt="Call Icon"
      src={chatIcon}
      className="map_page_card_img"
      onClick={handleAddChatbox}
    ></img>
  );
};

export default ChatButton;
