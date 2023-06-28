import { doc, 
    setDoc, 
    collection,
    query, 
    getDocs, 
    where,
    addDoc,
    updateDoc
 } from "firebase/firestore";
import { db } from "./Config";

export async function createFavoriteList(data) {
    return addDoc(collection(db, "favorites"), data);
}

export async function getFavoritesByUserId(userId){
    const favoriteQuery = query(
        collection(db, "favorites"),
        where("userId", "==", userId)
    );

    const results = await getDocs(favoriteQuery);

    if(results.size > 0) {
        const favoriteList = results.docs.map((item) => ({
            ...item.data(),
            id: item.id,
        }));

        return favoriteList[0];
    } else {
        return null;
    }
        
}

export async function updateFavoriteList(favoriteListId, data) {
    const listRef = doc(db, "favorites", favoriteListId);
    return updateDoc(listRef, data);
}

export const addProductToFavoriteList = async (id, user) => {
    const reference = doc(db, "favorites", user.uid);
    
    user.favoriteList.push(id);
    const result = await updateDoc(reference, user);
    console.log("Producto agregado a la lista de favoritos");
    return result;
  }