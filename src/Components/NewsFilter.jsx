import React from "react";

export default function NewsFilter({
  categories,
  active,
  onChange,
  allLabel = "Բոլորը",
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={active === c}
          onClick={() => onChange(c)}
          className={`rounded-full px-[14px] py-[9px] text-[12px] font-medium transition-colors ${
            active === c
              ? "bg-[#5B12D6] text-white"
              : "bg-[#f4f4f4] text-[#333] hover:bg-[#ece5f8] hover:text-[#5B12D6]"
          }`}
        >
          {c}
        </button>
      ))}

      <button
        type="button"
        aria-pressed={active === allLabel}
        onClick={() => onChange(allLabel)}
        className={`flex items-center gap-2 rounded-full px-[18px] py-[10px] text-[12px] font-bold transition-colors sm:ml-auto ${
          active === allLabel
            ? "bg-[#5B12D6] text-white"
            : "bg-[#ece5f8] text-[#5B12D6] hover:bg-[#e0d4f5]"
        }`}
      >
        {allLabel}
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}