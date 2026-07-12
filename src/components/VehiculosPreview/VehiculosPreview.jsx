import { useState, useEffect } from 'react';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import VehiculoCard from '../VehiculoCard/VehiculoCard';
import './VehiculosPreview.css';

const VehiculosPreview = () => {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        const q = query(collection(db, 'vehiculos'), limit(3));
        const querySnapshot = await getDocs(q);
        const autos = [];
        querySnapshot.forEach((doc) => {
          autos.push({ id: doc.id, ...doc.data() });
        });
        setDestacados(autos);
      } catch (error) {
        console.error("Error fetching destacados: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestacados();
  }, []);

  return (
    <section className="vehiculos-destacados">
      <div className="destacados-header">
        <h2>Autos Destacados</h2>
        <p>Explora nuestra selección premium</p>
      </div>
      
      {loading ? (
        <div className="loading-destacados">Cargando autos...</div>
      ) : (
        <div className="destacados-grid">
          {destacados.map(vehiculo => (
            <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} />
          ))}
        </div>
      )}
    </section>
  );
};

export default VehiculosPreview;
