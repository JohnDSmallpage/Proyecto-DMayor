import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../firebase models/userContext";

export function Product({ info }) {
  const { user } = useUser();
  return (
    <>
    {user?.accepted ?


      <Link to={`/supplierProduct/${info.id}`}>
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
                info.photos[0]
                  ? info.photos[0]
                  : "https://dummyimage.com/420x260"
              }
            />
          </div>

          <div id="info-container" className="flex flex-row justify-between">
            <h2 className="text-gray-900 text-[12px]">
              {info.name.charAt(0).toUpperCase() + info.name.slice(1)}
            </h2>
            <p className="mt-1 text-[#FF7A00]">{"$" + info.price}</p>
          </div>
        </div>
      </Link>
      :
      <Link to={`/product/${info.id}`}>
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
                info.photos[0]
                  ? info.photos[0]
                  : "https://dummyimage.com/420x260"
              }
            />
          </div>

          <div id="info-container" className="flex flex-col justify-between">
            <h2 className="mt-1 text-gray-900 ">
              {info.name.charAt(0).toUpperCase() + info.name.slice(1)}
            </h2>
            <p className="mt-1 text-[#FF7A00] text-xl font-bold">{"$" + info.price}</p>
          </div>
        </div>
      </Link>
      
      }
    </>
  );
}
