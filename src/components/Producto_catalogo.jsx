import React from 'react'
import {useRef, useEffect} from 'react';


const Producto_catalogo = () => {
    
    return (

    <div className="grid-offer text-left flex flex-wrap gap-10 mx-auto">
        <div className="hero p-8 relative bg-no-repeat bg-cover bg-center" >
            <div className="circle"></div>
            <h2 className="text-white mt-3 mb-5 text-2xl lg:text-3xl">Product X</h2>
            <a href="#" className="inline-flex items-center uppercase text-white mt-8">Eliminar <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.com">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg></a>
        </div>
        <div className="hero p-8 relative bg-no-repeat bg-cover bg-center" >
            <div className="circle"></div>
            <h2 className="text-white mt-3 mb-5 text-2xl lg:text-3xl">Product X</h2>
            <a href="#" className="inline-flex items-center uppercase text-white mt-8">Eliminar <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.com">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg></a>
        </div>
        <div className="hero p-8 relative bg-no-repeat bg-cover bg-center" >
            <div className="circle"></div>
            <h2 className="text-white mt-3 mb-5 text-2xl lg:text-3xl">Product X</h2>
            <a href="#" className="inline-flex items-center uppercase text-white mt-8">Eliminar <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.com">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg></a>
        </div>
        <div className="hero p-8 relative bg-no-repeat bg-cover bg-center" >
            <div className="circle"></div>
            <h2 className="text-white mt-3 mb-5 text-2xl lg:text-3xl">Product X</h2>
            <a href="#" className="inline-flex items-center uppercase text-white mt-8">Eliminar <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.com">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg></a>
        </div>
    </div>
  )
}

const grid = document.querySelectorAll(".grid-offer div");

    grid.forEach((item) => {
            item.addEventListener("mouseover", () => {
                grid.forEach((el) => el.classList.remove("active"));
            item.classList.add("active");
        });
    });

export default Producto_catalogo