import { fetchFeedbackByProductId, updateFeedbackList } from "./feedback-service";

export function useFeedback(){
    const addNewFeedback = async ({
        feedbackId,
        listOfIds,
        feedbackListId,
    }) => {
        const newList = [...listOfIds, feedbackId];
        await updateFeedbackList(feedbackListId,{
            listOfIds: newList
        })

        return {
            updateListOfIds: newList,
            feedbackListId,
        }
    };

    const handleFeedback = async ({
        feedbackId,
        listOfIds = [],
        feedbackListId,
        productId,
        isFeedback,
    }) => {
        let currentFeedback = {
            listOfIds,
            feedbackListId,
        };

        //Chequea que el producto tenga una lista de feedbacks
        if (!feedbackListId && productId){
            const newList = await createFeedbackList({
                listOfIds: [],
                productId, 
            });
            currentFeedback = {
                listOfIds: [],
                feedbackListId: newList.id,
            };

        } 

        //Validar que el comentario exista
        if (isFeedback){
            console.log("Ya existe");
        }

        //Sino lo agregamos
        return addNewFeedback({
            feedbackId,
            listOfIds,
            feedbackListId,
        })
    };
    
    const getFeedback = async (productId = "") => {
        try {
            const feedbackData = await fetchFeedbackByProductId(productId);

            console.log(feedbackData)
        } catch (error) {
            console.error("Falló al cargar el feedback")
        }
    };

    return{
        addNewFeedback,
        getFeedback,

    }

}