import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { sendToWhatsApp } from '../utils/whatsapp';
import { ImageZoomModal } from './ImageZoomModal';

export function ProductModal({ product, categoryTitle, onClose, onOpenZoom }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();
  const images = product?.images?.length ? product.images : (product?.image ? [product.image] : []);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product?.id]);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    if (product) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const currentImage = images[currentImageIndex] || product.image;
  const hasMultiple = images.length > 1;

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    onClose();
  };

  const handleWhatsApp = () => {
    sendToWhatsApp({ productName: product.name, price: product.price });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
        <div
          className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl md:max-h-[85vh] md:flex"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 transition hover:bg-white"
            aria-label="Fechar"
          >
            <i className="fas fa-times text-xl" />
          </button>

          <div className="flex flex-1 flex-col md:flex-row">
            <div className="relative flex-shrink-0 bg-gray-100 md:w-1/2">
              <div className="aspect-square w-full overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="h-full w-full cursor-zoom-in object-cover"
                  onClick={() => onOpenZoom(currentImage)}
                />
              </div>
              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={() => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow transition hover:bg-white"
                    aria-label="Imagem anterior"
                  >
                    <i className="fas fa-chevron-left" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentImageIndex((i) => (i + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow transition hover:bg-white"
                    aria-label="Próxima imagem"
                  >
                    <i className="fas fa-chevron-right" />
                  </button>
                  <div className="flex justify-center gap-2 p-2">
                    {images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setCurrentImageIndex(i)}
                        className={`h-2 w-2 rounded-full transition ${i === currentImageIndex ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`}
                        aria-label={`Imagem ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
              <div>
                <h2 id="product-modal-title" className="mb-2 text-xl font-semibold text-[var(--color-dark-text)] md:text-2xl">
                  {product.name}
                </h2>
                <p className="mb-4 text-xl font-semibold text-[var(--color-primary)]">{product.price}</p>
                {product.description && (
                  <p className="mb-4 text-sm text-[var(--color-medium-gray)]">{product.description}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-gradient-bemvira flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white"
                >
                  <i className="fas fa-cart-plus" /> Adicionar ao Carrinho
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-green-600 py-3 font-medium text-green-600 transition hover:bg-green-50"
                >
                  <i className="fab fa-whatsapp text-xl" /> Comprar no WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
