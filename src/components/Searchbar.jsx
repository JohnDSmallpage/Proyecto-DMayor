import React from "react";
import { Link } from "react-router-dom";
import { SEARCH_PAGE } from "../routes/Url";
import { Product } from "./Product";
import { useState } from "react";
import { useContext } from "react";
import { searchContext } from "../firebase models/SearchContext";
import { getProductsByName } from "../firebase models/user-service";

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
    <div id="main-container" className="flex flex-row bg-white w-full rounded-full">
      <input
        className="bg-white h-10 pl-5 font-semibold rounded-full text-xl focus:outline-none w-full"
        type="text"
        placeholder="Busca tus productos"
        onChange={handleInputChange}
        value={productSearched.searchText}
      />

      <button
        className="bg-[#2757c6] text-white text-base px-4 py-2 font-bold rounded-r-full"
        onClick={() => getProducts(productSearched.searchText)}
      >
        <Link to={SEARCH_PAGE}>Buscar</Link>
      </button>
    </div>
  );
}