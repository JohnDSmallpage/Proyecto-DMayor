import React from 'react'
import Sidebar from '../components/Chat/Sidebar'
import Chat1 from '../components/Chat/Chat1'
import "./ChatDesign.scss"

const ChatPage=() => {
  return (
    <div className='chatpage'>
      <div className="container">
        <Sidebar></Sidebar>
        <Chat1></Chat1>
      </div>
    </div>
  )
}
export default ChatPage