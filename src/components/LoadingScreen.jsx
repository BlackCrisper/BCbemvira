import { LOGO_URL } from '../data/config';

export function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-soft-white)]"
      role="status"
      aria-label="Carregando"
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src={LOGO_URL}
          alt="Bemvirá"
          className="h-24 w-auto object-contain animate-pulse"
        />
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-[var(--color-light-purple)]">
          <div className="loading-bar h-full w-1/2 rounded-full bg-[var(--color-primary)]" />
        </div>
        <p className="text-sm text-[var(--color-medium-gray)]">Carregando...</p>
      </div>
    </div>
  );
}
