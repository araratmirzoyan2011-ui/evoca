import React from "react";

export default function LargeNewsCard({ item }) {
  return (
    <article className="relative">
      <span className="absolute -top-[17px] -left-[17px] h-[75px] w-[75px] bg-[#FFE600]" />

      <div className="relative aspect-[512/385] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-4 border-l-[3px] border-[#FFE600] pl-3 py-1.5">
        <span className="text-[13px] font-semibold text-[#2a0a4a]">
          {item.category}
        </span>
      </div>

      <h4 className="mt-6 text-[22px] font-semibold leading-snug text-black">
        {item.title}
      </h4>

      {item.description && (
        <p className="mt-6 text-[14px] leading-7 text-gray-700">
          {item.description}
        </p>
      )}

      <p className="mt-8 text-[13px] text-gray-300">{item.date}</p>
    </article>
  );
}