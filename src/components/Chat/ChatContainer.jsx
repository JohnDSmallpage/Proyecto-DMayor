import React from 'react'
import SideBar from './SideBar'
import Chat1 from './Chat1'
import "./ChatDesign.scss"

const ChatContainer = () => {

  return (
    <div className='page'>
        <div className='containerC'>
            <SideBar/>
            <Chat1></Chat1>

        </div>

    </div>
  )
}

export default ChatContainer