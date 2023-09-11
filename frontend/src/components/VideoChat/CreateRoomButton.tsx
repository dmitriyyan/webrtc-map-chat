import { useAppActions, useAppSelector } from "../../app/hooks";
import { getUserLocalStream } from "../../utils/rtcUtils";
import callIcon from "./call-icon.svg";

const CreateRoomButton = () => {
  const inChat = useAppSelector((state) => state.videoChat.inChat);
  const { createVideoChat } = useAppActions();

  const handleRoomCreate = async () => {
    if (inChat) {
      return alert("You are already in the video chat!");
    }

    const localMediaStream = await getUserLocalStream();

    if (localMediaStream !== null) {
      createVideoChat({ id: crypto.randomUUID() });
    }
  };

  return (
    <img
      className="map_page_card_img"
      alt="Call icon"
      src={callIcon}
      onClick={handleRoomCreate}
    />
  );
};

export default CreateRoomButton;
