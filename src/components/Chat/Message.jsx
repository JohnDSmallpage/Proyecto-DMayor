
import React, { useContext, useRef } from 'react'
import { ChatContext } from '../../firebase models/ChatContext';
import { useUser } from '../../firebase models/userContext'
import p from "../../images/perfil-generico.jpg"

const Message = ({ message }) => {

  const {user} = useUser();
  const {data} = useContext(ChatContext)
  
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={`message ${message.senderId === user.uid && 'owner'}`}>
      <div className="messageInfo">
        <img src={p} alt="" />
        <span>Justo ahora</span>
      </div>

      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={p} alt="" />}
      </div>
    </div>
  )
}

export default Message