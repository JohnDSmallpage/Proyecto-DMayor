import { doc, setDoc, collection,query, getDocs, where, updateDoc } from "firebase/firestore";
import { db } from "./Config";
import { store } from "./Config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";



// Crea el perfil de usuario en el firestore
export async function createUserProfile(userId,data){
    return setDoc(doc(db,'users',userId),data);
}
export async function createSupplierProfile(userId,data){
    return setDoc(doc(db,'suppliers',userId),data);
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
export async function getUserProfile(email){
    const userQuery = query(collection(db,"users"), where("email","==",email));
         const results = await getDocs(userQuery);
 
    
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        const [user] = users;
        return user;
    }else{
        const userQuery = query(collection(db,"suppliers"), where("email","==",email));
         const results = await getDocs(userQuery);
 
    
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
}

export async function getProductById(id){
    const userQuery = query(collection(db,"products"), where("id","==",id));

    const results = await getDocs(userQuery);
    
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
export async function getApplications(){
    const userQuery = query(collection(db,"suppliers"), where("accepted","==",false));
    const results = await getDocs(userQuery);
    
    if(results.size>0){
        const applications = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        return applications;
    }else{
        return null;
    }    
}
export async function updateApplications(uid){
    const userQuery = query(collection(db,"suppliers"), where("uid","==",uid));
    const results = await getDocs(userQuery);
    if(results.size>0){
        const applications = results.docs.map((item)=>({
            ...item.data(),
            accepted: true,
        }))
        console.log(applications[0])
        const reference = doc(db, "suppliers",applications[0].uid);
        const result = await updateDoc(reference, applications[0]);
            
           
        return result;
    }else{
        return null;
    }    
}

export const uploadPhoto = async (file) => {
    const storageRef = ref(store, `product-image/${v4()}`);
    await uploadBytes(storageRef, file);
    const url =  await getDownloadURL(storageRef);
    console.log("Nueva imagen cargada");
    return url;
  }
