import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Product } from "../components/Product";

export function SearchPage() {
  let product = {product_name: "Producto 1", category: "Categoria 1", price: "Precio 1"};

  return (
    <>
      <div className=" mt-4 container mx-auto bg-[#ff7a00] rounded-lg p-10">
        <Searchbar />
      </div>


      <div className="flex flex-wrap">

      <Product info={product}/>
      <Product info={product}/>

      </div>
    </>
  );
}
