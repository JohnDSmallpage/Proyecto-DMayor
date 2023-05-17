import React from 'react'
import { createContext, useState} from 'react';
export const searchContext = createContext();

export function SearchContextProvider({children}) {

    const [searchText, setSearchText] = useState("");

  return (
    
    <searchContext.Provider value={{searchText, setSearchText}}>
        {children}
    </searchContext.Provider>


  )
}
