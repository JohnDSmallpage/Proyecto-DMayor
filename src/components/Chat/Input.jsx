import React from 'react'

const Input= () =>{
    return(
        <div className="input">
            <input type="text" placeholder='Escribe un mensaje aquí'/>
            <div className="send">
                <img src="" alt="" />
                <input type="file" style={{display:"none"}} id="file"/>
                <label htmlFor="file">
                    <img src="" alt="" />
                </label>
                <button>Enviar</button>
            </div>
        </div>
    )
}
export default Input