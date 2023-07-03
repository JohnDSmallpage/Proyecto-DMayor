import React, { useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "../firebase models/userContext";
import dmayor from "../images/dmayor.png";
import phone from "../images/phone.png";
import location from "../images/location.png";
import email from "../images/email.png";
import Carrousel from "../components/Carrousel";
import {
  getProductsBySupplier,
  getUserProfile,
  getUserProfileById,
  UpdateProfile,
  uploadProfilePic,
} from "../firebase models/user-service";
import { searchContext } from "../firebase models/SearchContext";
import { Product } from "../components/Product";
import { Link, useParams } from "react-router-dom";
import { CATALOG } from "../routes/Url";
import { useForm } from "react-hook-form";
import { store } from "../firebase models/Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function SupplierInfo() {
  const { user, isLoading } = useUser();
  const { id } = useParams();
  // const navigate = useNavigate();

  const [products, setProducts] = useState();
  const [editable, setEditable] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoArray, setPhotoArray] = useState();
  const [profileUser, setProfileUser] = useState();

  const getUserProfile = async (id) => {
    const data = await getUserProfileById(id);
    console.log(data);
    setProfileUser(data);
    console.log(data)
    setPhotoArray(data?.PhotoArray);
  };

  const productSearched = useContext(searchContext);
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(user),
    shouldUnregister: resetForm,
  });
  function getDefaultValues(defaultValues) {
    return useMemo(() => {
      const initialValues = {};
      for (const key in defaultValues) {
        initialValues[key] = defaultValues[key];
      }
      return initialValues;
    }, [defaultValues]);
  }
  const handleResetForm = () => {
    setEditable(false);
    setResetForm(true);
    setTimeout(() => setResetForm(false), 0);
  };
  const onSubmit = async (data) => {
    //form destructurado
    if (editable) {
      setPhotoArray(data.PhotoArray);
      UpdateProfile(data);
      setEditable(false);
    } else {
      setEditable(true);
    }
  };
  const getSupplierProducts = async () => {
    const idProducts = profileUser.catalog;
    const data = await getProductsBySupplier(idProducts);
    setProducts(data);
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoUrl(reader.result);
    };
    const url = await uploadProfilePic(file);
    setValue("ProfilePic", url);
  };

  useEffect(() => {
    if (!profileUser) {
      getUserProfile(id);
    }
    if (profileUser && !products) {
      getSupplierProducts();
    }
    productSearched.setSupplierMode(true);
  }, [products, profileUser]);

  return (
    <div id="main-container" className="flex flex-col  bg-gray-100 ">
      <form
        action=""
        id="form"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <div
          id="carrusel"
          className="h-[200px] w-full flex items-center justify-center pb-0 bg-white shadow-xl"
        >
          <div className="bg-white  w-full h-full p-4 shadow-xl rounded">
            {profileUser?.PhotoArray ? (
              !editable ? (
                <Carrousel photos={photoArray} editable={editable} />
              ) : (
                <Carrousel
                  photos={photoArray}
                  editable={editable}
                  send={setValue}
                />
              )
            ) : (
              <Carrousel photos={[]} editable={editable} send={setValue} />
            )}
          </div>
        </div>
        <div
          id="foto-info-catalogo"
          className=" flex gap-3 p-3 h-[500px]  w-full "
        >
          {photoUrl != null ? (
            <img src={photoUrl} alt="Foto cargada" className="w-1/3 h-full" />
          ) : (
            <img
              src={profileUser?.ProfilePic}
              alt=""
              className="h-full w-1/3 "
            />
          )}
          {editable && (
            <div className="flex flex-col">
              <p className="text-xl font-bold">Agregar foto de Perfil</p>
              <input id="ProfilePic" type="file" onChange={handlePhotoChange} />
            </div>
          )}
          <div className="bg-white  w-full h-full p-4 shadow-xl rounded">
            <h1 className="text-2xl font-bold text-gray-800 font-serif">
              {profileUser?.Company}
            </h1>
            <p className="mb-4 text-xs text-gray-500 ">
              Desde {profileUser?.CreationDate}
            </p>
            {!editable ? (
              <>
                <ol className="flex flex-col justify-around gap-[8px]">
                  <li className="flex items-center font-serif gap-2">
                    <img className="w-[25px]" src={location} alt="" />
                    {profileUser?.Address}
                  </li>
                  <li className="flex items-center font-serif gap-2">
                    <img className="w-[25px]" src={phone} alt="" />
                    {profileUser?.phone}
                  </li>
                  <li className="flex items-center font-serif gap-2">
                    <img className="w-[25px]" src={email} alt="" />
                    {profileUser?.email}
                  </li>
                </ol>
                <h1 className="text-2xl font-bold mt-4 text-gray-800 font-serif">
                  Acerca de nosotros
                </h1>
                <p>{profileUser?.Description}</p>
              </>
            ) : (
              <>
                <div className="flex flex-col  gap-[8px] h-full">
                  <div className="flex gap-2">
                    <img className="w-[25px]" src={location} alt="" />
                    <input
                      id="Address"
                      {...register("Address")}
                      type="text"
                      placeholder={profileUser?.Address}
                      className="flex items-center font-serif gap-2 w-full border"
                    />
                  </div>
                  <p className="text-red-600">{errors.Address?.message}</p>
                  <div className="flex gap-2">
                    <img className="w-[25px]" src={phone} alt="" />
                    <input
                      id="phone"
                      {...register("phone", {
                        pattern: {
                          value: /^[0-9]+$/i,
                          message: "Ingrese un numero de telefono Valido",
                        },
                        minLength: {
                          value: 11,
                          message: "Ingrese un numero de telefono Valido",
                        },
                        maxLength: {
                          value: 11,
                          message: "Ingrese un numero de telefono Valido",
                        },
                      })}
                      type="text"
                      placeholder={profileUser?.phone}
                      className="flex items-center font-serif gap-2 w-full border"
                    />
                  </div>
                  <p className="text-red-600">{errors.phone?.message}</p>
                  <div className="flex gap-2">
                    <img className="w-[25px]" src={email} alt="" />
                    <input
                      id="email"
                      disabled
                      type="email"
                      placeholder={profileUser.email}
                      className="flex items-center font-serif gap-2 w-full border"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold mt-4 text-gray-800 font-serif">
                      Acerca de nosotros
                    </h1>
                    <p className="text-red-600">
                      {errors.Description?.message}
                    </p>
                    <textarea
                      id="Description"
                      {...register("Description", {
                        minLength: {
                          value: 10,
                          message:
                            "Debe dar una descripcion mínima de 10 caracteres",
                        },
                        maxLength: {
                          value: 200,
                          message: "Descripcion no máxima de 200 caracteres",
                        },
                      })}
                      className="w-full h-full border"
                      placeholder={profileUser?.Description}
                    />
                  </div>
                </div>
              </>
            )}
            {user?.id == profileUser?.id ? (
              editable ? (
                <div className="flex flex-row justify-evenly gap-5 p-3">
                  <Link
                    className="w-full py-3 font-medium text-white bg-[#ff7a00] hover:bg-[#ff8800] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                    onClick={handleResetForm}
                    type="button"
                  >
                    cancel
                  </Link>
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
                    <span>Confirmar</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <button className="w-3/4 self-center py-3 m-4  font-medium text-white bg-[#ff7a00] hover:bg-[#ff8800] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    Editar Perfil
                  </button>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col w-full gap-4 items-center justify-center p-3 pb-0 bg-white shadow-xl">
            <h1 className="text-2xl text-center text-gray-800 font-serif font-bold">
              Nuestros productos
            </h1>
            <div className="flex flex-wrap">
              {products == null ? (
                <div>No hay resultados para su búsqueda</div>
              ) : (
                products?.map((product, idx) => (
                  <>
                    <Product info={product} key={idx} />
                  </>
                ))
              )}
            </div>
            {user?.id == profileUser?.id ? (
              <Link
                to={CATALOG}
                className="text-orange-600 text-center font-bold"
              >
                Ver catalogo Completo{">"}
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
