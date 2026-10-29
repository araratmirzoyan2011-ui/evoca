import React from "react";

// «մինչև 10 մլն. Դ» -> { top: "մինչև", main: "10 մլն. Դ" }
const splitValue = (value = "") => {
  const match = String(value).match(/^(մինչև|սկսված|սկսած)\s+(.+)$/i);
  return match
    ? { top: match[1], main: match[2] }
    : { top: "", main: value };
};

const LoanTariff = ({ stats = [], currencies = ["Դ"] }) => {
  if (!stats.length) return null;

  return (
    <div className="w-full rounded-2xl bg-white px-6 py-6 shadow-[0_0_30px_rgba(106,0,216,0.12)] md:px-10 md:py-8">
      {/* Արժույթ */}
      <div className="flex items-center gap-3">
        {currencies.map((symbol) => (
          <div
            key={symbol}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6a00d8] text-[16px] font-semibold text-white"
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Տողեր */}
      <div className="mt-4">
        {stats.map((item, index) => {
          const { top, main } = splitValue(item.value);

          return (
            <div
              key={index}
              className={`flex items-center gap-4 py-4 ${
                index !== stats.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {/* Ձախ՝ արժեք */}
              <div className="w-[48%] shrink-0 md:w-[200px]">
                {top && (
                  <span className="block text-[11px] leading-3 text-gray-800">
                    {top}
                  </span>
                )}
                <span className="block text-[24px] font-bold leading-tight text-[#6a00d8] md:text-[28px]">
                  {main}
                </span>
              </div>

              {/* Աջ՝ label */}
              <p className="text-[15px] leading-5 text-gray-900 md:text-[18px]">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoanTariff;