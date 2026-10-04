const CultureBanner = ({ title, text, bgImage }) => {
  return (
    <section
      className="relative w-full h-[350px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-[1920px] mx-auto h-full relative">
        <div
          className="absolute top-[75px] left-[18.6%] w-[581px] h-[203px]
                     bg-gradient-to-b from-[#f5f5f7] to-[#f1eefc]
                     rounded-l-[40px] px-14 py-10 flex flex-col justify-center
                     max-lg:static max-lg:w-auto max-lg:h-auto max-lg:mx-4 max-lg:top-auto"
        >
          <h2 className="text-[28px] font-bold text-[#1a1a1a] mb-5">{title}</h2>
          <p className="text-[14px] leading-6 text-[#333]">{text}</p>
        </div>
      </div>
    </section>
  );
};

export default CultureBanner;