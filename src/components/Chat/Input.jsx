import React, { useState } from 'react'
import Img from "./../../images/karen.jpeg"
import { useUser } from '../../firebase models/userContext'
import { useContext } from 'react'
import { ChatContext } from '../../firebase models/ChatContext'
import { UserContext } from '../../firebase models/userContext'
import { arrayUnion, doc, Timestamp, updateDoc } from '@firebase/firestore'
import { v4 as uuid } from 'uuid'
import { ref, uploadBytesResumable } from '@firebase/storage'
import { db } from '../../firebase models/Config'
import { serverTimestamp } from '@firebase/firestore'

const Input = () => {

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const {user} = useUser(UserContext);
  const {data} = useContext(ChatContext)

  const handleSend = async () => {

    if(img){

      const storageRef = ref(storage, uuid);

      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

    } else{

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });

    }

    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText('')
    setImg(null)
  };

  return (
    <div className='input'>
      <input 
        type="text" 
        placeholder='Escribir un mensaje..' 
        onChange={e => setText(e.target.value)}
        value={text}
      />
      <div className='send'>
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  )
}

export default Input
