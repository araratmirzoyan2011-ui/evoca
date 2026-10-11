import React, { useState } from 'react';

export default function Accordion({ title, sections = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="border border-purple-600 rounded-2xl bg-white shadow-sm overflow-hidden">
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left focus:outline-none transition-colors"
        >
          <span className="text-lg md:text-xl font-bold text-gray-900 pr-4">
            {title}
          </span>
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-700">
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="px-6 pb-6 pt-2 border-t border-gray-100 space-y-6">
            {sections.map((section, sIndex) => (
              <div key={sIndex}>
                {section.year && (
                  <h3 className="text-xl font-bold text-purple-700 mb-3">
                    {section.year}
                  </h3>
                )}
                <div className="space-y-3">
                  {section.links.map((link, lIndex) => (
                    <div key={lIndex}>
                      <a
                        href={link.url}
                        className="text-purple-700 font-medium hover:underline leading-relaxed block"
                      >
                        {link.text}
                        {link.subText && (
                          <>
                            <br />
                            <span className="text-sm">{link.subText}</span>
                          </>
                        )}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}