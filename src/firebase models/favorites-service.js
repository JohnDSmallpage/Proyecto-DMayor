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

export async function getFavoritesByUserId(favoriteIds){
    const favoriteQuery = query(
        collection(db, "products"),
        where("id", "in", favoriteIds)
    );

    const results = await getDocs(favoriteQuery);

    const products = results.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    
      return products;
    }

    /*if(results.size > 0) {
        const favoritesList = results.docs.map((item) => ({
            ...item.data(),
            id: item.id,
        }));

        return favoritesList[0];
    } else {
        return null;
    }*/
        


export async function updateFavoriteList(favoriteListId, data) {
    const listRef = doc(db, "favorites", favoriteListId);
    return updateDoc(listRef, data);
}

/*export const addProductToFavoriteList = async (id, user) => {
    const reference = doc(db, "favorites", user.uid);
    
    user.favoriteList.push(id);
    const result = await updateDoc(reference, user);
    console.log("Producto agregado a la lista de favoritos");
    return result;
  }*/