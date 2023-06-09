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
import productsimg from "../images/products.png";
import visa from "../images/visa.png";
import masterCard from "../images/mastercard.png";
import paypal from "../images/logo-Paypal.png";
import phone from "../images/phone.png";
import location from "../images/location.png";
import email from "../images/email.png";
import portada from "../images/portada.png";
import construccion from "../images/construccion.png";
import electronicos from "../images/electronicos.png";
import herramientas from "../images/herramientas.png";
import ropa from "../images/ropa.png";
import alimentos from "../images/alimentos.png";
import home from "../images/home.png";
import banner1 from "../images/banner1.png";
import banner2 from "../images/banner2.png";
import banner3 from "../images/banner3.png";
import banner4 from "../images/banner4.png";
import agriculturaIcon from "../images/agriculturaIcon.png";
import tecnologiaIcon from "../images/tecnologiaIcon.png";
import construccionIcon from "../images/construccionIcon.png";
import alimentosIcon from "../images/alimentosIcon.png";
import ganaderiaIcon from "../images/ganaderiaIcon.png";
import quimicosIcon from "../images/quimicosIcon.png";
import saludIcon from "../images/saludIcon.png";
import { useUser } from "../firebase models/userContext";
import { useNavigate } from "react-router-dom";
import { SEARCH_PAGE } from "../routes/Url";

