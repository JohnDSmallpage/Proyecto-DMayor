import React from "react";
import {useUser} from "../firebase models/userContext";

const Message3 = ({ message }) => {
  const { User } = useUser();

  console.log(message)
  return (
    <div>
      <div className={`chat ${message.uid === User.uid ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={message.avatar} />
          </div>
        </div>
        <div className="chat-header">
         {message.name}
        </div>
        <div className="chat-bubble">{message.text}</div>
        </div>
    </div>
  );
};

export default Message3;
