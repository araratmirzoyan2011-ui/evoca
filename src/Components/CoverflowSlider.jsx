// src/Components/CoverflowSlider.jsx
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import SlideCard from "./SlideCard.jsx";

const CoverflowSlider = ({ items = [] }) => {
  const swiperRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    swiperRef.current?.autoplay?.stop();
  };

  const handleSlideChange = () => {
    setPlaying(false);
    swiperRef.current?.autoplay?.start();
  };

  return (
    <div className="w-full py-12">
      <Swiper
  modules={[EffectCoverflow, Autoplay, Navigation]}
  onSwiper={(s) => (swiperRef.current = s)}
  effect="coverflow"
  grabCursor
  centeredSlides
  slideToClickedSlide
  loop
  slidesPerView="auto"
  navigation
  autoplay={{ delay: 4000, disableOnInteraction: false }}   // pauseOnMouseEnter-ը հանվեց
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 1,
    scale: 0.8,
    slideShadows: false,
  }}
  onRealIndexChange={handleSlideChange}                      // onSlideChange-ի փոխարեն
>
        {items.map((item, i) => (
          <SwiperSlide key={i} className="!w-[320px] md:!w-[560px]">
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
  );
};

export default CoverflowSlider;