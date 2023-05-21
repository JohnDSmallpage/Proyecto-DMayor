import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Product } from "../components/Product";
import { useContext, useState } from "react";
import { searchContext } from "../firebase models/SearchContext";
import { getProductsByName } from "../firebase models/user-service";

export function SearchPage() {
  let product = {
    product_name: "Producto 1",
    category: "Categoria 1",
    price: "Precio 1",
  };

  const productSearched = useContext(searchContext);

  return (
    <>
      <div className=" mt-4 container mx-auto bg-[#ff7a00] rounded-lg p-10">
        <Searchbar />
      </div>

      <p className="mt-4 text-center">Resultados encontrados</p>

      <div className="flex flex-wrap">
        {productSearched.products == null ? (
          <div>No hay resultados para su búsqueda</div>
        ) : (
          productSearched.products?.map((product, idx) => (
            <>
              <Product info={product} key={idx} />
            </>
          ))
        )}
      </div>
    </>
  );
}
