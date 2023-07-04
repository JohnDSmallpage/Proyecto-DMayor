import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../firebase models/chatContext";
import { useUser } from "../../firebase models/userContext";
import { db } from "../../firebase models/Config";

export function Chats() {
  const { user } = useUser();
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    onSnapshot(doc(db, "userChat", user.uid), (doc) => {
      if (doc.data() != undefined) {
        setChats(doc.data());
      }
    });
  };

  useEffect(() => {
    dispatch({ type: "CHANGE_USER", payload: user });
    user?.uid && getChats();
  }, [user?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  const handleChats = () => {
    setArchived(false);
  };
  const handleArchived = () => {
    setArchived(true);
  };

  return (
    <div className="w-full overflow-hidden text-ellipsis border-y-2 border-gray-300">
      {chats.length == 0 && (
        <p className="p-3">Contacte un proovedor para empezar a chatear!</p>
      )}
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            id="userchat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className="flex flex-row p-2 items-center gap-3 text-black hover:bg-[#ff7a00] cursor-pointer w-full"
          >
            <div
              id="userinfo"
              className="flex flex-col w-full overflow-hidden ml-3"
            >
              <span className="font-bold text-xl ">
                {chat[1].userInfo?.name}
              </span>
              <p className="w-4/5 text-xs text-gray-300 truncate ">
                {chat[1].lastMessage?.text != "" && chat[1].lastMessage?.text}
                {chat[1].lastMessage?.text == "" && "photo."}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
