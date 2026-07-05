import './WhyUs.css';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: '+15 Años de Experiencia',
    desc: 'Más de una década perfeccionando el arte de la carrocería de lujo.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: '1000+ Clientes Satisfechos',
    desc: 'Confianza ganada proyecto tras proyecto con resultados impecables.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'Garantía de Por Vida',
    desc: 'Respaldamos nuestro trabajo con garantía extendida en todos nuestros servicios.',
  },
];

const WhyUs = () => {
  return (
    <section className="whyus">
      <h2 className="whyus__title">¿POR QUÉ ELEGIRNOS?</h2>
      <div className="whyus__grid">
        {features.map((item) => (
          <div key={item.title} className="whyus__card">
            <div className="whyus__icon">{item.icon}</div>
            <h3 className="whyus__card-title">{item.title}</h3>
            <p className="whyus__card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
