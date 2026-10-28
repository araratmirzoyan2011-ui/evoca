import React from "react";

const CardHero = ({ title, description, image }) => {
  return (
    <section className="w-full bg-[#f4f3f5]">
      <div className="mx-auto flex max-w-[1310px] flex-col items-center gap-10 px-4 pb-6 pt-10 md:flex-row md:items-start md:justify-between md:pt-12">
        {/* Տեքստային մաս */}
        <div className="w-full md:w-[55%] md:pt-8">
          <h1 className="text-[28px] font-bold leading-tight text-[#1a1a1a] md:text-[32px]">
            {title}
          </h1>

          <p className="mt-8 max-w-[540px] text-[15px] leading-7 text-gray-800">
            {description}
          </p>
        </div>

        {/* Քարտի նկար */}
        <div className="w-full max-w-[390px] shrink-0 lg:mr-28">
          <img
            src={image}
            alt={title}
            className="w-full rounded-2xl object-cover"
          />
          <div className="mx-auto mt-12 h-3 w-[95%] rounded-full bg-black/15 blur-md" />
        </div>
      </div>
    </section>
  );
};

export default CardHero;