import React from 'react'
import karen from '../../images/karen.jpeg'

const NavbarChat= () =>{
    return(
        <div className="navbarchat">
            <span className='logo'>D'MAYOR CHAT</span>
            <div className="user">
                <img src={karen} alt="karen" />
                <span>Karencita</span>

            </div>

        </div>
    )
}
export default NavbarChat