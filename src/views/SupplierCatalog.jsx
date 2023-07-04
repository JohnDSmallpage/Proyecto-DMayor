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
import { getHiddenProductsBySupplier } from "../firebase models/user-service";

export function SupplierCatalog() {
  const [products, setProducts] = useState([]);
  const [hiddenProducts, setHiddenProducts] = useState([]);
  const { user } = useUser();

  const productSearched = useContext(searchContext);

  const getSupplierProducts = async () => {
    const idProducts = user.catalog;
    const data = await getProductsBySupplier(idProducts);
    setProducts(data);
  };

  const getSupplierHiddenProducts = async () => {
    const idProducts = user.catalog;
    const data = await getHiddenProductsBySupplier(idProducts);
    setHiddenProducts(data);
  };

  useEffect(() => {
    getSupplierProducts();
    getSupplierHiddenProducts();
    productSearched.setSupplierMode(true);
  }, []);

  return (
    <div id="main-container" className="flex justify-center items-center w-screen">
      <div
        id="internal-container"
        className="my-5 mx-5 flex flex-col justify-center gap-[10px]"
      >
        <div id="top-container" className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold flex justify-center">Catálogo</h1>

          <div className="flex flex-wrap justify-center gap-5">
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

          <div className="flex justify-center mb-3 mt-2">
            <Link
              to={ADD_PRODUCT}
              className="p-3 font-medium text-white bg-green-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              Añadir nuevo producto
            </Link>
          </div>
        </div>
        <div id="bottom-container" className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold flex justify-center">
            Productos ocultos
          </h1>

          <div className="flex flex-wrap justify-center gap-5">
            {hiddenProducts == null ? (
              <div>No hay productos ocultos</div>
            ) : (
              hiddenProducts?.map((product, idx) => (
                <>
                  <Product info={product} key={idx} />
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
