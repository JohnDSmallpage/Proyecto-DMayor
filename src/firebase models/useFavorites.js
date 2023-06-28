import { getFavoritesByUserId, updateFavoriteList } from "./favorites-service";
import { createFavoriteList } from "./favorites-service";


export function useFavorites() {
const addNewFavorite = async ({productId, listOfIds, favoriteListId}) => {
        const newList = [...listOfIds, productId];
        console.log({newList});
        await updateFavoriteList(favoriteListId, {
            listOfIds: newList
        });

        return {
            updateListOfIds: newList,
            favoriteListId,
        }
    };

    const removeFavorite = async ({productId, listOfIds, favoriteListId}) => {
        const newList = listOfIds.filter(item => item !== productId)

        await updateFavoriteList(favoriteListId, {
            listOfIds: newList
        });

        return {
            updateListOfIds: newList,
            favoriteListId,
        }
    };

    const handleFavorite = async ({
        productId, 
        isFavorite, 
        listOfIds = [],
        favoriteListId,
        userId
    }) => {
        let currentFavorites = {
            listOfIds,
            favoriteListId,
        };

        /*console.log({
            userId,
            favoriteListId,
            currentFavorites,
        });*/

        
        if(!favoriteListId && userId) {
           
            const newList = await createFavoriteList({
                listOfIds: [],
                userId, //enlace con la coleccion de usuario
            });

            currentFavorites = {
                listOfIds: [],
                favoriteListId: newList.id,
            };
        }
        
        const payload ={
            productId,
            listOfIds,
            favoriteListId
        };

        //si el producto es favorito, lo eliminamos
        if (isFavorite) {
            return removeFavorite(payload);
        }
        console.log({payload});
        //si no, lo agg
        return addNewFavorite(payload);
    };

    const getFavorites = async (userId = "") => {
        try {
            const favoritesData = await getFavoritesByUserId(userId);

            console.log({favoritesData});
        } catch (error) {
            console.error("FAILED GET FAVORITES");
        }
    };

    return {
        getFavorites,
        addNewFavorite,
        removeFavorite,
        handleFavorite,
    }; 
}