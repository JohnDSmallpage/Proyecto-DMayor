import { doc, setDoc } from "firebase/firestore";
import { db } from "./Config";

// Crea el perfil de usuario en el firestore
export async function createUserProfile(userId,data){
    return setDoc(doc(db,'users',userId),data);
}
