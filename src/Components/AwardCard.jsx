import React from "react";
import { Link } from "react-router-dom";

const CardComponent = ({ year, title, sourceName, logoUrl, to }) => {
  const card = (
    <div
      className={`bg-white rounded-2xl shadow-xl p-8 max-w-[600px] w-full font-sans box-border h-full transition-shadow ${
        to ? "hover:shadow-2xl cursor-pointer" : ""
      }`}
    >
      <h2 className="text-[#6c5ce7] text-[32px] font-bold m-0 mb-4">{year}</h2>

      <p className="text-[#2d3436] text-[20px] font-semibold leading-snug m-0 mb-10">
        {title}
      </p>

      <div className="flex justify-between items-end">
        <span className="text-[#2d3436] text-base font-medium">{sourceName}</span>

        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${sourceName} Logo`}
            className="h-10 object-contain"
          />
        )}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="block">
      {card}
    </Link>
  ) : (
    card
  );
};

export default CardComponent;