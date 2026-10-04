// src/Components/CoverflowSlider.jsx
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import SlideCard from "./SlideCard.jsx";

const CoverflowSlider = ({ items = [] }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="w-full py-12">
      <Swiper
        modules={[EffectCoverflow, Autoplay, Navigation]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slideToClickedSlide
        loop
        slidesPerView="auto"
        navigation
        autoplay={playing ? false : { delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1,
          scale: 0.8,
          slideShadows: false,
        }}
        onSlideChange={() => setPlaying(false)}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i} className="!w-[320px] md:!w-[560px]">
            {({ isActive }) => (
              <SlideCard
                {...item}
                isActive={isActive}
                isPlaying={playing}
                onPlay={() => setPlaying(true)}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoverflowSlider;