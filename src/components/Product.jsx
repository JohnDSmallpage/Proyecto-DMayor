import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../firebase models/userContext";
import { useFavoritesContext } from "../firebase models/FavoritesContext";

export function Product({ info }) {
  const { user } = useUser();

  const { favoriteList, handleFavoriteButton } = useFavoritesContext();
  const isFavorite = favoriteList?.listOfIds?.includes(info.id);

  return (
    <>
      {user?.accepted ? (
        <Link to={`/supplierProduct/${info.id}`}>
          <div
            id="main-container"
            className="flex flex-col bg-[#F3F5F6] rounded p-4 w-[240px] h-[300px]"
          >
            <div
              id="img-container"
              className="flex justify-center items-center rounded-[5px] h-[160px]"
            >
              <img
                className=" w-[208px] h-[150px]"
                src={
                  info.photos[0]
                    ? info.photos[0]
                    : "https://dummyimage.com/420x260"
                }
              />
            </div>

            <div
              id="info-container"
              className="flex flex-col justify-between ml-1 mt-2"
            >
              <p className=" text-[#FF7A00] text-2xl font-bold w-[208px] h-[28px]">
                {"$" + info.price}
              </p>
              <h2 className="text-xl text-gray-900 w-[208px] h-[28px] hover:text-[#FF7A00]">
                {info.name.charAt(0).toUpperCase() + info.name.slice(1)}
              </h2>
              <p className="w-full h-[50px] text-sm text-gray-700 overflow-auto mt-2">
                {info.description.charAt(0).toUpperCase() +
                  info.description.slice(1)}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={`/product/${info.id}`}>
          <div
            id="main-container"
            className="flex flex-col bg-[#F3F5F6] rounded p-4 w-[240px] h-[300px]"
          >
            <div
              id="img-container"
              className="flex justify-center items-center rounded-[5px] h-[160px]"
            >
              <img
                className=" w-full h-full"
                src={
                  info.photos[0]
                    ? info.photos[0]
                    : "https://dummyimage.com/420x260"
                }
              />
            </div>

            <div
              id="info-container"
              className="flex flex-col justify-between ml-1 mt-2"
            >
              <p className=" text-[#FF7A00] text-2xl font-bold w-[208px] h-[28px]">
                {"$" + info.price}
              </p>
              <h2 className="text-xl text-gray-900 w-[208px] h-[28px] hover:text-[#FF7A00]">
                {info.name.charAt(0).toUpperCase() + info.name.slice(1)}
              </h2>
              <p className="w-full h-[50px] text-sm text-gray-700 overflow-ellipsis mt-2">
                {info.description.charAt(0).toUpperCase() +
                  info.description.slice(1)}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/*<button 
          className={` flex justify-center items-center  text-white bg-[#FF7A00] rounded-[3px] w-[300px] h-[20px] text-[22px] ${isFavorite ? 'bg-gray-900' : ''}`}
          type="button"
          onClick={() => handleFavoriteButton({ productId: info.id, isFavorite })}
          >
          {isFavorite ? "-" : "+"}
    </button>*/}
    </>
  );
}
