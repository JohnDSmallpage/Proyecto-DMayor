import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { addFeedback,
  deleteProduct,
  getFavoritesByUser,
  getProductById,
  searchChat,
  setChats, uploadFeedback,
} from "../firebase models/user-service";
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
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { addProductToFavorite } from "../firebase models/user-service";
import { deleteProductFromFavorite } from "../firebase models/user-service";
import {
  arrayUnion,
  onSnapshot,
  Timestamp,
} from "@firebase/firestore";

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectProduct = useContext(productContext);
  const productSearched = useContext(searchContext);
  const [showMessage, setShowMessage] = useState(false);
  const [feedbackText,setFeedbackText]=useState("")

  const { user } = useUser();

  const [product, setProduct] = useState([]);
  const [descuentos, setDescuentos] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [finalDiscount, setFinalDiscount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating,setRating]=useState(0);
  const [feedbacks,setFeedbacks]=useState();

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

  const setChat = async () => {
    const combinedID =
      user?.uid > product.supplierId
        ? user?.uid + product.supplierId
        : product.supplierId + user?.uid;
    const res = await searchChat(combinedID);
    // try{
    if (!res.exists()) {
      //crea el chat
      await setChats(combinedID, user, product);
    }
    navigate(CHAT);
  };

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
    } else {
      showProduct(product.id, user.user);
      navigate(CATALOG);
    }
  };

  const handleFavoriteProduct = () => {
    const valueInArray = user?.favorites?.includes(product.id);
    if (
      user?.favorites == [] ||
      valueInArray == false ||
      user?.favorites == undefined
    ) {
      const data = addProductToFavorite(product.id, user);
      setIsFavorite(true);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000); // Oculta el mensaje después de 2 segundos
    } else {
      const data = deleteProductFromFavorite(product.id, user);
      setIsFavorite(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000); // Oculta el mensaje después de 2 segundos
    }
  };


  useEffect(() => {

    if (selectProduct != null && productSearched != null) {
      getProduct(id);
      setIsFavorite(user?.favorites?.includes(id));
    } else {
      navigate(CATALOG);
    }
  }, []);

  useEffect(() => {
    if(product.length != 0){
      const unSub = onSnapshot(doc(db,"feedbacks",product.id), (doc) => {
        doc.exists() 
        && setFeedbacks(doc.data().feedbacks);
      });
    }
    const objetoJSON = product.discounts;
    selectProduct.setDiscounts(objetoJSON);

    let descuento = "";

    for (const clave in objetoJSON) {
      descuento += `>= ${clave} ${product.unity}: ${
        parseFloat(objetoJSON[clave]) * 100
      }%\n`;
      // console.log(descuento);
    }

    setDescuentos(descuento);
    // console.log(descuento);
  }, [product]);

  const handleFeedback = ()=>{
    uploadFeedback(rating,user,feedbackText,product.id);
    addFeedback(product.id,user);
  }
  const fiveStar = ()=>{
    setRating(5);
  }
  const fourStar = ()=>{
    setRating(4);
  }
  const threeStar = ()=>{
    setRating(3);
  }
  const twoStar = ()=>{
    setRating(2);
  }
  const oneStar = ()=>{
    setRating(1);
  }

  return (
    <>
      {user?.accepted &&
      user != null &&
      productSearched.supplierMode == true ? (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="flex items-center justify-center">
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
                  <div className="flex ml-6 items-center"></div>
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
                    {product.hidden ? "Mostrar producto" : "Ocultar producto"}
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
                    <p>
                      {product.availableQuantity}
                      {" " + product.unity}
                    </p>
                  )}
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
          <div className="container px-5 py-12 mx-auto">
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
                <div className="flex mb-4"></div>
                <p className="leading-relaxed">{product.description}</p>
                <div className="flex flex-row  mt-6 pb-3 border-b-2 border-gray-100 mb-5 ">
                  <div className="flex flex-row gap-2">
                    <p className="text-xl font-semibold text-gray-900">Proveedor: </p>
                    <Link
                      to={`/supplierInfo/${product.supplierId}`}
                      className="text-orange-500 text-lg"
                    >
                      {product.supplierName}
                    </Link>
                  </div>
                  <div className="w-full flex justify-end items-center">
                    {user && user?.Company == undefined && (
                      <button
                        onClick={setChat}
                        className="bg-orange-500 text-white px-12 py-2 rounded mr-3"
                      >
                        CHATEAR
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex pb-3 border-b-2 border-gray-100">
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

                  {user?.Company == undefined && (
                    <button
                      onClick={handleClick}
                      className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded "
                      disabled={disableButton}
                    >
                      COMPRAR
                    </button>
                  )}
                  {user?.Company == undefined && (
                    <button
                      className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:bg-red-400"
                      onClick={handleFavoriteProduct}
                    >
                      <svg
                        fill={isFavorite ? "red" : "gray"} // Si el producto está en favoritos, el color es rojo, sino es gris
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
                  )}
                </div>
                {showMessage && (
                  <div className="flex justify-end mt-2">
                    {isFavorite
                      ? "Producto agregado a favoritos"
                      : "Producto eliminado de favoritos"}
                  </div>
                )}

                <div
                  id="stock-amount"
                  className="flex flex-row w-full mt-2 pb-3 border-b-2 border-gray-100"
                >
                  <p
                    id="stock"
                    className="w-1/2 mt-1 title-font font-medium text-xl text-gray-900 font-semibold"
                  >
                    Disponible:
                    {product.availableQuantity == "0" ? (
                      <p>Out of stock</p>
                    ) : (
                      <p>
                        {product.availableQuantity}
                        {" " + product.unity}
                      </p>
                    )}
                  </p>
                  <div id="amount" className="flex flex-row gap-2 w-1/2">
                    <p className="mt-1 title-font font-semibold font-medium text-xl text-gray-900 h-full flex items-center">
                      Cantidad:
                    </p>
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="border border-gray-400 px-5 h-[50px] w-[100px] text-xl text-center "
                        value={cantidad}
                        onChange={handleInputChange}
                      />
                      {!isNaN(cantidad) ? null : (
                        <div>Por favor, introduzca solo números.</div>
                      )}
                      {handleError()}
                    </div>
                  </div>
                </div>
                <div id="discounts-total" className="flex flex-row w-full">
                  <span className="w-3/5 flex flex-col mt-2 leading-normal text-left whitespace-pre-line title-font font-medium text-lg text-gray-900">
                    <p className="text-xl font-semibold">Descuentos:</p>
                    {product.discounts == [] ? (
                      <div>
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <p>{descuentos}</p>
                    )}
                  </span>
                  <div className="w-2/5 mt-2 ">
                    <p className="text-xl text-gray-900 font-semibold">
                      Monto total*:
                    </p>
                    <p className="text-2xl font-bold text-black">
                      {parseFloat(product.price) * cantidad}$
                    </p>
                    <p className="mt-2">*Sin descuento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl p-4 text-yellow-500 font-bold">Feedback</h1>
            {!user?.feedbacks?.includes(product.id) && user?.purchased?.includes(product.id)  &&
                <>
                <p>Haz hecho una compra de este producto y no haz dejado un feedback!</p>
                <textarea
                      id="Feedback"
                      className="w-2/5 h-[200px] border p-2"
                      placeholder="Deja un Feedback"
                      onChange={(e)=>setFeedbackText(e.target.value)}
                    />
                    <div className='flex flex-row gap-3'>
                  <div className="flex items-center flex-row-reverse cursor-pointer m-2">
                    <svg aria-hidden="true" onClick={fiveStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={fourStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={threeStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={twoStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" onClick={oneStar} className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                  <p className='text-xl font-bold m-3'>{rating}/5</p>
                 </div>
                <button 
                onClick={handleFeedback}
                className="flex text-white m-3 bg-[#ff7a00] border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded ">Dejar feedback</button>
                </>
                }
            <div className="h-[500px] w-4/5 bg-gray-100 rounded">
                {feedbacks?.map((m) => (
                  <p>{m.text}</p>
                 ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
