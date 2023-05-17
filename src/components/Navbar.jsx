import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIAS, LANDING_PAGE, PROVEEDORES, FAQ } from "../routes/Url";
import DMAYOR_LOGO from "../images/DMAYOR_logo.png";

export function Navbar() {
  return (
    <>
      <header aria-label="Site Header" className="shadow-sm">
        <div className="mx-auto max-w-screen-xl p-4 ">
          <div className="flex items-center justify-between gap-4 lg:gap-10">
            <div className="flex lg:w-0 lg:flex-1">
              <span className="sr-only">Home</span>
              <img src={DMAYOR_LOGO} alt="LOGO DMAYOR" className="w-[180px]" />
            </div>

            <nav
              aria-label="Site Nav"
              className="hidden gap-8 text-sm font-medium md:flex"
            >
              <Link to={LANDING_PAGE}>Home</Link>
              <Link to={CATEGORIAS}>Categorías</Link>
              <Link to={PROVEEDORES}>Proveedores</Link>
              <Link to={FAQ}>Faq</Link>
            </nav>
            <div className=" flex-1 items-end justify-end gap-4  sm:flex">
              <a
                className=" hidden rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500 md:flex"
                href=""
              >
                Log in
              </a>

              <a
                className="rounded-lg bg-[#ff7a00] px-5 py-2 text-sm font-medium text-white"
                href=""
              >
                Registrarse
              </a>
            </div>

            <div className=" md:hidden lg:hidden xl:hidden">
              <button
                className="rounded-lg bg-gray-100 p-2 text-gray-600"
                type="button"
              >
                <span className="sr-only ">Open menu</span>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
