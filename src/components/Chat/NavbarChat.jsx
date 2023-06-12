import React from 'react'
import { useUser } from '../../firebase models/userContext'


const NavbarChat = () => {
  const {user} = useUser()
  return (
    <div className='navbarC'>
      <span className="logo">Chat</span>
      <div className="user">
        <img src='' alt=''/>
        <span>{user.name}</span>
      </div>
    </div>
  )
}

export default NavbarChat