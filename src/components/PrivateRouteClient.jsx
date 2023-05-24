import { Navigate } from "react-router";
import { useUser } from "../firebase models/userContext";
import { LANDING_PAGE, LOGIN } from "../routes/Url";


export function PrivateRouteClient({children}){
    const {user,isLoading}=useUser();
    if(isLoading){
        return<h1>LOADING USER...</h1>;
    }

    if(!isLoading && !user){
        return <Navigate to={LOGIN}/>;
    }
    if(user && user?.Company!=undefined){
        return <Navigate to={LANDING_PAGE}/>
    }

    return children;
}