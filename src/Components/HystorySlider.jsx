import { useState } from "react";
import PromoCard from "./AboutCard.jsx";

const PAGE_SIZE = 6;

export default function HistorySlider({ data }) {
  const [pageStart, setPageStart] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const visible = data.slice(pageStart, pageStart + PAGE_SIZE);
  const active = data[activeIndex];

  const goPrevPage = () => {
    const newStart = Math.max(pageStart - PAGE_SIZE, 0);
    setPageStart(newStart);
    setActiveIndex(newStart);
  };

  const goNextPage = () => {
    const nextStart = pageStart + PAGE_SIZE < data.length ? pageStart + PAGE_SIZE : pageStart;
    setPageStart(nextStart);
    setActiveIndex(nextStart);
  };

  const isPrevDisabled = pageStart === 0;
  const isNextDisabled = pageStart + PAGE_SIZE >= data.length;

  return (
    <section className="w-full py-16 max-[400px]:py-10">
      <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
        <h2 className="text-3xl font-bold mb-10 max-[400px]:text-2xl max-[400px]:mb-6 max-[400px]:text-center">
          Բանկի պատմությունը
          <span className="block w-14 h-1 bg-[#6400dc] rounded-full mt-3 max-[400px]:mx-auto" />
        </h2>

        {/* timeline */}
        <div className="flex items-center gap-3 mb-12 max-[400px]:gap-2 max-[400px]:mb-8">
          <button
            onClick={goPrevPage}
            disabled={isPrevDisabled}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200
                       text-gray-400 hover:text-[#6400dc] hover:border-[#6400dc]
                       disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-200
                       transition-colors shrink-0"
            aria-label="Նախորդ վեցյակ"
          >
            ←
          </button>

          <div className="flex items-center flex-1 overflow-x-auto">
            {visible.map((item, i) => {
              const globalIndex = pageStart + i;
              return (
                <div key={item.year} className="flex items-center flex-1 min-w-[70px]">
                  <button
                    onClick={() => setActiveIndex(globalIndex)}
                    className="flex flex-col items-center gap-2.5 shrink-0 group"
                  >
                    <span
                      className={`text-sm font-bold whitespace-nowrap transition-colors max-[400px]:text-xs ${
                        globalIndex === activeIndex
                          ? "text-[#6400dc]"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {item.year}
                    </span>
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        globalIndex === activeIndex
                          ? "w-3.5 h-3.5 bg-[#6400dc] ring-4 ring-[#6400dc]/15"
                          : "w-2.5 h-2.5 bg-gray-300 group-hover:bg-gray-400"
                      }`}
                    />
                  </button>

                  {i < visible.length - 1 && (
                    <span className="flex-1 h-px bg-gray-200 mt-[-22px]" />
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={goNextPage}
            disabled={isNextDisabled}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#6400dc]
                       text-white hover:bg-[#5300b8] disabled:opacity-30 disabled:hover:bg-[#6400dc]
                       transition-colors shrink-0"
            aria-label="Հաջորդ վեցյակ"
          >
            →
          </button>
        </div>

        {/* content, reusing PromoCard */}
        <div key={active.year} className="animate-[fadeIn_0.3s_ease]">
          <PromoCard
            image={active.image}
            imageAlt={`${active.year}`}
            text={active.text || "Այս տարվա տեքստը դեռ լրացված չէ։"}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}