import { 
    doc, 
    setDoc, 
    collection,
    query, 
    getDocs, 
    where, 
    updateDoc, 
    addDoc 
} from "firebase/firestore";


export async function createFeedbackList(data){
    return addDoc(collection(db, "feedback", data));
}

export async function fetchFeedbackByProductId(productId){
    const feedbackQuery = query(collection(db, "feedback"), where("productId", "==", productId));

    const results = await getDocs(feedbackQuery);

    if(results.size > 0) {
        const feedbackList = results.docs.map((item)=>({
         ...item.data(),
         id:item.id,   
        }));
        return feedbackList[0];
    }else {
        return null;
    }   
}

export async function updateFeedbackList(feedbackListId, data){
    const listRef = doc(db, "feedback", feedbackListId);
    return updateDoc(listRef, data);
}