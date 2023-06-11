import React from "react";
import { Searchbar } from "../components/Searchbar";
import { Product } from "../components/Product";
import { useContext, useState } from "react";
import { searchContext } from "../firebase models/SearchContext";
import { getProductsByCategory } from "../firebase models/user-service";

export function SearchPage() {
  

  const productSearched = useContext(searchContext);
  const [categorySelected, setCategorySelected] = useState("Textiles");

  

  const handleSelectChange = async (event) => {
    setCategorySelected(event.target.value);
  const data = await getProductsByCategory(event.target.value);
  console.log(data);
  productSearched.setProducts(data);
  };

  return (
    <>
      <div className=" flex mt-4  justify-around container mx-auto bg-[#ff7a00] rounded-lg p-10">
        <Searchbar />
        <div className=" mr-[100px] mt-2 text-white ">
          Categoria

          <select id="category"
              type="text"
              name="category" 
              className=" ml-2 py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black"
              onChange={handleSelectChange}
              
              >
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
          </select>

        </div>
      </div>

      <p className="mt-4 text-center">Resultados encontrados</p>

      <div className="flex flex-wrap">
        {productSearched.products == null ? (
          <div>No hay resultados para su búsqueda</div>
        ) : (
          productSearched.products?.map((product, idx) => (
            <>
              <Product info={product} key={idx} />
            </>
          ))
        )}
      </div>
    </>
  );
}