import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Product } from "../components/Product";
import { useContext } from "react";
import { searchContext } from "../firebase models/SearchContext";
import Carrousel from "../components/Carrousel";
import { Link, Navigate } from "react-router-dom";
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

import portada from "../images/portada.jpg";
import camioncito from "../images/camioncito.jpg";
import ejercicio from "../images/ejercicio.jpg";
import electronicos from "../images/electronicos.jpg";
import herramientas from "../images/herramientas.jpg";
import maquillaje from "../images/maquillaje.jpg";
import ropa from "../images/ropa.jpg";
import home from "../images/home.jpg";
import { useNavigate } from "react-router-dom";
import { SEARCH_PAGE } from "../routes/Url";

export function LandingPage() {
  // Productos de prueba, en realidad debe hacerse llamado desde la Firestore
  const slides = [
    {
      url: "https://img.freepik.com/foto-gratis/concepto-compras-carrito-compras-minimo-sobre-fondo-naranja-representacion-3d_56104-1396.jpg?w=900&t=st=1686440473~exp=1686441073~hmac=f608b53fabe280824e25f953f423c0c66c7e0313587c1de8cb6dde11818f837d",
    },
    {
      url: "https://wallpapercave.com/wp/wp7530211.jpg",
    },
    {
      url: "https://wallpapercave.com/wp/wp6836093.jpg",
    },
    {
      url: "https://img.freepik.com/fotos-premium/imagen-fondo-hay-escenario-exhibir-productos-proteccion-solar-tonos-azules-naranjas_544235-336.jpg?w=826",
    },
    {
      url: "https://img.freepik.com/fotos-premium/cinta-jugo-naranja-industria-alimentaria-productos-listos-envasado-automatico-concepto-produccion-alimentos-automatizada-ia-generativa_73944-32925.jpg?w=826",
    },
  ];

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const handleCategorySearch = (value) => {
    textSearched.setCategoryLanding(value);
  };


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
    <div id="main-container" className="flex flex-col justify-center">
      <div
        id="carrusel-container"
        className="flex justify-center items-center font-bold h-[300px] "
      >
        <Carrousel photos={slides} bool={true} />
        {/* <Carrousel photos={slides} bool={true} />  */}
      </div>
      <div
        id="message-container"
        className="flex flex-col justify-center items-center shadow-2xl shadow-white bg-gradient-to-b from-orange-400 to-orange-600  p-5 gap-[5px] mb-4"
      >
        <h1 className="w-full text-3xl font-semibold font-ysabeau text-white tracking-wide leading-tight uppercase text-center border-b-4 border-gray-800 pb-2 ">
          Consigue lo que tu negocio necesita para crecer
        </h1>
      </div>

      <div
        id="ofertas-container"
        className="flex flex-row justify-between w-full h-[500px] px-5 gap-5 "
      >
        <div id="izq-cont" className="flex flex-col w-1/4  rounded-sm gap-5">
          <Link className="h-1/5 rounded ">
            <img className="h-full w-full rounded" src={ejercicio} />
          </Link>
          <Link className="h-3/5 rounded ">
            <img className="h-full w-full rounded" src={ropa} />
          </Link>
          <Link className="h-1/5 rounded ">
            <img className="h-full w-full rounded" src={maquillaje} />
          </Link>
        </div>

        <div
          id="mid-cont"
          className="flex flex-col w-2/4 h-full rounded-sm gap-5"
        >
          <Link className="h-[300px] rounded">
            <img className="h-full w-full rounded " src={portada} />
          </Link>
          <div className="flex flex-row gap-5">
            <Link className="h-[180px] w-1/2 rounded">
              <img className="h-full w-full rounded " src={electronicos} />
            </Link>
            <Link className="h-[180px] w-1/2 rounded">
              <img className="h-full w-full rounded " src={herramientas} />
            </Link>
          </div>
        </div>

        <div id="der-cont" className="flex flex-col w-1/4 h-full gap-5">
          <Link className="h-2/5 rounded">
            <img className="h-full w-full rounded " src={home} />
          </Link>
          <Link className="h-3/5 rounded">
            <img className="h-full w-full rounded " src={productsimg} />
          </Link>
        </div>
      </div>

      <div id="products-container" className="flex flex-col mx-5 gap-2 py-4">
        <div className="flex flex-row justify-between">
          <h1 className="font-semibold text-lg">
            Productos destacados en D'Mayor
          </h1>
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
        className="flex flex-col bg-gradient-to-b from-orange-500 to-orange-600 gap-4 font-bold text-white"
      >
        <div className="flex flex-row justify-between mx-5 mt-5">
          <h2 className="text-[20px] text-center">
            Consiguelo todo en nuestros departamentos
          </h2>
          <Link to={SEARCH_PAGE}>
          <button className="flex justify-center items-center bg-white text-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px]">
            VER MÁS
          </button>
          </Link>
        </div>

        <div
          id="category-buttons"
          className="flex  flex-row justify-between mx-5 mb-5"
        >
          <div className="flex flex-col gap-[5px]">
            <Link to={SEARCH_PAGE}>
            <button
              id="Agricultura"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
              onClick={handleCategorySearch("Agricultura")}
              
            >
              FOTO
            </button>
            <button className="flex justify-center items-center " onClick={handleCategorySearch("Agricultura")}>
              Agricultura
            </button>
            </Link>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="Tecnología"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center ">Tecnología</button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="Construcción"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center ">
              Construcción
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="Alimentos"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center ">
              Alimentos
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="Electrodomésticos"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px]"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center ">Electrodoméstico</button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="Ganadería"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] hidden sm:block"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center hidden sm:block">
              Ganadería
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="Químicos"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] hidden sm:block"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center  hidden sm:block">
              Químicos
            </button>
          </div>
          <div className="flex flex-col gap-[5px]">
            <button
              id="Salud"
              className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] hidden sm:block"
            >
              FOTO
            </button>
            <button className="flex justify-center items-center hidden sm:block">
              Salud
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
