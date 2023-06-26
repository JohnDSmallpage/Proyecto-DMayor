import React, { useContext, useEffect, useState } from 'react'
import { Message } from './Message'
import file from '../../images/casa.jpg'
import image from '../../images/imageicon.png'
import sendIcon from '../../images/sendIcon.png'
import { ChatContext } from '../../firebase models/chatContext'
import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from '@firebase/firestore'
import { db,store  } from '../../firebase models/Config'
import { v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { useUser } from '../../firebase models/userContext'
import { createRoutesFromChildren, Link } from 'react-router-dom'
import { uploadImg, uploadMessage } from '../../firebase models/user-service'




export function Messages() {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)
    const [text,setText] = useState("");
    const [img,setImg] = useState(null);
    const {user} = useUser();
    const [photoUrl, setPhotoUrl] = useState(null);
    const [disabled,setDisabled]= useState(false);

    const handlePhotoChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setPhotoUrl(reader.result);
          setImg(file)
        };
      };

    function handleKeyPress(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          handleSend();
        }
      }

    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists()&& setMessages(doc.data().messages)

        })
        setText("");
            setImg(null);
            setPhotoUrl(null);
            setDisabled(false);
        return ()=>{
            unSub()
        }
    },[data.chatId])

    const handleSend = async()=>{
        setDisabled(true)
        if(data.user.uid!=user.uid){
        // if(text!=""||img ){
        if(img){
            await uploadImg(img,user,data,text);
        }else{
            await uploadMessage(data,user,text);
        }
            
            setText("");
            setImg(null);
            setPhotoUrl(null);
            setDisabled(false);
    // }
}
}

  return (
    
    <div className='flex flex-col  w-full h-full  bg-white'>
        <div className='flex justify-center items-center w-full text-3xl p-2 lg:p-3 bg-[#5974A9] text-white h-[70px]'>
            <span>{data.user?.name}</span>
            
            {/* <button onClick={}>Actualizar</button> */}
        </div>
        <div className='w-full h-full overflow-y-scroll p-5  bg-[#D1D5DB]'>
            {messages.map((m)=>(
                <Message message={m} key={m.id}/>
            ))
            }
            
        </div>
        <div className='flex justify-between bg-[#5974A9] p-1 pl-0 pr-5'>
            <div className='flex flex-col items center justify center w-full p-2'>
                {photoUrl && 
                <img src={photoUrl} alt="" className='w-[300px] h-[200px] rounded mb-3'/>
                }
            <input 
            type="text" 
            onKeyPress={handleKeyPress}
            disabled={disabled}
            onChange={e=>setText(e.target.value)}
            placeholder="Inserta un mensaje..."
            value={text}
            className=' p-2 w-full outline-none text-black rounded bg-white '
            ></input>
            {/* <img src={img} alt="" className='w-[50px]'/> */}
            </div>
            <div id='iconos' className='flex items-center gap-2 '>
                {/* <img src={file} alt="" className='w-[24px] cursor-pointer'/> */}
                <input 
                disabled={disabled}
                onKeyPress={handleKeyPress}
                type="file" onChange={e=>handlePhotoChange(e)}
                id='file' 
                className='hidden'/>
                <label htmlFor="file">
                    <img src={image} alt="" className='w-[64px] cursor-pointer'/>
                </label>
                <button onClick={handleSend} className="flex items-center gap-2 text-2xl text-black"><img className=" h-[40px]" src={sendIcon}></img></button>
            </div>
        </div>
    </div>
  )
}
