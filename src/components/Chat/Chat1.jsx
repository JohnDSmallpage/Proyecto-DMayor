import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../../firebase models/ChatContext'

const Chat1 = () => {

    const {data} = useContext(ChatContext)

    return (
        <div className='chat'>
            <div className="ChatInfo">
                <span>{data.user?.name}</span>
                
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat1