import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ProductsGrid } from '../components/ProductsGrid';
import { About } from '../components/About';
import { Cuidados } from '../components/Cuidados';
import { Footer } from '../components/Footer';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Hero />
      <ProductsGrid />
      <About />
      <Cuidados />
      <Footer />
    </>
  );
}
