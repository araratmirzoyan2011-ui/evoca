import React from "react";

const currencies = ["դ", "$", "€"];

const CardTariffs = ({ stats = [] }) => {
  if (!stats.length) return null;

  return (
    <div className="w-full rounded-2xl bg-white px-6 py-6 shadow-[0_0_30px_rgba(106,0,216,0.12)] md:px-10 md:py-8">
      {/* Արժույթների կոճակներ (ստատիկ) */}
      <div className="flex items-center gap-4">
        {currencies.map((symbol) => (
          <div
            key={symbol}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6a00d8] text-[18px] font-semibold text-white"
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* stats-ի տողեր */}
      <div className="mt-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 py-5 md:flex-row md:items-center md:gap-0 ${
              index !== stats.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className={item.text ? "md:w-[185px] md:shrink-0" : "w-full"}>
              {item.label && (
                <p className="text-[12px] leading-4 text-gray-800">
                  {item.label}
                </p>
              )}
              <p className="text-[28px] font-semibold leading-tight text-[#6a00d8]">
                {item.value}
              </p>
            </div>

            {item.text && (
              <p className="max-w-[360px] text-[15px] leading-6 text-gray-800">
                {item.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardTariffs;