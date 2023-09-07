import ChatIcon from "./chat-icon.svg";

type Props = {
  id: string;
  username: string;
};

const ChatButton = ({ id, username }: Props) => {
  const handleAddChatbox = () => {
    console.log(id, username);
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
