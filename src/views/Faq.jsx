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
    <>
      <div className="flex justify-center items-center font-bold h-[250px] bg-black">
        <Carrousel photos={slides} bool={true} />
      </div>

      <div>Faq</div>
      <div>hola</div>
    </>
  );
}
