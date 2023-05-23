import React, {useState} from 'react'
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {RxDotFilled} from 'react-icons/rx'

const Carrousel = () => {
  
  const slides = [
        {
            url: 'https://wallpapercave.com/wp/wp7832396.jpg'
        },
        {
            url: 'https://wallpapercave.com/wp/wp7530211.jpg'
        },
        {
            url: 'https://wallpapercave.com/wp/wp6836093.jpg'
        },
        {
            url: 'https://wallpapercave.com/wp/wp7110711.jpg'
        },
        {
            url: 'https://wallpapercave.com/wp/wp3079202.jpg'
        },
    
    ];
  
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length -1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);

    };

    return (
    <div className='max-w-full h-[500px] w-full m-auto  group'>
        <div 
            style={{backgroundImage: `url(${slides[currentIndex].url})`}} 
            className='w-full h-full bg-center bg-cover duration-500'>
        </div>
        {/* Flecha izquierda  */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2.5 rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30}/>   
        </div>   
        {/* Flecha derecha  */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2.5 rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30}/>   
        </div> 

        <div className='flex top-4 justify-center py-2'>  
            {slides.map((slide, slideIndex) => (
                <div 
                    key={slideIndex} 
                    onClick={() => goToSlide(slideIndex)}
                    className='text-2x1 cursor-pointer'>
                        <RxDotFilled/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Carrousel