import React from 'react'
import { getFavoritesByUser } from '../firebase models/user-service'
import { useUser } from '../firebase models/userContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { Product } from '../components/Product';

export function FavoritesPage() {

  const [products, setProducts] = useState([]);
  const { user } = useUser();

  const getFavorites = async () => {

    if(user.favorites.length === 0){
      setProducts(null);
      return;
    }
    const idProducts = user.favorites;
    const data = await getFavoritesByUser(idProducts);
    setProducts(data);
  };

  useEffect(() => {
    getFavorites();
  }, []);


  return (
    <>
        <h1 className="text-[30px] font-bold text-gray-800 text-center mt-3">
        Favoritos
      </h1>

      <div className="flex flex-wrap">
        {products == null ? (
          <div>No hay productos como favoritos</div>
        ) : (
          products?.map((product, idx) => (
            <>
                <Product info={product} key={idx} />
            </>
          ))
        )}
        
      </div>
    
    
    </>
  )
}
