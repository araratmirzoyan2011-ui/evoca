import React from "react";
import { Link } from "react-router-dom";

export default function NewsGridCard({ item, collection }) {
  return (
    <article className="flex flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <h4 className="mt-6 text-[15px] font-semibold leading-snug text-black">
        <Link
          to={`/news/${collection}/${item.id}`}
          className="transition-colors hover:text-[#5B12D6] focus-visible:text-[#5B12D6]"
        >
          {item.title}
        </Link>
      </h4>

      {/* mt-auto՝ որ ամսաթվերը նույն տողում լինեն՝ անկախ վերնագրի երկարությունից */}
      <p className="mt-auto pt-4 text-[13px] font-semibold text-gray-300">
        {item.date}
      </p>
    </article>
  );
}