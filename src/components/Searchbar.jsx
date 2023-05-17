import React from "react";
import { Link } from "react-router-dom";
import { SEARCH_PAGE } from "../routes/Url";
import { Product } from "./Product";
import { useState } from "react";

export function Searchbar(props) {
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
        <input
          className="text-base text-gray-400 flex-grow outline-none px-2 "
          type="text"
          placeholder="Busca tus productos"
          onChange={handleInputChange}
        />
        <div>
          <div>
            <button className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">
              <Link to={SEARCH_PAGE}>Buscar</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
