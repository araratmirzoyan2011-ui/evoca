import React from 'react';

export default function PresentationCard({ imageSrc, title }) {
  const CardContent = (
    <div className="w-full max-w-[300px] group cursor-pointer font-sans transition-transform duration-300 hover:-translate-y-1">

      <div className="w-full overflow-hidden rounded-md shadow-md mb-3 bg-gray-100">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
        {title}
      </h3>
    </div>
  );

  return CardContent;
}