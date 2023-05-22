import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { APPLICATION, LANDING_PAGE, REGISTER } from "../routes/Url";
import { registerWithEmailAndPassword, signInWithGoogle } from "../firebase models/auth-service";
import { useForm, useWatch } from "react-hook-form";


export function RegisterPage() {
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

  //const para el login con google
  const handleSigninWithGoogle = async () => {
    await signInWithGoogle();
    navigate(LANDING_PAGE)
  };

  const onSubmit = async (data) => {
    const { email, password, ...extraData } = data; //form destructurado
    await registerWithEmailAndPassword(
      email,
      password,
      extraData
    );
    navigate(LANDING_PAGE)
  };


  return (
    <div className="md:max-w-lg max-w-sm mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 mt-8">
      <h1 className="text-3xl lg:text-4xl font-medium text-center p-2">Registrar Cuenta</h1>

      <div className="my-5">
        <button
          onClick={handleSigninWithGoogle}
          className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-6 h-6"
            alt=""
          />{" "}
          <span>Continuar con Google</span>
        </button>
      </div>

      <form action="" id="form" onSubmit={handleSubmit((data)=>{
        onSubmit(data);
      })}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="name">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Nombre</h1>
            </div>
            
            <input
              id="name"
              {...register("name", {required: "Este campo no puede estar vacio",
              minLength:{ value:4 , message:"Nombre minimo de 3 letras"}})}
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu nombre"
              
            />
            <p className="text-red-600">{errors.name?.message}</p>
            
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
              placeholder="Ingresa tu correo electrónico"
             
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
              placeholder="Ingresa tu número de teléfono"
              
            />
            <p className="text-red-600">{errors.phone?.message}</p>
          </label>
          <label htmlFor="ID">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Cédula de identidad
              </h1>
            </div>
            <div className="flex">
              <select id="IDtype"
                  {...register("IDtype")}
                  type="IDtype"
                  className="p-4 rounded bg-inherit text-black">
                  <option value="V">V</option>  
                  <option value="E">E</option>
                  </select>
            <input
              id="ID"
              {...register("ID")}
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu cédula de identidad"
            />
            </div>
            
            
          </label>
          <label htmlFor="password">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Contraseña</h1>
            </div>
            <input
              id="password"
              {...register("password", {
                required: "Este campo no puede estar vacio",
                minLength:{ value:8,message:"La contraseña debe tener mínimo 8 caracteres"},
              })}
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu contraseña"
              
            />
            <p className="text-red-600">{errors.password?.message}</p>
          </label>
          <label htmlFor="confirmPassword">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Confirmar contraseña
              </h1>
            </div>
            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Este campo no puede estar vacio",
                minLength:{ value:8,message:"La contraseña debe tener mínimo 8 caracteres"},
                validate: (value) => 
                   value === watch("password")||"Las contraseñas no coinciden",
                
              })}
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa nuevamente la contraseña"
              
            />
            <p className="text-red-600">{errors.confirmPassword?.message}</p>
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
          <p className="text-center text-black">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to={REGISTER}
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center underline"
            >
              <span>Inicia sesión. </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </p>
          <p className="text-center text-black">
            ¿Te interesa ser proovedor?{" "}
            <Link
              to={APPLICATION}
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center underline"
            >
              <span>Aplica aqui!. </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

