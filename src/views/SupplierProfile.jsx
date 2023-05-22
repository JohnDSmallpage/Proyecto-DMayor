import Inicio from "../images/home-2-line.png";
import Perfil from "../images/account-circle-line.png";
import Verified from "../images/shield-check-fill.png";
import { Link } from "react-router-dom";
import { CATALOGO } from "../routes/Url";

export function SupplierProfile() {
  
  return (
    <div id="main-container" className="flex justify-center items-center">
      <div
        id="internal-container"
        className="flex flex-col justify-center items-center w-[366px] mt-[28px] mb-[28px] gap-[15px]"
      >
        <div
          id="top-container"
          className="flex flex-row w-[366px] h-[115px] bg-[#F3F5F6] rounded-[17px] border-2 gap-[14px]"
        >
          <div
            id="profile-pic"
            className="flex justify-center items-center w-[90px] h-[90px] bg-[#CBCDCD] rounded-[50%] mt-[10px] ml-[19px]"
          >
            <img className="w-[48px] h-[48px]" src={Perfil}></img>
          </div>
          <div
            id="name-user"
            className="flex flex-col w-[191px] h-[82px] mt-[18px]"
          >
            <h1 id="name" className="text-[28px] font-semibold">
              Sebastian Aure
            </h1>
            <div id="user-verification" className="flex flex-row gap-[3px]">
              <h3 id="user" className="text-[16px] text-[#000000A8]">
                Proveedor
              </h3>
              <img className="" src={Verified}></img>
            </div>
          </div>
        </div>

        <div id="bottom-container" className="flex flex-wrap gap-[6px]">
          <button 
            id="option-1"
            className="flex flex-col justify-center items-center w-[180px] h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
          >
            <Link to={CATALOGO}>holalkjfas</Link>
            <img className="w-[30px] h-[30px]" src={Inicio} alt="" />
            <h2
              id="option-1-name"
              className="flex justify-center items-center w-[125px] h-[19px] text-[15px] font-semibold"
            >
              Catalogo
            </h2>
            <h4
              id="option-1-description"
              className="flex justify-center items-center w-[151px] h-[31px] text-[10px]"
            >
              En esta opcion podras ver tu catalogo de productos
            </h4>
          </button>

          <button
            id="option-2"
            className="flex flex-col justify-center items-center w-[180px] h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
          >
            <img className="w-[30px] h-[30px]" src={Inicio} alt="" />
            <h2
              id="option-2-name"
              className="flex justify-center items-center w-[125px] h-[19px] text-[15px] font-semibold"
            >
              Opcion 2
            </h2>
            <h4
              id="option-2-description"
              className="flex justify-center items-center w-[151px] h-[31px] text-[10px]"
            >
              Descripcion de opcion 2
            </h4>
          </button>

          <button
            id="option-3"
            className="flex flex-col justify-center items-center w-[180px] h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
          >
            <img className="w-[30px] h-[30px]" src={Inicio} alt="" />
            <h2
              id="option-3-name"
              className="flex justify-center items-center w-[125px] h-[19px] text-[15px] font-semibold"
            >
              Opcion 3
            </h2>
            <h4
              id="option-3-description"
              className="flex justify-center items-center w-[151px] h-[31px] text-[10px]"
            >
              Descripcion de opcion 3
            </h4>
          </button>
          <button
            id="option-4"
            className="flex flex-col justify-center items-center w-[180px] h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
          >
            <img className="w-[30px] h-[30px]" src={Inicio} alt="" />
            <h2
              id="option-4-name"
              className="flex justify-center items-center w-[125px] h-[19px] text-[15px] font-semibold"
            >
              Opcion 4
            </h2>
            <h4
              id="option-4-description"
              className="flex justify-center items-center w-[151px] h-[31px] text-[10px]"
            >
              Descripcion de opcion 4
            </h4>
          </button>

          <button
            id="option-5"
            className="flex flex-col justify-center items-center w-[180px] h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
          >
            <img className="w-[30px] h-[30px]" src={Inicio} alt="" />
            <h2
              id="option-5-name"
              className="flex justify-center items-center w-[125px] h-[19px] text-[15px] font-semibold"
            >
              Opcion 5
            </h2>
            <h4
              id="option-5-description"
              className="flex justify-center items-center w-[151px] h-[31px] text-[10px]"
            >
              Descripcion de opcion 5
            </h4>
          </button>

          <button
            id="option-6"
            className="flex flex-col justify-center items-center w-[180px] h-[115px] bg-[#F3F5F6] rounded-[17px] gap-[3px] hover:bg-[#59595942] border-2"
          >
            <img className="w-[30px] h-[30px]" src={Inicio} alt="" />
            <h2
              id="option-3-name"
              className="flex justify-center items-center w-[125px] h-[19px] text-[15px] font-semibold"
            >
              Opcion 6
            </h2>
            <h4
              id="option-3-description"
              className="flex justify-center items-center w-[151px] h-[31px] text-[10px]"
            >
              Descripcion de opcion 6
            </h4>
          </button>
        </div>
      </div>
    </div>
  );
}
