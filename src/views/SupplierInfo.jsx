import React from "react";
import { useUser } from "../firebase models/userContext";

export function SupplierInfo() {
  const { user, isLoading } = useUser();

  return (
    <div
      id="main-container"
      className="flex justify-center items-center mt-[29px]"
    >
      <div
        id="internal-container"
        className="flex flex-col w-screen mx-[14px]  md:mx-[150px] gap-[10px]"
      >
        <h1 id="title" className="text-xl font-semibold ml-[20px]">
          Datos de la cuenta
        </h1>

        <div
          id="info-container"
          className="flex flex-col py-[25px] bg-[#F3F5F6] rounded-[17px] border-2 gap-[15px]"
        >
          <div id="fotoPerfil" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Foto de perfil</h1>
            <img className="md:absolute md:ml-[300px]"></img>
          </div>
          <hr></hr>
          <div id="nombre" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">
              Nombre del proveedor
            </h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.Company}
            </p>
          </div>
          <hr></hr>
          <div id="correo" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Correo electronico</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.email}
            </p>
          </div>
          <hr></hr>
          <div id="telefono" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Telefono</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.phone}
            </p>
          </div>
          <hr></hr>
          <div id="direccion" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Direccion</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.Address}
            </p>
          </div>
          <hr></hr>
          <div id="descripcion" className="flex flex-col md:flex-row ml-[20px]">
            <h1 className="text-[#303030] font-semibold">Descripcion</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.Description}
            </p>
          </div>
          <hr></hr>
          <div
            id="fechaCreacion"
            className="flex flex-col md:flex-row ml-[20px]"
          >
            <h1 className="text-[#303030] font-semibold">Fecha de creacion</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.CreationDate}
            </p>
          </div>
          <hr></hr>
          <div
            id="representacionLegal"
            className="flex flex-col md:flex-row ml-[20px] "
          >
            <h1 className="text-[#303030] font-semibold">
              Representacion Legal
            </h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.LegalRepresentative}
            </p>
          </div>
          <hr></hr>
          <div id="rif" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Rif</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.Rif}
            </p>
          </div>
          <hr></hr>
          <div id="campo" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">Campo Laboral</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.WorkField}
            </p>
          </div>
        </div>
        <div id="edit-button" className="flex justify-center">
          <button className="bg-[#FF914D] rounded mb-[10px] h-[50px] w-[250px] md:w-[200px] text-white text-[20px] hover:underline font-semibold">
            Editar datos
          </button>
        </div>
      </div>
    </div>
  );
}
