import React from "react";

export const AdvantageCard = ({ img, title, text }) => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between py-8 border-b border-gray-100 gap-6">
      {/* Ձախ մաս՝ Նկար և Վերնագիր */}
      <div className="flex items-start gap-5 md:w-1/3">
        {img ? (
          <img src={img} alt={title || "advantage-icon"} className="w-12 h-12 object-contain shrink-0" />
        ) : (
          /* Եթե նկար դեռ չկա, կարող եք տեղադրել դատահավասար կամ լռելյայն տեղ (օրինակ՝ աստղ կամ այլ նշան) */
          <div className="w-12 h-12 flex items-center justify-center shrink-0 text-[#6a00d8]">
            {/* Ժամանակավոր պատկեր կամ դատարկ տարածք */}
          </div>
        )}
        <h3 className="text-[18px] font-bold text-gray-900 leading-snug">
          {title}
        </h3>
      </div>

      {/* Աջ մաս՝ Հիմնական տեքստը կամ բացատրությունը */}
      <div className="md:w-2/3 text-[16px] text-gray-700 leading-relaxed">
        {/* Եթե տեքստը պարունակում է HTML կամ ենթակետեր, կարող եք այն ցուցադրել */}
        <p>{text}</p>
      </div>
    </div>
  );
};