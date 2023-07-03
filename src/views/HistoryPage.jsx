import React from 'react'
import { useState } from 'react';
import { useUser } from '../firebase models/userContext';
import { getHistoryByUser } from '../firebase models/user-service';
import { useEffect } from 'react';
import { HistoryProduct } from '../components/HistoryProduct';

export function HistoryPage() {

    const [products, setProducts] = useState([]);
    const { user } = useUser();

    const getHistory = async () => {
        const idProducts = user.history;
        const data = await getHistoryByUser(idProducts);
        console.log(data);
        setProducts(data);
      };

      useEffect(() => {
        getHistory();
      }, [products]);
    

  return (
    <>
        <h1 className="text-[20px] font-bold text-gray-800 text-center mt-3">
        Historial de compras
      </h1>

      <div className="flex flex-wrap">
        {products == null ? (
          <div>No hay productos ocultos</div>
        ) : (
          products?.map((product, idx) => (
            <>
                <HistoryProduct info={product} key={idx} />
            </>
          ))
        )}
        
      </div>
    
    
    </>
  )
}
