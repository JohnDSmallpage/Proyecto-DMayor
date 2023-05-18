import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Product } from "../components/Product";

export function LandingPage() {
  // Productos de prueba, en realidad debe hacerse llamado desde la Firestore
  let product = {
    product_name: "Maizoritos® Chocosafari - Caja De 12 Unidades De 240g",
    category: "Categoria 1",
    price: "35$",
  };

  return (
    <div
      id="main-container"
      className="flex flex-col justify-center gap-[13px] py-[17px]"
    >
      <div
        id="search-container"
        className="flex flex-col justify-center items-center  bg-[#ff7a00]  p-5 gap-[5px]"
      >
        <h1
          className="text-center font-bold text-white 
        text-[20px]"
        >
          Consigue lo que tu negocio necesita para crecer
        </h1>
        <Searchbar />
      </div>

      <div id="carrusel-container" className="flex justify-center items-center">
        Carrusel
      </div>

      <div
        id="products-container"
        className="flex flex-col justify-center items-center w-[350px] mx-[15px] gap-[13px]"
      >
        <h2 className="text-[20px] font-bold text-gray-800 text-center mt-3">
          Productos destacados
        </h2>
        <section className="flex flex-row justify-between  gap-[10px] ">
          <Product info={product} />
          <Product info={product} />
        </section>
        <button className="flex justify-center items-center font-bold text-white bg-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px]">
          VER MÁS
        </button>
      </div>

      <div id="categories-container" className="flex flex-col justify-center items-center bg-[#FF7A00] gap-[13px] font-bold text-white">
        <h2 className="text-[20px] text-center mt-3">
          Categorias
        </h2>
        <div id="category-buttons" className="flex flex-row gap-[20px]">
          <div className="flex flex-col gap-[5px]">
            <button id="vehicles" className="bg-[#595959] rounded-[50%] h-[55px] w-[55px]">a</button>
            <p className="flex justify-center items-center text-[12px]">Carros</p>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button id="home" className="bg-[#595959] rounded-[50%] h-[55px] w-[55px]">a</button>
            <p className="flex justify-center items-center text-[12px]">Hogar</p>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button id="phones" className="bg-[#595959] rounded-[50%] h-[55px] w-[55px]">a</button>
            <p className="flex justify-center items-center text-[12px]">Telefonos</p>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button id="computers" className="bg-[#595959] rounded-[50%] h-[55px] w-[55px]">a</button>
            <p className="flex justify-center items-center text-[12px]">Comida</p>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button id="fashion" className="bg-[#595959] rounded-[50%] h-[55px] w-[55px]">a</button>
            <p className="flex justify-center items-center text-[12px]">Moda</p>
          </div>
        </div>
        <button className="flex justify-center items-center bg-white text-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px] mb-[10px]">
          VER MÁS
        </button>
      </div>
    </div>
  );
}
