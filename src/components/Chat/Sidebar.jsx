import React from 'react'
import NavbarChat from './NavbarChat'
import Search from './Search'
import Chats from './Chats'

const Sidebar= () =>{
    return(
        <div className="sidebar">
            <NavbarChat></NavbarChat>
            <Search></Search>
            <Chats></Chats>
        </div>
    )
}
export default Sidebar