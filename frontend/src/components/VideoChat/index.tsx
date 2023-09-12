import CreateRoomButton from "./CreateRoomButton";
import RoomJoinButton from "./ChatJoinButton";
import ParticipantsVideos from "./ParticipantsVideos";
import { useAppSelector } from "../../app/hooks";

import type { VideoChat } from "../../app/features/videoChat/videoChatSlice";

const convertVideoChatsToArray = (chats: VideoChat[]) => {
  return chats.map((chat) => {
    return {
      id: chat.id,
      creatorUsername: chat.participants[0].username,
      amountOfParticipants: chat.participants.length,
    };
  });
};

const VideoChat = () => {
  const chats = useAppSelector((store) => store.videoChat.chats);

  return (
    <>
      <div className="map_page_v_rooms_list">
        <CreateRoomButton />
        {convertVideoChatsToArray(chats).map((chat) => (
          <RoomJoinButton
            key={chat.id}
            creatorUsername={chat.creatorUsername}
            chatId={chat.id}
            amountOfParticipants={chat.amountOfParticipants}
          />
        ))}
      </div>
      <ParticipantsVideos />
    </>
  );
};

export default VideoChat;
