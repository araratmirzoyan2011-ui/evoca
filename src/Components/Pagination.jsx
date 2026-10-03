import React from 'react';

const Arrow = ({ direction = 'right' }) => (
  <svg
    width="28"
    height="16"
    viewBox="0 0 28 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={direction === 'left' ? 'rotate-180' : ''}
  >
    <path d="M1 8h25M19 1l7 7-7 7" />
  </svg>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      className="flex items-center justify-center gap-6 sm:gap-10 py-8"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        aria-label="Նախորդ էջ"
        className={`transition ${
          isFirst
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-[#6a00e0] hover:-translate-x-1 cursor-pointer'
        }`}
      >
        <Arrow direction="left" />
      </button>

      <ul className="flex items-center gap-4 sm:gap-6 m-0 p-0 list-none">
        {pages.map((p) => {
          const active = p === currentPage;
          return (
            <li key={p}>
              <button
                onClick={() => onPageChange(p)}
                aria-current={active ? 'page' : undefined}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition cursor-pointer ${
                  active
                    ? 'bg-[#6a00e0] text-white'
                    : 'text-[#1f1f2e] hover:bg-[#6a00e0]/10'
                }`}
              >
                {p}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        aria-label="Հաջորդ էջ"
        className={`transition ${
          isLast
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-[#6a00e0] hover:translate-x-1 cursor-pointer'
        }`}
      >
        <Arrow direction="right" />
      </button>
    </nav>
  );
};

export default Pagination;