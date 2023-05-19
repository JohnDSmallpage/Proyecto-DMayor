import { doc, setDoc, collection,query, getDocs, where } from "firebase/firestore";
import { db } from "./Config";

// Crea el perfil de usuario en el firestore
export async function createUserProfile(userId,data){
    return setDoc(doc(db,'users',userId),data);
}

export async function getProductsByName(textSearched){
    textSearched = textSearched.toLowerCase();

    console.log(textSearched);
    const usersQuery = query(collection(db,"products"), where("name","==", textSearched));
    
    const results = await getDocs(usersQuery);

    if(results.size>0){
        const products = results.docs.map((item, idx)=>({
            ...item.data(),
            id: item.id,
        }
        ));
        return products;
    }else{
        return null;
    }    
}
export async function getUserProfile(email){
    const userQuery = query(collection(db,"users"), where("email","==",email));

    const results = await getDocs(userQuery);
    //comprueba el tamano de users y retorna la informacion de usuario
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        const [user] = users;
        return user;
    }else{
        return null;
    }    
}
