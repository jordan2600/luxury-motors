import Hero from '../../components/Hero/Hero';
import WhyUs from '../../components/WhyUs/WhyUs';
import Brands from '../../components/Brands/Brands';
import CategoriasPreview from '../../components/CategoriasPreview/CategoriasPreview';
import VehiculosPreview from '../../components/VehiculosPreview/VehiculosPreview';
import AnimatedTestimonials from '../../components/AnimatedTestimonials/AnimatedTestimonials';

const Inicio = () => {
  return (
    <main>
      <Hero />
      <WhyUs />
      <VehiculosPreview />
      <CategoriasPreview />
      <AnimatedTestimonials />
      <Brands />
    </main>
  );
};

export default Inicio;
