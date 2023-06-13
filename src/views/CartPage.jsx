import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { productContext } from "../firebase models/ProductContext";
import { useState } from "react";
import { PaypalCheckout } from "../components/PaypalCheckout";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { PAY_ORDER } from "../routes/Url";

export const CartPage = () => {
  const selectProduct = useContext(productContext);
  const [finalDiscount, setFinalDiscount] = useState(1);
  const navigate = useNavigate();

  const handleDiscount = () => {
    const discounts = selectProduct.discounts;
    const unit = selectProduct.quantity;
    for (const clave in discounts) {
      if (parseInt(unit) < clave) {
        break;
      } else if (parseInt(unit) >= clave) {
        setFinalDiscount(discounts[clave]);
      }
    }
    handleFinalPrice();
  };

  const handleFinalPrice = () => {
    if (finalDiscount == 1) {
      selectProduct.setFinalPrice(
        parseFloat(selectProduct.quantity) *
          parseFloat(selectProduct.selectedProduct.price)
      );
    } else {
      selectProduct.setFinalPrice(
        parseFloat(selectProduct.quantity) *
          parseFloat(selectProduct.selectedProduct.price) -
          parseFloat(selectProduct.quantity) *
            parseFloat(selectProduct.selectedProduct.price) *
            parseFloat(finalDiscount)
      );
    }
  };

  useEffect(() => {
    handleDiscount();
    console.log(selectProduct.finalPrice);
  }, [selectProduct]);

  return (
    <div id="main-container" className="flex justify-center items-center">
      <div
        id="internal-container"
        className="flex flex-col justify-center w-full my-5 mx-5 gap-[10px]"
      >
        <h1 className="text-xl font-semibold ml-[20px]">Resumen de compra</h1>
        <section className=" bg-[#F3F5F6] rounded-[17px] border-2 ">
          <div>
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center"
                          >
                            {" "}
                            Imagen
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center"
                          >
                            {" "}
                            Producto
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center"
                          >
                            {" "}
                            Proveedor
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center"
                          >
                            {" "}
                            Precio
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center"
                          >
                            {" "}
                            Cantidad
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center"
                          >
                            {" "}
                            Precio sin descuento
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center"
                          >
                            {" "}
                            Descuento
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-center"
                          >
                            {" "}
                            Total a pagar
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="hover:bg-gray-300 dark:hover:bg-gray-300 ">
                          <td className="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 w-[10%]">
                            <img
                              src={selectProduct.selectedProduct.photos[0]}
                              alt=""
                              className="w-50px m-auto"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center">
                            <div className="selectDoctor">
                              {/* Prod Name */}
                              {selectProduct.selectedProduct.name
                                .charAt(0)
                                .toUpperCase() +
                                selectProduct.selectedProduct.name.slice(1)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center">
                            <label htmlFor="duration">
                              {/* Prov Name */}
                              {selectProduct.selectedProduct.supplierName}
                            </label>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center">
                            <label htmlFor="date">
                              {/* Precio por unidad */} 
                              ${selectProduct.selectedProduct.price}
                            </label>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center">
                            <label htmlFor="date">
                              {/* Cantidad */}
                              {selectProduct.quantity}
                            </label>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center">
                            <label htmlFor="time">
                              {/* Precio sin descuento */}$
                              {parseFloat(selectProduct.quantity) *
                                parseFloat(selectProduct.selectedProduct.price)}
                            </label>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600">
                            <label htmlFor="time">
                              {/* Descuento */}
                              {finalDiscount == 1 ? (
                                <div className="w-full flex justify-center">No aplica</div>
                              ) : (
                                <div className="w-full flex justify-center">
                                  {finalDiscount * 100}% 
                                </div>
                              )}
                            </label>
                          </td>
                          <td className="bpx-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-600 text-center">
                            <label htmlFor="motive">
                              {/* Total a Pagar */}
                              ${selectProduct.finalPrice}
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mb-3"></hr>
            <label htmlFor="paypal">
              <div id="paypal" className="">
                <div className="flex justify-center w-full">
                  <Link
                    className="bg-[#FF914D] hover:bg-green-500 text-white font-bold py-4 px-7 rounded inline-flex items-center mb-3"
                    to={PAY_ORDER}
                  >
                    Completar compra
                  </Link>
                </div>
              </div>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};
