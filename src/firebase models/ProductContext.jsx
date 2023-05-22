import React from 'react'
import { createContext, useState} from 'react';
export const productContext = createContext();

export function ProductContextProvider({children}) {
    const [discounts, setDiscounts] = useState([]); 
    const [quantity, setQuantity] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState([]);

  return (
    
    <productContext.Provider value={{selectedProduct, setSelectedProduct, quantity, setQuantity, discounts, setDiscounts}}>
        {children}
    </productContext.Provider>


  )
}