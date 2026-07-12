import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import VehiculoCard from '../../components/VehiculoCard/VehiculoCard';
import { Search } from 'lucide-react';
import './Catalogo.css';

const Catalogo = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [filteredVehiculos, setFilteredVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('Nombre');
  
  const categorias = ['Todos', 'Luxury', 'Deportivo', 'SUV', 'Clásico'];

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vehiculos'));
        const vehiculosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVehiculos(vehiculosData);
        setFilteredVehiculos(vehiculosData);
      } catch (error) {
        console.error("Error fetching vehiculos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehiculos();
  }, []);

  useEffect(() => {
    let result = vehiculos;
    
    // Filtro por búsqueda
    if (searchTerm) {
      result = result.filter(v => 
        v.marca?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        v.modelo?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtro por categoría
    if (category !== 'Todos') {
      result = result.filter(v => v.categoria === category);
    }
    
    // Ordenamiento
    if (sortBy === 'Nombre') {
      result.sort((a, b) => a.marca?.localeCompare(b.marca) || a.modelo?.localeCompare(b.modelo));
    } else if (sortBy === 'Precio: Mayor a Menor') {
      result.sort((a, b) => b.precio - a.precio);
    } else if (sortBy === 'Precio: Menor a Mayor') {
      result.sort((a, b) => a.precio - b.precio);
    } else if (sortBy === 'Año: Más reciente') {
      result.sort((a, b) => b.año - a.año);
    }
    
    setFilteredVehiculos([...result]);
  }, [vehiculos, searchTerm, category, sortBy]);

  return (
    <main className="catalogo-page">
      <div className="catalogo-header">
        <h1>Catálogo de Vehículos</h1>
        <p>Explora nuestra exclusiva selección de vehículos de lujo y alto rendimiento.</p>
      </div>
      
      <div className="catalogo-container">
        <div className="filtros-panel">
          <div className="filtros-header">
            <h3>Filtros</h3>
          </div>
          
          <div className="filtros-controls">
            <div className="filtro-group search-group">
              <label>Buscar</label>
              <div className="search-input-wrapper">
                <Search className="search-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="Marca o modelo..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="filtro-group">
              <label>Categoría</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="filtro-group">
              <label>Ordenar por</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Nombre">Nombre</option>
                <option value="Precio: Mayor a Menor">Precio: Mayor a Menor</option>
                <option value="Precio: Menor a Mayor">Precio: Menor a Mayor</option>
                <option value="Año: Más reciente">Año: Más reciente</option>
              </select>
            </div>
          </div>
          
          <div className="filtros-resultados">
            <span>Mostrando 1-{filteredVehiculos.length} de {vehiculos.length} vehículos</span>
          </div>
        </div>
        
        {loading ? (
          <div className="loading-spinner">Cargando catálogo...</div>
        ) : (
          <div className="vehiculos-grid">
            {filteredVehiculos.length > 0 ? (
              filteredVehiculos.map(vehiculo => (
                <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} />
              ))
            ) : (
              <div className="no-results">No se encontraron vehículos que coincidan con los filtros.</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Catalogo;
