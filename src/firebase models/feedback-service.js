import { 
    doc, 
    setDoc, 
    collection,
    query, 
    getDocs, 
    where, 
    updateDoc, 
    deleteDoc,
    addDoc 
} from "firebase/firestore";


export async function createFeedbackList(data){
    return addDoc(collection(db, "feedback", data));
}

export async function fetchFeedbackByUserId(userId){
    const feedbackQuery = query(
        collection(db, "feedback"),
        where("userId", "==", userId)
    );

    const results = await getDocs(feedbackQuery);

    if(results.size > 0) {
        const users = results.docs.map((item)=>({
         ...item.data(),
         id:item.id,   
        }))
    }
    
};