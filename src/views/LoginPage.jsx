import { async } from "@firebase/util";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, signInWithGoogle } from "../firebase models/auth-service";
import { LANDING_PAGE, REGISTER } from "../routes/Url";


export function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage,setErrorMessage]=useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSigninWithGoogle = async () => {
    await signInWithGoogle();

  };

  const onSubmit = async (event) => {
    event.preventDefault(); //evita que el form recargue la pagina
    const { email, password } = formData; //form destructurado
    const confirmation = await logInWithEmailAndPassword(email, password);
    setErrorMessage(confirmation)
  };
  //en cada input utiliza la informacion del campo para agregarla al form existente
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="md:max-w-lg max-w-sm mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 mt-8 sm:mt-4 h-[600px]">
      <h1 className="text-3xl lg:text-4xl font-medium text-center p-2">Iniciar sesión</h1>

      <div className="my-5">
        <button
          onClick={handleSigninWithGoogle}
          className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-900 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-6 h-6"
            alt=""
          />{" "}
          <span>Continuar con Google</span>
        </button>
      </div>
      <form action="" onSubmit={onSubmit} className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">
              Correo electrónico
            </p>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleOnChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu correo electrónico"
            />
          </label>
          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">Contraseña</p>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleOnChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa tu contraseña"
            />
          </label>
          <p className="text-red-600">{errorMessage}</p>
          <div className="flex flex-row justify-between">
            <div>
              <label htmlFor="remember" className="text-[14px] flex">
                <input
                  type="checkbox"
                  id="remember"
                  className=" w-4 h-4 border-slate-200 focus:bg-indigo-600 m-2"
                />
                <p className="mt-1">Recuérdame</p>
              </label>
            </div>
            <div>
              <a href="#" className="font-medium text-indigo-600 text-[14px]">
                ¿Has olvidado tu contraseña?
              </a>
            </div>
          </div>
          <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
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
            <span>Iniciar sesión</span>
          </button>
          <p className="text-center">
            ¿Aún no tienes una cuenta?{" "}
            <Link
              to={REGISTER}
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center underline"
            >
              <span>¡Regístrate ahora! </span>
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