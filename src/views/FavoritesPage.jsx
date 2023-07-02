/*import React from "react";
import { Product } from "../components/Product";
import { useEffect } from "react";
import { useFavoritesContext } from "../firebase models/FavoritesContext";


export function FavoritesPage() {
  const {favoriteList, isLoading} = useFavoritesContext();
  const { products } = favoriteList;

  console.log(favoriteList)



  return (
    
    <>
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Productos Favoritos</h1>
      <div className="grid grid-cols-2 gap-4">
        {isLoading && <p className="text-gray-500">Loading...</p>}

        {!isLoading &&
          products?.map((product) => (
            <Product product={product} key={product.name} />
          ))}
      </div>
    </div>
    </>

  )}*/

  import React, { useEffect } from "react";
  import { Product } from "../components/Product";
  import { useFavoritesContext } from "../firebase models/FavoritesContext";
  
  export function FavoritesPage() {
    const { favoriteList, isLoading, handleFavoriteButton, handleGetFavorites } = useFavoritesContext();
  
    useEffect(() => {
      if (!isLoading && favoriteList === null) {
        handleGetFavorites();
      }
    }, [isLoading, favoriteList, handleGetFavorites]);
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Productos Favoritos</h1>
        {isLoading && <p>Loading...</p>}
        
        {!isLoading && favoriteList?.products?.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {favoriteList.products.map((product) => (
              <Product
                key={product.id}
                info={product}
                handleFavoriteButton={handleFavoriteButton}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    );
  }