import React from "react";

export function Searchbar() {
  return (
    <div id="main-container" className="flex flex-row bg-white">
            <input
              className=" text-base text-gray-400 px-2 "
              type="text"
              placeholder="Busca tus productos"
            />
              <button className="bg-indigo-500 text-white text-base px-4 py-2 font-thin">
                Buscar
              </button>
            </div>

  );
}

