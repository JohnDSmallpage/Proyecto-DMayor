import { doc, setDoc, collection,query, getDocs, where, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./Config";
import { store } from "./Config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "@firebase/storage";
import { async } from "@firebase/util";







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
export const uploadProfilePic = async (file)=>{
    const storageRef = ref(store, `images/${v4()}`)
      const uploadTask = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
}

export const addProductToCatalog = async (id, user) => {
    const reference = doc(db, "suppliers", user.uid);
    
    user.catalog.push(id);
    const result = await updateDoc(reference, user);
    console.log("Producto agregado al catalogo");
    return result;
  }
  export const UpdateProfile = async (user) => {
    const reference = doc(db, "suppliers", user.uid);
    const result = await updateDoc(reference, user);
    alert("Datos modificados exitosamente");
    return result;
  }

  export const getProductsBySupplier = async (idProducts) => {
    const userQuery = query(collection(db,"products"), where("id","in",idProducts));
    const results = await getDocs(userQuery);
    
    if(results.size>0){
        const products = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        return products;
    }else{
        return null;
    }

    

}

export const getAllProducts = async () => {
    const userQuery = collection(db,"products");
    const results = await getDocs(userQuery);
    
    if(results.size>0){
        const products = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        return products;
    }else{
        return null;
    }
}

export const deleteProduct = async (productId, user) => {
    await deleteDoc(doc(db, "products", productId));

    const reference = doc(db, "suppliers", user.uid);
    console.log(productId);
    user.catalog =user.catalog.filter((elemento) => elemento !== productId);
  console.log(user.catalog);
    await updateDoc(reference, user);
    console.log("Producto eliminado del catalogo");

}



