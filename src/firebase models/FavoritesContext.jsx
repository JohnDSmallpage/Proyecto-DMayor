import React,{useContext,createContext,useState, useEffect} from "react";
import { useFavorites } from "./useFavorites";
import { useUser } from "./userContext";

export const FavoritesContext = createContext(null);

//cuando no hay usuarios o no tiene lista de favoritos
const defaultList = {
    id: "",
    userId: "",
    listOfIds: [],
    products: [],
};

export function FavoritesProvider({ children }){
const [favoriteList,setFavoriteList] =useState(defaultList);
const [isLoading,setIsLoading] = useState(false);
const {user} = useUser()
const { getFavorites, handleFavorite} = useFavorites();

const handleFavoriteButton = async ({productId, isFavorite}) => {
    try {
        const { updateListOfIds, favoriteListId } = await handleFavorite({
            productId, isFavorite, listOfIds: favoriteList.listOfIds,
            favoriteListId: favoriteList.id,
            userId: user.id,
        });

     

        setFavoriteList({
            ...favoriteList,
            listOfIds: updateListOfIds,
            id: favoriteListId,
            products: updateProducts,
        });

    } catch (error) {
        console.log("FAILED HANDLE FAVORITE BUTTON", error)
    }
}

const handleGetFavorites = async () => {
    try {
        setIsLoading(true);
        const data = await getFavorites(user.id);
        console.log({data})
        
        setFavoriteList(data || defaultList);
        setIsLoading(false);
    } catch (error) {}
    };

useEffect(() => {
    if (!isLoading && user?.id) {
        handleGetFavorites();
    }
}, [user])

return( 
    <FavoritesContext.Provider 
        value={{
            favoriteList,
            setFavoriteList,
            isLoading,
            setIsLoading,
            handleFavoriteButton
    }}
    >
        {children}
    </FavoritesContext.Provider>
    );
}

export function useFavoritesContext(){
    return useContext(FavoritesContext);
}