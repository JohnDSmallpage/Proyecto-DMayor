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
import productsimg from "../images/products.jpg";
import visa from "../images/visa.png";
import masterCard from "../images/mastercard.png";
import paypal from "../images/logo-Paypal.png";
import phone from "../images/phone.png";
import location from "../images/location.png";
import email from "../images/email.png";

export function LandingPage() {
  // Productos de prueba, en realidad debe hacerse llamado desde la Firestore
  const slides = [
    {
      url: "https://wallpapercave.com/wp/wp7832396.jpg",
    },
    {
      url: "https://wallpapercave.com/wp/wp7530211.jpg",
    },
    {
      url: "https://wallpapercave.com/wp/wp6836093.jpg",
    },
    {
      url: "https://wallpapercave.com/wp/wp7110711.jpg",
    },
    {
      url: "https://wallpapercave.com/wp/wp3079202.jpg",
    },
  ];

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
    photos: ["https://dummyimage.com/420x260"],
  };
  const textSearched = useContext(searchContext);

  return (
    <div id="main-container" className="flex flex-col justify-center gap-4">
      <div
        id="message-container"
        className="flex flex-col justify-center items-center shadow-2xl shadow-white bg-gradient-to-b from-orange-400 to-orange-600  p-5 gap-[5px]"
      >
        <h1 className="w-full text-3xl font-bold text-white tracking-wide leading-tight uppercase text-center border-b-4 border-gray-800 pb-2">
          Consigue lo que tu negocio necesita para crecer
        </h1>
      </div>

      <div id="carrusel-container" className="flex  font-bold ">
        carrusel
        {/* <Carrousel photos={slides} bool={true} />  */}
      </div>

      <div
        id="ofertas-container"
        className="flex flex-row justify-between w-full h-[500px] px-5 gap-5"
      >
        <div id="izq-cont" className="flex flex-col w-1/4  rounded-sm gap-5">
          <Link className="h-1/5 rounded ">
            <img className="h-full w-full rounded" src={productsimg} />
          </Link>
          <Link className="h-3/5 rounded ">
            <img className="h-full w-full rounded" src={productsimg} />
          </Link>
          <Link className="h-1/5 rounded ">
            <img className="h-full w-full rounded" src={productsimg} />
          </Link>
        </div>

        <div
          id="mid-cont"
          className="flex flex-col w-2/4 h-full rounded-sm gap-5"
        >
          <Link className="h-[300px] rounded">
            <img className="h-full w-full rounded " src={productsimg}/>
          </Link>
          <div className="flex flex-row gap-5">
            <Link className="h-[180px] w-1/2 rounded">
              <img className="h-full w-full rounded " src={productsimg} />
            </Link>
            <Link className="h-[180px] w-1/2 rounded">
              <img className="h-full w-full rounded " src={productsimg} />
            </Link>
          </div>
        </div>

        <div id="der-cont" className="flex flex-col w-1/4 h-full gap-5">
          <Link className="h-2/5 rounded">
            <img className="h-full w-full rounded " src={productsimg} />
          </Link>
          <Link className="h-3/5 rounded">
            <img className="h-full w-full rounded " src={productsimg} />
          </Link>
        </div>
      </div>

      <div id="products-container" className="flex flex-col mx-5 gap-2">
        <div className="flex flex-row justify-between">
          <h1 className="font-semibold text-lg">Productos destacados en D'Mayor</h1>
          <button className="flex justify-center items-center font-bold text-white bg-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px]">
            VER MÁS
          </button>
        </div>
        <section className="flex flex-row w-1/2 gap-[10px] ">
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

      <div
        id="departments-container"
        className="flex flex-col bg-gradient-to-b from-orange-500 to-orange-600 gap-4 font-bold text-white "
      >
        <div className="flex flex-row justify-between mx-5 mt-5">
        <h2 className="text-[20px] text-center">Consiguelo todo en nuestros departamentos</h2>
        <button className="flex justify-center items-center bg-white text-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px]">
          VER MÁS
        </button>
        </div>
        
        <div
          id="category-buttons"
          className="flex  flex-row justify-between mx-5 mb-5"
        >
          <div className="flex flex-col gap-[5px]">
            <button
              id="vehicles"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center ">
              Carros
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="home"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center ">
              Hogar
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="phones"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center ">
              Telefonos
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="computers"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center ">
              Comida
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="fashion"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center ">
              Moda
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="beauty"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] hidden sm:block"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center hidden sm:block">
              Belleza
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="beauty"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] hidden sm:block"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center  hidden sm:block">
              Belleza
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="beauty"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] hidden sm:block"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center hidden sm:block">
              Belleza
            </button>
          </div>
        </div>
        
      </div>
      <footer className="bg-[#f3efef] flex flex-col gap-[20px] p-5">
        <h2 className="text-xl font-bold text-gray-800 text-center mt-3">
          Mantente en contacto
        </h2>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col justify-around h-full">
            <p className="text-xl font-bold">Accesos rapidos</p>
            <ol className="flex flex-col justify-around gap-[10px]">
              <li>Politicas de Privacidad</li>
              <li>Politicas de Retorno</li>
              <li>Terminos y Servicios</li>
              <li>Contacto</li>
            </ol>
          </div>
          <div className="h-full">
            <p className="text-xl font-bold">Contactanos</p>
            <ol className="flex flex-col justify-around gap-[10px]">
              <li className="flex items-center">
                <img className="w-[30px]" src={location} alt="" /> 1060, Miranda
                Distribuidor metropolitano Caracas
              </li>
              <li className="flex items-center">
                <img className="w-[30px]" src={phone} alt="" /> 0212-2403260
              </li>
              <li className="flex items-center">
                <img className="w-[30px]" src={email} alt="" />{" "}
                Support@d.mayor.com
              </li>
            </ol>
          </div>
          <div className="h-full">
            <p className="text-xl font-bold">Aceptamos</p>
            <img className="w-[70px]" src={visa} alt="" />
            <img className="w-[70px]" src={masterCard} alt="" />
            <img className="w-[70px]" src={paypal} alt="" />
          </div>
        </div>
      </footer>
    </div>
  );
}
