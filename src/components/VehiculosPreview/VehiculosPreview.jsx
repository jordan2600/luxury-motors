import { Link } from 'react-router-dom';
import './VehiculosPreview.css';

const vehicles = [
  {
    name: 'Lamborghini',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  },
  {
    name: 'Ferrari',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80',
  },
  {
    name: 'Porsche',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  },
  {
    name: 'McLaren',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    name: 'Mercedes-AMG',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
  },
  {
    name: 'Audi',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80',
  },
];

const VehiculosPreview = () => {
  return (
    <section className="vehiculos">
      <h2 className="vehiculos__title">VEHÍCULOS DESTACADOS</h2>
      <div className="vehiculos__grid">
        {vehicles.map((car) => (
          <div key={car.name} className="vehiculos__card">
            <img src={car.image} alt={car.name} className="vehiculos__img" />
            <div className="vehiculos__label">
              <span>{car.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="vehiculos__cta">
        <Link to="/catalogo" className="vehiculos__btn">
          VER CATÁLOGO COMPLETO
        </Link>
      </div>
    </section>
  );
};

export default VehiculosPreview;
