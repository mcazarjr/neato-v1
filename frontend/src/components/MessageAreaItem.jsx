const MessageAreaItem = ({ type, content, imgURL }) => {
  const isMine = type === "send";

  return (
    <>
      {isMine ? (
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-primary">{content}</div>
          <img
            src={imgURL}
            alt="User Profile Avatar"
            className="rounded-full w-12"
          />
        </div>
      ) : (
        <div className="chat chat-start">
          <img
            src={imgURL}
            alt="Other User Profile Avatar"
            className="rounded-full w-12"
          />
          <div className="chat-bubble chat-bubble-secondary">{content}</div>
        </div>
      )}
    </>
  );
};

export default MessageAreaItem;
