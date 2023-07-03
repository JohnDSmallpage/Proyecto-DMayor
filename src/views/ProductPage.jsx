import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, searchChat, setChats } from "../firebase models/user-service";
import { useState } from "react";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CATALOG, CART_PAGE, CHAT } from "../routes/Url";
import { useContext } from "react";
import { productContext } from "../firebase models/ProductContext";
import { useUser } from "../firebase models/userContext";
import { searchContext } from "../firebase models/SearchContext";
import { hideProduct } from "../firebase models/user-service";
import { showProduct } from "../firebase models/user-service";
import { Chat } from "./Chat";
import { db } from "../firebase models/Config";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectProduct = useContext(productContext);
  const productSearched = useContext(searchContext);

  const {user} = useUser();

  const [product, setProduct] = useState([]);
  const [descuentos, setDescuentos] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [finalDiscount, setFinalDiscount] = useState(1);

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

    const setChat = async ()=>{
      const combinedID = user?.uid > product.supplierId ? 
      user?.uid + product.supplierId : 
      product.supplierId + user?.uid;
      const res = await searchChat(combinedID);
      // try{      
          if(!res.exists()){
              //crea el chat
              await setChats(combinedID,user,product);
          }
          navigate(CHAT);
  }


  const getProduct = async (id) => {
    const data = await getProductById(id);
    // console.log(data);
    setProduct(data);
  };

  const handleInputChange = (e) => {
    const nuevoValor = e.target.value;
    const regex = /^[1-9][0-9]*$/;
    if (isNaN(nuevoValor) || nuevoValor <= 0 || !regex.test(nuevoValor)) {
      setCantidad("");
    } else {
      setCantidad(nuevoValor);
    }
    handleDiscount();
  };

  const handleError = () => {
    if (cantidad > parseInt(product.availableQuantity)) {
      return (
        <div style={{ color: "red" }}>
          La cantidad ingresada no puede ser mayor que la cantidad disponible.
        </div>
      );
    }
    return null;
  };

  const disableButton = cantidad > parseInt(product.availableQuantity);

  const handleClick = () => {
    selectProduct.setSelectedProduct(product);
    selectProduct.setQuantity(cantidad);

    
    navigate(CART_PAGE);
  };

  const handleHideProduct = () => {
    if (product.hidden == false) {
      hideProduct(product.id, user.user);
      navigate(CATALOG);
    }
    else{
      showProduct(product.id, user.user);
      navigate(CATALOG);
    }

    
  };

  const getDiscountJson = () => {};

  useEffect(() => {
    if (selectProduct != null && productSearched != null) {
      getProduct(id);
    } else {
      navigate(CATALOG);
    }
  }, []);

  useEffect(() => {
    const objetoJSON = product.discounts;
    selectProduct.setDiscounts(objetoJSON);
    // console.log(user);

    let descuento = "";

    for (const clave in objetoJSON) {
      descuento += `>=${clave} ${product.unity}: ${
        parseFloat(objetoJSON[clave]) * 100
      }% de descuento\n`;
      // console.log(descuento);
    }

    setDescuentos(descuento);
    // console.log(descuento);
  }, [product]);

  return (
    <>
      {user?.user?.accepted &&
      user?.user != null &&
      productSearched.supplierMode == true ? (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={
                  product.length == [] ? (
                    <div>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    product.photos[0]
                  )
                }
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {" "}
                  {product.length == [] ? (
                    <div>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <p>
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </p>
                  )}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.length == [] ? (
                    <div>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <p>
                      {product.name.charAt(0).toUpperCase() +
                        product.name.slice(1)}
                    </p>
                  )}
                </h1>
                <div className="flex mb-4">
                  
                  <div className="flex ml-6 items-center">
                    
                  </div>
                </div>
                <div className="flex">
                  <div className=" flex flex-col">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      {product.length == [] ? (
                        <div>
                          <p>Loading...</p>
                        </div>
                      ) : (
                        <p>
                          {"Precio: " +
                            "$" +
                            product.price +
                            "/" +
                            product.unity}
                        </p>
                      )}
                    </span>
                  </div>

                  <button
                    onClick={handleHideProduct}
                    className="flex ml-auto text-white bg-[#ff7a00] border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded "
                  >

                    {product.hidden ? 

                    "Mostrar producto" : "Ocultar producto"}
                    
                  </button>
                 

                  {/*<button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                    </button>*/}
                </div>

                <span className="flex flex-col mt-4 text-left whitespace-pre-line title-font font-medium text-xl text-gray-900 leading-normal">

                  Cantidad disponible: 
                  {product.availableQuantity == "0" ? (
                   <p>Out of stock</p>  
                  ) : (
                    <p>{product.availableQuantity}{" " + product.unity}</p>)
                  }
                  {product.discounts == [] ? (
                    <div>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <p>{descuentos}</p>
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={
                  product.length == [] ? (
                    <div>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    product.photos[0]
                  )
                }
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {" "}
                  {product.length == [] ? (
                    <div>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <p>
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </p>
                  )}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.length == [] ? (
                    <div>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <p>
                      {product.name.charAt(0).toUpperCase() +
                        product.name.slice(1)}
                        
                    </p>
                  )}
                </h1>
                <div className="flex mb-4">
                  
                </div>
                <p className="leading-relaxed">{product.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5 gap-2">
                  <p>Proveedor:  </p>
                <Link to={`/supplierInfo/${product.supplierId}`} className="text-orange-500">{product.supplierName}</Link>
                {user && user?.Company==undefined &&
                <button onClick={setChat} className="text-orange-500">chatear</button>
                }
                 
                  <div className="flex ml-6 items-center">
                    
                  </div>
                </div>
                <div className="flex">
                  <div className=" flex flex-col">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      {product.length == [] ? (
                        <div>
                          <p>Loading...</p>
                        </div>
                      ) : (
                        <p>
                          {"Precio: " +
                            "$" +
                            product.price +
                            "/" +
                            product.unity}
                        </p>
                      )}
                    </span>
                  </div>

                  <button
                    onClick={handleClick}
                    className="flex ml-auto text-white bg-[#ff7a00] border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded "
                    disabled={disableButton}
                  >
                    Comprar
                  </button>
                 
                  
                  {/*<button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                      </button>*/}
                </div>

                <div className="flex flex-col mt-2">
                  <div className=" mt-1 title-font font-medium text-xl text-gray-900">
                  Cantidad disponible: 
                  {product.availableQuantity == "0" ? (
                   <p>Out of stock</p>  
                  ) : (
                    <p>{product.availableQuantity}{" " + product.unity}</p>)
                  }
                  
                  </div>
                  <div className=" mt-1 title-font font-medium text-xl text-gray-900">
                    Cantidad:{" "}
                  </div>

                  <input
                    type="number"
                    className=" mt-2 border border-gray-400 p-2"
                    value={cantidad}
                    onChange={handleInputChange}
                  />
                  {!isNaN(cantidad) ? null : (
                    <div>Por favor, introduzca solo números.</div>
                  )}
                  {handleError()}
                </div>
                <span className="flex flex-col mt-2 leading-normal text-left whitespace-pre-line title-font font-medium text-xl text-gray-900">
                  {product.discounts == [] ? (
                    <div>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <p>{descuentos}</p>
                  )}
                </span>
                <div className="text-xl">Monto total sin descuento: {parseFloat(product.price)*cantidad}$</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
