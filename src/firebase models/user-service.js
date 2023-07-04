import { doc, setDoc, collection,query, getDocs, where, updateDoc, deleteDoc, getDoc, serverTimestamp, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "./Config";
import { store } from "./Config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "@firebase/storage";
import { async } from "@firebase/util";
import { v4 as uuid} from "uuid";

export async function uploadImg(img,user,data,text){
            const storageRef = ref(store, `images/${v4()}`)
            // const uploadTask = uploadBytesResumable(storageRef,img)
            const uploadTask = await uploadBytes(storageRef, img);
            const url =  await getDownloadURL(storageRef);
            await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
                id:uuid(),
                text,
                senderId:user.uid,
                date: Timestamp.now(),
                img: url,
            })
            })
            upload(user,data,text)
}
export async function uploadMessage(data,user,text){
    await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
            id: uuid(),
            text,
            senderId:user.uid,
            date:Timestamp.now(),
        })
    })
    upload(user,data,text);
}
async function upload(user,data,text){
    await updateDoc(doc(db,"userChat",user.uid),{
        [data.chatId+".lastMessage"]:{
            text
        },
        [data.chatId+".date"]: serverTimestamp()
    })
    await updateDoc(doc(db,"userChat",data.user.uid),{
        [data.chatId+".lastMessage"]:{
            text
        },
        [data.chatId+".date"]: serverTimestamp()
    })
}

export async function searchChat(combinedID){
    const res = await getDoc(doc(db,"chats",combinedID));
    return res;
}
export async function setChats(combinedID,user,product){
    await setDoc(doc(db,"chats",combinedID),{messages:[]});
    //crea user chats
    console.log(user)
    console.log(product)
    await updateDoc(doc(db,"userChat",user.uid),{
        [combinedID+".userInfo"]:{
            uid:product.supplierId,
            name:product.supplierName,
            // photoURL:context.profilePic
        },
        [combinedID+".date"]: serverTimestamp()
    })
    await updateDoc(doc(db,"userChat",product.supplierId),{
        [combinedID+".userInfo"]:{
            uid:user?.uid,
            name:user?.name,
            // photoURL:user.profilePic
        },
        [combinedID+".date"]: serverTimestamp()
    })
}



// Crea el perfil de usuario en el firestore
export async function createUserProfile(userId,data){
    setDoc(doc(db,'userChat',userId),{});
    return setDoc(doc(db,'users',userId),data);

}

export async function createSupplierProfile(userId,data){
    setDoc(doc(db,'userChat',userId),{});
    return setDoc(doc(db,'suppliers',userId),data);
}

export async function addNewProduct(productId,data){
    return setDoc(doc(db,'products',productId),data);
}

export async function addNewHistory(historyId,data){
    return setDoc(doc(db,'history',historyId),data);
}

export async function getProductsByName(textSearched){
    textSearched = textSearched.toLowerCase();

    console.log(textSearched);
    const usersQuery = query(collection(db,"products"), where("name","==", textSearched), where("hidden","==",false));
    
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

export async function getProductsByCategory(categorySearched){
    categorySearched = categorySearched.toLowerCase();
    console.log(categorySearched);
    const usersQuery = query(collection(db,"products"), where("category","==", categorySearched), where("hidden","==",false));
    
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
export async function getUserProfileById(id){
    const userQuery = query(collection(db,"users"), where("ID","==",id));
         const results = await getDocs(userQuery);
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        const [user] = users;
        return user;
    }else{
        const userQuery = query(collection(db,"suppliers"), where("uid","==",id));
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

  export const addOrderToUserHistory = async (id, user) => {
    const reference = doc(db, "users", user.uid);
    if(user.history == undefined){
      user.history = [];
    } 
    user.history.push(id);
    const result = await updateDoc(reference, user);
    console.log("Orden añadida al historial");
    return result;
  }

  export const addProductToFavorite = async (id, user) => {
    const reference = doc(db, "users", user.uid);
    if(user.favorites == undefined){
      user.favorites = [];
    } 
    user.favorites.push(id);
    const result = await updateDoc(reference, user);
    console.log("Producto añadido a favoritos");
    return result;
  }

  export const deleteProductFromFavorite = async (productId, user) => {

    const reference = doc(db, "users", user.uid);
    user.favorites =user.favorites.filter((elemento) => elemento !== productId);
    await updateDoc(reference, user);
    console.log("Producto eliminado de favoritos");

}

  export const reduceAvailableQuantity = async (selectedProduct, quantity) => {
    const reference = doc(db, "products", selectedProduct.id);
    selectedProduct.availableQuantity = parseInt(selectedProduct.availableQuantity) - quantity ;
    selectedProduct.availableQuantity = selectedProduct.availableQuantity.toString();
    
    const result = await updateDoc(reference, selectedProduct);
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

    if(idProducts.length==0){
        return null;
    }
    
    const userQuery = query(collection(db,"products"), where("id","in",idProducts), where("hidden","==",false));
    const results = await getDocs(userQuery);
    
    if(results.size>0){
        const products = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        console.log(products);
        return products;
    }else{
        return null;
    }


}



export const getFavoritesByUser = async (idFavorites) => {
    if(idFavorites?.length==0 || idFavorites==undefined || idFavorites==null) {
        return null;
    }

    const userQuery = query(collection(db,"products"), where("id","in",idFavorites));
    const results = await getDocs(userQuery);
    
    if(results.size>0){
        const products = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        console.log(products);
        return products;
    }else{
        return null;
    }

}

export const getHistoryByUser = async (idProducts) => {
    const userQuery = query(collection(db,"history"), where("id","in",idProducts));
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



export const getHiddenProductsBySupplier = async (idProducts) => {
    if(idProducts.length==0){
        return null;
    }
    const userQuery = query(collection(db,"products"), where("id","in",idProducts), where("hidden","==",true));
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
    const userQuery = query(collection(db,"products"), where("hidden","==",false));
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

export const hideProduct = async (productId, user) => {
    
    const reference = doc(db, "products", productId);

    await updateDoc(reference, {
    hidden: true
    });

    
    
}

export const showProduct = async (productId, user) => {
    
    const reference = doc(db, "products", productId);

    await updateDoc(reference, {
    hidden: false
    });

    
    
}



