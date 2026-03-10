import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_URL } from '../data/config';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { to: '/', hash: '#inicio', label: 'Início' },
  { to: '/', hash: '#produtos', label: 'Produtos' },
  { to: '/', hash: '#sobre', label: 'Sobre' },
  { to: '/', hash: '#cuidados', label: 'Cuidados' },
  { to: '/', hash: '#contato', label: 'Contato' },
];

function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Header({ onOpenCart }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCount } = useCart();
  const location = useLocation();
  const count = getCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'header-shadow-scrolled bg-white/[0.98] py-3' : 'header-shadow bg-white/[0.95] py-4 md:py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-[var(--color-primary)] no-underline transition-transform duration-300 hover:scale-105"
        >
          <img src={LOGO_URL} alt="Bemvirá" className="h-8 w-8 object-contain md:h-9 md:w-9" />
          <span className="text-lg md:text-xl">Bemvirá</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ to, hash, label }) => (
            <li key={hash}>
              <Link
                to={hash ? `/#${hash.replace('#', '')}` : '/'}
                onClick={(e) => {
                  if (location.pathname === '/' && hash) {
                    e.preventDefault();
                    scrollToHash(hash);
                  }
                }}
                className="nav-link"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative rounded-full p-2 text-[var(--color-primary)] transition hover:bg-[var(--color-light-purple)]"
            aria-label="Abrir carrinho"
          >
            <i className="fas fa-shopping-cart text-xl" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-xs font-medium text-white">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded p-2 text-[var(--color-primary)] md:hidden"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            <i className={`fas text-xl ${mobileOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-[57px] z-[-1] bg-black/20 backdrop-blur-sm md:hidden ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        } transition`}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
      <ul
        className={`absolute left-0 right-0 top-full flex flex-col gap-1 border-t border-[var(--color-light-purple)] bg-white py-4 shadow-lg md:hidden ${
          mobileOpen ? 'visible' : 'hidden'
        }`}
      >
        {NAV_LINKS.map(({ to, hash, label }) => (
          <li key={hash}>
            <Link
              to={hash ? `/#${hash.replace('#', '')}` : '/'}
              onClick={() => {
                setMobileOpen(false);
                if (location.pathname === '/' && hash) setTimeout(() => scrollToHash(hash), 100);
              }}
              className="block px-6 py-3 text-[var(--color-dark-text)] no-underline transition-colors hover:bg-[var(--color-light-purple)] hover:text-[var(--color-primary)]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
