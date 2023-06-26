import { useState } from 'react';
import { db } from '../firebase models/Config';
import { collection, addDoc } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';
import React from 'react';
import '../components/Rating.module.css';
import {useUser} from "../firebase models/userContext"

export function Rating({ id}) {

  const user = useUser();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleRating = async () => {
    try {
      await addDoc(collection(db, 'ratings'), {
        productId: id,
        userId: user.uid,
        rating: rating,
      });
      console.log('Valoración guardada correctamente en Firebase.');
    } catch (error) {
      console.error('Error al guardar la valoración en Firebase:', error);
    }
  };

  return (
    <div className="rating">
      Rating
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />

            <FaStar
              className="star"
              size={30}
              color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            ></FaStar>
          </label>
        );
      })}
      <button onClick={handleRating}>Guardar Valoración</button>
      <p>Your rating is {rating}</p>
    </div>
  );
}


/*import {useState} from 'react'
import {FaStar} from 'react-icons/fa'
import React from 'react'
import './../index.css'

export default function Rating() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);


  return (
    <div className='rating'>
        Rating
        {[...Array(5)].map((star, index) =>{
            const currentRating = index + 1;
            return(
                <label>
                    <input 
                        type="radio" 
                        name="rating"
                        value = {currentRating}
                        onClick={() => setRating(currentRating)}
                    />
                   

                    <FaStar 
                        className="star" 
                        size ={30}
                        color = {currentRating<= (hover || rating)? "#ffc107" : "#e4e5e9" } 
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                    ></FaStar>
                </label>
            );
            
        })}
        <p>Your rating is {rating}</p>

    </div>
  )
}*/
