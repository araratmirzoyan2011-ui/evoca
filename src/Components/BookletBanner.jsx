import React from 'react';

const BookletBanner = ({ title, image, alt = '', className = '' }) => {
  return (
    <section className={`w-full bg-white px-4 md:px-12 py-6 ${className}`}>
      <div className="max-w-5xl mx-auto bg-[#fafafa] flex items-center justify-between gap-4 px-6 md:px-14 py-6 md:py-0 md:min-h-[290px]">
        <h2 className="text-[#6a0fd9] text-2xl md:text-[32px] leading-tight font-normal max-w-[45%] md:max-w-[40%]">
          {title}
        </h2>

        <img
          src={image}
          alt={alt || title}
          className="w-[45%] max-w-[300px] md:max-w-[340px] h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default BookletBanner;