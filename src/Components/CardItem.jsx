import React from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import useCartStore from "./useCarStore";

// Օգնական ֆունկցիա՝ անվտանգ ստուգումով և բազմալեզու օբյեկտների աջակցությամբ
const renderHighlighted = (text) => {
  // Եթե տեքստը օբյեկտ է (օրինակ՝ { hy: "...", en: "...", ru: "..." })
  if (text && typeof text === "object") {
    const currentLang = i18n.language || "hy";
    text = text[currentLang] || text.hy || text.en || text.ru || "";
  }

  // Եթե վերջնական արդյունքը տող (string) չէ, վերադարձնում ենք դատարկ տող
  if (typeof text !== "string") return text || "";

  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <span key={i} className="text-[#6a00d8] font-semibold">
        {part.slice(2, -2)}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

const CardItem = ({ card }) => {
  const { title, title2, image, id, stats = [], link = "#" } = card;

  const toggleItem = useCartStore((s) => s.toggleItem);
  
  // Անվտանգ ստուգում liked-ի համար, եթե title-ը օբյեկտ է կամ տող
  const liked = useCartStore((s) =>
    s.items.some((i) => {
      const itemTitle = typeof i.title === "object" ? i.title.hy || i.title.en : i.title;
      const cardTitle = typeof title === "object" ? title.hy || title.en : title;
      return itemTitle === cardTitle;
    })
  );

  return (
    <div className="w-full border-b border-gray-200 py-10">
      <div className="max-w-[1310px] mx-auto px-4 flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        
        <div className="w-full md:w-[390px] shrink-0 relative">
          <img src={image} alt="card image" className="w-full rounded-xl object-cover" />

          <button
            onClick={() => toggleItem(card)}
            aria-label="Հավանել"
            className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110 cursor-pointer"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={liked ? "#6a00d8" : "none"}
              stroke="#6a00d8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>

          <div className="mx-auto mt-8 h-4 w-[90%] rounded-full bg-black/20 blur-xl" />
        </div>

        <div className="flex-1">
          <h2 className="text-[28px] font-bold text-black">{renderHighlighted(title)}</h2>

          <p className="mt-5 max-w-[560px] text-[15px] leading-6 text-gray-800">
            {renderHighlighted(title2)}
          </p>

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
            {stats.map((item, index) => (
              <div key={index}>
                <p className="min-h-[18px] text-[13px] text-gray-800">
                  {renderHighlighted(item.title)}
                </p>
                <p className="text-[32px] font-semibold leading-tight text-[#6a00d8]">
                  {renderHighlighted(item.value)}
                </p>
                <p className="mt-3 max-w-[170px] text-[13px] leading-5 text-gray-800">
                  {renderHighlighted(item.text)}
                </p>
              </div>
            ))}
          </div>

          <Link
            to={`/current-card/${card.id}`}
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#ece4f6] px-7 py-3 text-[15px] font-semibold text-[#6a00d8] transition hover:bg-[#e0d3f1]"
          >
            Մանրամասն
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1.5 1l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardItem;