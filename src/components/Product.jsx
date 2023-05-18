import React from "react";

export function Product({ info }) {
  return (
    <div
      id="main-container"
      className="flex flex-col bg-[#F3F5F6] rounded-[10px] p-4 w-[174px] h-[134px]"
    >
      <div id="img-container" className="flex justify-center items-center rounded-[5px] h-[90px]">
        <img className=" w-full h-full" src="" />
      </div>

      <div id="info-container" className="flex flex-row justify-between">
        <h2 class="text-gray-900 text-[8px]">{info.product_name}</h2>
        <p class="mt-1 text-[#FF7A00]">{info.price}</p>
      </div>
    </div>
  );
}
