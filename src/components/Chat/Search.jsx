import React from 'react'
import karen from '../../images/karen.jpeg'

const Search= () =>{
    return(
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder='Encuentra un usuario' />
            </div>
            <div className="userChat">
                <img src={karen} alt="" />
                <div className="userChatInfo">
                    <span>Jennifer</span>
                </div>
                
            </div>
        </div>
    )
}
export default Search