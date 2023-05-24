import React from "react";
import { useUser } from "../firebase models/userContext";

export function ClientInfo() {
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
            <h1 className="text-[#303030] font-semibold">Nombre del cliente</h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.name}
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
          <div id="cedula" className="flex flex-col md:flex-row ml-[20px] ">
            <h1 className="text-[#303030] font-semibold">
              Documento de identidad
            </h1>
            <p className="md:absolute md:ml-[300px] text-2xl md:text-[16px]">
              {user.ID}
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
