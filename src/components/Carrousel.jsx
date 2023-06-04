import React, {useEffect, useState} from 'react'
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'

const Carrousel = ({photos,bool}) => {
    const [currentIndex, setCurrentIndex] = useState(0) 
  
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? photos.length -1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === photos.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);

    };

    return (
    <div className='max-w-full h-full w-full  group'>
        <div 
            style={{backgroundImage: `url(${photos[currentIndex].url})`}} 
            className='w-full h-full bg-center bg-cover duration-500'>
        </div>
        {/* Flecha izquierda  */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 text-2.5 rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={20}/>   
        </div>   
        {/* Flecha derecha  */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-0 text-2.5 rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={20}/>   
        </div> 

        <div className='flex top-4 justify-center py-2'>  
            {photos.map((slide, slideIndex) => (
                <div 
                    key={slideIndex} 
                    onClick={() => goToSlide(slideIndex)}
                    className='text-2x1 cursor-pointer'>
                        {bool &&
                        <RxDotFilled/>
                        }
                        
                </div>
            ))}
        </div>
    </div>
  )
}

export default Carrousel