import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../firebase models/userContext";
import { useFavoritesContext } from "../firebase models/FavoritesContext";
//import styles from "./index.module.css"

export function Card({ product }) {
  const { user } = useUser();

  const { favoriteList, handleFavoriteButton} = useFavoritesContext();
  const isFavorite = favoriteList?.listOfIds?.includes(product.id)

  return (
    <>
    {user?.accepted ?


      <Link to={`/supplierProduct/${product.id}`}>
        <div
          id="main-container"
          className="flex flex-col bg-[#F3F5F6] rounded-[10px] w-[174px] h-[134px]"
        >
          <div
            id="img-container"
            className="flex justify-center items-center rounded-[5px] h-[90px]"
          >
            <img
              className=" w-full h-full"
              src={
                product.photos[0]
                  ? product.photos[0]
                  : "https://dummyimage.com/420x260"
              }
            />
          </div>

          <div id="info-container" className="flex flex-row justify-between">
            <h2 className="text-gray-900 text-[12px]">
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h2>
            <p className="mt-1 text-[#FF7A00]">{"$" + product.price}</p>
          </div>
        </div>
      </Link>
      :
      <Link to={`/product/${product.id}`}>
        <div
          id="main-container"
          className="flex flex-col bg-[#F3F5F6] rounded p-4 w-[200px] h-[250px]"
        >
          <div
            id="img-container"
            className="flex justify-center items-center rounded-[5px] h-[160px]"
          >
            <img
              className=" w-full h-full"
              src={
                product.photos[0]
                  ? product.photos[0]
                  : "https://dummyimage.com/420x260"
              }
            />
          </div>

          <div id="info-container" className="flex flex-col justify-between">
            <h2 className="mt-1 text-gray-900 ">
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h2>
            <p className="mt-1 text-[#FF7A00] text-xl font-bold">{"$" + product.price}</p>
          </div>

          <div>
                <button
                onClick={handleClick}
                className="flex ml-auto text-white bg-[#ff7a00] border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded "
                disabled={disableButton}
                >
                Comprar
                </button>
            </div>
        </div>
      </Link>
            
      
      }
    </>
  );
}