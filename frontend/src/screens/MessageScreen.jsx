import { useGetConversationsQuery } from "../slices/messagesApiSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import MessageListItem from "../components/MessageListItem";
import Loader from "../components/Loader";

import MagnifyingGlassIcon from "../assets/MagnifyingGlassIcon";
import MessageArea from "../components/MessageArea";

let socket;

const MessageScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeConversation, setActiveConversation] = useState(null);
  const [socketConnection, setSocketConnection] = useState(false);

  const {
    data: conversations,
    isLoading,
    error,
    isSuccess,
  } = useGetConversationsQuery();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("MessageScreen.jsx: handleFormSubmit");
  };

  const handleOnClick = (evt, conversation) => {
    evt.preventDefault();
    if (conversation._id === activeConversation?._id) return;
    setActiveConversation(conversation);
  };

  useEffect(() => {
    if (conversations && conversations.length > 0) {
      setActiveConversation(conversations[0]);
    }
  }, [conversations]);

  useEffect(() => {
    socket = io();
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnection(true));

    return () => socket.disconnect();
  }, []);

  return (
    <div className="md:h-[45rem] md:grid md:grid-rows-[auto,1fr] mx-4 md:mx-0">
      <div className="grid grid-cols-[auto,1fr] md:gap-4">
        <h2 className="text-3xl font-bold mb-2 col-span-2">Inbox</h2>
        <div className="md:w-[18.5rem] h-[41rem] overflow-y-auto flex flex-col gap-2">
          <ul className="max-h-[44rem]">
            {isLoading && <Loader />}
            {isSuccess &&
              conversations.map((conversation) => (
                <li
                  key={conversation._id}
                  className="md:hover:bg-primary md:px-2 cursor-pointer"
                  onClick={(evt) => handleOnClick(evt, conversation)}
                >
                  <MessageListItem
                    conversation={conversation}
                    loggedUserID={user._id}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="md:grid md:grid-rows-[auto,1fr,auto] rounded-lg border-2 border-primary">
          <MessageArea
            conversation={activeConversation}
            loggedUserID={user._id}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageScreen;
