import React from "react";
import { Link } from "react-router-dom";
import { SEARCH_PAGE } from "../routes/Url";
import { Product } from "./Product";
import { useState } from "react";
import { useContext } from "react";
import { searchContext } from "../firebase models/SearchContext";
import { getProductsByName } from "../firebase models/user-service";
import Lupa from "../images/search-line-nav.png";


export function Searchbar() {
  const [text, setText] = useState("");
  const productSearched = useContext(searchContext);

  const handleInputChange = (event) => {
    productSearched.setSearchText(event.target.value);
  };

  const getProducts = async (searchedText) => {
    const data = await getProductsByName(searchedText);
    productSearched.setProducts(data);
  };

  return (
    <div
      id="main-container"
      className="flex flex-row bg-white md:w-[400px] rounded-full border-2"
    >
      <input
        className="bg-white h-10 pl-5 font-semibold rounded-full text-sm focus:outline-none w-full"
        type="text"
        placeholder="Busca en D'Mayor"
        onChange={handleInputChange}
        value={productSearched.searchText}
      />
      <div id="boton-buscar" className="flex items-center pr-[5px]">
        <button
          className="bg-[#ff7a00] text-white text-sm  font-semibold rounded-full w-[30px] h-[30px] flex justify-center items-center"
          onClick={() => getProducts(productSearched.searchText)}
        >
          <Link to={SEARCH_PAGE}><img src={Lupa}/></Link>
        </button>
      </div>
    </div>
  );
}
