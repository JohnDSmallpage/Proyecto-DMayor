import { ref} from "../../node_modules/firebase/storage";
import React, {useState} from "react";
import {store, db} from "../firebase models/Config"




export const AddProduct = () => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [unity, setUnity] = useState("");
    const [discount, setDiscount] = useState(0);
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState("");

    const types = ["image/png", "image/jpeg"] //tipo de imagen

    const photoHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)){
            setPhoto(selectedFile);
            setError("")
        } 
        else{
            setPhoto(null);
            setError("Por favor selecciona un tipo de imagen válido: png o jpeg")
        }
    }

    //Añadir producto
    const addProduct = (e) => {
        e.preventDefault();
        console.log(name,category,description,price,unity,discount,photo)
        const uploadTask = ref(store, `product-image/${photo.name}`).put(photo);
        uploadTask.on("state_changed", snapshot => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => {
            setError(err.message)
        }, ()=>{
            ref(store,'product-image').child(photo.name).getDownloadURL().then(url =>{
                db.collection("products").add({
                    name: name,
                    category: category,
                    description: description,
                    price: Number(price),
                    unity: unity,
                    discount: Number(discount),
                    image: url
                }).then(()=>{
                    setName("");
                    setCategory("");
                    setDescription("");
                    setPrice(0);
                    setUnity("");
                    setDiscount(0);
                    setPhoto("");
                    setError("");
                    document.getElementById("file").value = "";
                }).catch(err=> setError(err.message));
            } )
        })
    } 

  return (
    <div className="md:max-w-lg max-w-sm mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 mt-2">
      <h1 className="text-3xl lg:text-4xl font-medium text-center p-2">Añadir Nuevo Producto</h1>

      <form action="" id="form" onSubmit={addProduct}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="productName">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Nombre del producto</h1>
            </div>
            
            <input
              id="productName"
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa el nombre del producto. Ej: Licuadora. "
              onChange={(e) => setName(e.target.value)} value={name}
            />
            
          </label>

          <label htmlFor="category">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Categoría.</h1>
            </div>
            
            <input
              id="category"
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa la categoría del producto. Ej: Electrodomésticos. "
              onChange={(e) => setCategory(e.target.value)} value={category}
            />
            
          </label>
          <label htmlFor="description">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Descripción.</h1>
            </div>
            
            <input
              id="description"
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa la descripción del producto. Ej: Color rojo "
              onChange={(e) => setDescription(e.target.value)} value={description}
            />
            
          </label>

          <label htmlFor="price">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Precio.</h1>
            </div>
            
            <input
              id="price"
              type="number"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa el precio del producto. Ej: 45"
              onChange={(e) => setPrice(e.target.value)} value={price}
            />
            
          </label> 

          <label htmlFor="unity">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Unidad de venta.</h1>
            </div>
            
            <input
              id="unity"
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa la unidad del producto. Ej: Kilos/Toneladas"
              onChange={(e) => setUnity(e.target.value)} value={unity}
            />
            
          </label> 

          <label htmlFor="discount">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Porcentaje de Descuento.</h1>
            </div>
            
            <input
              id="discount"
              type="number"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa el porcentaje de descuento. Ej: 50"
              onChange={(e) => setDiscount(e.target.value)} value={discount}
            />
            
          </label> 

          <label htmlFor="photo">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Imagen del producto.</h1>
            </div>
            
            <input
              id="photo"
              type="file"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa la imagen del producto. Ej: 350"
              onChange={photoHandler}
            />
            
          </label> 

           

          <button
            className="w-full py-3 font-medium text-white bg-[#ff7a00] hover:bg-[#ff8800] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span>Añadir producto</span>
          </button>
          
          
        </div>
      </form>
      {error && <span>{error}</span>}
    </div>
  );
}
