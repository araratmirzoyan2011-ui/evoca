import React from "react";
import { Link } from "react-router-dom";
const CATEGORY_COLORS = {
  "Մրցանակներ": "#FFE600",
  "Պրոդուկտներ": "#D400E0",
  "Հարցազրույցներ": "#5B12D6",
  "Բանկային": "#5B12D6",
  "Կենսակերպ": "#9DFF00",
};

export default function NewsCard({ item, collection }) {
  const barColor = CATEGORY_COLORS[item.category] || "#5B12D6";

  return (
    <article className="flex flex-col">
      <div className="aspect-[275/180] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className="mt-2 border-l-[3px] pl-3 py-0.5"
        style={{ borderColor: barColor }}
      >
        <span className="text-[13px] font-semibold text-[#2a0a4a]">
          {item.category}
        </span>
      </div>

      <h4 className="mt-4 text-[15px] font-semibold leading-snug text-black line-clamp-2">
        <Link
          to={`/news/${collection}/${item.id}`}
          className="transition-colors hover:text-[#5B12D6] focus-visible:text-[#5B12D6]"
        >
          {item.title}
        </Link>
      </h4>

      <p className="mt-6 text-[13px] text-gray-300">{item.date}</p>
    </article>
  );
}