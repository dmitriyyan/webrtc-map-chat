import { useRef, useEffect } from "react";
import SingleMessage from "./SingleMessage";
import { useAppSelector } from "../../../app/hooks";

const Messages = ({ id }: { id: string }) => {
  const messages = useAppSelector((state) => state.messenger.chatHistory[id]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chatbox_messages_container">
      {messages?.map((message) => (
        <SingleMessage
          key={message.id}
          content={message.content}
          isMyMessage={message.isMyMessage}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
