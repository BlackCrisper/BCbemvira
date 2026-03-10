/**
 * Sacola de papel "Bemvirá" – vista frontal pura.
 * Um único retângulo vertical (proporção 1:1.2), sem laterais em perspectiva.
 */
export function HeroPaperBag({ className = '' }) {
  return (
    <div className={`hero-bag-enter hero-bag-idle ${className}`} aria-hidden>
      <svg
        viewBox="0 0 200 240"
        className="w-full max-w-[200px] md:max-w-[260px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bag-front" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fafafa" />
            <stop offset="50%" stopColor="#f5f5f5" />
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>
          <linearGradient id="handle-ribbon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b2d75" />
            <stop offset="50%" stopColor="#5d1f69" />
            <stop offset="100%" stopColor="#4a1852" />
          </linearGradient>
          <filter id="bag-shadow" x="-20%" y="-10%" width="140%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodOpacity="0.12" floodColor="#000" />
          </filter>
          <filter id="text-deboss" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset in="SourceAlpha" dx="0.5" dy="0.5" result="offset" />
            <feGaussianBlur in="offset" stdDeviation="0.3" result="blur" />
            <feFlood floodColor="#5d1f69" floodOpacity="0.2" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sombra – elipse horizontal, centralizada */}
        <ellipse cx="100" cy="232" rx="48" ry="5" fill="rgba(0,0,0,0.1)" />

        {/* Base rígida – retângulo horizontal, sem inclinação */}
        <rect
          x="52"
          y="216"
          width="96"
          height="4"
          rx="0"
          fill="#f0f0f0"
          stroke="#e5e5e5"
          strokeWidth="0.5"
        />

        {/* Face frontal – um único retângulo (proporção 1:1.2: largura 100, altura 120) */}
        <rect
          x="50"
          y="95"
          width="100"
          height="120"
          fill="url(#bag-front)"
          stroke="#e5e5e5"
          strokeWidth="0.5"
          filter="url(#bag-shadow)"
        />

        {/* Vincos laterais – linhas verticais sutis, só para detalhe */}
        <line x1="58" y1="95" x2="58" y2="215" stroke="#e8e8e8" strokeWidth="0.8" opacity="0.7" />
        <line x1="142" y1="95" x2="142" y2="215" stroke="#e8e8e8" strokeWidth="0.8" opacity="0.7" />

        {/* Texto BEMVIRÁ – terço médio-inferior */}
        <text
          x="100"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          letterSpacing="0.08em"
          fill="#5d1f69"
          fontFamily="'Playfair Display', Georgia, serif"
          filter="url(#text-deboss)"
        >
          BEMVIRÁ
        </text>

        {/* Alças – simétricas em relação ao centro (x=100) */}
        <path
          d="M 58 95 Q 38 50 58 38"
          fill="none"
          stroke="url(#handle-ribbon)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M 142 95 Q 162 50 142 38"
          fill="none"
          stroke="url(#handle-ribbon)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M 58 38 Q 100 22 142 38"
          fill="none"
          stroke="url(#handle-ribbon)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.95"
        />
      </svg>
    </div>
  );
}
