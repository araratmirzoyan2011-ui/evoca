
import React from 'react';

const BookletBanner = ({ title, image, alt = '', href, className = '' }) => {
  const content = title ? (
    <div className="bg-[#fafafa] flex items-center justify-between gap-4 px-6 md:px-14 py-6 md:py-0 md:min-h-[290px]">
      <h2 className="text-[#6a0fd9] text-2xl md:text-[32px] leading-tight font-normal max-w-[45%] md:max-w-[40%]">
        {title}
      </h2>
      <img
        src={image}
        alt={alt || title}
        className="w-[45%] max-w-[300px] md:max-w-[340px] h-auto object-contain"
      />
    </div>
  ) : (
    <img src={image} alt={alt} className="block w-full h-auto" loading="lazy" />
  );

  return (
    <div className={className}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};

export default BookletBanner;