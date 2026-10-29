import React from 'react';

/* Կետավոր օղակներ՝ դրսի կետերը ավելի խոշոր են, շախմատային դասավորությամբ */
function DottedRings({ size = 580 }) {
  const c = size / 2;
  const dots = [];

  for (let i = 0; i < 8; i++) {
    const r = 175 + i * 14;
    const n = Math.round((2 * Math.PI * r) / 15);
    const dotR = 1.8 + i * 0.35;
    const offset = (i % 2) * (Math.PI / n);

    for (let k = 0; k < n; k++) {
      const a = (k / n) * 2 * Math.PI + offset;
      dots.push(
        <circle
          key={`${i}-${k}`}
          cx={c + r * Math.cos(a)}
          cy={c + r * Math.sin(a)}
          r={dotR}
        />
      );
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="#f5e7a3">
      {dots}
    </svg>
  );
}

/* Ոսկե դափնեպսակ՝ մարմարե հիմքով */
function Laurel({ className }) {
  const cx = 150;
  const cy = 150;
  const R = 105;
  const N = 17;
  const leafPath = 'M0 0 C8 -9 24 -9 34 0 C24 9 8 9 0 0 Z';
  const leaves = [];

  // s = 1՝ ձախ թև, s = -1՝ աջ թև (երկուսն էլ աճում են ներքևից դեպի վերև)
  [1, -1].forEach((s) => {
    for (let k = 0; k < N; k++) {
      const a = s === 1 ? 112 + k * 9.4 : 68 - k * 9.4;
      const d = a + 90 * s;
      const sc = 1 - (k / N) * 0.12;
      const rad = (a * Math.PI) / 180;

      // արտաքին և ներքին տերևներ՝ հակառակ թեքումով
      [
        [6, d - 28 * s],
        [-6, d + 28 * s],
      ].forEach(([off, dir], j) => {
        const x = cx + (R + off) * Math.cos(rad);
        const y = cy + (R + off) * Math.sin(rad);
        leaves.push(
          <g
            key={`${s}-${k}-${j}`}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${dir.toFixed(1)}) scale(${sc.toFixed(2)})`}
          >
            <path d={leafPath} fill="url(#awd-leaf)" />
            <path d="M2 0 L30 0" stroke="#7a4a14" strokeWidth="0.8" opacity="0.45" />
          </g>
        );
      });
    }
  });

  return (
    <svg className={className} viewBox="0 0 300 340" fill="none">
      <defs>
        <linearGradient id="awd-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbe7ad" />
          <stop offset="0.5" stopColor="#d4a04c" />
          <stop offset="1" stopColor="#8f5a1c" />
        </linearGradient>
        <linearGradient id="awd-marble-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ececf2" />
          <stop offset="1" stopColor="#c9c9d3" />
        </linearGradient>
        <linearGradient id="awd-marble-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e4e4ec" />
        </linearGradient>
      </defs>

      {/* ստվեր հիմքի տակ */}
      <ellipse cx="150" cy="320" rx="48" ry="8" fill="#000" opacity="0.08" />

      {/* մարմարե հիմք */}
      <ellipse cx="150" cy="312" rx="42" ry="12" fill="#cfcfd8" />
      <rect x="108" y="296" width="84" height="16" fill="url(#awd-marble-side)" />
      <ellipse cx="150" cy="296" rx="42" ry="12" fill="url(#awd-marble-top)" />

      {/* ոտիկ */}
      <line x1="150" y1="256" x2="150" y2="296" stroke="#c99a4b" strokeWidth="3" />

      {/* ժապավենի ծայրերը */}
      <path d="M150 254 C141 264 132 264 124 272" stroke="#b8802f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M150 254 C159 264 168 264 176 272" stroke="#b8802f" strokeWidth="2.5" strokeLinecap="round" />

      {/* տերևներ */}
      {leaves}
    </svg>
  );
}

/* Դեղին եռանկյուն */
function TriangleYellow({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 56">
      <polygon points="2,4 62,16 28,28" fill="#ffe45c" />
      <polygon points="2,4 28,28 22,50" fill="#f2c200" />
      <polygon points="28,28 62,16 22,50" fill="#d9a600" />
    </svg>
  );
}

/* Վարդագույն զիգզագ */
function Zigzag({ className }) {
  return (
    <svg className={className} viewBox="0 0 72 52" fill="none">
      <defs>
        <linearGradient id="awd-zig" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b79cff" />
          <stop offset="1" stopColor="#ff2bd6" />
        </linearGradient>
      </defs>
      <path
        d="M8 13 H38 V39 H66"
        stroke="#c21aa6"
        strokeWidth="10"
        strokeLinejoin="miter"
        transform="translate(3 3)"
      />
      <path
        d="M8 13 H38 V39 H66"
        stroke="url(#awd-zig)"
        strokeWidth="10"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/* Մանուշակագույն դատարկ եռանկյուն */
function TrianglePurple({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 60" style={{ transform: 'rotate(-18deg)' }}>
      <defs>
        <linearGradient id="awd-tri" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d6c8ff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        fill="url(#awd-tri)"
        d="M32 4 L60 54 L4 54 Z M32 24 L46 47 L18 47 Z"
      />
      <polygon points="32,4 60,54 46,47 32,24" fill="#6d28d9" opacity="0.55" />
      <polygon points="4,54 60,54 46,47 18,47" fill="#5b21b6" opacity="0.5" />
    </svg>
  );
}

/* Դափնեպսակ + կետեր + ֆիգուրներ */
export default function AwardsDecor() {
  return (
    <div className="relative hidden lg:block h-[540px] lg:-mt-12" aria-hidden="true">
      {/* սպիտակ ձև՝ պսակի տակից մինչև աջ եզրը */}
      <div className="absolute left-[250px] top-[300px] w-[100vw] h-[230px] rounded-l-[115px] bg-white" />

      {/* կետավոր օղակներ */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <DottedRings />
      </div>

      {/* դափնեպսակ */}
      <Laurel className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[46%] w-[270px] select-none drop-shadow-md" />

      {/* դեղին եռանկյուն */}
      <TriangleYellow className="absolute left-0 top-[110px] w-[60px] drop-shadow-md" />

      {/* զիգզագ */}
      <Zigzag className="absolute left-[205px] top-0 w-[70px] drop-shadow-md" />

      {/* մանուշակագույն եռանկյուն */}
      <TrianglePurple className="absolute left-[105px] bottom-[60px] w-[64px] drop-shadow-md" />
    </div>
  );
}