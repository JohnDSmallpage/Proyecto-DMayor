import React from "react";
import { Link } from "react-router-dom";

export function Product({ info }) {
  return (
    <> 
    <Link to={`/product/${info.id}`}>
    <div
      id="main-container"
      className="flex flex-col bg-[#F3F5F6] rounded-[10px] p-4 w-[174px] h-[134px]"
    >
      <div
        id="img-container"
        className="flex justify-center items-center rounded-[5px] h-[90px]"
      >
        <img className=" w-full h-full" src="https://dummyimage.com/420x260" />
      </div>

      <div id="info-container" className="flex flex-row justify-between">
        <h2 className="text-gray-900 text-[8px]">
          {info.name.charAt(0).toUpperCase() + info.name.slice(1)}
        </h2>
        <p className="mt-1 text-[#FF7A00]">{"$" + info.price}</p>
      </div>
    </div>
    </Link>
    </>
  );
}
