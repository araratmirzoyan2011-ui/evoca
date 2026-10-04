import React from 'react';

export default function JobCard({
  title,
  deadline,
  location,
  deadlineLabel = "Փաստաթղթերի ներկայացման վերջնաժամկետ",
  locationLabel = "Աշխատանքի վայր",
  buttonText = "Տեսնել մանրամասն և դիմել",
  onApply,
}) {
  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 transition-all duration-300 hover:shadow-[0_12px_35px_rgba(106,15,217,0.12)]">

      <h3 className="text-xl md:text-2xl font-bold text-[#2d124d] mb-6 md:mb-8">
        {title}
      </h3>


      <div className="space-y-4 text-sm md:text-base">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
          <span className="text-gray-500 font-medium">
            {deadlineLabel}
          </span>
          <span className="text-[#2d124d] font-bold">
            {deadline}
          </span>
        </div>


        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
          <span className="text-gray-500 font-medium">
            {locationLabel}
          </span>
          <span className="text-[#2d124d] font-bold text-left sm:text-right">
            {location}
          </span>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onApply}
          className="bg-[#6a0fd9] hover:bg-[#580cb6] text-white text-sm md:text-base font-semibold py-3 px-6 md:px-8 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}