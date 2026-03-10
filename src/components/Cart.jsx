import { useRef, useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { sendToWhatsApp, buildCartMessage } from '../utils/whatsapp';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ConfirmationModal } from './ConfirmationModal';

export function Cart({ open, onClose }) {
  const { items, removeItem, updateQuantity, formatTotal } = useCart();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const ref = useRef(null);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
  }, [open]);

  const handleCheckout = () => {
    const msg = buildCartMessage(items, formatTotal);
    sendToWhatsApp({ customMessage: msg });
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <aside
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        className={`fixed z-[2001] flex flex-col bg-white shadow-2xl transition-all duration-300 ${
          isMobile ? 'cart-mobile-viewport inset-0 w-full' : 'right-0 top-0 h-full w-full max-w-md'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-4">
          <h2 className="text-lg font-semibold text-[var(--color-dark-text)]">Carrinho</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
            aria-label="Fechar carrinho"
          >
            <i className="fas fa-times text-xl" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
              <span className="mb-2 text-4xl">🛒</span>
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const qty = item.quantity || 1;
                return (
                  <li
                    key={`${item.id}-${item.name}`}
                    className="flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:gap-3"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-20 w-20 shrink-0 rounded-lg object-cover sm:h-16 sm:w-16"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--color-dark-text)]">{item.name}</p>
                      <p className="text-sm font-semibold text-[var(--color-primary)]">{item.price}</p>
                      <div className="mt-2 flex items-center justify-between gap-2 sm:justify-start">
                        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.max(1, qty - 1))}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-l-lg text-[var(--color-primary)] transition hover:bg-[var(--color-light-purple)]"
                            aria-label="Diminuir quantidade"
                          >
                            <i className="fas fa-minus text-sm" />
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-medium" aria-live="polite">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, qty + 1)}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-r-lg text-[var(--color-primary)] transition hover:bg-[var(--color-light-purple)]"
                            aria-label="Aumentar quantidade"
                          >
                            <i className="fas fa-plus text-sm" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setItemToRemove(item)}
                          className="rounded p-2 text-red-500 transition hover:bg-red-50"
                          aria-label="Remover item"
                        >
                          <i className="fas fa-trash-alt" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div
            className="shrink-0 border-t border-gray-200 bg-white p-4"
            style={isMobile ? { paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' } : undefined}
          >
            <div className="mb-3 flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-[var(--color-primary)]">{formatTotal()}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
            >
              <i className="fab fa-whatsapp text-xl" />
              Finalizar no WhatsApp
            </button>
          </div>
        )}
      </aside>
      <ConfirmationModal
        open={!!itemToRemove}
        message="Tem certeza que deseja remover este item do carrinho?"
        onConfirm={() => {
          if (itemToRemove) removeItem(itemToRemove.id);
          setItemToRemove(null);
        }}
        onCancel={() => setItemToRemove(null)}
      />
    </>
  );
}
