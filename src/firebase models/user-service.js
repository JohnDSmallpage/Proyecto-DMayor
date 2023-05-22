import { doc, setDoc, collection,query, getDocs, where } from "firebase/firestore";
import { db } from "./Config";

// Crea el perfil de usuario en el firestore
export async function createUserProfile(userId,data){
    return setDoc(doc(db,'users',userId),data);
}

export async function addNewProduct(productId,data){
    return setDoc(doc(db,'products',productId),data);
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
