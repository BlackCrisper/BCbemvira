import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/productsData';
import { ProductModal } from '../components/ProductModal';
import { ImageZoomModal } from '../components/ImageZoomModal';

const PRICE_FILTERS = [
  { value: '', label: 'Todos os preços' },
  { value: '0-200', label: 'Até R$ 200' },
  { value: '200-300', label: 'R$ 200 - R$ 300' },
  { value: '300-400', label: 'R$ 300 - R$ 400' },
  { value: '400+', label: 'Acima de R$ 400' },
];

function parsePrice(priceStr) {
  const n = parseFloat(String(priceStr).replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  return n;
}

export function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [zoomImageSrc, setZoomImageSrc] = useState(null);

  const categoryData = PRODUCTS_DATA[category];
  const title = categoryData?.title ?? 'Produtos';

  const filteredAndSorted = useMemo(() => {
    if (!categoryData?.products?.length) return [];
    let list = [...categoryData.products];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (priceRange) {
      const [a, b] = priceRange.split('-').map((x) => (x === '' ? 0 : x === '+' ? Infinity : parseFloat(x)));
      list = list.filter((p) => {
        const price = parsePrice(p.price);
        if (priceRange === '400+') return price >= 400;
        return price >= a && price < (b || Infinity);
      });
    }
    if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'price-low') list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === 'price-high') list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return list;
  }, [categoryData, search, priceRange, sortBy]);

  if (!categoryData) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <p className="text-gray-500">Categoria não encontrada.</p>
        <button type="button" onClick={() => navigate('/')} className="ml-4 text-[var(--color-primary)] underline">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-soft-white)] pt-24 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-[var(--color-dark-text)] transition hover:bg-gray-50"
          >
            <i className="fas fa-arrow-left" /> Voltar
          </button>
          <h1 className="flex-1 font-['Playfair_Display'] text-2xl font-semibold text-[var(--color-dark-text)] md:text-3xl">
            {title}
          </h1>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
          <div className="relative flex-1 min-w-[180px]">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="price-filter" className="text-sm text-gray-600">Filtrar por preço:</label>
            <select
              id="price-filter"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none"
            >
              {PRICE_FILTERS.map((opt) => (
                <option key={opt.value || 'all'} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600">Ordenar:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none"
            >
              <option value="name">Nome (A-Z)</option>
              <option value="price-low">Preço (Menor)</option>
              <option value="price-high">Preço (Maior)</option>
            </select>
          </div>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 text-center">
            <span className="mb-2 text-4xl">🔍</span>
            <h3 className="mb-1 text-lg font-semibold text-[var(--color-dark-text)]">Nenhum produto encontrado</h3>
            <p className="mb-4 text-sm text-gray-500">Tente ajustar os filtros.</p>
            <button
              type="button"
              onClick={() => { setSearch(''); setPriceRange(''); setSortBy('name'); }}
              className="btn-gradient-bemvira rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredAndSorted.map((product) => (
              <button
                key={`${product.id}-${product.name}`}
                type="button"
                onClick={() => setSelectedProduct(product)}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:border-[var(--color-light-purple)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3 text-left">
                  <h3 className="line-clamp-2 text-sm font-medium text-[var(--color-dark-text)]">{product.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">{product.price}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        categoryTitle={title}
        onClose={() => setSelectedProduct(null)}
        onOpenZoom={setZoomImageSrc}
      />
      <ImageZoomModal src={zoomImageSrc} onClose={() => setZoomImageSrc(null)} />
    </div>
  );
}
