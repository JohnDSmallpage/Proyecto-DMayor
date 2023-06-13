import React, {useEffect, useState} from 'react'
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'
import { uploadProfilePic } from '../firebase models/user-service';

const Carrousel = ({photos,bool,editable,send}) => {
    const [currentIndex, setCurrentIndex] = useState(0) ;
    const [PhotoArray,setPhotoArray] = useState([]);

    

    useEffect(() => {
        const copy = [...photos];
        setPhotoArray(copy);
        if(editable == false){
            setCurrentIndex(0);
        }
    },[photos,editable]);

    const handlePhotoChange = async (event) => {
        const file = event.target.files[0];
        const url = await uploadProfilePic(file);
        PhotoArray[currentIndex] = url; 
            setPhotoArray(PhotoArray);
            send("PhotoArray",PhotoArray)
      };
      const handlePhotoAdd = async (event) => {
        const file = event.target.files[0];
        const index = PhotoArray.length;
        const url = await uploadProfilePic(file);
            PhotoArray[index] = url; 
            setPhotoArray(PhotoArray); 
            setCurrentIndex(index);
            send("PhotoArray",PhotoArray)
      };
    
  
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? PhotoArray.length -1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === PhotoArray.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

    return (
    <div className='w-full h-full  group flex-col flex items-center justify-center overflow-hidden'>
        <div 
            style={{backgroundImage: `url(${PhotoArray[currentIndex]})`}} 
            className='w-full h-full bg-center bg-cover duration-500'>
        
        {/* Flecha izquierda  */}
        <div className='hidden group-hover:block absolute top-[40%] left-0 text-2.5 rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Flecha derecha  */}
        <div className='hidden group-hover:block absolute top-[40%]  right-0 text-2.5 rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30}/>   
        </div> 

        <div className='flex top-4 justify-center py-2'>  
            {PhotoArray.map((slide, slideIndex) => (
                <div 
                    key={slideIndex} 
                    onClick={() => goToSlide(slideIndex)}
                    className='text-2x1 cursor-pointer self-bottom group-hover:block hidden top-[40%]'>
                        {bool &&
                        <RxDotFilled size={50}/>
                        }
                        
                </div>
            ))}
            </div>
        </div>
        {editable &&
        <div className="flex flex-row gap-2 p-3 w-full items-center justify-center">
        <div className='flex flex-col  justify-center w-1/2'>
        <p className='text-xl font-bold'>Cambiar foto actual</p>
        <input type="file" id="photo-file" onChange={handlePhotoChange}/>
        </div>
        <div className='flex flex-col  justify-center w-1/2'>
        <p className='text-xl font-bold'>Agregar Foto</p>
        <input type="file" id="photo-file" onChange={handlePhotoAdd}/>
        </div>
        </div>
        
        }
    </div>
  );
};

export default Carrousel;
