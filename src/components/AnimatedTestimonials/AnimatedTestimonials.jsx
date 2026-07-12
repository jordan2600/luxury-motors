import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import './AnimatedTestimonials.css';

const defaultTestimonials = [
  {
    id: 1,
    name: "Carlos Rivera",
    role: "Comprador de Lamborghini El Huracán EVO",
    content: "La experiencia de compra en Luxury Motors fue excepcional. El coche es una obra maestra de la ingeniería y el equipo me hizo sentir como de la realeza en cada paso del proceso. Sin duda la mejor decisión.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sofía Mendoza",
    role: "Dueña de Aston Martin DB11",
    content: "Llevaba meses buscando este modelo exacto. Luxury Motors no solo lo tenía en el inventario, sino que se encargaron de toda la logística para entregarlo en mi puerta en perfectas condiciones. Servicio de primera clase.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Alejandro Silva",
    role: "Propietario de Porsche 911",
    content: "Rendimiento puro. Este vehículo supera todas mis expectativas. Agradezco a los asesores de Luxury Motors por guiarme pacientemente hacia la mejor decisión para mi colección privada.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop"
  }
];

export function AnimatedTestimonials({
  title = "Lo que dicen nuestros clientes",
  subtitle = "No solo escuches lo que decimos nosotros. Mira lo que nuestros clientes opinan sobre su experiencia de compra en Luxury Motors.",
  badgeText = "Confianza y Exclusividad",
  testimonials = defaultTestimonials,
  autoRotateInterval = 6000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, [autoRotateInterval, testimonials.length]);

  if (testimonials.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section ref={sectionRef} className="testimonials-section">
      <div className="testimonials-container">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="testimonials-grid"
        >
          {/* Left side: Heading */}
          <motion.div variants={itemVariants} className="testimonials-left">
            <div className="testimonials-left-content">
              {badgeText && (
                <div className="testimonials-badge">
                  <Star className="badge-icon" size={14} fill="currentColor" />
                  <span>{badgeText}</span>
                </div>
              )}
              <h2 className="testimonials-title">{title}</h2>
              <p className="testimonials-subtitle">{subtitle}</p>

              <div className="testimonials-nav">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`nav-dot ${activeIndex === index ? "active" : ""}`}
                    aria-label={`Ver testimonio ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side: Cards */}
          <motion.div variants={itemVariants} className="testimonials-right">
            <div className="testimonials-right-wrapper">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="testimonial-card-wrapper"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : 100,
                    scale: activeIndex === index ? 1 : 0.9,
                    zIndex: activeIndex === index ? 10 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ pointerEvents: activeIndex === index ? "auto" : "none" }}
                >
                  <div className="testimonial-card">
                    <div className="testimonial-stars">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <Star key={i} size={20} className="star-icon" fill="currentColor" />
                      ))}
                    </div>

                    <div className="testimonial-content-wrapper">
                      <Quote className="quote-icon" />
                      <p className="testimonial-content">"{testimonial.content}"</p>
                    </div>

                    <div className="testimonial-divider" />

                    <div className="testimonial-author">
                      <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                      <div className="author-info">
                        <h3 className="author-name">{testimonial.name}</h3>
                        <p className="author-role">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="decorative-box box-bottom-left" />
              <div className="decorative-box box-top-right" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AnimatedTestimonials;
