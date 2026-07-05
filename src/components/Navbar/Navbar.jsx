import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const links = [
  { label: 'Inicio',    to: '/' },
  { label: 'Catálogo',  to: '/catalogo' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Galería',   to: '/galeria' },
  { label: 'Contacto',  to: '/contacto' },
];

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const itemRefs = useRef({});
  const navRef = useRef(null);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  // Calcula la posición de la burbuja basándose en el item activo
  useEffect(() => {
    const activeLink = links.find(l =>
      l.to === '/' ? activeTab === '/' : activeTab.startsWith(l.to)
    );
    if (!activeLink) return;

    const el = itemRefs.current[activeLink.to];
    const nav = navRef.current;
    if (!el || !nav) return;

    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    setBubbleStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, [activeTab]);

  return (
    <div className="navbar-floating-wrapper">
      <div className="navbar-floating" ref={navRef}>

        {/* Burbuja absoluta que se desliza — independiente del scroll */}
        <motion.div
          className="navbar-floating__lamp"
          animate={{
            left: bubbleStyle.left,
            width: bubbleStyle.width,
            opacity: bubbleStyle.opacity,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 28, mass: 0.6 }}
        />

        {/* Barra superior que se desliza igual */}
        <motion.div
          className="lamp__bar-wrapper lamp__bar-wrapper--absolute"
          animate={{
            left: bubbleStyle.left + bubbleStyle.width / 2,
            opacity: bubbleStyle.opacity,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 28, mass: 0.6 }}
        >
          <div className="lamp__bar-inner">
            <div className="lamp__glow lamp__glow--wide" />
            <div className="lamp__glow lamp__glow--mid" />
            <div className="lamp__glow lamp__glow--small" />
          </div>
        </motion.div>

        {links.map((link) => {
          const isActive =
            link.to === '/'
              ? activeTab === '/'
              : activeTab.startsWith(link.to);

          return (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              ref={(el) => { itemRefs.current[link.to] = el; }}
              className={`navbar-floating__item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(link.to)}
            >
              <span className="navbar-floating__label">{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
