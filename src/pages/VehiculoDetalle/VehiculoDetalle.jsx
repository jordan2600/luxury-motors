import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ArrowLeft, Phone, Mail, Zap, Timer, Gauge, Check } from 'lucide-react';
import VehiculoCard from '../../components/VehiculoCard/VehiculoCard';
import { HoverBorderGradient } from '../../components/ui/HoverBorderGradient';
import './VehiculoDetalle.css';

const VehiculoDetalle = () => {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similares, setSimilares] = useState([]);

  useEffect(() => {
    const fetchVehiculoYSimilares = async () => {
      try {
        const docRef = doc(db, 'vehiculos', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setVehiculo(data);
          
          // Fetch similares
          try {
            const q = query(
              collection(db, 'vehiculos'),
              where('categoria', '==', data.categoria),
              limit(4)
            );
            const querySnapshot = await getDocs(q);
            const sims = [];
            querySnapshot.forEach((d) => {
              if (d.id !== id) {
                sims.push({ id: d.id, ...d.data() });
              }
            });
            setSimilares(sims.slice(0, 3));
          } catch (error) {
            console.error("Error al obtener vehículos similares:", error);
          }
        } else {
          console.log("No existe el vehículo");
        }
      } catch (error) {
        console.error("Error al obtener vehículo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculoYSimilares();
  }, [id]);

  if (loading) return <div className="loading-detalle">Cargando detalles del vehículo...</div>;
  if (!vehiculo) return <div className="error-detalle">Vehículo no encontrado</div>;

  // Calculando porcentajes para barras de progreso (valores máximos de referencia)
  const maxPotencia = 1000;
  const parsePotencia = parseInt(vehiculo.potencia) || 500;
  const pctPotencia = Math.min((parsePotencia / maxPotencia) * 100, 100);

  const maxVelocidad = 400;
  const parseVelocidad = parseInt(vehiculo.velocidad_maxima) || 250;
  const pctVelocidad = Math.min((parseVelocidad / maxVelocidad) * 100, 100);

  const bestAceleracion = 2.0;
  const worstAceleracion = 10.0;
  const parseAceleracion = parseFloat(vehiculo.aceleracion_0_100 || vehiculo.aceleración_0_100) || 5.0;
  // Invertido: menor es mejor (más larga la barra)
  let pctAceleracion = 100 - ((parseAceleracion - bestAceleracion) / (worstAceleracion - bestAceleracion) * 100);
  pctAceleracion = Math.max(10, Math.min(pctAceleracion, 100));

  return (
    <main className="vehiculo-detalle-page">
      {/* Banner */}
      <div 
        className="detalle-banner" 
        style={{ backgroundImage: `url(${vehiculo.imagenUrl || 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2000&auto=format&fit=crop'})` }}
      >
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <div className="banner-titles">
            <span className="badge-luxury">{vehiculo.categoria}</span>
            <h1>{vehiculo.marca} {vehiculo.modelo}</h1>
            <span className="badge-year">{vehiculo.año}</span>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="detalle-container">
        <div className="volver-container">
          <Link to="/catalogo" className="volver-link-new">
            <ArrowLeft size={16} /> Volver
          </Link>
        </div>

        <div className="detalle-izq">
          <div className="card-seccion">
            <h2>Descripción</h2>
            <p className="descripcion-texto">
              {vehiculo.descripcion || `Elegancia y rendimiento excepcional se fusionan en el ${vehiculo.marca} ${vehiculo.modelo}. Equipado con un motor ${vehiculo.motor}, este vehículo redefine los estándares de su clase.`}
            </p>
          </div>

          <div className="card-seccion">
            <h2>Especificaciones Técnicas</h2>
            <div className="especificaciones-grid">
              <div className="especificacion-item">
                <span className="spec-label">Motor</span>
                <span className="spec-value">{vehiculo.motor || 'V8 4.0L'}</span>
              </div>
              <div className="especificacion-item">
                <span className="spec-label">Potencia</span>
                <span className="spec-value">{vehiculo.potencia || '500 HP'}</span>
              </div>
              <div className="especificacion-item">
                <span className="spec-label">Velocidad Máxima</span>
                <span className="spec-value">{vehiculo.velocidad_maxima || '250 km/h'}</span>
              </div>
              <div className="especificacion-item">
                <span className="spec-label">0-100 km/h</span>
                <span className="spec-value">{vehiculo.aceleracion_0_100 || vehiculo.aceleración_0_100 || '4.0s'}</span>
              </div>
              <div className="especificacion-item spec-full-width">
                <span className="spec-label">Transmisión</span>
                <span className="spec-value">{vehiculo.transmision || 'Automática 8 vel.'}</span>
              </div>
            </div>
          </div>

          <div className="card-seccion">
            <h2>Características Destacadas</h2>
            <div className="caracteristicas-grid">
              {(vehiculo.caracteristicas || ['Cuero Bridge of Weir', 'Sistema de sonido Bang & Olufsen', 'Techo panorámico', 'Aeroblade II']).map((feature, i) => (
                <div key={i} className="caracteristica-item">
                  <Check size={18} className="check-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="detalle-der">
          <div className="card-sidebar">
            <span className="sidebar-label">Precio</span>
            <div className="sidebar-precio">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(vehiculo.precio)}
            </div>
            
            <HoverBorderGradient
              as="button"
              className="btn-solicitar-content"
            >
              Solicitar Información
            </HoverBorderGradient>

            <button className="btn-agendar">Agendar Test Drive</button>

            <hr className="sidebar-divider" />

            <div className="contacto-info">
              <div className="contacto-item">
                <Phone size={20} className="contacto-icon" />
                <div>
                  <span className="contacto-tipo">Llámanos</span>
                  <span className="contacto-valor">+1 (555) 123-4567</span>
                </div>
              </div>
              
              <div className="contacto-item">
                <Mail size={20} className="contacto-icon" />
                <div>
                  <span className="contacto-tipo">Email</span>
                  <span className="contacto-valor">info@elitemotors.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-seccion datos-rapidos-card">
            <h3 className="datos-rapidos-title">Datos Rápidos</h3>
            <div className="dato-rapido-item">
              <span className="dato-label">Marca</span>
              <span className="dato-value">{vehiculo.marca}</span>
            </div>
            <div className="dato-rapido-item">
              <span className="dato-label">Modelo</span>
              <span className="dato-value">{vehiculo.modelo}</span>
            </div>
            <div className="dato-rapido-item">
              <span className="dato-label">Año</span>
              <span className="dato-value">{vehiculo.año}</span>
            </div>
            <div className="dato-rapido-item">
              <span className="dato-label">Categoría</span>
              <span className="dato-value">{vehiculo.categoria}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehículos Similares */}
      {similares.length > 0 && (
        <div className="similares-container">
          <h2>Vehículos Similares</h2>
          <div className="similares-grid">
            {similares.map(sim => (
              <VehiculoCard key={sim.id} vehiculo={sim} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default VehiculoDetalle;
