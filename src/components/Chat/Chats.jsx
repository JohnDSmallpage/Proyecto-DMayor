<<<<<<< Updated upstream
import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '../../firebase models/userContext';
import { ChatContext } from '../../firebase models/ChatContext';
import { UserContext } from '../../firebase models/userContext';
import { db } from '../../firebase models/Config';
import { doc, onSnapshot } from '@firebase/firestore';


const Chats = () => {

  const [chats, setChats] = useState([]);

  const {user} = useUser(UserContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() =>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };



  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>a[1].date - b[1].date).map((chat) =>(
        <div className="userChat" key={chat[0]} onClick={() =>handleSelect(chat[1].userInfo)}>
          <img src="" alt=""/>
          <div className="userChatInfo">
            <span>{chat[1].userInfo.name}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
        
      ))}

    </div>
  )
}

export default Chats
=======
import React from 'react'

export default function Chats() {
  return (
    <div>Chats</div>
  )
}
>>>>>>> Stashed changes
