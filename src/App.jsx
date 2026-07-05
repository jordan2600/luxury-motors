import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar      from './components/Navbar/Navbar';
import Footer      from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import Inicio    from './pages/Inicio/Inicio';
import Catalogo  from './pages/Catalogo/Catalogo';
import Servicios from './pages/Servicios/Servicios';
import Galeria   from './pages/Galeria/Galeria';
import Contacto  from './pages/Contacto/Contacto';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"          element={<Inicio />} />
        <Route path="/catalogo"  element={<Catalogo />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/galeria"   element={<Galeria />} />
        <Route path="/contacto"  element={<Contacto />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
