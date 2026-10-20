import { useState } from "react";

const Chevron = ({ open }) => (
  <svg
    className={`h-4 w-4 shrink-0 text-[#5b0fd6] transition-transform duration-300 ${
      open ? "rotate-180" : ""
    }`}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 7l6 6 6-6" />
  </svg>
);

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-[#e3d3fb] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <Chevron open={open} />
        <span className="text-[15px] font-bold leading-6 text-[#6b6b6b]">
          {question}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 pl-14 text-[15px] leading-6 text-[#444]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FaqAccordion = ({ categories = [] }) => {
  const [active, setActive] = useState(0);
  const current = categories[active];

  if (!current) return null;

  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-24">
      {/* Sidebar */}
      <aside className="h-fit w-full shrink-0 rounded-2xl bg-white py-3 shadow-[0_4px_24px_rgba(91,15,214,0.10)] md:w-[310px]">
        {categories.map((cat, i) => (
          <button
            key={cat.title}
            type="button"
            onClick={() => setActive(i)}
            className={`block w-full border-l-[3px] px-5 py-3 text-left text-[14px] font-bold transition-colors ${
              i === active
                ? "border-[#5b0fd6] text-[#5b0fd6]"
                : "border-transparent text-[#6b6b6b] hover:text-[#5b0fd6]"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </aside>

      {/* Content */}
      <div className="flex-1">
        <h2 className="mb-8 text-3xl font-bold text-[#1a1a1a]">
          {current.title}
        </h2>

        <div className="flex flex-col gap-4">
          {current.items?.length > 0 ? (
            current.items.map((item) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))
          ) : (
            <p className="text-[#6b6b6b]">Հարցեր դեռ չկան։</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;