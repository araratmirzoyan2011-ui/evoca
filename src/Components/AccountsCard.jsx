import React from 'react';

const InfoCard = ({ title, description, imageUrl, altText }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch justify-between bg-[#f5f3f8] rounded-3xl overflow-hidden shadow-sm">
      {/* Տեքստային մաս */}
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#1a172c] mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl">
          {description}
        </p>
      </div>

      {/* Նկարի մաս */}
      <div className="flex-1 w-full flex justify-end items-center bg-transparent">
        <img 
          src={imageUrl} 
          alt={altText || title} 
          className="w-full h-full object-cover md:object-contain max-h-[450px]"
        />
      </div>
    </div>
  );
};

export default InfoCard;