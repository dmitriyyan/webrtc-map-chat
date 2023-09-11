type Props = {
  content: string;
  isMyMessage: boolean;
};

const SingleMessage = ({ content, isMyMessage }: Props) => {
  return (
    <div
      className="chatbox_message_wrapper"
      style={
        isMyMessage
          ? { justifyContent: "flex-end" }
          : { justifyContent: "flex-start" }
      }
    >
      {isMyMessage ? (
        <p className="chatbox_message_right">{content}</p>
      ) : (
        <p className="chatbox_message_left">{content}</p>
      )}
    </div>
  );
};

export default SingleMessage;
