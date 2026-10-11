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
      className={`mb-4 w-full min-w-0 rounded-[20px] border bg-white px-6 py-4 transition-colors duration-300 max-[400px]:mb-3 max-[400px]:rounded-[14px] max-[400px]:px-3.5 max-[400px]:py-3 ${
        open ? "border-[#6a00f4]" : "border-[#e6d4ff]"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 text-left max-[400px]:gap-3"
      >
        <svg
          className={`h-4 w-4 shrink-0 text-[#6a00f4] transition-transform duration-300 max-[400px]:h-3.5 max-[400px]:w-3.5 ${
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
          className={`min-w-0 flex-1 break-words text-[16px] font-bold transition-colors duration-300 max-[400px]:text-[14px] max-[400px]:leading-[20px] ${
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
        <div className="min-w-0 overflow-hidden">
          <div className="min-w-0 space-y-5 pl-8 pt-6 text-[16px] text-[#333] max-[400px]:space-y-3 max-[400px]:pl-0 max-[400px]:pt-4 max-[400px]:text-[14px]">
            {details.map((d, i) => (
              <p
                key={i}
                className="whitespace-pre-line break-words leading-[26px] max-[400px]:leading-[21px]"
              >
                <span className="font-bold text-[#6a00f4]">{d.label}</span>{" "}
                {d.href ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-[#6a00f4] underline"
                  >
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </p>
            ))}

            {images.length > 0 && (
              <div className="flex w-full max-w-full snap-x snap-mandatory overflow-x-auto rounded-lg bg-white shadow-[0_0_20px_rgba(106,0,244,0.12)] max-[400px]:rounded-md">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="shrink-0 snap-start border-r border-[#e6d4ff] p-3 last:border-r-0 max-[400px]:p-2"
                  >
                    <img
                      src={src}
                      alt={`${name} ${i + 1}`}
                      loading="lazy"
                      className="block h-[335px] w-auto max-w-none object-cover max-[400px]:h-[220px]"
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