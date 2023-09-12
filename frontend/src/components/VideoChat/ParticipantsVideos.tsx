import { useEffect, useState } from "react";

import { useAppSelector } from "../../app/hooks";
import Video from "./Video";
import VideoRoomButtons from "./VideoChatButtons";
import {
  getRemoteMediaStream,
  getUserLocalStream,
} from "../../app/middleware/peerjsMiddleware";

const ParticipantsVideos = () => {
  const inChat = useAppSelector((state) => state.videoChat.inChat);
  const isRemoteStreamReady = useAppSelector(
    (state) => state.videoChat.isRemoteStreamReady,
  );

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const updateLocalStream = async () => {
      const mediaStream = await getUserLocalStream();
      setLocalStream(mediaStream);
    };
    if (inChat) {
      updateLocalStream();
    }
  }, [inChat]);

  useEffect(() => {
    if (inChat && isRemoteStreamReady) {
      const mediaStream = getRemoteMediaStream();
      setRemoteStream(mediaStream);
    }
  }, [inChat, isRemoteStreamReady]);

  return (
    <div className="map_page_v_rooms_videos_container">
      {inChat && <VideoRoomButtons inChat={inChat} />}
      {inChat && localStream && <Video stream={localStream} muted />}
      {inChat && isRemoteStreamReady && remoteStream && (
        <Video stream={remoteStream} />
      )}
    </div>
  );
};

export default ParticipantsVideos;
