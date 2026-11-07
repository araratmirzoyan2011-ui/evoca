import React from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLocalized } from '../hooks/useLocalized.js';

const loanCardResources = {
  hy: { loanCard: { details: 'Մանրամասն' } },
  en: { loanCard: { details: 'Details' } },
  ru: { loanCard: { details: 'Подробнее' } },
};
Object.entries(loanCardResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

const LoanCard = ({
  title,
  description,
  stats = [],
  imageSrc,
  onDetailsClick
}) => {
  const { t } = useTranslation();
  const l = useLocalized();

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 md:p-8 max-[400px]:p-3 max-[400px]:rounded-xl shadow-sm flex flex-col md:flex-row gap-8 max-[400px]:gap-3 items-center border border-gray-100 mb-6 max-[400px]:mb-4">

      <div className="w-full md:w-5/12 bg-gray-50 rounded-xl p-4 max-[400px]:p-2 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={l(title)}
          className="w-full h-auto object-contain max-h-64 max-[400px]:max-h-36"
        />
      </div>

      <div className="w-full md:w-7/12 flex flex-col">
        <h2 className="text-xl md:text-2xl max-[400px]:text-lg font-extrabold text-gray-900 mb-3 max-[400px]:mb-2">
          {l(title)}
        </h2>

        <p className="text-gray-600 text-sm md:text-base max-[400px]:text-xs leading-relaxed mb-6 max-[400px]:mb-4">
          {l(description)}
        </p>

        <div className={`grid grid-cols-2 ${stats.length > 3 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-4 max-[400px]:gap-2 mb-8 max-[400px]:mb-4`}>
          {stats.map((stat, index) => (
            <div key={index}>
              {stat.topText && (
                <span className="text-xs text-gray-500 block mb-1">{l(stat.topText)}</span>
              )}
              <div className="text-xl md:text-2xl max-[400px]:text-base font-bold text-purple-700">{l(stat.value)}</div>
              <span className="text-xs max-[400px]:text-[10px] text-gray-500 mt-1 block">{l(stat.label)}</span>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={onDetailsClick}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold px-6 py-3 max-[400px]:px-4 max-[400px]:py-2 max-[400px]:text-sm rounded-xl transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
          >
            {t('loanCard.details')}
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
              ›
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoanCard;