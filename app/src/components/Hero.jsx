import { Link, useLocation } from 'react-router-dom';
import { LOGO_URL } from '../data/config';
import { HeroTitle3D } from './HeroTitle3D';
import { HeroPaperBag } from './HeroPaperBag';

function scrollToProducts() {
  const el = document.getElementById('produtos');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Hero() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleVerPecas = (e) => {
    if (isHome) {
      e.preventDefault();
      scrollToProducts();
    }
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden pt-24 pb-16 md:min-h-[100vh] md:pt-28"
      style={{
        background: 'linear-gradient(135deg, #4a4a4a 0%, #5a5a5a 25%, #6a6a6a 50%, #7a7a7a 75%, #8a8a8a 100%)',
      }}
    >
      <div className="hero-overlay pointer-events-none absolute inset-0 z-[1]" />

      {/* Mobile: logo + BemVirá Pratas → sacola 3D (meio) → tagline → botão. Desktop: duas colunas. */}
      <div className="relative z-[2] mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-[1fr_auto] md:grid-rows-2 md:gap-x-16 md:gap-y-6">
        {/* 1. Logo + título 3D + PRATAS (topo no mobile, topo esquerda no desktop) */}
        <div className="flex flex-col items-center text-center md:max-w-xl md:items-start md:text-left">
          <img
            src={LOGO_URL}
            alt="Bemvirá"
            className="hero-logo-enter mx-auto mb-3 h-16 w-auto object-contain brightness-0 invert md:mx-0 md:h-20"
          />
          <HeroTitle3D />
          <p className="mt-2 font-['Playfair_Display'] text-sm tracking-[0.3em] text-white/90">
            PRATAS
          </p>
        </div>

        {/* 2. Sacola 3D – centro no mobile, coluna direita no desktop */}
        <div className="flex flex-shrink-0 items-center justify-center md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
          <HeroPaperBag />
        </div>

        {/* 3. Tagline + botão (abaixo da sacola no mobile, embaixo do bloco 1 no desktop) */}
        <div className="flex flex-col items-center md:items-start md:justify-start">
          <p
            className="max-w-md text-center text-lg font-medium text-white md:text-left md:text-xl"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            Joias para todos os dias.
          </p>
          <Link
            to="/#produtos"
            onClick={handleVerPecas}
            className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-white/90 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 hover:border-white"
          >
            Ver peças
            <i className="fas fa-chevron-down text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
