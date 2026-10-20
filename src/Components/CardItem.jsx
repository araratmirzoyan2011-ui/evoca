import React from "react";

const CardItem = ({ card }) => {
  const { title, description, image, stats = [], link = "#" } = card;

  return (
    <div className="w-full border-b border-gray-200 py-10">
      <div className="max-w-[1310px] mx-auto px-4 flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        {/* Քարտի նկար + ստվեր */}
        <div className="w-full md:w-[390px] shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full rounded-xl object-cover"
          />
          <div className="mx-auto mt-8 h-4 w-[90%] rounded-full bg-black/20 blur-xl" />
        </div>

        {/* Տեքստային մաս */}
        <div className="flex-1">
          <h2 className="text-[28px] font-bold text-black">{title}</h2>

          <p className="mt-5 max-w-[560px] text-[15px] leading-6 text-gray-800">
            {description}
          </p>

          {/* Ցուցանիշներ */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
            {stats.map((item, index) => (
              <div key={index}>
                <p className="min-h-[18px] text-[13px] text-gray-800">
                  {item.label}
                </p>
                <p className="text-[32px] font-semibold leading-tight text-[#6a00d8]">
                  {item.value}
                </p>
                <p className="mt-3 max-w-[170px] text-[13px] leading-5 text-gray-800">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Կոճակ */}
          <a
            href={link}
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#ece4f6] px-7 py-3 text-[15px] font-semibold text-[#6a00d8] transition hover:bg-[#e0d3f1]"
          >
            Մանրամասն
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1.5 1l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardItem;