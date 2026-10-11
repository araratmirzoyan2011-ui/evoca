import React, { useState } from "react";

function ConstructionAccordion({
  name,
  details = [],
  images = [],
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`mb-4 rounded-[20px] border bg-white px-6 py-4 transition-colors duration-300 ${
        open ? "border-[#6a00f4]" : "border-[#e6d4ff]"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-4 text-left"
      >
        <svg
          className={`h-4 w-4 shrink-0 text-[#6a00f4] transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6l5 5 5-5" />
        </svg>
        <h3
          className={`text-[16px] font-bold transition-colors duration-300 ${
            open ? "text-black" : "text-[#777]"
          }`}
        >
          {name}
        </h3>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-5 pl-8 pt-6 text-[16px] text-[#333]">
            {details.map((d, i) => (
              <p key={i} className="whitespace-pre-line leading-[26px]">
                <span className="font-bold text-[#6a00f4]">{d.label}</span>{" "}
                {d.href ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6a00f4] underline"
                  >
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </p>
            ))}

            {images.length > 0 && (
              <div className="flex overflow-x-auto rounded-lg bg-white shadow-[0_0_20px_rgba(106,0,244,0.12)]">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="shrink-0 border-r border-[#e6d4ff] p-3 last:border-r-0"
                  >
                    <img
                      src={src}
                      alt={`${name} ${i + 1}`}
                      loading="lazy"
                      className="h-[335px] w-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConstructionAccordion;