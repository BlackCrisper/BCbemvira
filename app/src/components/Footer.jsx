import { LOGO_URL } from '../data/config';
import { sendToWhatsApp } from '../utils/whatsapp';

export function Footer() {
  return (
    <footer id="contato" className="bg-[var(--color-dark-purple)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 font-semibold">Contato</h3>
            <p className="flex items-center gap-2 text-sm opacity-90">
              <i className="fas fa-phone w-4" /> +55 79 9849-4303
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm opacity-90">
              <i className="fas fa-envelope w-4" /> sac.bemvira@gmail.com
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm opacity-90">
              <i className="fas fa-map-marker-alt w-4" /> Sergipe, Brasil
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">Siga-nos</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/bem.vira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-90 transition hover:opacity-100"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-2xl" />
              </a>
              <button
                type="button"
                onClick={() => sendToWhatsApp({})}
                className="text-white opacity-90 transition hover:opacity-100"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp text-2xl" />
              </button>
            </div>
          </div>
          <div className="sm:col-span-2 lg:col-span-1" />
          <div>
            <h3 className="mb-3 font-semibold">Bemvirá</h3>
            <p className="text-sm opacity-90">Bem-estar, bem-viver, Bemvirá.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-sm opacity-80">
        &copy; {new Date().getFullYear()} Bemvirá. Todos os direitos reservados.
      </div>
    </footer>
  );
}
