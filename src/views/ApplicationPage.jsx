import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { LANDING_PAGE, REGISTER } from "../routes/Url";
import { registerWithEmailAndPassword, signInWithGoogle } from "../firebase models/auth-service";
import { useForm, useWatch } from "react-hook-form";


export function ApplicationPage() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
    },
  });
  const password = useRef({});
  password.current = watch("password", "");


  const onSubmit = async (data) => {
    console.log(data)
    const { email, password, ...extraData } = data; //form destructurado
    await registerWithEmailAndPassword(
      email,
      password,
      extraData
    );
  };


  return (
    <div className="md:max-w-lg max-w-sm mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 mt-8">
      <h1 className="text-3xl lg:text-4xl font-medium text-center p-2">Aplica como proovedor</h1>


      <form action="" id="form" onSubmit={handleSubmit((data)=>{
        onSubmit(data);
      })}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="companyName">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Nombre de la compañia</h1>
            </div>
            
            <input
              id="companyName"
              {...register("companyName", {required: "Este campo no puede estar vacio",})}
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu nombre"
              
            />
            <p className="text-red-600">{errors.companyName?.message}</p>
            
          </label>
          <label htmlFor="email">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Correo electrónico
              </h1>
            </div>
            <input
              id="email"
              {...register("email", {
                required: "Este campo no puede estar vacio",
                pattern:{
                  value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message:"El correo no es valido"}
              })}
              type="email"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa el correo electrónico"
             
            />
            <p className="text-red-600">{errors.email?.message}</p>
            
          </label>
          <label htmlFor="telefono">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Número de teléfono
              </h1>
            </div>
            <input
              id="phone"
              {...register("phone", {
                required: "Este campo no puede estar vacio",
                pattern:{ value: /^[0-9]+$/i,message: "Ingrese un numero de telefono Valido"},
                minLength:{ value:11,message:"Ingrese un numero de telefono Valido"},
                maxLength:{value:11,message:"Ingrese un numero de telefono Valido"},
              })}
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa el número de telefono de la compañia"
              
            />
            <p className="text-red-600">{errors.phone?.message}</p>
          </label>
          <label htmlFor="ID">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                RIF
              </h1>
            </div>
            <div className="flex">
            <input
              id="RIF"
              {...register("RIF")}
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Indica el RIF de la empresa"
            />
            </div>
            
            
          </label>
          <label htmlFor="Adress">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Dirección de la sedev</h1>
            </div>
            <input
              id="Adress"
              {...register("Adress", {
                required: "Este campo no puede estar vacio",
              })}
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Indica la dirección de la sede"
              
            />
            <p className="text-red-600">{errors.Adress?.message}</p>
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
            <span>Registrarse</span>
          </button>
          
        </div>
      </form>
    </div>
  );
}

