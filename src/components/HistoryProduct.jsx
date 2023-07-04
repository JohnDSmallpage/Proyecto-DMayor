import React from "react";
import { useEffect } from "react";

export function HistoryProduct({ info }) {

    
  return (
    <div className="flex space-x-4 w-[500px] sm:p-10 bg-orange-500 dark:text-gray-100 border border-gray-300 rounded-md">
    <img
      className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
      src={info.photo[0]}
      alt="Polaroid camera"
    />
    <div className="flex flex-col pb-4">
      <div className="flex pb-2 space-x-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leadi sm:pr-8">
            {info.productName.charAt(0).toUpperCase() + info.productName.slice(1)}
          </h3>
          <p className="text-sm dark:text-black-400">{info.category.charAt(0).toUpperCase() + info.category.slice(1)}</p>
          <p className="text-sm dark:text-black-400">ID Compra: {info.id}</p>
          <p className="text-sm dark:text-black-400">Fecha compra: {info.date.slice(0,9)}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Total: ${info.price}</p>
          <p className="text-sm mt-1 dark:text-black-600">Proveedor: {info.supplier}</p>
          <p className="text-sm mt-1 dark:text-black-600">Cantidad: {info.quantity} unidades</p>
        </div>
      </div>
    </div>
  </div> 
  )
}
