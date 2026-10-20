import React from 'react';

export const BenefitsHeader = ({ 
  searchTerm, 
  setSearchTerm, 
  activeCategory, 
  setActiveCategory 
}) => {
  const paymentLogos = [
    { id: "visa", imageUrl: "https://www.evoca.am/images/landing_card_groups/1/17768428900225.png", alt: "Visa" },
    { id: "mastercard", imageUrl: "https://www.evoca.am/images/landing_card_groups/1/17768429357504.png", alt: "Mastercard" },
    { id: "arca", imageUrl: "https://www.evoca.am/images/landing_card_groups/1/17768429488894.png", alt: "ArCa" },
    { id: "unionpay", imageUrl: "https://www.evoca.am/images/landing_card_groups/1/17768429612343.png", alt: "UnionPay" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
      
      <h1 className="text-2xl md:text-4xl font-bold text-purple-700 mb-8">
        Բացահայտիր Evoca քարտերի բենեֆիթները
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
        {paymentLogos.map((logo) => (
          <button
            key={logo.id}
            type="button"
            onClick={() => setActiveCategory && setActiveCategory(logo.id)}
            className={`transition duration-200 cursor-pointer rounded-full overflow-hidden hover:opacity-80 p-2 ${
              activeCategory === logo.id ? 'ring-2 ring-purple-600 scale-105 bg-purple-50' : ''
            }`}
          >
            <img 
              src={logo.imageUrl} 
              alt={logo.alt} 
              className="h-8 md:h-10 object-contain"
            />
          </button>
        ))}
      </div>

      <div className="w-full max-w-xl relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Որոնել"
          className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
        />
      </div>

      <div className="w-full text-left">
        <h2 className="text-xl font-bold text-gray-900">
          Ֆիլտրներ
        </h2>
      </div>

    </div>
  );
};