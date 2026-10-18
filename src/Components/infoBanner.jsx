import React from 'react';

const InfoBanner = ({ 
  title = "Հաշիվներ բացելու նպատակով կարող եք դիմել մեր Գլխամասային գրասենյակ կամ ցանկացած մասնաճյուղ (բացառությամբ «Էրեբունի» -ի):", 
  imageSrc = "/path-to-your-image.jpg" 
}) => {
  return (
    <div className="relative w-full h-[320px] md:h-[380px] overflow-hidden flex items-center justify-center my-8">
      <img
        src={imageSrc}
        alt="Evocabank branch"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-5xl px-6 text-center text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-snug md:leading-normal drop-shadow-lg">
        {title}
      </div>
    </div>
  );
};

export default InfoBanner;