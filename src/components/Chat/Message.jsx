import React from 'react'
import karen from '../../images/karen.jpeg'

const Message= () =>{
    return(
        <div className="message owner">
            <div className='messageInfo'>
                <img src={karen} alt="" />
                {/*<span>just now</span>*/}
            </div>
            <div className='messageContent'>
                <p>hello</p>
                <img src={karen} alt="" />
            </div>
        </div>
    )
}
export default Message