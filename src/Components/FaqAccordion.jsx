import React, { useState } from 'react';

export default function FaqAccordion({ title, description, items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!items || items.length === 0) return null;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 my-6">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-[#2d124d] mb-3">
          {title}
        </h2>
      )}

      {description && (
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
          {description}
        </p>
      )}

      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.id || index}
              className="bg-white rounded-2xl border border-[#e2d4f8] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center gap-4 px-6 py-4 text-left focus:outline-none group"
              >
                <svg
                  className={`w-5 h-5 text-[#6a0fd9] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

                <span className="text-[#2d124d] font-semibold text-base md:text-lg">
                  {item.question}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-2 pl-15 text-gray-600 text-sm md:text-base leading-relaxed border-t border-[#f2eafe] bg-[#faf8ff]">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}