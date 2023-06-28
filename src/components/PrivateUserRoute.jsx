import { Navigate } from "react-router";
import { useUser } from "../firebase models/userContext";
import { LANDING_PAGE } from "../routes/Url";


export function PrivateUserRoute({children}){
    const {user,isLoading}=useUser();
    if(isLoading){
        return<h1>LOADING USER...</h1>;
    }

    if(!isLoading && !user){
        return <Navigate to={LANDING_PAGE}/>;
    }
    if(!user){
        return <Navigate to={LANDING_PAGE}/>
    }

    return children;
}