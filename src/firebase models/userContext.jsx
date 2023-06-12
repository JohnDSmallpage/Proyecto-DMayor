import React,{useContext,createContext,useEffect,useState} from "react";
import {onAuthStateChanged} from "firebase/auth"
import { auth } from "./Config";
import { getUserProfile } from "./user-service";

export const UserContext = createContext();

export function UserContextProvider({ children }){
const [user,setUser] =useState(null)
const [isLoading,setIsLoading] = useState(true);

useEffect(()=>{
    onAuthStateChanged(auth ,async (firebaseUser)=>{
        setIsLoading(true)
        if(firebaseUser){
            const profile = await getUserProfile(firebaseUser.email)
            setUser(profile);
            // console.log(profile)
        }else{
           setUser(null); 
        }
        setIsLoading(false)
    });
},[]);

    return( <UserContext.Provider 
    value={{
        user,
        isLoading,
    }}>
        {children}
    </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext);
}