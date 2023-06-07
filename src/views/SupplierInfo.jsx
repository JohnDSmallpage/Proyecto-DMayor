import React, { useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "../firebase models/userContext";
import dmayor from "../images/dmayor.png"
import phone from "../images/phone.png"
import location from "../images/location.png"
import email from "../images/email.png"
import Carrousel from "../components/Carrousel";
import { getProductsBySupplier, UpdateProfile } from "../firebase models/user-service";
import { searchContext } from "../firebase models/SearchContext";
import { Product } from "../components/Product";
import { Link } from "react-router-dom";
import { CATALOG } from "../routes/Url";
import { useForm } from "react-hook-form";

export function SupplierInfo() {
  const { user, isLoading } = useUser();
  const slides = [
    {
        url: 'https://wallpapercave.com/wp/wp7832396.jpg'
    },
    {
        url: 'https://wallpapercave.com/wp/wp7530211.jpg'
    },
    {
        url: 'https://wallpapercave.com/wp/wp6836093.jpg'
    },
    {
        url: 'https://wallpapercave.com/wp/wp7110711.jpg'
    },
    {
        url: 'https://wallpapercave.com/wp/wp3079202.jpg'
    },

];
const [products, setProducts] = useState([]);
const [editable, setEditable] = useState(false);
const [resetForm, setResetForm] = useState(false);

  const productSearched = useContext(searchContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(user),
     shouldUnregister: resetForm ,
  });
  function getDefaultValues(defaultValues) {
    return useMemo(() => {
      const initialValues = {};
      for (const key in defaultValues) {
        initialValues[key] = defaultValues[key];
      }
      return initialValues;
    }, [defaultValues]);
  }
  const handleResetForm = () => {
    setResetForm(true);
    setTimeout(() => setResetForm(false), 0);
    setEditable(false)
  };
  const onSubmit = async (data) => { //form destructurado
    if(editable){
      UpdateProfile(data)
      setEditable(false)
    }else{
      setEditable(true)
    }
  };
  const getSupplierProducts = async () => {
    const idProducts = user.catalog
    const data = await getProductsBySupplier(idProducts)
    setProducts(data)
  }
  // const editProfile = ()=>{
  //   if(editable==false){
  //     setEditable(true);
  //   }
  // }

  useEffect (() => {
    getSupplierProducts();
    productSearched.setSupplierMode(true);
  }, [products])

  return (
    <div
      id="main-container"
      className="flex flex-col  bg-gray-100 "
    >
      <form action="" id="form" onSubmit={handleSubmit((data)=>{
        onSubmit(data);
      })}>
        
      
      <header className="h-[200px] w-full flex items-center justify-center p-3 pb-0 bg-white shadow-xl">
        <img src={dmayor} alt="" 
        className="h-full w-full "/>
        
      </header>
      <article className=" flex gap-3 p-3 h-[500px]  w-full ">
        <div className="bg-white  w-1/2 p-4 shadow-xl rounded">
          <h1 className="text-2xl font-bold text-gray-800 font-serif">{user.Company}</h1>
          <p className="mb-4 text-xs text-gray-500 ">Desde {user.CreationDate}</p>
          {!editable ? (
            <>
            <ol className="flex flex-col justify-around gap-[8px]">
            <li className="flex items-center font-serif gap-2"><img className="w-[25px]" src={location} alt="" /> 
            {user.Address} 
            </li>
            <li className="flex items-center font-serif gap-2"><img className="w-[25px]" src={phone} alt="" /> 
            {user.phone}
            </li>
            <li className="flex items-center font-serif gap-2"><img className="w-[25px]" src={email} alt="" />
             {user.email}
             </li>
          </ol>
          <h1 className="text-2xl font-bold mt-4 text-gray-800 font-serif">Acerca de nosotros</h1>
        <p>{user.Description}</p>
        </>
          ):(
<>
            <div className="flex flex-col  gap-[8px] h-full">
              <div className="flex gap-2">
            <img className="w-[25px]" src={location} alt="" />
            <input id="Address"
              {...register("Address")}
              type="text"
            placeholder={user.Address}  className="flex items-center font-serif gap-2 w-full border"/>
            </div>
            <p className="text-red-600">{errors.Address?.message}</p>
            <div className="flex gap-2">
            <img className="w-[25px]" src={phone} alt="" />
            <input id="phone"
              {...register("phone", {
                pattern:{ value: /^[0-9]+$/i,message: "Ingrese un numero de telefono Valido"},
                minLength:{ value:11,message:"Ingrese un numero de telefono Valido"},
                maxLength:{value:11,message:"Ingrese un numero de telefono Valido"},
              })}
              type="text"
             placeholder={user.phone} className="flex items-center font-serif gap-2 w-full border"/>
            </div>
            <p className="text-red-600">{errors.phone?.message}</p>
            <div className="flex gap-2">
            <img className="w-[25px]" src={email} alt="" />
            <input id="email"
              {...register("email", {
                pattern:{
                  value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message:"El correo no es valido"}
              })}
              type="email" placeholder={user.email} className="flex items-center font-serif gap-2 w-full border"/>
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div>
            <h1 className="text-2xl font-bold mt-4 text-gray-800 font-serif">Acerca de nosotros</h1>
            <p className="text-red-600">{errors.Description?.message}</p>
            <textarea  id="Description"
              {...register("Description", {
                minLength:{value:10,message:"Debe dar una descripcion mínima de 10 caracteres"},
                maxLength:{value:200,message:"Descripcion no máxima de 200 caracteres"},
              })}
            className="w-full h-full border" placeholder={user.Description}/>
            
            </div>
          </div>
        </>
          )}
            

        </div>
        <div className="bg-white h-full w-1/2 relative shadow-xl rounded overflow-hidden">
        <Carrousel photos={slides} />
        </div>
      </article>
      <section className="flex flex-col items-center justify-center p-3">
        <div className="flex flex-col w-full gap-4 items-center justify-center p-3 pb-0 bg-white shadow-xl">
          <h1 className="text-2xl text-center text-gray-800 font-serif font-bold">Nuestros productos</h1>
          <div className='flex flex-wrap'>

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
        <Link to={CATALOG} className="text-orange-600 text-center font-bold">Ver catalogo Completo{">"}</Link>
        </div>
      </section>
      {editable==true ?(
        <div className="flex flex-row justify-evenly gap-5 p-3">
        <button className="w-full py-3 font-medium text-white bg-[#ff7a00] hover:bg-[#ff8800] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
         onClick={handleResetForm} >cancel</button>
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
            <span>Confirmar</span>
          </button>
          </div>
      ):(
        <div className="flex items-center justify-center">
        <button  className="w-3/4 self-center py-3 m-4  font-medium text-white bg-[#ff7a00] hover:bg-[#ff8800] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
         >Editar Perfil</button>
         </div>
      )
      }
          </form>  
    </div>
  );
}
