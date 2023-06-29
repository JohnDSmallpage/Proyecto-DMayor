import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { uploadProfilePic } from "../firebase models/user-service";

const Carrousel = ({photos,bool,editable,send}) => {
    const [currentIndex, setCurrentIndex] = useState(0) ;
    const [PhotoArray,setPhotoArray] = useState([]);
    const [autoSlide,setAutoSlide] = useState(true);

  useEffect(() => {
    const copy = [...photos];
    setPhotoArray(copy);
    if (editable == false) {
      setCurrentIndex(0);
    }
  }, [photos, editable]);

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    const url = await uploadProfilePic(file);
    PhotoArray[currentIndex] = url;
    setPhotoArray(PhotoArray);
    send("PhotoArray", PhotoArray);
  };
  const handlePhotoAdd = async (event) => {
    const file = event.target.files[0];
    const index = PhotoArray.length;
    const url = await uploadProfilePic(file);
    PhotoArray[index] = url;
    setPhotoArray(PhotoArray);
    setCurrentIndex(index);
    send("PhotoArray", PhotoArray);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? PhotoArray.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

    const nextSlide = (auto) => {
        const isLastSlide = currentIndex === PhotoArray.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        if(auto){
            setAutoSlide(false)
        }
    };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    if(autoSlide){
        const timeoutId = setTimeout(() => {
            nextSlide(true);
          }, 7000);
          return () => {
            clearTimeout(timeoutId);
          };
    }
  }, [currentIndex]);

//  const timerInterval = setInterval(
//    nextSlide, 3000);


  return (
    <div className="max-w-full h-full w-full  group">
      <div
        style={{ backgroundImage: `url(${PhotoArray[currentIndex]})` }}
        className="w-full h-full bg-center bg-cover duration-500 flex items-center justify-between px-2"
      >
        {/* Left arrow  */}
        <div className="hidden group-hover:block   text-2.5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={20} />
        </div>
        {/* Right Arrow  */}
        <div className="hidden group-hover:block   text-2.5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={20} />
        </div>

        
      </div>
      {editable && (
        <div className="flex flex-row gap-2 p-3 w-full items-center justify-center">
          <div className="flex flex-col  justify-center w-1/2">
            <p className="text-xl font-bold">Cambiar foto actual</p>
            <input type="file" id="photo-file" onChange={handlePhotoChange} />
          </div>
          <div className="flex flex-col  justify-center w-1/2">
            <p className="text-xl font-bold">Agregar Foto</p>
            <input type="file" id="photo-file" onChange={handlePhotoAdd} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrousel;
