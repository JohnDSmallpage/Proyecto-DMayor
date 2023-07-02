/*import { useState } from 'react';
import { db } from '../firebase models/Config';
import { collection, addDoc } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';
import React from 'react';
import '../components/Rating.module.css';
import {useUser} from "../firebase models/userContext"
import { addFeedbackToProduct } from '../firebase models/user-service';

export function Rating({ id}) {

  const user = useUser();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);


  const handleRating = async () => {
    try {
      /*await addDoc(collection(db, 'ratings'), {
        productId: id,
        userId: user.uid,
        rating: rating,
      });

      addFeedbackToProduct();
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
    </div>
  );
}*/


import {useEffect, useState} from 'react'
import {FaStar} from 'react-icons/fa'
import React from 'react'
import '../components/Rating.module.css'
import { db } from '../firebase models/Config'
import { doc, setDoc } from "firebase/firestore";

export default function Rating() {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    
    const guardarRatingEnFirestore = async () => {
      if (rating) {
        try {
          const ratingRef = doc(db, "ratings", "ratingId");
          await setDoc(ratingRef, { rating });
          console.log("Rating guardado en Firestore");
        } catch (error) {
          console.error("Error al guardar el rating en Firestore", error);
        }
      } else {
        console.warn("El rating no ha sido seleccionado");
      }
    };

  return (
    <div className='rating'>
        Rating
        {[...Array(5)].map((star, index) =>{
            const currentRating = index + 1;
            return(
                <label>
                    <input 
                      className='estrellita'
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => {
                        setRating(currentRating);
                        guardarRatingEnFirestore();
                      }}
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
}
