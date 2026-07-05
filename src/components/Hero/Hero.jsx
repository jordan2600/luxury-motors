import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import video1 from '../../assets/videoss/video1.mp4';
import video2 from '../../assets/videoss/video2.mp4';
import video3 from '../../assets/videoss/video3.mp4';
import video4 from '../../assets/videoss/video4.mp4';
import video5 from '../../assets/videoss/video5.mp4';

import './Hero.css';

const videos = [
  { src: video1, position: 'center' },
  { src: video2, position: 'center' },
  { src: video3, position: 'center' },
  { src: video4, position: 'center' },
  { src: video5, position: 'center', scale: true },
];

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
  exit:    { opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef(null);

  const handleEnded = () => {
    setCurrent((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  // Mostrar degradado solo cuando el usuario empieza a hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero">
      {/* Carrusel de videos en fondo */}
      <AnimatePresence mode="sync">
        <motion.video
          key={current}
          ref={videoRef}
          className={`hero__video${videos[current].scale ? ' hero__video--zoom' : ''}`}
          src={videos[current].src}
          style={{ objectPosition: videos[current].position }}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </AnimatePresence>

      <div className="hero__overlay" />

      {/* Degradado inferior — solo visible al hacer scroll */}
      <div className={`hero__gradient ${scrolled ? 'visible' : ''}`} />

      {/* Contenido */}
      <div className="hero__content">
        <motion.h1
          className="hero__title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          LUXURY MOTORS
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
        >
          Los carros más exclusivos del mundo
        </motion.p>

        <motion.div
          className="hero__buttons"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          <Link to="/catalogo" className="hero__btn hero__btn--red">
            VER CATÁLOGO
          </Link>
        </motion.div>
      </div>

      {/* Indicadores de video */}
      <div className="hero__dots">
        {videos.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Video ${i + 1}`}
          >
            {i === current && (
              <span key={current} className="hero__dot-progress" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
