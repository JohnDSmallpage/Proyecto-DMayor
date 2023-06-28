import React from 'react'
import { useFavoritesContext } from '../firebase models/FavoritesContext'
import { Product } from '../components/Product';
import "./FavoritesPage.css";


export  function FavoritesPage() {

  const { favoriteList, isLoading } = useFavoritesContext();
  const { products } = favoriteList;

  console.log(favoriteList)

  return (
    <>
    <div className='container1'>
      <h1 className='title'>Favorites Products</h1>
      <div className='products'>
        {isLoading && <p className='loading'>Loading...</p>}

        {!isLoading &&
        products?.map((product) =>(
          <ProductPage product={product} key={product.name}/>
        ))}
      </div>
      </div>
    </>
  );
}


/*import React from "react";

import { Product } from "../components/Product";
import { useEffect } from "react";
import { useUser } from "../firebase models/userContext";
import { useState } from "react";
import { getFavoritesByUserId } from "../firebase models/favorites-service";
//import { useContext } from "react";
//import { searchContext } from "../firebase models/SearchContext";
import "./FavoritesPage.css";
export function FavoritesPage() {
  const [products, setFavorites] = useState([]);
  const { user } = useUser();



  const getFavoritesProducts = async () => {
    const userId = user.favoriteList;
    const data = await getFavoritesByUserId(userId);
    setFavorites(data);
  };

 
  useEffect(() => {
    getFavoritesProducts();
    
  }, [products]);

  return (
    
    <>
    <div className='container1'>
      <h1 className='title'>Favorites Products</h1>
      <div className='products'>
        

        {
        products?.map((product) =>(
          <Product product={product} key={product.name}/>
        ))}
      </div>
      </div>
    </>

    <>
      <h1 className="text-[20px] font-bold text-gray-800 text-center mt-3">
        Favoritos
      </h1>


      <div className="flex flex-wrap">
      {isLoading && <p className='loading'>Loading...</p>}

{!isLoading &&
products?.map((product) =>(
  <Product product={product} key={product.name}/>
))}
      </div>

      


    </>*/
  
