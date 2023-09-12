import { useRef, useEffect } from "react";
import { useAppActions, useAppSelector } from "../../app/hooks";

import disconnectIcon from "./call-disconnect-icon.svg";
import micIcon from "./mic-icon.svg";
import micOffIcon from "./mic-off-icon.svg";
import cameraIcon from "./camera-icon.svg";
import cameraOffIcon from "./camera-off-icon.svg";
import { getUserLocalStream } from "../../app/middleware/peerjsMiddleware";

type Props = {
  inChat: string;
};

const VideoRoomButtons = ({ inChat }: Props) => {
  const isMicOn = useAppSelector((state) => state.videoChat.isMicOn);
  const isCameraOn = useAppSelector((state) => state.videoChat.isCameraOn);

  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const setLocalStream = async () => {
      localStreamRef.current = await getUserLocalStream();
    };

    setLocalStream();
  }, []);

  const { leaveVideoChat, setIsMicOn, setIsCameraOn } = useAppActions();

  const handleLeaveRoom = () => {
    leaveVideoChat(inChat);
  };

  const handleMuteUnmuteChange = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks()[0].enabled =
        !localStreamRef.current.getAudioTracks()[0].enabled;
    }
    setIsMicOn(!isMicOn);
  };

  const handleCameraOnOffChange = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks()[0].enabled =
        !localStreamRef.current.getVideoTracks()[0].enabled;
    }
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className="m_page_v_rooms_video_buttons_container">
      <button
        onClick={handleMuteUnmuteChange}
        className="m_page_v_rooms_video_button"
        title="Mic button"
      >
        <img
          src={isMicOn ? micIcon : micOffIcon}
          width="25px"
          height="25px"
          alt="Mic icon"
        />
      </button>
      <button
        onClick={handleLeaveRoom}
        className="m_page_v_rooms_video_button"
        title="Leave video chat button"
      >
        <img
          src={disconnectIcon}
          width="25px"
          height="25px"
          alt="Disconnect icon"
        />
      </button>
      <button
        onClick={handleCameraOnOffChange}
        className="m_page_v_rooms_video_button"
        title="Camera button"
      >
        <img
          src={isCameraOn ? cameraIcon : cameraOffIcon}
          width="25px"
          height="25px"
          alt="Camera icon"
        />
      </button>
    </div>
  );
};

export default VideoRoomButtons;
