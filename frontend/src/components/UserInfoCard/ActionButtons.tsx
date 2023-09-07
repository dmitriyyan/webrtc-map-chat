import ChatButton from "./ChatButton";

type Props = {
  id: string;
  username: string;
  onClose: () => void;
};

const ActionButtons = ({ id, username, onClose }: Props) => {
  return (
    <>
      <div className="map_page_card_close_button" onClick={onClose}>
        Х
      </div>
      <div className="map_page_card_buttons_container">
        <ChatButton id={id} username={username} />
      </div>
    </>
  );
};

export default ActionButtons;
