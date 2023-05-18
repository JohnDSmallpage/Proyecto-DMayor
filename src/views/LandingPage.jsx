import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Product } from "../components/Product";
import { useContext } from "react";
import { searchContext } from "../firebase models/SearchContext";

export function LandingPage() {

  // Productos de prueba, en realidad debe hacerse llamado desde la Firestore
  let product = {product_name: "Producto 1", category: "Categoria 1", price: "Precio 1"};
  const textSearched = useContext(searchContext);


  return (
    <>
    {/* Barra de búsqueda */}
        <div className=" mt-12 bg-gray-100 flex justify-center items-center">
          <div className="container mx-auto bg-[#ff7a00] rounded-lg p-10">
            <h1 className="text-center font-bold text-white text-4xl">
              Consigue lo que tu negocio necesita para crecer
            </h1>
            <p className="mx-auto font-normal text-sm my-6 max-w-lg"></p>
            <Searchbar/>
          </div>
        </div>


    {/* Featured products */} 
        <h2 className="text-xl font-bold text-gray-800 text-center mt-3">Productos destacados</h2>
        <section className="flex justify-center mt-4"> 
        
         {/* <Product info={product}/> */}

        </section>

    </>
  );
}
