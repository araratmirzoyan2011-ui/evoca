import React from 'react';

const Card = ({ 
  imageSrc, 
  discount, 
  title, 
  badgeText, 
  category, 
  hasCardIcon = true, 
  socials = { instagram: true, website: false } 
}) => {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      {/* Նկարի հատվածը */}
      <div>
        <div className="relative w-full h-[180px] bg-gray-900">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Բովանդակության հատվածը */}
        <div className="p-4 flex flex-col gap-2">
          {/* Վերնագիրը զեղչի տոկոսով */}
          <h3 className="text-lg font-bold text-gray-900 leading-snug min-h-[52px]">
            <span className="text-purple-600 font-extrabold mr-1.5">{discount}</span>
            {title}
          </h3>

          {/* Զեղչ և ինֆորմացիոն իկոնկա */}
          <div className="flex items-center gap-1.5 text-purple-600 font-medium text-sm">
            <span>{badgeText}</span>
            {/* Info SVG Icon */}
            <svg className="w-4 h-4 cursor-pointer hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
        </div>
      </div>

      {/* Ներքևի կոճակներն ու իկոնկաները */}
      <div className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Կատեգորիայի թեգը */}
          <span className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-800 font-medium bg-white">
            {category}
          </span>

          {/* Քարտի իկոնկան */}
          {hasCardIcon && (
            <div className="p-1.5 border border-gray-200 rounded-lg flex items-center justify-center bg-white text-gray-700">
              {/* Credit Card SVG Icon */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
          )}
        </div>

        {/* Սոց․ ցանցերի SVG իկոնկաներ */}
        <div className="flex items-center gap-2 text-gray-800">
          {socials?.instagram && (
            <button className="hover:text-black transition-colors p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </button>
          )}
          {socials?.website && (
            <button className="hover:text-black transition-colors p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" x2="22" y1="12" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;