import React, { useContext, useEffect, useState } from "react";
import { useUser } from "../firebase models/userContext";
import dmayor from "../images/dmayor.png"
import phone from "../images/phone.png"
import location from "../images/location.png"
import email from "../images/email.png"
import Carrousel from "../components/Carrousel";
import { getProductsBySupplier } from "../firebase models/user-service";
import { searchContext } from "../firebase models/SearchContext";
import { Product } from "../components/Product";
import { Link } from "react-router-dom";
import { CATALOG } from "../routes/Url";

export function SupplierInfo() {
  const { user, isLoading } = useUser();
  const slides = [
    {
        url: 'https://wallpapercave.com/wp/wp7832396.jpg'
    },
    {
        url: 'https://wallpapercave.com/wp/wp7530211.jpg'
    },
    {
        url: 'https://wallpapercave.com/wp/wp6836093.jpg'
    },
    {
        url: 'https://wallpapercave.com/wp/wp7110711.jpg'
    },
    {
        url: 'https://wallpapercave.com/wp/wp3079202.jpg'
    },

];
const [products, setProducts] = useState([]);

  const productSearched = useContext(searchContext);


  const getSupplierProducts = async () => {
    const idProducts = user.catalog
    const data = await getProductsBySupplier(idProducts)
    setProducts(data)

  }

  useEffect (() => {
    getSupplierProducts();
    productSearched.setSupplierMode(true);
  }, [products])

  return (
    <div
      id="main-container"
      className="flex flex-col  bg-gray-100 "
    >
      <header className="h-[200px] w-full flex items-center justify-center p-3 pb-0 bg-white shadow-xl">
        <img src={dmayor} alt="" 
        className="h-full w-1/3 "/>
        <div className="w-2/3 p-2">
          <h1 className="text-2xl font-bold text-gray-800 font-serif">{user.Company}</h1>
          <p className="mb-4 text-xs text-gray-500 ">Desde {user.CreationDate}</p>
            <ol className="flex flex-col justify-around gap-[8px]">
                <li className="flex items-center font-serif gap-2"><img className="w-[25px]" src={location} alt="" /> 
                {user.Address}
                </li>
                <li className="flex items-center font-serif gap-2"><img className="w-[25px]" src={phone} alt="" /> 
                {user.phone}
                </li>
                <li className="flex items-center font-serif gap-2"><img className="w-[25px]" src={email} alt="" />
                 {user.email}
                 </li>
              </ol>

        </div>
      </header>
      <article className=" flex gap-3 p-3 h-[400px] w-full0">
        <div className="bg-white h-full w-1/2 p-2 shadow-xl">
            <h1 className="text-2xl text-center text-gray-800 font-serif">Acerca de nosotros</h1>
            <p>{user.Description}</p>
        </div>
        <div className="bg-white h-full w-1/2 relative shadow-xl">
        <Carrousel photos={slides} />
        </div>
      </article>
      <section className="flex flex-col items-center justify-center p-3">
        <div className="flex flex-col w-full gap-4 items-center justify-center p-3 pb-0 bg-white shadow-xl">
          <h1 className="text-2xl text-center text-gray-800 font-serif">Nuestros productos</h1>
          <div className='flex flex-wrap'>

        {products == null ? (
          <div>No hay resultados para su búsqueda</div>
        ) : (
          products?.map((product, idx) => (
            <>
              <Product info={product} key={idx} />
            </>
          ))
        )}
        </div>
        <Link to={CATALOG} className="text-orange-600 text-center font-bold">Ver catalogo Completo{">"}</Link>
        </div>
      </section>

      {/* <div
        id="internal-container"
        className="flex flex-col w-screen mx-[14px]  md:mx-[150px] gap-[10px]"
      >
        <h1 id="title" className="text-xl font-semibold ml-[20px]">
          Datos de la cuenta
        </h1>

        <div
          id="info-container"
          className="flex flex-col py-[25px] bg-[#F3F5F6] rounded-[17px] border-2 gap-[15px]"
        >
          <div id="fotoPerfil" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Foto de perfil</h1>
            <img className="md:absolute md:ml-[300px]"></img>
          </div>
          <hr></hr>
          <div id="nombre" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">
              Nombre del proveedor
            </h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.Company}
            </p>
          </div>
          <hr></hr>
          <div id="correo" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Correo electronico</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.email}
            </p>
          </div>
          <hr></hr>
          <div id="telefono" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Telefono</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.phone}
            </p>
          </div>
          <hr></hr>
          <div id="direccion" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Direccion</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.Address}
            </p>
          </div>
          <hr></hr>
          <div id="descripcion" className="flex flex-col md:flex-row ml-[20px]">
            <h1 className="text-[#303030] font-semibold">Descripcion</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.Description}
            </p>
          </div>
          <hr></hr>
          <div
            id="fechaCreacion"
            className="flex flex-col md:flex-row ml-[20px]"
          >
            <h1 className="text-[#303030] font-semibold">Fecha de creacion</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.CreationDate}
            </p>
          </div>
          <hr></hr>
          <div
            id="representacionLegal"
            className="flex flex-col md:flex-row ml-[20px] "
          >
            <h1 className="text-[#303030] font-semibold">
              Representacion Legal
            </h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.LegalRepresentative}
            </p>
          </div>
          <hr></hr>
          <div id="rif" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Rif</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.Rif}
            </p>
          </div>
          <hr></hr>
          <div id="campo" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Campo Laboral</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.WorkField}
            </p>
          </div>
        </div>
        <div id="edit-button" className="flex justify-center">
          <button className="bg-[#FF914D] rounded mb-[10px] h-[50px] w-[250px] md:w-[200px] text-white text-[20px] hover:underline font-semibold">
            Editar datos
          </button>
        </div>
      </div> */}
    </div>
  );
}
