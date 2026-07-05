import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <div className="footer__logo-icon">LM</div>
            <span className="footer__logo-text">LUXURY MOTORS</span>
          </Link>
          <p className="footer__brand-desc">
            Carrocería de lujo y autos exclusivos desde 2009
          </p>
        </div>

        {/* Navegación */}
        <div className="footer__col">
          <h4 className="footer__col-title">NAVEGACIÓN</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/galeria">Galería</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer__col">
          <h4 className="footer__col-title">LEGAL</h4>
          <ul>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Aviso Legal</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer__col">
          <h4 className="footer__col-title">SÍGUENOS</h4>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="footer__social" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="footer__social" aria-label="Twitter / X">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Luxury Cars. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
