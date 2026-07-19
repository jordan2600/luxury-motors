import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Servicios.css';
import servicioHero from '../../assets/servicios/servicio1.png';
import ModalCita from '../../components/ModalCita/ModalCita';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
};

const serviciosPrincipales = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Venta de Vehículos Premium',
    desc: 'Selección exclusiva de los mejores autos de lujo y alta performance del mundo.',
    items: ['Inspección de 200 puntos', 'Historial verificado', 'Entrega personalizada', 'Asesoría experta'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: 'Servicio y Mantenimiento',
    desc: 'Centro de servicio certificado con técnicos especializados en marcas premium.',
    items: ['Repuestos originales', 'Garantía de servicio', 'Tecnología de diagnóstico avanzada', 'Servicio express'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    title: 'Financiamiento a Medida',
    desc: 'Opciones flexibles de financiamiento con las mejores tasas del mercado.',
    items: ['Aprobación en 24hrs', 'Tasas competitivas', 'Planes personalizados', 'Sin enganche disponible'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Garantía Extendida',
    desc: 'Protección completa para tu inversión con cobertura extensiva.',
    items: ['Cobertura hasta 10 años', 'Asistencia en carretera', 'Vehículo de cortesía', 'Red nacional'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Consignación VIP',
    desc: 'Vendemos tu vehículo de lujo con exposición premium y servicio completo.',
    items: ['Marketing profesional', 'Valuación experta', 'Gestión completa', 'Comisión competitiva'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: 'Detailing Premium',
    desc: 'Restauración y protección estética de nivel concurso para tu vehículo.',
    items: ['Ceramic coating', 'Paint correction', 'Interior restoration', 'PPF installation'],
  },
];

const proceso = [
  { num: '01', title: 'Exploración',    desc: 'Navega nuestro catálogo exclusivo' },
  { num: '02', title: 'Test Drive',     desc: 'Experimenta el vehículo en acción' },
  { num: '03', title: 'Financiamiento', desc: 'Opciones flexibles a tu medida' },
  { num: '04', title: 'Entrega VIP',    desc: 'Recibe tu vehículo con ceremonia' },
];

const adicionales = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: 'Certificación Pre-Owned',
    desc: 'Programa de certificación riguroso',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Entrega Express',
    desc: 'Entrega en 48 horas disponible',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: 'Trade-In Premium',
    desc: 'Mejor valuación garantizada',
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const Servicios = () => {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="servicios-page">

      {/* ── Hero ── */}
      <section className="serv-hero" style={{ backgroundImage: `url(${servicioHero})` }}>
        <div className="serv-hero__overlay" />
        <div className={`serv-hero__gradient ${scrolled ? 'visible' : ''}`} />
        <div className="serv-hero__content">
          <motion.h1
            className="serv-hero__title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Nuestros Servicios
          </motion.h1>
          <motion.p
            className="serv-hero__subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            Experiencia completa de lujo automotriz, desde la compra hasta el mantenimiento
          </motion.p>
        </div>
      </section>

      {/* ── Servicios Principales ── */}
      <section className="serv-main">
        <div className="serv-main__header">
          <h2 className="serv-section__title">Servicios Principales</h2>
          <p className="serv-section__sub">Soluciones integrales para todas tus necesidades automotrices</p>
        </div>
        <div className="serv-main__grid">
          {serviciosPrincipales.map((s) => (
            <div key={s.title} className="serv-card">
              <div className="serv-card__icon">{s.icon}</div>
              <h3 className="serv-card__title">{s.title}</h3>
              <p className="serv-card__desc">{s.desc}</p>
              <ul className="serv-card__list">
                {s.items.map((item) => (
                  <li key={item}><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Proceso de Compra ── */}
      <section className="serv-proceso">
        <div className="serv-main__header">
          <h2 className="serv-section__title">Nuestro Proceso de Compra</h2>
        </div>
        <div className="serv-proceso__grid">
          {proceso.map((p, i) => (
            <div key={p.num} className="serv-proceso__step">
              <span className="serv-proceso__num">{p.num}</span>
              <h3 className="serv-proceso__step-title">{p.title}</h3>
              <p className="serv-proceso__step-desc">{p.desc}</p>
              {i < proceso.length - 1 && <div className="serv-proceso__line" />}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="serv-cta">
        <h2 className="serv-cta__title">¿Listo para experimentar el servicio Elite?</h2>
        <p className="serv-cta__desc">
          Nuestro equipo está disponible para atenderte y ayudarte a encontrar el vehículo perfecto.
        </p>
        <div className="serv-cta__buttons">
          <button onClick={() => setModalOpen(true)} className="serv-cta__btn serv-cta__btn--primary">Agendar Cita</button>
        </div>
      </section>

      <ModalCita isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    </main>
  );
};

export default Servicios;
