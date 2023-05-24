import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { productContext } from "../firebase models/ProductContext";
import { useState } from "react";
import {PaypalCheckout} from "../components/PaypalCheckout";

export function CheckoutPage() {
  const selectProduct = useContext(productContext);
  const [finalDiscount, setFinalDiscount] = useState(1);
  const [finalPrice, setFinalPrice] = useState(
    selectProduct.selectedProduct.price
  );

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
  };

  const handleFinalPrice = () => {
    if (finalDiscount == 1) {
      setFinalPrice(
        parseFloat(selectProduct.quantity) *
          parseFloat(selectProduct.selectedProduct.price)
      );
    } else {
      setFinalPrice(
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
    handleFinalPrice();
    console.log(finalDiscount);
    console.log(finalPrice);
  }, [finalDiscount, selectProduct.selectedProduct.price]);

  return (
    <>
      <div className="p-10">
        <div className="md:max-w-lg max-w-sm mx-auto bg-white p-10 rounded-xl shadow shadow-slate-300">
          <h1 className="text-3xl lg:text-4xl text-gray-500 text-justify p-1">
            Checkout
          </h1>

          <div className=" text-center shadow shadow-slate-300 rounded-xl p-5 mt-7">
            <div className="selectDoctor">
              <h2 className="text-base lg:text-lg font-bold mb-1 mt-1 text-left text-[#5974A9]">
                Producto seleccionado:
              </h2>
              <p className="text-base text-left px-6 font-bold">
                {selectProduct.selectedProduct.name.charAt(0).toUpperCase() +
                  selectProduct.selectedProduct.name.slice(1)}
              </p>
            </div>

            {/* Input fecha */}
            <form>
              <label htmlFor="date">
                <div className="py-1 mt-2">
                  <h2 className="text-base lg:text-lg font-bold mb-1 mt-1 text-left text-[#5974A9]">
                    Precio:
                  </h2>

                  <p className="text-base text-left px-6 font-bold">
                    ${selectProduct.selectedProduct.price}/
                    {selectProduct.selectedProduct.unity}
                  </p>
                </div>
              </label>

              <label htmlFor="date">
                <div className="py-1 mt-2">
                  <h2 className="text-base lg:text-lg font-bold mb-1 mt-1 text-left text-[#5974A9]">
                    Cantidad:
                  </h2>

                  <p className="text-base text-left px-6 font-bold">
                    {selectProduct.quantity} unidad
                  </p>
                </div>
              </label>

              <label htmlFor="time">
                <div className="py-1 mt-2">
                  <h2 className="text-base lg:text-lg font-bold mb-1 mt-1 text-left text-[#5974A9]">
                    Precio sin descuento:
                  </h2>
                  <div className="text-base text-left px-6 font-bold">
                    $
                    {parseFloat(selectProduct.quantity) *
                      parseFloat(selectProduct.selectedProduct.price)}
                  </div>
                </div>
              </label>

              <label htmlFor="time">
                <div className="py-1 mt-2">
                  <h2 className="text-base lg:text-lg font-bold mb-1 mt-1 text-left text-[#5974A9]">
                    Descuento:
                  </h2>
                  <div className="text-base text-left px-6 font-bold">
                    {finalDiscount == 1 ? (
                      <div>Sin descuento por unidad</div>
                    ) : (
                      <div>
                        {finalDiscount * 100}% sobre el precio por unidad
                      </div>
                    )}
                  </div>
                </div>
              </label>

              {/* Input Duración */}
              <label htmlFor="duration">
                <div className="py-1 mt-2">
                  <h2 className="text-base lg:text-lg text-[#5974A9] font-bold mb-1 mt-1 text-left">
                    Proveedor:
                  </h2>
                  <p className="text-base text-left px-6 font-bold">
                    {/* {reservationContext.end.split(" ")[1].split(":")[0] -
                        reservationContext.start
                          .split(" ")[1]
                          .split(":")[0]}{" "}
                      horas */}{" "}
                    {selectProduct.selectedProduct.supplierName}
                  </p>
                </div>
              </label>

              {/* Input Motivo */}
              <label htmlFor="motive">
                <div className="py-1 mt-2">
                  <h2 className="text-base lg:text-lg text-[#5974A9] font-bold mb-1 mt-1 text-left">
                    Total a pagar:
                  </h2>
                  <p className="text-base text-left px-6 font-bold">
                    ${finalPrice}
                  </p>
                </div>
              </label>
              <label htmlFor="paypal">
                <div className="py-1 mt-2">
                  <h2 className="text-base lg:text-lg text-[#5974A9] font-bold mb-1 mt-1 text-left">
                    Método de pago:
                  </h2>
                  <div className="mt-5 flex justify-center h-min">
                    <PaypalCheckout price={finalPrice} />
                  </div>
                </div>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
