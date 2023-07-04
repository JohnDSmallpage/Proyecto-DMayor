import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Product } from "../components/Product";
import { useContext, useState } from "react";
import { searchContext } from "../firebase models/SearchContext";
import {
  getAllProducts,
  getProductsByCategory,
} from "../firebase models/user-service";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function SearchPage() {
  const location = useLocation();
  const productSearched = useContext(searchContext);
  const [categorySelected, setCategorySelected] = useState("");

  const handleSelectChange = async (event) => {
    if (event == "Sin Categoria") {
      setCategorySelected("Sin Categoria");
      getProducts();
    } else {
      setCategorySelected(event);
      const data = await getProductsByCategory(event);

      productSearched.setProducts(data);
    }
  };
  const getProducts = async () => {
    const data = await getAllProducts();
    productSearched.setProducts(data);
  };

  useEffect(() => {
    const { value } = location?.state ?? "Sin Categoria";
    if (value) {
      handleSelectChange(value);
    } else {
      handleSelectChange("Sin Categoria");
    }
  }, []);

  return (
    <div
      id="main-container"
      className="flex flex-col justify-center items-center"
    >
      <div
        id="top-container"
        className="flex flex-row justify-around items-center bg-[#ff7a00] w-full h-[100px]"
      >
        <div id="search-bar">
          <Searchbar />
        </div>

        <div
          id="department-selection"
          className=" mr-[100px] mt-2 text-white text-xl"
        >
          Departamentos
          <select
            id="category"
            type="text"
            name="category"
            value={categorySelected}
            className=" ml-2 py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black"
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            <option value="Sin Categoria">Sin Categoria</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Textiles">Textiles</option>
            <option value="Construcción">Construcción</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Electrodomésticos">Electrodomésticos</option>
            <option value="Ganadería">Ganadería</option>
            <option value="Agricultura">Agricultura</option>
            <option value="Químicos">Químicos</option>
            <option value="Salud">Salud</option>
            <option value="Mecánica">Mecánica</option>
            <option value="Hogar">Hogar</option>
          </select>
        </div>
      </div>

      <div id="bottom-container" className="flex flex-row w-full h-full mt-8">
        <div className="flex flex-col text-center text-2xl w-1/3 gap-3">
          <p className="">Resultados encontrados:</p>
          <p className="font-bold">({categorySelected})</p>
        </div>

        <div className="flex flex-wrap gap-5 w-2/3 text-xl">
          {productSearched.products == null ? (
            <div id="no-results" className="ml-20">
              No hay resultados para su búsqueda
            </div>
          ) : (
            productSearched.products?.map((product, idx) => (
              <div id="results" className="">
                <Product info={product} key={idx} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
