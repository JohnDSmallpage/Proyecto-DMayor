import React from 'react'
import { useUser } from '../../firebase models/userContext'
import perfil from "../../images/perfil-generico.jpg"

const NavbarChat = () => {
  const {user} = useUser()
  return (
    <div className='navbarC'>
      <span className="logo">Chat</span>
      <div className="user">
        <img src={perfil} alt=''/>
        <span>{user.name}</span>
      </div>
    </div>
  )
}

export default NavbarChat