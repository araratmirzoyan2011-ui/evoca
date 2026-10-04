// src/Components/CoverflowSlider.jsx
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import SlideCard from "./SlideCard.jsx";

const useIsDesktop = () => {
  const query = "(min-width: 1024px)";
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
};

const Arrow = ({ dir = "left" }) => (
  <svg width="36" height="20" viewBox="0 0 36 20" fill="none" stroke="white" strokeWidth="2">
    {dir === "left" ? (
      <path d="M36 10H2M10 1L1 10l9 9" />
    ) : (
      <path d="M0 10h34M26 1l9 9-9 9" />
    )}
  </svg>
);

const CoverflowSlider = ({ title, text, items = [] }) => {
  const swiperRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const isDesktop = useIsDesktop();

  const handlePlay = () => {
    setPlaying(true);
    swiperRef.current?.autoplay?.stop();
  };

  const handleSlideChange = () => {
    setPlaying(false);
    swiperRef.current?.autoplay?.start();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#6c00dd] py-16">
      {/* դեկորատիվ ձևեր */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <svg className="absolute left-[4%] top-[12%]" width="30" height="64" viewBox="0 0 30 64" fill="none">
          <path d="M20 2l-14 22 18 8-20 30" stroke="#d65cff" strokeWidth="8" strokeLinejoin="round" />
        </svg>
        <svg className="absolute left-[15%] top-[48%]" width="30" height="30" viewBox="0 0 30 30">
          <polygon points="0,0 30,12 10,30" fill="#a98bff" />
        </svg>
        <svg className="absolute right-[9%] top-[20%]" width="40" height="36" viewBox="0 0 40 36">
          <polygon points="20,0 40,36 0,36" fill="#ffd21f" />
        </svg>
        <div className="absolute right-[6%] top-[46%] h-[52px] w-[36px] rotate-[20deg] rounded-full border-[10px] border-[#f04fd9]" />
        <div className="absolute bottom-[4%] left-[7%] h-[28px] w-[38px] rounded-full border-[9px] border-[#ffd21f]" />
      </div>

      {(title || text) && (
        <div className="relative mx-auto mb-8 max-w-[787px] px-4 text-white">
          {title && <h2 className="mb-5 text-[28px] font-bold">{title}</h2>}
          {text && <p className="text-[16px] leading-7">{text}</p>}
        </div>
      )}

      <div className="relative">
        {/* սլաքներ */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 lg:left-8"
          aria-label="Նախորդ"
        >
          <Arrow dir="left" />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 lg:right-8"
          aria-label="Հաջորդ"
        >
          <Arrow dir="right" />
        </button>
<Swiper
  key={isDesktop ? "desktop" : "mobile"}
  modules={[EffectCoverflow, Autoplay]}
  onSwiper={(s) => (swiperRef.current = s)}
  effect="coverflow"
  grabCursor
  centeredSlides
  slideToClickedSlide
  loop
  slidesPerView="auto"
  autoplay={{ delay: 4000, disableOnInteraction: false }}
  coverflowEffect={{
    rotate: 0,
    depth: 0,
    modifier: 1,
    scale: 0.37,
    stretch: isDesktop ? 223 : 83,
    slideShadows: false,
  }}
  onRealIndexChange={handleSlideChange}
>
  {items.map((item, i) => (
    <SwiperSlide key={i} className="!w-[300px] lg:!w-[787px]">
      {({ isActive }) => (
        <SlideCard
          {...item}
          isActive={isActive}
          isPlaying={playing}
          onPlay={handlePlay}
        />
      )}
    </SwiperSlide>
  ))}
</Swiper>
      </div>
    </section>
  );
};

export default CoverflowSlider;