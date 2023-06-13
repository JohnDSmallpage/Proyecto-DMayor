import React from "react";
import Carrousel from "../components/Carrousel";

export function Faq() {
  const slides = [
    {
      url: "https://wallpapercave.com/wp/wp7832396.jpg",
    },
    {
      url: "https://wallpapercave.com/wp/wp7530211.jpg",
    },
    {
      url: "https://wallpapercave.com/wp/wp6836093.jpg",
    },
    {
      url: "https://wallpapercave.com/wp/wp7110711.jpg",
    },
    {
      url: "https://wallpapercave.com/wp/wp3079202.jpg",
    },
  ];
  return (
    <div id="main-container" className="flex justify-center items-center">
      <div
        id="internal-container"
        className="my-5 mx-5 flex flex-col justify-center gap-[10px]"
      >
        <h1 className="text-xl font-semibold ml-[20px]">Preguntas frecuentes</h1>
        <div
          id="preguntas"
          className="flex flex-col gap-4 p-4 bg-[#F3F5F6] rounded-[17px] border-2"
        >
          <div id="pregunta-1" className="">
            <p className="font-semibold text-xl mb-2">¿Cómo puedo registrarme como cliente D'Mayor?</p>
            <p>
              R: Para registrarte como cliente en D'Mayor, debes
              hacer clic en el botón de "Registro" y completar el formulario con
              tus datos personales y de contacto. Una vez que hayas completado
              el formulario, recibirás un correo electrónico de confirmación
              para activar tu cuenta.
            </p>
          </div>
          <hr></hr>
          <div id="pregunta-2" className="">
            <p className="font-semibold text-xl mb-2">¿Cómo puedo convertirme en vendedor en D'Mayor?</p>
            <p>
              R: Para convertirte en vendedor en D'Mayor, debes
              hacer clic en el botón de "Registro" y seleccionar la opción de
              "Vendedor". Luego, debes completar el formulario con tus datos
              personales y de contacto, así como la información de tus
              productos. Una vez que hayas completado el registro, nuestro
              equipo revisará tu solicitud y te informará si ha sido aprobada.
            </p>
          </div>
          <hr></hr>
          <div id="pregunta-3" className="">
            <p className="font-semibold text-xl mb-2">¿Cómo puedo encontrar los productos que necesito?</p>
            <p>
              R: Puedes buscar los productos que necesitas utilizando el
              buscador que se encuentra en la página principal del marketplace.
              También puedes navegar por las diferentes categorías de productos
              que ofrecemos y filtrar los resultados según tus necesidades.
            </p>
          </div>
          <hr></hr>
          <div id="pregunta-4" className="">
            <p className="font-semibold text-xl mb-2">¿Cómo puedo realizar una compra en D'Mayor?</p>
            <p>
              R: Para realizar una compra en D'Mayor, debes
              seleccionar los productos que deseas y agregarlos al "Camioncito de
              Compras". Luego, debes proceder al pago utilizando uno de nuestros
              métodos de pago disponibles. Una vez que hayas completado el pago,
              recibirás un correo electrónico de confirmación con los detalles
              de tu compra.
            </p>
          </div>
          <hr></hr>
          <div id="pregunta-5" className="">
            <p className="font-semibold text-xl mb-2">¿Puedo cancelar una compra después de haberla realizado?</p>
            <p>
              R: No es posible cancelar una compra después de haberla realizado.
              Sin embargo, puedes ponerte en contacto con nuestro equipo de
              atención al cliente para buscar una solución en caso de que tengas
              algún problema con tu compra.
            </p>
          </div>
          <hr></hr>
          <div id="pregunta-6" className="">
            <p className="font-semibold text-xl mb-2">¿Cómo puedo realizar una devolución de un producto?</p>
            <p>
              R: Para realizar una devolución de un producto, debes ponerte en
              contacto con nuestro equipo de atención al cliente y proporcionar
              los detalles de tu compra y el motivo de la devolución. Nuestro
              equipo te indicará los pasos a seguir para realizar la devolución
              y procesar el reembolso correspondiente.
            </p>
          </div>
          <hr></hr>
          <div id="pregunta-7" className="">
            <p className="font-semibold text-xl mb-2">¿Cuáles son los métodos de pago disponibles?</p>
            <p>
              R: Aceptamos varios métodos de pago, incluyendo transferencias
              bancarias, depósitos en efectivo, pago móvil y tarjetas de
              crédito/débito. Puedes consultar los detalles de los métodos de
              pago disponibles en la sección de pagos de nuestro sitio web.
            </p>
          </div>
          <hr></hr>
          <div id="pregunta-8" className="">
            <p className="font-semibold text-xl mb-2">¿Cuál es el tiempo de entrega de los productos?</p>
            <p>
              R: El tiempo de entrega de los productos puede variar dependiendo
              de la disponibilidad y la ubicación del vendedor. Sin embargo, en
              general, el tiempo de entrega suele ser de 3 a 5 días hábiles para
              pedidos dentro de Venezuela.
            </p>
          </div>
          <hr></hr>
          <div id="pregunta-9" className="">
            <p className="font-semibold text-xl mb-2">¿Qué hago si tengo un problema con un producto que compré?</p>
            <p>
              R: Si tienes algún problema con un producto que compraste en
              D'Mayor, debes ponerte en contacto con nuestro equipo
              de atención al cliente lo antes posible. Nuestro equipo te ayudará
              a resolver el problema y buscar una solución satisfactoria para
              ambas partes.
            </p>
          </div>
          <hr></hr>
          <div id="pregunta-10" className="">
            <p className="font-semibold text-xl mb-2">¿Cómo puedo contactar al vendedor de un producto?</p>
            <p>
              R: Puedes contactar al vendedor de un producto utilizando la
              función de mensajería que se encuentra en la página del producto.
              También puedes ponerte en contacto con nuestro equipo de atención
              al cliente para que te ayudemos a contactar al vendedor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
