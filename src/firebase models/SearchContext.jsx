import React from 'react'
import { createContext, useState} from 'react';
export const searchContext = createContext();

export function SearchContextProvider({children}) {

    
    const [searchText, setSearchText] = useState("");
    const [products, setProducts] = useState([]);
    const [supplierMode, setSupplierMode] = useState(false);

  return (
    
    <searchContext.Provider value={{searchText, setSearchText, products, setProducts, supplierMode, setSupplierMode}}>
        {children}
    </searchContext.Provider>


  )
}
