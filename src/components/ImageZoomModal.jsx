import { useState, useEffect } from 'react';

export function ImageZoomModal({ src, onClose }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    if (src) {
      document.addEventListener('keydown', handleEscape);
      setScale(1);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
        aria-label="Fechar"
      >
        <i className="fas fa-times text-xl" />
      </button>
      <div className="flex gap-2 absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/20 p-2">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setScale((s) => Math.max(0.5, s - 0.25)); }}
          className="rounded-full bg-white/30 p-2 text-white hover:bg-white/50"
          aria-label="Diminuir zoom"
        >
          <i className="fas fa-minus" />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setScale((s) => Math.min(3, s + 0.25)); }}
          className="rounded-full bg-white/30 p-2 text-white hover:bg-white/50"
          aria-label="Aumentar zoom"
        >
          <i className="fas fa-plus" />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setScale(1); }}
          className="rounded-full bg-white/30 p-2 text-white hover:bg-white/50"
          aria-label="Resetar zoom"
        >
          <i className="fas fa-expand-arrows-alt" />
        </button>
      </div>
      <img
        src={src}
        alt="Ampliação"
        className="max-h-[85vh] max-w-full object-contain transition-transform"
        style={{ transform: `scale(${scale})` }}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />
    </div>
  );
}
