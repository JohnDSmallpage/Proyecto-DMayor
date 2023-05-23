import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Product } from "../components/Product";
import { useContext } from "react";
import { searchContext } from "../firebase models/SearchContext";
import Carrousel from "../components/Carrousel";
import { Link } from "react-router-dom";
import { ADD_PRODUCT } from "../routes/Url";
import { useEffect } from "react";
import { getAllProducts } from "../firebase models/user-service";
import { useState } from "react";
import productsimg from "../images/products.jpg"



export function LandingPage() {
  // Productos de prueba, en realidad debe hacerse llamado desde la Firestore

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);

  };

  useEffect(() => {
    getProducts();
    textSearched.setSupplierMode(false);
  }, []);
  
  let product = {
    name: "Maizoritos® Chocosafari - Caja De 12 Unidades De 240g",
    price: "35$",
    photos: [ "https://dummyimage.com/420x260" ],
  };
  const textSearched = useContext(searchContext);

  return (
    <div
      id="main-container"
      className="flex flex-col justify-center"
    >
      <div
        id="search-container"
        className="flex flex-col justify-center items-center  bg-[#ff7a00]  p-5 gap-[5px]"
      >
        <h1
          className="w-full text-3xl font-bold text-white tracking-wide leading-tight uppercase text-center border-b-4 border-gray-800 pb-4"
        >
          Consigue lo que tu negocio necesita para crecer
        </h1>
        <Searchbar />
      </div>

      <div
        id="carrusel-container"
        className="flex justify-center items-center font-bold "
      >
        <Carrousel />
      </div>

      <div
        id="products-container"
        className="flex flex-col justify-center items-center mx-[15px] gap-[13px] p-4"
      >
        <h2 className="text-[20px] font-bold text-gray-800 text-center mt-3">
          Productos destacados
        </h2>
        <div className="flex flex-row ">
          <div className="w-1/2 flex justify-center items-center">
        <img className="h-full rounded-3xl blur-[2px] " src={productsimg} alt="" />
        <p className="absolute text-2xl text-white font-bold ">Descubre nuevos productos</p>
        </div>
        <section className="flex flex-row flex-wrap justify-around  w-1/2 gap-[5px] p-5 ">
          

          {/* Poner que se muestren maximo 6 productos */}
          {products == null ? (
          <div>No hay resultados para su búsqueda</div>
        ) : (
          products?.map((product, idx) => (
            <>
              <Product info={product} key={idx} />
            </>
          ))
        )}
        

          
        </section>
        </div>
        <button className="flex justify-center items-center font-bold text-white bg-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px]">
          VER MÁS
        </button>
      </div>

      <div
        id="categories-container"
        className="flex flex-col justify-center items-center bg-[#FF7A00] gap-[13px] font-bold text-white"
      >
        <h2 className="text-[20px] text-center mt-3">Categorias</h2>
        <div
          id="category-buttons"
          className="flex justify-center items-center flex-row gap-[20px] lg:gap-[30px]"
        >
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
            <button className="flex justify-center items-center text-[12px]">
              Moda
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="beauty"
              className="bg-gray-100 rounded-[50%] h-[55px] lg:h-[75px] w-[55px] lg:w-[75px] hidden sm:block"
            >
              a
            </button>
            <button className="flex justify-center items-center text-[12px] hidden sm:block">
              Belleza
            </button>
          </div>
        </div>
        <button className="flex justify-center items-center bg-white text-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px] mb-[10px]">
          VER MÁS
        </button>
      </div>
      <footer className="bg-[#f3efef] flex flex-col gap-[20px] p-5">
      <h2 className="text-xl font-bold text-gray-800 text-center mt-3">Get in touch</h2>
            <div className="flex flex-row justify-around">
              <div className="flex flex-col justify-around">
                <p className="text-xl font-bold">Quick Links</p>
              <ol className="flex flex-col justify-around gap-[10px]">
                <li>Privacy Policy</li>
                <li>Return Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ol>
            </div>
            <div>
              <p className="text-xl font-bold">Contact Us</p>
            <ol className="flex flex-col justify-around gap-[10px]">
                <li>1060, Miranda
                Distribuidor metropolitano
                Caracas</li>
                <li>0212-2403260</li>
                <li>Support@d.mayor.com</li>
              </ol>
            </div>
            <div>
              <p className="text-xl font-bold">We Accept</p>
            </div>
            </div>
        </footer>

        
    </div>



        
    
  );
}
