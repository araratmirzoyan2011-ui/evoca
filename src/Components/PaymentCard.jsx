import React from 'react';

export default function EvocaCard({ 
  title, 
  imageSrc, 
  bgColor = "bg-white", 
  textColor = "text-violet-800",
  shadow = "shadow-lg",
  rounded = "rounded-3xl",
  size = "w-80 h-80",          // մեծացրած card-ի չափը
  imageSize = "w-48 h-48",     // նկարի չափը (կարող ես տալ մինչև w-[400px] h-[400px])
  onClick 
}) {
  return (
    <div 
      onClick={onClick}
      className={`${size} ${bgColor} ${rounded} ${shadow} flex flex-col items-center justify-center p-6 transition-transform duration-300 hover:scale-105 cursor-pointer`}
    >
      {/* Նկարի հատված */}
      <div className={`mb-6 ${imageSize} flex items-center justify-center`}>
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-contain"
          />
        ) : (
          <svg 
            width="70" 
            height="70" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-violet-700"
          >
            <path d="M3 6L10.5 18H13.5L21 6H17.25L12 14L6.75 6H3Z" fill="currentColor"/>
          </svg>
        )}
      </div>

      {/* Վերնագիր */}
      <h2 className={`${textColor} font-bold tracking-widest text-lg font-sans text-center`}>
        {title}
      </h2>
    </div>
  );
}