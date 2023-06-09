import { ref } from "../../node_modules/firebase/storage";
import React, { useState } from "react";
import { store, db } from "../firebase models/Config";
import { useForm, useWatch } from "react-hook-form";
import { registerProduct } from "../firebase models/auth-service";
import { uploadPhoto } from "../firebase models/user-service";
import { useUser } from "../firebase models/userContext";
import { useNavigate } from "react-router-dom";
import { CATALOG } from "../routes/Url";

export const AddProduct = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const [error, setError] = useState("");
  const [values, setValues] = useState({});
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [errors2, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const types = ["image/png", "image/jpeg"]; //tipo de imagen

  // const photoHandler = (e) => {
  //   let selectedFile = e.target.files[0];
  //   if (selectedFile && types.includes(selectedFile.type)) {
  //     setPhoto(selectedFile);
  //     setError("");
  //   } else {
  //     setPhoto(null);
  //     setError("Por favor selecciona un tipo de imagen válido: png o jpeg");
  //   }
  // };

  const handleKeyInputChange = (event) => {
    setKeyInput(event.target.value);
    setErrors((prevState) => ({
      ...prevState,
      key: !Number.isInteger(Number(event.target.value)),
    }));
  };

  const handleValueInputChange = (event) => {
    setValueInput(event.target.value);
    setErrors((prevState) => ({
      ...prevState,
      value:
        isNaN(Number(event.target.value)) ||
        Number(event.target.value) < 1 ||
        Number(event.target.value) > 99,
    }));
  };

  const handleAddKeyValue = () => {
    if (keyInput && valueInput) {
      setValues((prevState) => ({ ...prevState, [keyInput]: valueInput }));
      setKeyInput("");
      setValueInput("");
      setErrors({});
    } else {
      setErrors((prevState) => ({
        ...prevState,
        key: !keyInput,
        value: !valueInput,
      }));
    }
  };

  const handleRemoveKeyValue = (key) => {
    const { [key]: removedValue, ...rest } = values;
    setValues(rest);
  };

  //Añadir producto
  const addProduct = async (data) => {
    const { ...extraData } = data; //form destructurado
    data = { ...data, discounts: values };
    data.name = data.name.toLowerCase();
    data.category = data.category.toLowerCase();
    data.description = data.description.toLowerCase();
    data.supplierName = user.Company;
    data.supplierId = user.uid;
    data.photos = [];
    const result = await uploadPhoto(file);
    data.photos.push(result);
    data.hidden = false;

    for (let key in data.discounts) {
      if (data.discounts.hasOwnProperty(key)) {
        const value = data.discounts[key];
        const percentValue = parseFloat(value) / 100;
        data.discounts[key] = percentValue.toString();
      }
    }

    registerProduct(data, user);
    setTimeout(navigate(CATALOG), 2000);
  };

  return (
    <div className="md:max-w-lg max-w-sm mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 my-5">
      <h1 className="text-3xl lg:text-4xl font-medium text-center p-2">
        Añadir Nuevo Producto
      </h1>

      <form action="" id="form" onSubmit={handleSubmit(addProduct)}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="productName">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Nombre del producto
              </h1>
            </div>

            <input
              id="name"
              type="text"
              name="name"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa el nombre del producto. Ej: Licuadora. "
              {...register("name", {
                required: "Este campo no puede estar vacio",
              })}
            />
            <p className="text-red-600">{errors.name?.message}</p>
          </label>

          <label htmlFor="category">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Categoría</h1>
            </div>

            <select
              id="category"
              type="text"
              name="category"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa la categoría del producto. Ej: Electrodomésticos. "
              {...register("category", {
                required: "Este campo no puede estar vacio",
              })}
            >
              <option value="Textiles">Textiles</option>
              <option value="Construcción">Construcción</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Electrodomésticos">Electrodomésticos</option>
              <option value="Ganadería">Agricultura</option>
              <option value="Agricultura">Ganadería</option>
              <option value="Químicos">Químicos</option>
              <option value="Salud">Salud</option>
              <option value="Mecánica">Mecánica</option>
              <option value="Hogar">Hogar</option>
            </select>

            <p className="text-red-600">{errors.category?.message}</p>
          </label>
          <label htmlFor="description">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">Descripción</h1>
            </div>

            <input
              id="description"
              type="text"
              name="description"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa la descripción del producto. Ej: Color rojo "
              {...register("description", {
                required: "Este campo no puede estar vacio",
                maxLength: { value: 250, message: "Máximo 100 caracteres" },
              })}
            />
            <p className="text-red-600">{errors.description?.message}</p>
          </label>

          <label htmlFor="price">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Precio por unidad ($)
              </h1>
            </div>

            <input
              id="price"
              type="number"
              name="price"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa el precio del producto. Ej: 45"
              {...register("price", {
                required: "Este campo no puede estar vacio",
                pattern: {
                  value: /^[0-9]+(\.[0-9]+)?$/,
                  message: "El precio debe ser un número",
                },
                min: { value: 0, message: "El precio debe ser mayor a 0" },
              })}
            />
            <p className="text-red-600">{errors.price?.message}</p>
          </label>

          <label htmlFor="unity">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Unidad de venta
              </h1>
            </div>

            <select
              id="unity"
              type="text"
              name="unity"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa la unidad del producto. Ej: Kilos/Toneladas"
              {...register("unity", {
                required: "Este campo no puede estar vacio",
              })}
            >
              <option value="Metros">Metros</option>
              <option value="Centrímetros">Centímetros</option>
              <option value="Kg">Kg</option>
              <option value="ft">ft</option>
              <option value="gramos">gramos</option>
              <option value="Cajas">Cajas</option>
              <option value="Paletas">Paletas</option>
              <option value="Unidades">Unidades</option>
            </select>

            <p className="text-red-600">{errors.unity?.message}</p>
          </label>

          <label htmlFor="availableQuantity">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Cantidad disponible
              </h1>
            </div>

            <input
              id="availableQuantity"
              type="number"
              name="availableQuantity"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingresa la cantidad disponible de producto. Ej: 45"
              {...register("availableQuantity", {
                required: "Este campo no puede estar vacio",
                pattern: {
                  value: /^[0-9]+$/i,
                  message:
                    "La cantidad disponible no puede contener letras y debe ser un número entero",
                },
                min: {
                  value: 0,
                  message: "La cantidad disponible debe ser mayor a 0",
                },
              })}
            />
            <p className="text-red-600">{errors.availableQuantity?.message}</p>
          </label>

          <label htmlFor="discount">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Porcentaje de Descuento
              </h1>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-col w-full gap-2">
                <input
                  type="text"
                  name="keyInput"
                  value={keyInput}
                  onChange={handleKeyInputChange}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Cantidad de productos"
                ></input>
                {errors2.key && <span>La clave debe ser un número entero</span>}
                <input
                  type="text"
                  name="valueInput"
                  value={valueInput}
                  onChange={handleValueInputChange}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Porcentaje de descuento (%)"
                />
                {errors2.value && (
                  <span>El valor debe ser un número entre 1 y 99</span>
                )}
                <button
                  onClick={handleAddKeyValue}
                  type="button"
                  disabled={errors2.key || errors2.value}
                  className="w-full py-2 mt-2 font-medium text-white bg-[#ff7a00] hover:bg-[#ff8800] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  Agregar rango
                </button>
                <ul>
                  {Object.entries(values).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}{" "}
                      <button
                        type="button"
                        className=" ml-2 p-2 mt-2 font-medium text-white bg-red-800 hover:bg-[#ff8800] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                        onClick={() => handleRemoveKeyValue(key)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </label>

          <label htmlFor="photo">
            <div className="flex flex-row">
              <h1 className="font-medium text-slate-700 pb-2">
                Imagen del producto
              </h1>
            </div>

            <div className="flex flex-col  py-1 mt-2">
              <h1 className="font-medium text-slate-700 pb-2 text-sm">
                Subir foto del producto
              </h1>
              <div className="flex justify-center">
                <img className="w-[110px] h-[110px] mb-2" src={image} alt="" />
              </div>

              <input
                type="file"
                name="profilePic"
                onChange={(e) => {
                  setFile(e.target.files[0]),
                    setImage(URL.createObjectURL(e.target.files[0]));
                }}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              />
            </div>

            <input />
          </label>

          <button
            className="w-full py-3 font-medium text-white bg-[#ff7a00] hover:bg-[#ff8800] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            type="submit"
          >
            
            <span>Añadir producto</span>
             <p className="text-xl">+</p> 
          </button>
        </div>
      </form>
      {error && <span>{error}</span>}
    </div>
  );
};
