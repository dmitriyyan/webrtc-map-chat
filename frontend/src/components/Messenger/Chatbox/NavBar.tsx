import closeIcon from "./close-icon.svg";
import { useAppActions } from "../../../app/hooks";

type Props = {
  id: string;
  username: string;
};

const NavBar = ({ username, id }: Props) => {
  const { removeChatbox } = useAppActions();

  const handleCloseChatbox = () => {
    removeChatbox(id);
  };

  return (
    <div className="chatbox_nav_bar_container">
      <p className="chatbox_nav_bar_label">{username}</p>
      <div className="chatbox_close_icon_container">
        <img
          src={closeIcon}
          alt="close"
          className="chatbox_close_icon_img"
          onClick={handleCloseChatbox}
        />
      </div>
    </div>
  );
};

export default NavBar;
