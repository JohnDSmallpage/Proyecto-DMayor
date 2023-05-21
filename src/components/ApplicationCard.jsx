import React from 'react'
import { updateApplications } from '../firebase models/user-service'

export function ApplicationCard({info}) {
    const acceptApplication=()=>{
        updateApplications(info.uid);

    }
    const DenyApplication=()=>{
        
    }
  return (
    <>
    <div className='flex flex-col text-[18px] mt-2 border-black border rounded
    p-4 font-bold w-[350px] h-[350px] overflow-auto'>
        <p>Nombre de la compañia: <p className='decoration-none font-normal'>{info.Company}</p></p>
        <p>Email: <p className='decoration-none font-normal'>{info.email}</p></p>
        <p className='break-all'>Direccion: <p className='decoration-none font-normal'>{info.Address}</p></p>
        <p>RIF: <p className='decoration-none font-normal'>{info.Rif}</p></p>
        <p>Teléfono: <p className='decoration-none font-normal'>{info.phone}</p></p>
        <div className='flex flex-row justify-evenly'>
            <button onClick={acceptApplication} className='text-green-600'>Aceptar</button>
            <button className='text-red-700'>Denegar</button>
        </div>
    </div>
    </>
  )
}
