import { useAppActions, useAppSelector } from "../../app/hooks";

type Props = {
  creatorUsername: string;
  chatId: string;
  amountOfParticipants: number;
};

const RoomJoinButton = ({
  creatorUsername,
  chatId,
  amountOfParticipants,
}: Props) => {
  const inVideoChat = useAppSelector((state) => state.videoChat.inChat);
  const { joinVideoChat } = useAppActions();

  const handleJoinVideoChat = () => {
    if (inVideoChat) {
      return alert("Already in video chat");
    }

    if (amountOfParticipants > 1) {
      return alert("Chat is full");
    }

    joinVideoChat(chatId);
  };

  return (
    <button
      onClick={handleJoinVideoChat}
      className="map_page_v_rooms_join_button"
    >
      {creatorUsername[0]}
    </button>
  );
};

export default RoomJoinButton;
