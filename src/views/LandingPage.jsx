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

      <div id="carrusel-container" className="flex justify-center items-center font-bold">
        (Carrusel fotos)
      </div>

      <div
        id="products-container"
        className="flex flex-col justify-center items-center mx-[15px] gap-[13px]"
      >
        <h2 className="text-[20px] font-bold text-gray-800 text-center mt-3">
          Productos destacados
        </h2>
        <section className="flex flex-row flex-wrap justify-between  gap-[10px] ">
          {/* Poner que se muestren maximo 6 productos */}
          <Product info={product} />
          <Product info={product} />
          <Product info={product} />
          <Product info={product} />
          <Product info={product} />
          <Product info={product} />
          
          
          
        </section>
        <button className="flex justify-center items-center font-bold text-white bg-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px]">
          VER MÁS
        </button>
      </div>

      <div
        id="categories-container"
        className="flex flex-col justify-center items-center bg-[#FF7A00] gap-[13px] font-bold text-white"
      >
        <h2 className="text-[20px] text-center mt-3">Categorias</h2>
        <div id="category-buttons" className="flex flex-row gap-[20px] lg:gap-[30px]">
          <div className="flex flex-col gap-[5px]">
            <button
              id="vehicles"
              className="bg-gray-100 rounded-[50%] h-[55px] lg:h-[75px] w-[55px] lg:w-[75px]"
            >
              a
            </button>
            <button className="flex justify-center items-center text-[12px]">
              Carros
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="home"
              className="bg-gray-100 rounded-[50%] h-[55px] lg:h-[75px] w-[55px] lg:w-[75px]"
            >
              a
            </button>
            <button className="flex justify-center items-center text-[12px]">
              Hogar
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="phones"
              className="bg-gray-100 rounded-[50%] h-[55px] lg:h-[75px] w-[55px] lg:w-[75px]"
            >
              a
            </button>
            <button className="flex justify-center items-center text-[12px]">
              Telefonos
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="computers"
              className="bg-gray-100 rounded-[50%] h-[55px] lg:h-[75px] w-[55px] lg:w-[75px]"
            >
              a
            </button>
            <button className="flex justify-center items-center text-[12px]">
              Comida
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="fashion"
              className="bg-gray-100 rounded-[50%] h-[55px] lg:h-[75px] w-[55px] lg:w-[75px]"
            >
              a
            </button>
            <button className="flex justify-center items-center text-[12px]">Moda</button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="beauty"
              className="bg-gray-100 rounded-[50%] h-[55px] lg:h-[75px] w-[55px] lg:w-[75px]"
            >
              a
            </button>
            <button className="flex justify-center items-center text-[12px]">Belleza</button>
          </div>
        </div>
        <button className="flex justify-center items-center bg-white text-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px] mb-[10px]">
          VER MÁS
        </button>
      </div>
    </div>
  );
}
