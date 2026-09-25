import React from 'react';

export function EvocaReviewCard({ quote, author, title }) {
  return (
    <div className="relative max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-10 flex flex-col items-center text-center bg-white rounded-2xl shadow-xl shadow-slate-100/80 border border-slate-100 transition-all duration-300 hover:shadow-2xl">
      
      {/* Դեկորատիվ մեծ չակերտներ (Background Quote Icon) */}
      <span className="absolute top-4 left-6 text-6xl sm:text-7xl text-amber-100 font-serif select-none pointer-events-none opacity-80">
        “
      </span>

      {/* Աստղեր (Stars) */}
      <div className="flex space-x-1.5 mb-5 text-amber-400 relative z-10">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-current drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Տեքստ / Կարծիք (Quote) */}
      <p className="text-slate-700 text-[15px] sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 relative z-10 px-2 max-w-2xl">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Հեղինակի բլոկ */}
      <div className="relative z-10 flex flex-col items-center">
        <h4 className="text-slate-900 font-bold text-base md:text-lg tracking-tight mb-0.5">
          {author}
        </h4>
        <p className="text-slate-400 text-xs sm:text-sm font-medium">
          {title}
        </p>
      </div>

      {/* Մինչև 400px էկրանների համար հատուկ ոճավորում / media query */}
      <style>{`
        @media (max-width: 400px) {
          .max-w-3xl {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }
          p {
            font-size: 0.875rem !important; /* 14px փոքր էկրանների համար */
            line-height: 1.5 !important;
          }
        }
      `}</style>
    </div>
  );
}