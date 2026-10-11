import React, { useState } from "react";

function ConstructionAccordion({
  name,
  developer,
  phones = [],
  address,
  images = [],
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-5 rounded-[20px] border border-[#6a00f4] bg-white px-6 py-5">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-4 text-left"
      >
        <svg
          className={`h-4 w-4 shrink-0 text-[#6a00f4] transition-transform duration-300 ${
            open ? "rotate-0" : "rotate-180"
          }`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 10l5-5 5 5" />
        </svg>
        <h3 className="text-[18px] font-bold uppercase text-black">{name}</h3>
      </button>

      {/* Body */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-6 pl-8 pt-6 text-[18px] text-[#333]">
            {developer && (
              <p>
                <span className="font-bold text-[#6a00f4]">Կառուցապատող՝</span>{" "}
                {developer}
              </p>
            )}

            {phones.length > 0 && (
              <p>
                <span className="font-bold text-[#6a00f4]">Հեռ.՝</span>{" "}
                {phones.join(" | ")}
              </p>
            )}

            {address && (
              <p>
                <span className="font-bold text-[#6a00f4]">Հասցե՝</span>{" "}
                {address}
              </p>
            )}

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