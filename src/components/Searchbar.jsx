import React from "react";

export function Searchbar() {
  return (
    <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
            <input
              className="text-base text-gray-400 flex-grow outline-none px-2 "
              type="text"
              placeholder="Busca tus productos"
            />
              <button className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">
                Buscar
              </button>
            </div>

  );
}

