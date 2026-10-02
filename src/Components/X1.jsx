import React from 'react';

export default function HumanFirstComponent({ title, description }) {
  return (
    <div className="p-0 max-[400px]:text-center">
      <h2 className="text-[22px] font-bold text-[#4b00a8] mb-4 leading-snug max-[400px]:text-xl max-[400px]:mb-2">
        {title}
      </h2>
      <p className="text-gray-600 text-[13px] leading-relaxed max-[400px]:text-[12px]">
        {description}
      </p>
    </div>
  );
}