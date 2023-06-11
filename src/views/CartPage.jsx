import React from 'react'
import { useEffect } from "react";
import { useContext } from "react";
import { productContext } from "../firebase models/ProductContext";
import { useState } from "react";
import {PaypalCheckout} from "../components/PaypalCheckout";

export const CartPage = () => {
  return (
    <section className='Section_cart mx-auto'>
        
        <h1 className='py-10 text-xs font-medium text-gray-500 uppercase text-center'>Resumen de compra</h1>
        <section className="min-h-screen  p-14">
            
            <div>
                <div className='flex flex-col'>
                    <div className='-m-1.5 overflow-x-auto'>
                        <div className='p-1.5 min-w-full inline-block align-middle'>
                            <div className='overflow-hidden'>
                                <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                                    <thead>
                                        <tr>
                                            <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center'> Imagen</th>
                                            <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center'> Producto</th>
                                            <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center'> Proveedor</th>
                                            <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center'> Precio</th>
                                            <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center'> Cantidad</th>
                                            <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center'> Precio sin descuento</th>
                                            <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center'> Descuento</th>
                                            <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center'> Total a pagar</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                                        <tr className='hover:bg-gray-300 dark:hover:bg-gray-300 '>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 w-[14%]'>
                                                <img src="https://lh3.googleusercontent.com/EEnORFmYiOCheegKoFEnrDJn0rcJU_MvURWHuhsl5HLrXcDctEYjGojz0gqVXNjPHN05CwYeaOGrvq0cMEW_jpseJb2wGcv__QQdA64A8--ybao" alt="" className='w-50px m-auto'/>
                                            </td>
                                            <td className=' px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-left'>Prod Name</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600'>Prov Name</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center'>500</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center'>2</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center'>1000</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600'>no hay descuento</td>
                                            <td className='bpx-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center'>1000</td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> 
                </div>
                <div>
                    <label htmlFor="paypal">
                        <div className="py-10 mt-2">
                            <h2 className="font-medium text-gray-500 uppercase text-right">
                            Método de pago:
                            </h2>
                            <div className="mt-5 flex justify-end text right h-min">

                            { /* paypal checkout */ }

                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </section>
    </section>

  )
}