export function LandingPage() {
  // Productos de prueba, en realidad debe hacerse llamado desde la Firestore
  const slides = [banner1, banner2, banner3, banner4];

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const { user, isLoading } = useUser();

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
        className="hidden md:flex justify-center items-center font-bold h-[300px] "
      >
        <Carrousel photos={slides} bool={true} />
      </div>
      <div
        id="message-container"
        className="flex flex-col justify-center items-center shadow-2xl shadow-white bg-gradient-to-b from-orange-400 to-orange-600  p-5 gap-[5px] mb-4"
      >
        <h1 className="w-full  text-lg md:text-3xl font-semibold font-ysabeau text-white tracking-wide leading-tight uppercase text-center border-b-4 border-gray-800 pb-2 ">
          Consigue lo que tu negocio necesita para crecer
        </h1>
      </div>

      <div
        id="ofertas-container"
        className="hidden md:flex  md:flex-row justify-between w-full h-[500px] px-5 gap-5 "
      >
        <div id="izq-cont" className="flex flex-col w-1/4  rounded-sm gap-5">
          <Link
            to={SEARCH_PAGE}
            state={{ value: "Construcción" }}
            className="h-1/5 rounded "
          >
            <img className="h-full w-full rounded" src={construccion} />
          </Link>
          <Link
            to={SEARCH_PAGE}
            state={{ value: "Alimentos" }}
            className="h-3/5 rounded "
          >
            <img className="h-full w-full rounded" src={alimentos} />
          </Link>
          <Link
            to={SEARCH_PAGE}
            state={{ value: "Textiles" }}
            className="h-1/5 rounded "
          >
            <img className="h-full w-full rounded" src={ropa} />
          </Link>
        </div>

        <div
          id="mid-cont"
          className="flex flex-col w-2/4 h-full rounded-sm gap-5"
        >
          <Link to={SEARCH_PAGE} state= {{value:"Sin Categoria"}} className="h-[300px] rounded">
            <img className="h-full w-full rounded " src={portada} />
          </Link>
          <div className="flex flex-row gap-5">
            <Link
              to={SEARCH_PAGE}
              state={{ value: "Tecnología" }}
              className="h-[180px] w-1/2 rounded"
            >
              <img className="h-full w-full rounded " src={electronicos} />
            </Link>
            <Link
              to={SEARCH_PAGE}
              state={{ value: "Mecánica" }}
              className="h-[180px] w-1/2 rounded"
            >
              <img className="h-full w-full rounded " src={herramientas} />
            </Link>
          </div>
        </div>

        <div id="der-cont" className="flex flex-col w-1/4 h-full gap-5">
          <Link
            to={SEARCH_PAGE}
            state={{ value: "Hogar" }}
            className="h-2/5 rounded"
          >
            <img className="h-full w-full rounded " src={home} />
          </Link>
          <Link
            to={SEARCH_PAGE}
            state={{ value: "Salud" }}
            className="h-3/5 rounded"
          >
            <img className="h-full w-full rounded " src={productsimg} />
          </Link>
        </div>
      </div>

      <div id="products-container" className="flex flex-col mx-5 gap-2 py-4">
        <div className="flex flex-row justify-between">
          <h1 className="font-semibold text-sm md:text-2xl lg:mt-6">
            Productos destacados en D'Mayor
          </h1>
        </div>
        <section className="flex flex-row gap-[10px] overflow-x-scroll">
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
          <h2 className="text-sm md:text-2xl">
            Consíguelo todo en nuestros departamentos
          </h2>
          <Link to={SEARCH_PAGE}>
            <button className="flex justify-center items-center bg-white text-[#FF7A00] rounded-[5px] w-[107px] h-[30px] text-[12px]">
              VER MÁS
            </button>
          </Link>
        </div>

        <div
          id="category-buttons"
          className="flex  flex-row justify-start md:justify-around mx-5 mb-5 overflow-x-scroll gap-[5px]"
        >
          <div className="flex flex-col gap-[5px]">
            <Link to={SEARCH_PAGE} state={{ value: "Agricultura" }}>
              <button
                id="Agricultura"
                className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] flex justify-center items-center"
                // onClick={handleCategorySearch("Agricultura")}
              >
                <img className="" src={agriculturaIcon} />
              </button>
            </Link>
            <Link to={SEARCH_PAGE} state={{ value: "Agricultura" }}>
              <button
                className="flex justify-center items-center w-full"
                // onClick={handleCategorySearch("Agricultura")}
              >
                Agricultura
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-[5px]">
            <Link to={SEARCH_PAGE} state={{ value: "Tecnología" }}>
              <button
                id="Tecnología"
                className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] flex justify-center items-center"
              >
                <img className="" src={tecnologiaIcon} />
              </button>
            </Link>
            <Link to={SEARCH_PAGE} state={{ value: "Tecnología" }}>
              <button className="flex justify-center items-center w-full">
                Tecnología
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-[5px]">
            <Link to={SEARCH_PAGE} state={{ value: "Construcción" }}>
              <button
                id="Construcción"
                className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] flex justify-center items-center"
                // onClick={handleCategorySearch("Construcción")}
              >
                <img className="" src={construccionIcon} />
              </button>
            </Link>
            <Link to={SEARCH_PAGE} state={{ value: "Construcción" }}>
              <button
                className="flex justify-center items-center w-full"
                // onClick={handleCategorySearch("Construcción")}
              >
                Construcción
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-[5px]">
            <Link to={SEARCH_PAGE} state={{ value: "Alimentos" }}>
              <button
                id="Alimentos"
                className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] flex justify-center items-center"
              >
                <img className="" src={alimentosIcon} />
              </button>
            </Link>
            <Link to={SEARCH_PAGE} state={{ value: "Alimentos" }}>
              <button className="flex justify-center items-center w-full">
                Alimentos
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-[5px]">
            <Link to={SEARCH_PAGE} state={{ value: "Ganadería" }}>
              <button
                id="Ganadería"
                className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] flex justify-center items-center"
              >
                <img className="" src={ganaderiaIcon} />
              </button>
            </Link>
            <Link to={SEARCH_PAGE} state={{ value: "Ganadería" }}>
              <button className="flex justify-center items-center w-full">
                Ganadería
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-[5px]">
            <Link to={SEARCH_PAGE} state={{ value: "Químicos" }}>
              <button
                id="Químicos"
                className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] flex justify-center items-center"
              >
                <img className="" src={quimicosIcon} />
              </button>
            </Link>
            <Link to={SEARCH_PAGE} state={{ value: "Químicos" }}>
              <button className="flex justify-center items-center w-full">
                Químicos
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-[5px]">
            <Link to={SEARCH_PAGE} state={{ value: "Salud" }}>
              <button
                id="Salud"
                className="bg-gray-100 rounded-[50%] h-[100px] w-[100px] flex justify-center items-center"
              >
                <img className="" src={saludIcon} />
              </button>
            </Link>
            <Link to={SEARCH_PAGE} state={{ value: "Salud" }}>
              <button className="flex justify-center items-center w-full">
                Salud
              </button>
            </Link>
          </div>
        </div>
      </div>
      <footer className="bg-[#f3efef] flex flex-col gap-[20px] p-5">
        <h2 className="text-xl font-bold text-gray-800 text-center mt-3">
          Mantente en contacto
        </h2>
        <div className="flex flex-row justify-evenly">
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
