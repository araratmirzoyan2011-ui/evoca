import React, { useState } from 'react';

const AccordionItem = ({ title, date, description, items, isOpenDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300">
      <button
        onClick={toggleAccordion}
        className="w-full flex items-start justify-between text-left focus:outline-none group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 text-purple-700 transition-transform duration-300 transform ${
              isOpen ? 'rotate-0' : 'rotate-180'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 15l7-7 7 7"
            ></path>
          </svg>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
            {title}
          </h3>
        </div>
      </button>

      {/* Date */}
      {date && (
        <div className="mt-2 text-xs font-medium text-gray-400">
          {date}
        </div>
      )}

      {/* Accordion Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {description && (
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {description}
            </p>
          )}

          {items && items.length > 0 && (
            <ul className="mt-4 space-y-3">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0"></span>
                  <span className="text-gray-800 text-sm md:text-base font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;