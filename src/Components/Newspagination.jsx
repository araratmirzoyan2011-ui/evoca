import React from "react";

const Arrow = ({ dir }) => (
  <svg
    viewBox="0 0 24 12"
    className="h-3 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {dir === "right" ? (
      <path d="M1 6h22M18 1l5 5-5 5" />
    ) : (
      <path d="M23 6H1M6 1L1 6l5 5" />
    )}
  </svg>
);

export default function NewsPagination({ page, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Էջավորում"
      className="mt-12 flex items-center border-t border-gray-200 py-8"
    >
      <button
        type="button"
        aria-label="Նախորդ էջ"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-5 text-[#5B12D6] transition-opacity disabled:cursor-default disabled:text-gray-300"
      >
        <Arrow dir="left" />
      </button>

      <div className="flex items-center gap-3">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p)}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-[12px] font-semibold transition-colors ${
              p === page
                ? "bg-[#5B12D6] text-white"
                : "text-black hover:text-[#5B12D6]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Հաջորդ էջ"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-5 text-[#5B12D6] transition-opacity disabled:cursor-default disabled:text-gray-300"
      >
        <Arrow dir="right" />
      </button>
    </nav>
  );
}