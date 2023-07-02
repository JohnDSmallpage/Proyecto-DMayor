import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  SEARCH_PAGE,
  CATEGORIAS,
  LANDING_PAGE,
  PROVEEDORES,
  FAQ,
  REGISTER,
  LOGIN,
  ADMIN,
  SUPPLIER_PROFILE,
  CLIENT_PROFILE,
  CHAT,
  FAV_PAGE,
} from "../routes/Url";
import DMAYOR_LOGO from "../images/DMAYOR_logo.png";
import Departamentos from "../images/database-line.png";
import Faq2 from "../images/question-line.png";
import RegistroNav from "../images/clipboard-line-nav.png";
import IniciarSesionNav from "../images/login-box-line-nav.png";
import CerrarSesionNav from "../images/logout-box-line-nav.png";
import ClientNav from "../images/user-client-line-nav.png";
import ProvNav from "../images/user-prov-line-nav.png";
import Camioncito from "../images/truck-line-nav.png";
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
import { Searchbar } from "../components/Searchbar";
import Fav from "../images/estrellavacia1.png";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();
  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };
  return (
    <header
      aria-label="Site Header"
      className="shadow-md sticky top-0 z-10 bg-white"
    >
      <div
        id="main-container"
        className="flex justify-center items-center mx-auto max-w-screen-xl h-[75px] "
      >
        <div
          id="internal-container"
          className="flex items-center justify-between lg:justify-center gap-2"
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
                    onClick={() => setOpen(false)}
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
                    to={SEARCH_PAGE}
                    onClick={() => setOpen(false)}
                  >
                    <img
                      className="ml-[15px] w-[24px] h-[24px]"
                      src={Categorias}
                      alt=""
                    />
                    Departamentos
                  </Link>
                  <Link
                    className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                    to={PROVEEDORES}
                    onClick={() => setOpen(false)}
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
                    onClick={() => setOpen(false)}
                  >
                    <img
                      className="ml-[15px] w-[24px] h-[24px]"
                      src={Faq}
                      alt=""
                    />
                    FAQ
                  </Link>
                 {/* <Link
                    className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                    to={FAV_PAGE}
                    onClick={() => setOpen(false)}
                  >
                    <img
                      className="ml-[15px] w-[24px] h-[24px]"
                      src={Fav}
                      alt=""
                    />
                    Favoritos
                  </Link> */}
                  {!user ? (
                    <div className="flex flex-col  text-white text-xl  cursor-pointer ">
                      <Link
                        className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                        to={LOGIN}
                        onClick={() => setOpen(false)}
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
                        onClick={() => setOpen(false)}
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
                    <div className="flex flex-col text-white text-xl  cursor-pointer">
                      {user.Company ? (
                        <Link
                          className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                          to={SUPPLIER_PROFILE}
                          onClick={() => setOpen(false)}
                        >
                          <img
                            className="ml-[15px] w-[24px] h-[24px]"
                            src={Perfil}
                            alt=""
                          />
                          <p>{user.Company}</p>
                        </Link>
                      ) : (
                        <Link
                          className="flex flex-row items-center gap-[10px] hover:bg-white hover:text-[#FF914D] py-3 mb-2"
                          onClick={() => setOpen(false)}
                          to={CLIENT_PROFILE}
                        >
                          <img
                            className="ml-[15px] w-[24px] h-[24px]"
                            src={Perfil}
                            alt=""
                          />
                          <p>{user.name}</p>
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
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            id="logo"
            className="flex rounded-full hover:bg-[#F3F5F6] px-[8px] hidden md:flex"
          >
            <Link to={LANDING_PAGE}>
              {" "}
              <img
                src={DMAYOR_LOGO}
                alt="LOGO DMAYOR"
                className="w-[150px]"
              />{" "}
            </Link>
            <span className="sr-only">Home</span>
          </div>

          <nav
            aria-label="Site Nav"
            className="hidden text-sm font-bold md:flex"
          >
            <Link
              className="flex flex-row items-center bg-white  rounded-full hover:bg-[#F3F5F6] py-[5px] px-[5px] rounded-full"
              to={SEARCH_PAGE}
            >
              <img
                className="pl-[10px] pr-[2.5px] py-[10px]"
                src={Departamentos}
              ></img>
              <p className="pr-[10px] pl-[2.5px]">Departamentos</p>
            </Link>

            <Link
              className="flex flex-row items-center bg-white   rounded-full hover:bg-[#F3F5F6] py-[5px] px-[5px] rounded-full"
              to={FAQ}
            >
              <img className="pl-[10px] pr-[2.5px] py-[10px]" src={Faq2}></img>
              <p className="pr-[10px] pl-[2.5px]">FAQ</p>
            </Link>
            
          </nav>

          <div id="buscador" className="">
            <Searchbar />
          </div>

          {!user ? (
            <div className="text-sm font-bold flex-1 items-end justify-end hidden md:flex">
              <Link
                className="flex flex-row items-center bg-white  rounded-full hover:bg-[#F3F5F6] py-[5px] px-[5px] rounded-full"
                to={LOGIN}
              >
                <img
                  className="pl-[10px] pr-[2.5px] py-[10px]"
                  src={IniciarSesionNav}
                ></img>
                <p className="pr-[10px] pl-[2.5px]">Iniciar Sesión</p>
              </Link>

              <Link
                className="flex flex-row items-center bg-white  rounded-full hover:bg-[#F3F5F6] py-[5px] px-[5px] rounded-full"
                to={REGISTER}
              >
                <img
                  className="pl-[10px] pr-[2.5px] py-[10px]"
                  src={RegistroNav}
                ></img>
                <p className="pr-[10px] pl-[2.5px]">Registrarse</p>
              </Link>
            </div>
          ) : (
            <div
              id="profile-container"
              className="text-sm font-bold flex-1 items-center justify-center  hidden md:flex"
            >
              {user.Company ? (
                <Link
                  className="flex flex-row items-center bg-white  rounded-full hover:bg-[#F3F5F6] py-[5px] px-[5px] rounded-full"
                  to={SUPPLIER_PROFILE}
                >
                  <img
                    className="pl-[10px] pr-[2.5px] py-[10px]"
                    src={ProvNav}
                  ></img>
                  <p className="pr-[10px] pl-[2.5px]">{user.Company}</p>
                </Link>
              ) : (
                <Link
                  className="flex flex-row items-center bg-white  rounded-full hover:bg-[#F3F5F6] py-[5px] px-[5px] rounded-full"
                  to={CLIENT_PROFILE}
                >
                  <img
                    className="pl-[10px] pr-[2.5px] py-[10px]"
                    src={ClientNav}
                  ></img>
                  <p className="pr-[10px] pl-[2.5px]">{user.name}</p>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hidden text-sm font-bold md:flex flex flex-row items-center bg-white  rounded-full hover:bg-[#F3F5F6] py-[5px] px-[5px] rounded-full"
              >
                <img
                  className="pl-[10px] pr-[2.5px] py-[10px]"
                  src={CerrarSesionNav}
                ></img>
                <p className="pr-[10px] pl-[2.5px]">Cerrar Sesión</p>
              </button>
              {user?.admin && (
                <Link className="self-center" to={ADMIN}>
                  adminView
                </Link>
              )}
            </div>
          )}
          
        
          {/*<div id="favoritos" className="">
          <Link
              className="flex flex-row items-center bg-white   rounded-full hover:bg-[#F3F5F6] py-[5px] px-[5px] rounded-full"
              to={FAV_PAGE}
            >
              <img className="pl-[10px] pr-[2.5px] py-[10px]" src={Fav}></img>
              <p className="pr-[10px] pl-[2.5px]">Favoritos</p>
            </Link>
              </div>*/}
        </div>
      </div>
    </header>
  );
}
