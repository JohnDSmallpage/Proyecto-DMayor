import React from 'react'
import Message3 from './Message3'
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase models/Config";
import {collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";

const ChatBox3 = () => {
    const messagesEndRef = useRef();
    const [messages, setMessages] = useState([]);

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth"})
    };

    useEffect(scrollToBottom, [messages])
  
    useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createAt"),
      limit(50),
     
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
        <div ref={messagesEndRef}></div>
        </div>
  )
}

export default ChatBox3;