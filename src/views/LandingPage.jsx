import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Product } from "../components/Product";

export function LandingPage() {
  // Productos de prueba, en realidad debe hacerse llamado desde la Firestore
  let product = {
    product_name: "Producto 1",
    category: "Categoria 1",
    price: "Precio 1",
  };

  return (
    <div
      id="main-container"
      className="flex flex-col justify-center items-center gap-[13px] py-[17px]"
    >
      <div
        id="search-container"
        className="flex flex-col justify-center items-center h-[123px] w-[350px] mx-[15px] bg-[#ff7a00] rounded-lg p-5 gap-[5px]"
      >
        <h1 className="text-center font-bold text-white 
        text-[20px]">
          Consigue lo que tu negocio necesita para crecer
        </h1>
        <Searchbar />
      </div>

      <div id="carrusel-container" className="">Carrusel</div>

      <div id="products-container" className="flex flex-col justify-center items-center w-[350px] mx-[15px] gap-[13px]">
        <h2 className="text-[20px] font-bold text-gray-800 text-center mt-3">
          Productos destacados
        </h2>
        <section className="flex flex-row justify-between  gap-[10px] ">
          <Product info={product} />
          <Product info={product} />
      
        </section>
        <button className="flex justify-center items-center font-bold bg-[#FF7A00] rounded-[5px] w-[107px] h-[45px]">VER MÁS</button>
      </div>
      
      <div id="categories-container">Categorias</div>
    </div>
  );
}
