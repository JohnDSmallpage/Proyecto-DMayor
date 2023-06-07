import React from "react";
import { AddProduct } from "./AddProduct";
import { Link } from "react-router-dom";
import { ADD_PRODUCT } from "../routes/Url";
import { Product } from "../components/Product";
import { useEffect } from "react";
import { useUser } from "../firebase models/userContext";
import { useState } from "react";
import { getProductsBySupplier } from "../firebase models/user-service";
import { useContext } from "react";
import { searchContext } from "../firebase models/SearchContext";

export function SupplierCatalog() {
  const [products, setProducts] = useState([]);
  const { user } = useUser();

  const productSearched = useContext(searchContext);

  const getSupplierProducts = async () => {
    const idProducts = user.catalog;
    const data = await getProductsBySupplier(idProducts);
    setProducts(data);
  };

  useEffect(() => {
    getSupplierProducts();
    productSearched.setSupplierMode(true);
  }, [products]);

  return (
    <>
      <h1 className="text-[20px] font-bold text-gray-800 text-center mt-2">
        Catálogo
      </h1>

      <div className="flex justify-center mb-3 mt-2">
        <Link
          to={ADD_PRODUCT}
          className="py-3 font-medium text-white bg-green-600 hover:bg-green-400 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
        >
          Añadir nuevo producto
        </Link>
      </div>

      <div className="flex flex-wrap">
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
    </>
  );
}
