import { useState, useEffect } from "react";

const MessageListItem = ({ conversation, loggedUserID }) => {
  const [user, setUser] = useState(null);
  const [lastMessageTime, setLastMessageTime] = useState(null);

  useEffect(() => {
    const otherUser = conversation.users.filter((u) => u._id !== loggedUserID);
    setUser(otherUser[0]);

    const lastMessageTime = new Date(conversation.updatedAt).getTime();
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const lastMessageTimeFormatted = timeFormatter.format(lastMessageTime);
    setLastMessageTime(lastMessageTimeFormatted);
  }, []);

  return (
    <div className="grid md:grid-cols-[3rem,1fr,auto] py-2 gap-2 mr-4 md:mr-0">
      <div className="flex justify-center items-center w-12 md:w-full">
        <img
          src={`https://picsum.photos/200?random="${conversation._id}"`}
          alt="profile"
          className="rounded-full"
        />
      </div>
      <div className="hidden md:block">
        <div className="grid grid-cols-[1fr,3.5rem] items-center">
          <h3 className="text-s truncate overflow-x-hidden">
            {conversation.isGroupConversation
              ? `${conversation.conversation_name}`
              : `${user?.first_name} ${user?.last_name}`}
          </h3>
          <span className="text-xs text-right">{lastMessageTime}</span>
        </div>
        <p className="text-sm">
          {conversation.latest_message
            ? conversation.latest_message.content
            : ""}
        </p>
      </div>
    </div>
  );
};

export default MessageListItem;
