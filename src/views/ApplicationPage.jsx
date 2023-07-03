import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { LANDING_PAGE, REGISTER, SUPPLIER_PROFILE } from "../routes/Url";
import { registerWithEmailAndPassword} from "../firebase models/auth-service";
import { useForm, useWatch } from "react-hook-form";


export function ApplicationPage() {
  const [errorMessage,setErrorMessage]=useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
        Address:"",
        Company:"",
        CreationDate:"",
        Description:"",
        Email:"",
        LegalRepresentative:"",
        Password:"",
        PhotoArray:[],
        ProfilePic:"https://firebasestorage.googleapis.com/v0/b/copia-8df64.appspot.com/o/images%2Fc78867de-e0db-485c-a178-9512322d3b5d?alt=media&token=aef68b65-42fb-49db-988b-7e7f36a608f1",
        Rif:"",
        WorkField:"",
        accepted:false,
        catalog:[],
    },
  });
  const password = useRef({});
  password.current = watch("password", "");


  const onSubmit = async (data) => {
    const { Email, Password, ...extraData } = data; //form destructurado
    
    const confirmation = await registerWithEmailAndPassword(
      Email.toLowerCase(),
      Password,
      extraData
    );
    setErrorMessage(confirmation)
  };


  return (
    <div className="md:max-w-lg max-w-sm mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 mt-8">
      <h1 className="text-3xl lg:text-4xl font-medium text-center p-2">Aplica como proovedor</h1>


      <form action="" id="form" onSubmit={handleSubmit((data)=>{
        onSubmit(data);
      })}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="Company">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Nombre de la compañia</h1>
            </div>
            
            <input
              id="Company"
              {...register("Company", {required: "Este campo no puede estar vacio",})}
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu nombre"
              
            />
            <p className="text-red-600">{errors.Company?.message}</p>
            
          </label>
          <label htmlFor="Email">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Correo electrónico
              </h1>
            </div>
            <input
              id="Email"
              {...register("Email", {
                required: "Este campo no puede estar vacio",
                pattern:{
                  value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message:"El correo no es valido"}
              })}
              type="email"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa el correo electrónico"
             
            />
            <p className="text-red-600">{errors.Email?.message}</p>
            <p className="text-red-600">{errorMessage}</p>
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
          <label htmlFor="Rif">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                RIF
              </h1>
            </div>
            <div className="flex">
            <input
              id="Rif"
              {...register("Rif",{
                required:"Este campo no puede estar vacio"
              })}
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Indica el RIF de la empresa"
            />
            </div>
            <p className="text-red-600">{errors.Rif?.message}</p>
            
          </label>
          <label htmlFor="Address">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Dirección de la sedev</h1>
            </div>
            <input
              id="Address"
              {...register("Address", {
                required: "Este campo no puede estar vacio",
              })}
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Indica la dirección de la sede"
              
            />
            <p className="text-red-600">{errors.Address?.message}</p>
          </label>
          <label htmlFor="Password">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Contraseña</h1>
            </div>
            <input
              id="Password"
              {...register("Password", {
                required: "Este campo no puede estar vacio",
                minLength:{ value:8,message:"La contraseña debe tener mínimo 8 caracteres"},
              })}
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu contraseña"
              
            />
            <p className="text-red-600">{errors.Password?.message}</p>
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

