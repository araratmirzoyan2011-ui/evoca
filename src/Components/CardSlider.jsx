import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase.js';
import { useLocalized } from '../hooks/useLocalized.js';

const VISIBLE = 3;        // միաժամանակ քանի thumbnail է երևում
const ITEM_HEIGHT = 74;   // 64px (h-16) + 10px (gap)

/* ===================== i18n ===================== */
const sliderResources = {
  hy: { cardSlider: { details: 'Մանրամասն', up: 'Վերև', down: 'Ներքև', noImage: 'Նկար չկա' } },
  en: { cardSlider: { details: 'Details', up: 'Up', down: 'Down', noImage: 'No image' } },
  ru: { cardSlider: { details: 'Подробнее', up: 'Вверх', down: 'Вниз', noImage: 'Нет изображения' } },
};

Object.entries(sliderResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

// **տեքստ** -> մանուշակագույն թավ տեքստ
const renderHighlighted = (text) =>
  (text || '').split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? (
      <span key={i} className="text-[#6a00d8] font-semibold">
        {part.slice(2, -2)}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

// Եթե title-ը slug է (4u-gift-card), դարձնում ենք «4u Gift Card»
const getTitle = (card) => {
  const t = card?.title || '';
  return /^[a-z0-9]+(-[a-z0-9]+)+$/i.test(t)
    ? t.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : t;
};

const getImg = (card) => card?.image || card?.img;

// Քարտի 3D թեքում + լույսի փայլ՝ մկնիկին հետևելով
function TiltCard({ src, alt }) {
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, hover: false });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - y) * 16, ry: (x - 0.5) * 16, gx: x * 100, gy: y * 100, hover: true });
  };

  const handleLeave = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50, hover: false });

  return (
    <div className="w-full h-full [perspective:1000px]">
      <div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`relative w-full h-full rounded-2xl [transform-style:preserve-3d] ${
          t.hover ? 'duration-100 ease-out' : 'duration-[600ms] ease-out'
        } transition-transform`}
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.hover ? 1.04 : 1})`,
          filter: `drop-shadow(0 ${t.hover ? 26 : 16}px ${t.hover ? 28 : 20}px rgba(76, 29, 149, 0.25))`,
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="w-full h-full object-contain rounded-2xl select-none"
        />
        {/* Փայլ */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
            t.hover ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.35), transparent 55%)`,
          }}
        />
      </div>
    </div>
  );
}

export function CardSlider() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const l = useLocalized();
  const [cards, setCards] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [offsetIndex, setOffsetIndex] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const snap = await getDocs(collection(db, 'CardmenuItems'));
        setCards(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
      } catch (error) {
        console.error('CardmenuItems բեռնելիս սխալ տեղի ունեցավ:', error);
      }
    };
    fetchCards();
  }, []);

  if (cards.length === 0) return null;

  const maxOffset = Math.max(0, cards.length - VISIBLE);
  const handlePrev = () => setOffsetIndex((p) => Math.max(0, p - 1));
  const handleNext = () => setOffsetIndex((p) => Math.min(maxOffset, p + 1));

  const activeCard = cards[activeCardIndex] || cards[0];
  const pad = (n) => String(n).padStart(2, '0');

  const arrowClass =
    'text-purple-700 hover:bg-purple-100 rounded-full transition-all cursor-pointer p-1 z-10 ' +
    'disabled:opacity-30 disabled:cursor-default disabled:hover:bg-transparent max-[400px]:hidden';
console.log(cards);

  return (
    <section className="relative w-full overflow-hidden my-12 border-y border-purple-100/70 bg-gradient-to-br from-[#faf5ff] via-white to-[#f1e4ff]">

      {/* Ֆոնային փայլք */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-[360px] h-[360px] rounded-full bg-purple-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 w-[300px] h-[300px] rounded-full bg-fuchsia-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

        {/* Thumbnail-ներ */}
        <div className="relative flex flex-col items-center gap-2 w-full lg:w-auto">
          <button onClick={handlePrev} disabled={offsetIndex === 0} className={arrowClass} aria-label={t('cardSlider.up')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>

          <div
            className="relative w-32 overflow-hidden
              [mask-image:linear-gradient(to_bottom,transparent_0,#000_12px,#000_calc(100%_-_12px),transparent_100%)]
              max-[400px]:[mask-image:none] max-[400px]:w-full max-[400px]:!h-auto max-[400px]:overflow-x-auto max-[400px]:pb-2"
            style={{ height: VISIBLE * ITEM_HEIGHT + 4 }}
          >
            <div
              className="absolute top-0 left-0 w-full flex flex-col items-center gap-2.5 pt-1 transition-transform duration-300 ease-in-out
                translate-y-[var(--ty)]
                max-[400px]:static max-[400px]:flex-row max-[400px]:gap-2 max-[400px]:translate-y-0 max-[400px]:w-max"
              style={{ '--ty': `-${offsetIndex * ITEM_HEIGHT}px` }}
            >
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => setActiveCardIndex(index)}
                  className={`w-24 h-16 max-[400px]:w-[65px] max-[400px]:h-[45px] rounded-xl p-1.5 cursor-pointer transition-all duration-300 border-2 flex items-center justify-center bg-white shrink-0 ${
                    activeCardIndex === index
                      ? 'border-purple-600 scale-105 shadow-lg shadow-purple-200'
                      : 'border-transparent shadow-sm opacity-60 hover:opacity-100 hover:-translate-y-0.5'
                  }`}
                >
                  {getImg(card) ? (
                    <img src={getImg(card)} alt={getTitle(card)} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-[10px] font-bold text-center text-gray-800 truncate">{getTitle(card)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleNext} disabled={offsetIndex === maxOffset} className={arrowClass} aria-label={t('cardSlider.down')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        {/* Մեծ քարտ */}
        <div className="relative flex-1 flex justify-center w-full">
          {/* Քարտի տակի լույսի շրջան */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-10 rounded-full bg-purple-400/30 blur-2xl" />
          <div
            key={activeCard.id}
            className="animate-card-in motion-reduce:animate-none relative w-[280px] sm:w-[440px] h-[180px] sm:h-[270px] flex items-center justify-center"
          >
            {getImg(activeCard) ? (
              <TiltCard src={getImg(activeCard)} alt={getTitle(activeCard)} />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
                {t('cardSlider.noImage')}
              </div>
            )}
          </div>
        </div>

        {/* Վերնագիր + նկարագրություն + կոճակ */}
        <div
          key={`text-${activeCard.id}`}
          className="animate-text-in motion-reduce:animate-none relative flex-1 flex flex-col items-center lg:items-start gap-4 text-center lg:text-left w-full"
        >
          <span className="text-xs font-semibold tracking-widest text-purple-400">
            {pad(activeCardIndex + 1)} / {pad(cards.length)}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {getTitle(activeCard)}
          </h2>
          {activeCard.description && (
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 max-w-md">
              {renderHighlighted(l(activeCard.description))}
            </p>
          )}
          <button
            onClick={() => navigate(`/current-card/${activeCard.id}`)}
            className="group mt-1 flex items-center gap-2 bg-[#6600cc] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#5500aa] hover:shadow-lg hover:shadow-purple-300 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            {t('cardSlider.details')}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}

export default CardSlider;