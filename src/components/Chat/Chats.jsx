import React from 'react'
import karen from '../../images/karen.jpeg'

const Chats= () =>{
    return(
        <div className="chats">
            <div className="userChat">
                <img src={karen} alt="" />
                <div className="userChatInfo">
                    <span>Jennifer</span>
                    <p>Hola</p>
                </div>
                
            </div>
            <div className="userChat">
                <img src={karen} alt="" />
                <div className="userChatInfo">
                    <span>Jennifer</span>
                    <p>Hola</p>
                </div>
                
            </div>
        </div>
    );
};
export default Chats