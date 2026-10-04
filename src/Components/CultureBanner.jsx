// src/Components/CultureBanner.jsx
const CultureBanner = ({ title, text, bgImage, className = "" }) => {
  return (
    <section
      className={`relative w-full bg-cover bg-center bg-no-repeat
                  min-h-[260px] py-10 flex items-center
                  lg:h-[350px] lg:py-0 lg:block ${className}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[1920px] mx-auto relative flex justify-center lg:block lg:h-full">
        <div
          className="w-[calc(100%-32px)] max-w-[581px]
                     bg-gradient-to-b from-[#f5f5f7] to-[#f1eefc]
                     rounded-[20px] px-6 py-6
                     md:px-10 md:py-8
                     lg:absolute lg:top-[75px] lg:left-[18.6%] lg:w-[581px]
                     lg:min-h-[203px] lg:px-14 lg:py-10
                     lg:rounded-[40px] lg:rounded-r-none
                     flex flex-col justify-center"
        >
          <h2 className="text-[22px] md:text-[28px] font-bold text-[#1a1a1a] mb-3 md:mb-5">
            {title}
          </h2>
          <p className="text-[13px] md:text-[14px] leading-5 md:leading-6 text-[#333]">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CultureBanner;