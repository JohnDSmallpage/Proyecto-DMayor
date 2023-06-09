import React from "react";
import { productContext } from "../firebase models/ProductContext";
import { PaypalCheckout } from "../components/PaypalCheckout";
import { useContext } from "react";

export function PurchasePage() {
  const selectProduct = useContext(productContext);

  return (
    <div className="mt-5 flex justify-center h-min">
      <PaypalCheckout price={selectProduct.finalPrice} />
    </div>
  );
}
