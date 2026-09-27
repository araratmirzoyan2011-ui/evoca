import React from 'react';

const LoanCard = ({ 
  title, 
  description, 
  duration, 
  limit, 
  rate, 
  imageSrc, 
  onDetailsClick 
}) => {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center border border-gray-100">
      
      {/* Ձախ կողմի նկար/իլյուստրացիա */}
      <div className="w-full md:w-5/12 bg-gray-50 rounded-xl p-4 flex items-center justify-center">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-auto object-contain max-h-64"
        />
      </div>

      {/* Աջ կողմի բովանդակություն */}
      <div className="w-full md:w-7/12 flex flex-col">
        {/* Վերնագիր */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
          {title}
        </h2>

        {/* Նկարագրություն */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
          {description}
        </p>

        {/* Ցուցանիշներ (Ժամկետ, Սահմանաչափ, Տոկոսադրույք) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Ժամկետ */}
          <div>
            <span className="text-xs text-gray-500 block mb-1">{duration.topText || 'Մինչև'}</span>
            <div className="text-2xl md:text-3xl font-bold text-purple-700">{duration.value}</div>
            <span className="text-xs text-gray-500 mt-1 block">{duration.label}</span>
          </div>

          {/* Սահմանաչափ */}
          <div>
            <span className="text-xs text-gray-500 block mb-1">{limit.topText || 'Մինչև'}</span>
            <div className="text-2xl md:text-3xl font-bold text-purple-700">{limit.value}</div>
            <span className="text-xs text-gray-500 mt-1 block">{limit.label}</span>
          </div>

          {/* Տոկոսադրույք */}
          <div>
            <div className="text-2xl md:text-3xl font-bold text-purple-700 mt-5 sm:mt-0">{rate.value}</div>
            <span className="text-xs text-gray-500 mt-1 block">{rate.label}</span>
          </div>
        </div>

        {/* Կոճակ */}
        <div>
          <button 
            onClick={onDetailsClick}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold px-6 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
          >
            Մանրամասն
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