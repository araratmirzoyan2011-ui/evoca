import React from "react";

export default function BannerNewsCard({
  category,
  title,
  description,
  image,
  bgTitle,
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Բաց գույնի ֆոնային մեծ գրություն */}
      {bgTitle && (
        <h3 className="pointer-events-none select-none absolute left-[8%] top-0 text-[110px] font-extrabold leading-none text-gray-100 whitespace-nowrap">
          {bgTitle}
        </h3>
      )}

      <div className="relative mx-auto max-w-[1200px] px-6 pt-24 pb-4 lg:pb-[78px]">
        {/* Նկար */}
        <div className="aspect-[1200/541] w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Սպիտակ card */}
        <div
          className="
            mt-6 bg-white p-8 shadow-[0_8px_30px_rgba(91,18,214,0.08)]
            lg:absolute lg:bottom-4 lg:left-[calc(1.5rem+103px)]
            lg:mt-0 lg:w-[480px] lg:min-h-[258px]
          "
        >
          <div className="flex items-center gap-3">
            <span className="block h-[15px] w-[30px] bg-[#2a0a4a]" />
            <span className="text-[13px] font-semibold text-[#2a0a4a]">
              {category}
            </span>
          </div>

          <h4 className="mt-6 text-[20px] font-semibold leading-snug text-black">
            {title}
          </h4>

          <p className="mt-4 text-[13px] leading-6 text-gray-800">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}