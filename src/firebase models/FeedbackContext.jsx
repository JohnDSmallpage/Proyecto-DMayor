import React, {useContext, createContext, useState, useEffect} from "react";
import { useFeedback } from "./useFeedback";
import { productContext } from "../firebase models/ProductContext";
import { useParams } from "react-router-dom";
import { getProductById } from "./user-service";
import { useNavigate } from "react-router-dom";
import { searchContext } from "./SearchContext";




export const FeedbackContext = createContext(null);


// Esta lista es para cuando no hay productos o el producto no tiene feedbacks
const defaultList = {
    id: "",
    productId: "",
    listOfIds: [],
    feedbacks: [],
}

export function FeedbackProvider({children}){
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [feedbackList, setFeedbackList] = useState(defaultList);
    const [isLoading, setIsLoading] = useState(false);
    const {getFeedback} = useFeedback()

    
    const selectProduct = useContext(productContext);
    const productSearched = useContext(searchContext);
    const [product, setProduct] = useState([]);

    const handleFeedbackButton = async () => {}

    /*const getProduct = async (id) => {
        const data = await getProductById(id);
         console.log(data);
        setProduct(data);
    };

    useEffect(() => {
        if (selectProduct != null) {
          getProduct(id);
          console.log({id});
        } else {
          console.log("No está seleccionando el producto");
        }
    }, []);*/

    const handleGetFeedbacks = async () => {
        try {
            setIsLoading(true);
            const data = await getFeedback(product.id)
            setFeedbackList(data || defaultList);
            setIsLoading(false);
            console.log({data});
        } catch (error) {
            
        }
    };

    useEffect(()=>{
        if (!isLoading){
            handleGetFeedbacks();
        }
    },[id]);
    
    return(
        <FeedbackContext.Provider
            value={{
                feedbackList,
                setFeedbackList,
                isLoading,
                setIsLoading,
                handleFeedbackButton,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export function useFeedbackContext(){
    return useContext(FeedbackContext);
}