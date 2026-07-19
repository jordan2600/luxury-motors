import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ModalCita.css';

const servicios = [
  'Venta de Vehículos Premium',
  'Servicio y Mantenimiento',
  'Financiamiento a Medida',
  'Garantía Extendida',
  'Consignación VIP',
  'Detailing Premium',
];

const ModalCita = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    nombre: '', telefono: '', email: '', servicio: '', fecha: '', hora: '',
  });
  const [sent, setSent] = useState(false);

  // Bloquear scroll del body al abrir
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ nombre: '', telefono: '', email: '', servicio: '', fecha: '', hora: '' });
    setTimeout(() => { setSent(false); onClose(); }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="modal"
            style={{ x: '-50%', y: '-50%' }}
            initial={{ opacity: 0, y: 'calc(-50% + 40px)', scale: 0.97 }}
            animate={{ opacity: 1, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 'calc(-50% + 40px)', scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="modal__header">
              <div>
                <h2 className="modal__title" id="modal-title">AGENDAR CITA</h2>
                <p className="modal__subtitle">Completa el formulario y te contactamos en menos de 24h</p>
              </div>
              <button className="modal__close" onClick={onClose} aria-label="Cerrar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Formulario */}
            {sent ? (
              <div className="modal__success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3>¡Cita agendada!</h3>
                <p>Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__row">
                  <div className="modal__field">
                    <label>Nombre completo</label>
                    <input
                      type="text" name="nombre" placeholder="Tu nombre"
                      value={form.nombre} onChange={handleChange} required
                    />
                  </div>
                  <div className="modal__field">
                    <label>Teléfono</label>
                    <input
                      type="tel" name="telefono" placeholder="+51 999 000 000"
                      value={form.telefono} onChange={handleChange} required
                    />
                  </div>
                </div>

                <div className="modal__field">
                  <label>Email</label>
                  <input
                    type="email" name="email" placeholder="tu@email.com"
                    value={form.email} onChange={handleChange} required
                  />
                </div>

                <div className="modal__field">
                  <label>Servicio de interés</label>
                  <select name="servicio" value={form.servicio} onChange={handleChange} required>
                    <option value="" disabled>Selecciona un servicio</option>
                    {servicios.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="modal__row">
                  <div className="modal__field">
                    <label>Fecha preferida</label>
                    <input
                      type="date" name="fecha"
                      value={form.fecha} onChange={handleChange} required
                    />
                  </div>
                  <div className="modal__field">
                    <label>Hora preferida</label>
                    <input
                      type="time" name="hora"
                      value={form.hora} onChange={handleChange} required
                    />
                  </div>
                </div>

                <button type="submit" className="modal__submit">
                  CONFIRMAR CITA
                </button>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/51999123456?text=Hola,%20me%20interesa%20agendar%20una%20cita%20en%20Luxury%20Motors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal__whatsapp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  o escríbenos por WhatsApp
                </a>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalCita;
