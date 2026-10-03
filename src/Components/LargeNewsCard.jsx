import React from "react";

export default function LargeNewsCard({ item }) {
  return (
    <article className="relative">
      <span className="absolute -top-5 -left-5 w-20 h-20 bg-[#FFE600]" />

      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-6">
        <div className="border-l-[3px] border-[#FACC15] pl-3 mb-5">
          <span className="text-[13px] font-semibold text-[#2a0a4a]">
            {item.category}
          </span>
        </div>

        <h4 className="text-2xl font-semibold text-black leading-snug">
          {item.title}
        </h4>

        {item.description && (
          <p className="mt-5 text-[15px] leading-7 text-gray-800">
            {item.description}
          </p>
        )}

        <p className="mt-8 text-sm text-gray-300">{item.date}</p>
      </div>
    </article>
  );
}