import { Link } from 'react-router-dom';
import './CategoriasPreview.css';

const categories = [
  {
    id: 'supercars',
    name: 'Supercars',
    count: '10 modelos disponibles',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    link: '/catalogo?categoria=Supercars'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    count: '8 modelos disponibles',
    image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&q=80',
    link: '/catalogo?categoria=Luxury'
  },
  {
    id: 'sports',
    name: 'Sports',
    count: '7 modelos disponibles',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    link: '/catalogo?categoria=Sports'
  }
];

const CategoriasPreview = () => {
  return (
    <section className="categorias-preview">
      <div className="categorias-header">
        <h2>Categorías</h2>
        <p>Encuentra tu estilo perfecto</p>
      </div>
      <div className="categorias-grid">
        {categories.map((cat) => (
          <Link to={cat.link} key={cat.id} className="categoria-card">
            <div 
              className="categoria-bg" 
              style={{ backgroundImage: `url(${cat.image})` }}
            ></div>
            <div className="categoria-overlay"></div>
            <div className="categoria-content">
              <h3>{cat.name}</h3>
              <p>{cat.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriasPreview;
