import React from "react";

import { Product } from "../components/Product";
import { useEffect } from "react";
import { useFavoritesContext } from "../firebase models/FavoritesContext";

import "./FavoritesPage.css";
export function FavoritesPage() {
  const {favoriteList, isLoading} = useFavoritesContext();
  const { products } = favoriteList;

  console.log(favoriteList)



  return (
    
    <>
    <div className='container1'>
      <h1 className='title'>Productos Favoritos</h1>
      <div className='products'>
        {isLoading && <p className="loading">Loading...</p>}

        {!isLoading &&
        products?.map((product) => (
          <Product product={product} key={product.name}/>
        ))}
      </div>
      </div>
    </>

  )}