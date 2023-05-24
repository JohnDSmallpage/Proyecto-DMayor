import React from 'react'
import Producto_catalogo from '../components/Producto_catalogo'

export const Catalogo = () => {
  return (
    <section className='Section_catalogo mx-auto'>
        
        <h1 className='text-4x1 mt-10 text-center'>Catálogo</h1>
        <section className="min-h-screen  p-14">
            
            <Producto_catalogo />

        </section>
    </section>

  )
}
