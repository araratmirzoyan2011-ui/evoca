import React, { useState } from 'react';

export default function HiringSteps({ title, steps = [] }) {
  const [openId, setOpenId] = useState(null);

  if (!steps || steps.length === 0) return null;

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 my-8">
      {/* Վերնագիր */}
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2d124d] mb-10">
          {title}
        </h2>
      )}

      {/* Փուլերի ցուցակ */}
      <div className="relative">
        {/* Ձախ կողմի կետագծված գիծը */}
        <div className="absolute left-[35px] top-[28px] bottom-[28px] w-0 border-l-2 border-dotted border-[#6a0fd9]/30 -z-0" />

        <div className="space-y-4 relative z-10">
          {steps.map((step, index) => {
            const stepId = step.id || index + 1;
            const isOpen = openId === stepId;

            return (
              <div
                key={stepId}
                className="bg-white rounded-xl border border-purple-50 shadow-[0_4px_20px_rgba(106,15,217,0.06)] overflow-hidden transition-all duration-300"
              >
                {/* Կոճակի հատվածը */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(stepId)}
                  className="w-full flex items-stretch text-left focus:outline-none group"
                >
                  {/* Մանուշակագույն ձախ բլոկը համարով */}
                  <div className="w-[70px] shrink-0 bg-[#eeddff]/60 flex items-center justify-center py-4 transition-colors group-hover:bg-[#eeddff]">
                    <div className="w-8 h-8 rounded-full bg-[#6a0fd9] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {stepId}
                    </div>
                  </div>

                  {/* Վերնագիրը և սլաքը */}
                  <div className="flex-1 flex items-center justify-between px-6 py-4">
                    <span className="text-[#2b1f4d] font-semibold text-base md:text-lg">
                      {step.title}
                    </span>
                    <svg
                      className={`w-5 h-5 text-[#6a0fd9] transition-transform duration-300 ${
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
                  </div>
                </button>

                {/* Բացվող տեքստը */}
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 pl-[94px] text-gray-600 text-sm md:text-base leading-relaxed border-t border-purple-50 bg-purple-50/20">
                    {step.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}