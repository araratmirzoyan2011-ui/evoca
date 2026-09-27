import { useState } from "react";
import PromoCard from "./AboutCard.jsx";

export default function HistorySlider({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = data[activeIndex];

  const goPrev = () => setActiveIndex((i) => Math.max(i - 1, 0));
  const goNext = () => setActiveIndex((i) => Math.min(i + 1, data.length - 1));

  return (
    <section className="w-full py-16 max-[400px]:py-10">
      <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
        <h2 className="text-3xl font-bold mb-10 max-[400px]:text-2xl max-[400px]:mb-6">
          Բանկի պատմությունը
        </h2>

        {/* timeline */}
        <div className="flex items-center gap-4 mb-10 max-[400px]:gap-2 max-[400px]:mb-6">
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="text-gray-400 hover:text-[#6400dc] disabled:opacity-30 transition-colors"
            aria-label="Նախորդ"
          >
            ←
          </button>

          <div className="flex items-center flex-1 overflow-x-auto">
            {data.map((item, i) => (
              <div key={item.year} className="flex items-center flex-1 min-w-[70px]">
                <button
                  onClick={() => setActiveIndex(i)}
                  className="flex flex-col items-center gap-2 shrink-0"
                >
                  <span
                    className={`text-sm font-bold whitespace-nowrap max-[400px]:text-xs ${
                      i === activeIndex ? "text-[#6400dc]" : "text-gray-700"
                    }`}
                  >
                    {item.year}
                  </span>
                  <span
                    className={`w-3 h-3 rounded-full border-2 max-[400px]:w-2.5 max-[400px]:h-2.5 ${
                      i === activeIndex
                        ? "bg-[#6400dc] border-[#6400dc]"
                        : "bg-white border-gray-300"
                    }`}
                  />
                </button>

                {i < data.length - 1 && (
                  <span className="flex-1 h-px bg-gray-300 mt-[-20px]" />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={activeIndex === data.length - 1}
            className="text-[#6400dc] disabled:opacity-30 disabled:text-gray-400 transition-colors"
            aria-label="Հաջորդ"
          >
            →
          </button>
        </div>

        {/* content, reusing PromoCard */}
        <PromoCard
          key={active.year}
          image={active.image}
          imageAlt={`${active.year}`}
          text={active.text || "Այս տարվա տեքստը դեռ լրացված չէ։"}
        />
      </div>
    </section>
  );
}