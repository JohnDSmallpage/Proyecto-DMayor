import React from 'react'
import { AddProduct } from './AddProduct'
import { Link } from 'react-router-dom'
import { ADD_PRODUCT } from '../routes/Url'

export function SupplierCatalog() {
  return (
    <>
      
            <h1 className='text-center'>Catalogo</h1>
        

        <div className='flex justify-center'>
            <Link to={ADD_PRODUCT} className="py-3 font-medium text-white bg-green-600 hover:bg-green-400 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">Añadir nuevo producto</Link>
            <p>Eliminar</p>
        </div>

        
    
    </>
  )
}
