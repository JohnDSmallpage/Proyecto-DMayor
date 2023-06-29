import React from 'react'
import { createContext, useState} from 'react';
export const productContext = createContext();

export function ProductContextProvider({children}) {
    const [discounts, setDiscounts] = useState([]); 
    const [quantity, setQuantity] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [finalPrice, setFinalPrice] = useState(1);

  return (
    
    <productContext.Provider value={{selectedProduct, setSelectedProduct, quantity, setQuantity, discounts, setDiscounts, finalPrice, setFinalPrice}}>
        {children}
    </productContext.Provider>


  )
}

export function useProduct(){
  return useContext(productContext);
}