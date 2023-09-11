import { useRef, useEffect } from "react";

import { useAppSelector } from "../../app/hooks";
import { getUserLocalStream } from "../../utils/rtcUtils";
import Video from "./Video";
import VideoRoomButtons from "./VideoRoomButtons";

const ParticipantsVideos = () => {
  const inChat = useAppSelector((state) => state.videoChat.inChat);
  // const remoteStream = useAppSelector((state) => state.videoChat.remoteStream);

  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const setLocalStream = async () => {
      localStreamRef.current = await getUserLocalStream();
    };

    if (inChat) {
      setLocalStream();
    }
  }, [inChat]);

  return (
    <div className="map_page_v_rooms_videos_container">
      {inChat && <VideoRoomButtons inChat={inChat} />}
      {inChat && localStreamRef.current && (
        <Video stream={localStreamRef.current} muted />
      )}
      {/* {inChat && remoteStream && <Video stream={remoteStream} muted />} */}
    </div>
  );
};

export default ParticipantsVideos;
