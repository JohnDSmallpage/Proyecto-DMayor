import React from 'react'
import Message3 from './Message3'
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase models/Config";
import {collection, query, where, onSnapshot } from "firebase/firestore";

const ChatBox3 = () => {
    const [messages, setMessages] = useState([])
  
    useEffect(() => {
    const q = query(
      collection(db, "messages"),
     
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe;
  }, []);

  return (
    <div className="pb-44 pt-20 containerWrap">
        {messages.map(message => (
            <Message3 key={message.id} message={message} />
        ))}
        </div>
  )
}

export default ChatBox3;