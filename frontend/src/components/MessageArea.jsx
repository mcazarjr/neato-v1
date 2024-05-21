import { useState, useEffect } from "react";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../slices/messagesApiSlice";

import MessageAreaItem from "./MessageAreaItem";

import Send from "../assets/Send";
import Upload from "../assets/Upload";
import Loader from "./Loader";

const MessageArea = ({ conversation, loggedUserID, socket }) => {
  // States
  const [user, setUser] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);

  // Queries and mutations
  const [sendMessage, { isLoading, error, isSuccess }] =
    useSendMessageMutation();
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    error: errorMessages,
  } = useGetMessagesQuery(conversation?._id);

  // Dummy image URLs
  const userImgURL = "https://picsum.photos/200";
  const otherUserImgURL = `https://picsum.photos/200?random="${conversation?._id}"`;

  // Effect to update user when conversation changes
  useEffect(() => {
    if (!conversation) return;
    socket.emit("join conversation", conversation._id);

    if (conversation.isGroupConversation) return;
    const otherUser = conversation.users.filter((u) => u._id !== loggedUserID);
    setUser(otherUser[0]);
  }, [conversation]);

  // Effect to update messages when socket receives new message
  useEffect(() => {
    if (!socket) return;
    socket.on("message received", (message) => {
      // Can add logic for notification here later
      setMessages([...messages, message]);
    });
  });

  // Effect to update messages when messagesData changes
  useEffect(() => {
    if (!messagesData) return;
    setMessages(messagesData);
  }, [messagesData]);

  // Effect to scroll to bottom of message area when messages change
  useEffect(() => {
    if (!messages) return;
    if (messages.length === 0) return;

    const scroll = () => {
      const messageArea = document.getElementById("message_item_area");
      messageArea.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    scroll();
  }, [messages]);

  // Component Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageContent) return;
    const res = await sendMessage({
      conversation_id: conversation._id,
      content: messageContent,
    });

    if (res.error) {
      console.log(res.error);
      return;
    }

    // Update messages state with new message
    if (res.data) {
      setMessages([...messages, res.data]);
      // Emit new message to socket
      socket.emit("new message", res.data);
    }

    // Clear message content
    setMessageContent("");
  };

  return (
    <>
      {!conversation && <Loader />}
      {conversation && (
        <>
          <div className="flex items-center gap-4 border-primary border-b-4 p-4">
            <img
              src={`https://picsum.photos/200?random="${conversation._id}"`}
              alt="profile"
              className="rounded-full w-12"
            />
            <h3 className="font-semibold text-2xl">
              {conversation.isGroupConversation
                ? `${conversation.conversation_name}`
                : `${user?.first_name} ${user?.last_name}`}
            </h3>
          </div>

          <div className="overflow-y-auto border-b-4 px-2 py-2 mb-2 h-[30rem] flex flex-col gap-2">
            {isLoadingMessages && <Loader />}
            {messages.map((message) => (
              <MessageAreaItem
                key={message._id}
                type={message.sender._id === loggedUserID ? "send" : "receive"}
                imgURL={
                  message.sender._id === loggedUserID
                    ? userImgURL
                    : otherUserImgURL
                }
                content={message.content}
              />
            ))}
            <div id="message_item_area"></div>
          </div>

          <form
            className="bg-primary rounded-full grid grid-cols-[1fr,auto,auto] pr-4 mt-2 mb-4 mx-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Type your message here"
              className="pl-4 rounded-tl-full rounded-bl-full border-primary border-2"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <button className="bg-transparent px-4 py-4 rounded-lg">
              <div className="fill-white stroke-white h-4">
                <Upload />
              </div>
            </button>
            <button type="submit" className="bg-primary px-4 py-4 rounded-lg">
              <div className="fill-white stroke-white h-4">
                <Send />
              </div>
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default MessageArea;
