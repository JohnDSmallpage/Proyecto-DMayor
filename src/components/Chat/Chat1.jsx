import React from 'react'
import Messages from './Messages'
import Input from './Input'

const Chat1= () =>{
    return(
        <div className="chat1">
        <div className="chatInfo">
            <span>Zulu</span>
            <div className="chatIcons">
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            </div>  
        </div>
        <Messages></Messages>
        <Input></Input>

        </div>
    )
}
export default Chat1