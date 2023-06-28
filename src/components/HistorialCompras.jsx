/*import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import {useUser} from "../firebase models/userContext";
import db from "../firebase models/Config"

export function HistorialCompras() {
  const [compras, setCompras] = useState([]);
  const user = useUser();

  useEffect(() => {
    const fetchCompras = async () => {

      const comprasRef = collection(db, 'compras');
      const q = query(comprasRef, where('userId', '==', user.uid));

      const querySnapshot = await getDocs(q);
      const comprasData = querySnapshot.docs.map(doc => doc.data());
      setCompras(comprasData);
    };

    fetchCompras();
  }, [user.uid]);

  return (
    <div>
      <h2>Historial de compras:</h2>
      <ul>
        {compras.map(compra => (
          <li key={compra.id}>{compra.nombreProducto}</li>
        ))}
      </ul>
    </div>
  );
}*/