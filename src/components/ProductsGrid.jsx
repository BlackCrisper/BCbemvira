import { useNavigate } from 'react-router-dom';
import { PRODUCTS_DATA, CATEGORY_KEYS } from '../data/productsData';
import { useInView } from '../hooks/useInView';

function ProductCard({ categoryKey, index }) {
  const [ref, isInView] = useInView();
  const cat = PRODUCTS_DATA[categoryKey];
  const navigate = useNavigate();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => navigate(`/produtos/${categoryKey}`)}
      className={`group fade-in product-card-bemvira flex flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${isInView ? 'visible' : ''}`}
      style={{ transitionDelay: isInView ? `${index * 80}ms` : undefined }}
    >
      <div className="product-image-bg flex aspect-square items-center justify-center overflow-hidden">
        <img
          src={cat.categoryImage}
          alt={cat.title}
          className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-6 text-center">
        <h3 className="text-lg font-semibold text-[var(--color-dark-text)] md:text-xl">{cat.title}</h3>
      </div>
    </button>
  );
}

export function ProductsGrid() {
  return (
    <section id="produtos" className="scroll-mt-20 bg-[var(--color-soft-white)] pt-20 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="section-title font-['Playfair_Display'] font-semibold">
          Nossas Peças
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {CATEGORY_KEYS.map((key, index) => (
            <ProductCard key={key} categoryKey={key} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
