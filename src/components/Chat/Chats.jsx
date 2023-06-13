import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '../../firebase models/userContext';
import { ChatContext } from '../../firebase models/ChatContext';
import { UserContext } from '../../firebase models/userContext';
import { db } from '../../firebase models/Config';
import { doc, onSnapshot } from '@firebase/firestore';
import p from "../../images/perfil-generico.jpg"

const Chats = () => {

  const [chats, setChats] = useState([]);

  const {user} = useUser(UserContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() =>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });
      console.log(unsub);
      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  console.log(chats);


  return (
    <div className='chats'>
     
    </div>
  )
}

export default Chats