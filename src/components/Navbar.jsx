import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CATEGORIAS,
  LANDING_PAGE,
  PROVEEDORES,
  FAQ,
  REGISTER,
  LOGIN,
  ADMIN,
  SUPPLIER_PROFILE,
  CLIENT_PROFILE
} from "../routes/Url";
import DMAYOR_LOGO from "../images/DMAYOR_logo.png";
import { useUser } from "../firebase models/userContext";
import { logout } from "../firebase models/auth-service";
import Perfil from "../images/account-circle-line.png";
import Registro from "../images/clipboard-line.png";
import Proveedores from "../images/group-line.png";
import Inicio from "../images/home-2-line.png";
import IniciarSesion from "../images/login-box-line.png";
import CerrarSesion from "../images/logout-box-line.png";
import Faq from "../images/question-answer-line.png";
import Categorias from "../images/store-line.png";

export function Navbar() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    await logout();
  };
  return (
    <header aria-label="Site Header" className="shadow-md">
      <div id="main-container" className="mx-auto max-w-screen-xl p-4">
        <div
          id="internal-container"
          className="flex items-center justify-between gap-4 lg:gap-10"
        >
          <div id="hamburguer-menu" className="md:hidden">
            <button className="ml-4" onClick={() => setOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[40px] h-[50px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            <div
              className={`${
                !open && "hidden"
              } bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`}
              onClick={() => setOpen(false)}
            ></div>

            <div
              className={`${
                open ? "w-3/5 sm:w-2/5" : "w-0"
              } bg-[#ff7a00] min-h-screen fixed top-0 left-0 transition-all duration-300`}
            >
              <div className={`${!open && "hidden"} pt-3`}>
                <button
                  className="ml-4 text-white mb-14"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="flex flex-col text-white text-xl  cursor-pointer ">
                  <Link
                    className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                    to={LANDING_PAGE}
                  >
                    <img
                      className="ml-[15px] w-[24px] h-[24px]"
                      src={Inicio}
                      alt=""
                    />
                    Inicio
                  </Link>
                  <Link
                    className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                    to={CATEGORIAS}
                  >
                    <img
                      className="ml-[15px] w-[24px] h-[24px]"
                      src={Categorias}
                      alt=""
                    />
                    Categorías
                  </Link>
                  <Link
                    className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                    to={PROVEEDORES}
                  >
                    <img
                      className="ml-[15px] w-[24px] h-[24px]"
                      src={Proveedores}
                      alt=""
                    />
                    Proveedores
                  </Link>
                  <Link
                    className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                    to={FAQ}
                  >
                    <img
                      className="ml-[15px] w-[24px] h-[24px]"
                      src={Faq}
                      alt=""
                    />
                    FAQ
                  </Link>
                  {!user ? (
                    <div className="flex flex-col  text-white text-xl  cursor-pointer ">
                      <Link
                        className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                        to={LOGIN}
                      >
                        <img
                          className="ml-[15px] w-[24px] h-[24px]"
                          src={IniciarSesion}
                          alt=""
                        />
                        Iniciar Sesion
                      </Link>
                      <Link
                        className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                        to={REGISTER}
                      >
                        <img
                          className="ml-[15px] w-[24px] h-[24px]"
                          src={Registro}
                          alt=""
                        />
                        Registrarse
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col text-white text-xl  cursor-pointer ">
                        {user.Company?(
                        <Link
                        className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                        
                        to={SUPPLIER_PROFILE}
                        
                      >
                        <img
                          className="ml-[15px] w-[24px] h-[24px]"
                          src={Perfil}
                          alt=""
                        />
                        <p>{user.Company}</p>
                      </Link>
                      ):(
                        <Link
                        className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                        
                        to={CLIENT_PROFILE}
                        
                      >
                        <img
                          className="ml-[15px] w-[24px] h-[24px]"
                          src={Perfil}
                          alt=""
                        />
                        <p className="text-black">{user.name}</p>
                      </Link>
                      )}
                      
                      
                      <button
                        className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                        onClick={handleLogout}
                      >
                        <img
                          className="ml-[15px] w-[24px] h-[24px]"
                          src={CerrarSesion}
                          alt=""
                        />
                        Cerrar Sesion
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div id="logo" className="flex">
            <Link to={LANDING_PAGE}>
              {" "}
              <img
                src={DMAYOR_LOGO}
                alt="LOGO DMAYOR"
                className="w-[180px]"
              />{" "}
            </Link>
            <span className="sr-only">Home</span>
          </div>

          <nav
            id="navbar-options"
            aria-label="Site Nav"
            className="hidden gap-8 text-sm font-medium md:flex"
          >
            <Link className="hover:underline" to={LANDING_PAGE}>Inicio</Link>
            <Link className="hover:underline" to={CATEGORIAS}>Categorías</Link>
            <Link className="hover:underline" to={PROVEEDORES}>Proveedores</Link>
            <Link className="hover:underline" to={FAQ}>FAQ</Link>
          </nav>
          {!user ? (
            <div className="flex items-end gap-4">
              <Link
                className=" hidden rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500 md:flex hover:underline"
                to={LOGIN}
              >
                Iniciar Sesion
              </Link>

              <Link
                className="hidden md:flex rounded-lg bg-[#ff7a00] px-5 py-2 text-sm font-medium text-white hover:underline"
                to={REGISTER}
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <div id="profile-container" className="flex flex-row gap-[7px]">
              {user.Company?(
                        <Link
                        className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                        
                        to={SUPPLIER_PROFILE}
                        
                      >
                        <img
                          className="ml-[15px] w-[24px] h-[24px]"
                          src={Perfil}
                          alt=""
                        />
                        <p>{user.Company}</p>
                      </Link>
                      ):(
                        <Link
                        className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                        
                        to={CLIENT_PROFILE}
                        
                      >
                        <img
                          className="ml-[15px] w-[24px] h-[24px]"
                          src={Perfil}
                          alt=""
                        />
                        <p className="text-black">{user.name}</p>
                      </Link>
                      )}
              <button
                onClick={handleLogout}
                className="h-[38px] lg:h-[48px] bg-[#FF914D] text-white  p-2 rounded  hover:underline font-bold hidden md:block"
              >
                Cerrar Sesión{" "}
              </button>
              {user?.admin && <Link className="self-center"  to={ADMIN}>adminView</Link>}
            </div>
            
          )}
          
        </div>
      </div>
    </header>
  );
}
