import React from "react";
import { productContext } from "../firebase models/ProductContext";
import { PaypalCheckout } from "../components/PaypalCheckout";
import { useContext } from "react";

export function PurchasePage() {
  const selectProduct = useContext(productContext);

  return (
    <div id="main-container" className="flex justify-center items-center">
      <div id="internal-container" className="my-5 mx-5 flex flex-col justify-center gap-[10px]">
        <h1 className="text-xl font-semibold">Confirmación de compra</h1>
        <div
          id="paypal-buttons"
          className="md:text-xl flex flex-row px-5 py-5 bg-[#F3F5F6] rounded-[17px] border-2"
        >
          <div id="total-price" className="flex flex-col gap-10">
            <p>Total a pagar:</p>
            <p className="flex justify-end text-3xl font-bold object-right w-full ">
              $ {selectProduct.finalPrice}
            </p>
          </div>
          <div className="flex border-1 border-l h-full bg-black mx-8 py-5"></div>
          <div className="flex flex-col gap-3">
            <p>Seleccione un método de pago:</p>
            <PaypalCheckout price={selectProduct.finalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
