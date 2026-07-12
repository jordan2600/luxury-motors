import { Link } from 'react-router-dom';
import './VehiculoCard.css';

const VehiculoCard = ({ vehiculo }) => {
  return (
    <div className="vehiculo-card">
      <div className="vehiculo-card-image-container">
        <img 
          src={vehiculo.imagenUrl || 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1000&auto=format&fit=crop'} 
          alt={`${vehiculo.marca} ${vehiculo.modelo}`} 
          className="vehiculo-card-image" 
        />
        <span className="vehiculo-card-badge category-badge">{vehiculo.categoria}</span>
        <span className="vehiculo-card-badge year-badge">{vehiculo.año}</span>
      </div>
      
      <div className="vehiculo-card-content">
        <p className="vehiculo-card-brand">{vehiculo.marca}</p>
        <h3 className="vehiculo-card-model">{vehiculo.modelo}</h3>
        
        <div className="vehiculo-card-specs">
          <div className="spec-item">
            <span className="spec-label">Motor</span>
            <span className="spec-value">{vehiculo.motor}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Potencia</span>
            <span className="spec-value">{vehiculo.potencia}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">0-100 km/h</span>
            <span className="spec-value">{vehiculo.aceleracion_0_100 || vehiculo.aceleración_0_100}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Vel. Máx</span>
            <span className="spec-value">{vehiculo.velocidad_maxima}</span>
          </div>
        </div>
        
        <hr className="vehiculo-card-divider" />
        
        <div className="vehiculo-card-footer">
          <span className="vehiculo-card-price">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(vehiculo.precio)}
          </span>
          <Link to={`/catalogo/${vehiculo.id}`} className="vehiculo-card-link">
            Ver detalles &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehiculoCard;
