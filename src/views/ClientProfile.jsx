import Inicio from "../images/home-2-line.png";
import Perfil from "../images/user-3-line.png";
import Client from "../images/shopping-basket-fill.png";
import Chat from "../images/message-2-line.png";
import Catalogo from "../images/file-list-3-line.png";

import { useUser } from "../firebase models/userContext";
import { Link } from "react-router-dom";
import { CHAT, CLIENT_CHAT, HISTORY } from "../routes/Url";
import { CLIENT_INFO } from "../routes/Url";
import { FAV_PAGE } from "../routes/Url";

export function ClientProfile() {
  const { user, isLoading } = useUser();

  return (
    <div id="main-container" className="flex justify-center items-center">
      <div
        id="internal-container"
        className="flex flex-col justify-center items-center w-screen mx-[14px]  md:mx-[150px] gap-[15px] mt-[29px]"
      >
        <div
          id="top-container"
          className="flex flex-row w-full h-[115px] bg-[#F3F5F6] rounded-[17px] border-2 gap-[14px]"
        >
          <div
            id="profile-pic"
            className="flex justify-center items-center w-[90px] h-[90px] bg-[#CBCDCD] rounded-[50%] mt-[10px] ml-[19px]"
          >
            <img className="w-[48px] h-[48px]" src={Perfil}></img>
          </div>
          <div
            id="name-user"
            className="flex flex-col w-full h-[82px] mt-[18px]"
          >
            <h1 id="name" className="text-[28px] font-semibold">
              {user.name}
            </h1>
            <div id="user-verification" className="flex flex-row gap-[3px]">
              <h3 id="user" className="text-[16px] text-[#000000A8]">
                Cliente
              </h3>
              <img className="" src={Client}></img>
            </div>
          </div>
        </div>

        <div
          id="bottom-container"
          className="flex flex-row justify-between w-full gap-[15px]"
        >
          <Link className="w-1/3" to={CHAT}>
            <button
              id="option-1"
              className="flex flex-col justify-center items-center w-full h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
            >
              <img className="w-[30px] h-[30px]" src={Chat} alt="" />
              <h2
                id="chat"
                className="flex justify-center items-center  text-xl font-semibold"
              >
                Chats
              </h2>

              <h4
                id="chat-description"
                className="flex justify-center items-center  text-sm"
              >
                Acá podrás encontrar tus chats con los proveedores
              </h4>
            </button>
          </Link>

          <Link className="w-1/3" to={CLIENT_INFO}>
            <button
              id="option-2"
              className="flex flex-col justify-center items-center w-full h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
            >
              <img className="w-[30px] h-[30px]" src={Perfil} alt="" />
              <h2
                id="datos"
                className="flex justify-center items-center text-xl font-semibold"
              >
                Datos
              </h2>
              <h4
                id="datos-description"
                className="flex justify-center items-center text-sm"
              >
                Ver datos de la cuenta del usuario
              </h4>
            </button>
          </Link>
          <Link className="w-1/3" to={HISTORY}>
            <button
              id="option-3"
              className="flex flex-col justify-center items-center w-full h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
            >
              <img className="w-[30px] h-[30px]" src={Catalogo} alt="" />
              <h2
                id="history"
                className="flex justify-center items-center text-xl font-semibold"
              >
                Historial
              </h2>
              <h4
                id="historial-description"
                className="flex justify-center items-center text-sm"
              >
                Ve el historial de tus compras
              </h4>
            </button>
          </Link>
          <Link className="w-1/3" to={FAV_PAGE}>
            <button
              id="option-4"
              className="flex flex-col justify-center items-center w-full h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
            >
              <img className="w-[30px] h-[30px]" src={Catalogo} alt="" />
              <h2
                id="history"
                className="flex justify-center items-center text-xl font-semibold"
              >
                Favoritos
              </h2>
              <h4
                id="historial-description"
                className="flex justify-center items-center text-sm"
              >
                Ve tus productos favoritos
              </h4>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
