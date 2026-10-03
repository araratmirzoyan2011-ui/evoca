import React from 'react';

export default function PromoCard({ title, text, image, imageAlt }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative flex flex-col lg:flex-row items-center">
        
        <div className="w-full lg:w-7/12 bg-gradient-to-br from-[#faf8fc] to-[#f3edf7] rounded-[40px] p-8 sm:p-12 lg:py-20 lg:px-16 z-10 shadow-sm">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.2] mb-6">
            {title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
            {text}
          </p>
        </div>

        <div className="w-full lg:w-6/12 lg:-ml-16 mt-6 lg:mt-0 z-20">
          <div className="rounded-[32px] overflow-hidden shadow-xl h-[350px] sm:h-[420px] lg:h-[480px]">
            <img 
              src={image} 
              alt={imageAlt || "Promo Image"} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
}