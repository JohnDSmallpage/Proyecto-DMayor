import React from 'react'
import Sidebar from "../components/Chat/Sidebar"
import Chat from './Chat/Chat'

export function ChatPage1() {
  return (
    <div className='chatPage'>
      <div className="container">
      <Sidebar></Sidebar>
      <Chat></Chat>
      </div>    
    </div>
  )
}
