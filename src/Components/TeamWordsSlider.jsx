
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import TeamWordCard from "./TeamWordCard.jsx";

const Arrow = ({ dir = "left" }) => (
  <svg width="36" height="20" viewBox="0 0 36 20" fill="none" stroke="#6a0fd9" strokeWidth="2">
    {dir === "left" ? (
      <path d="M36 10H2M10 1L1 10l9 9" />
    ) : (
      <path d="M0 10h34M26 1l9 9-9 9" />
    )}
  </svg>
);

const TeamWordsSlider = ({ title, members = [] }) => {
  const swiperRef = useRef(null);

  return (
    <section className="w-full bg-white px-4 py-14 lg:py-20">
      <h2 className="mx-auto mb-10 max-w-[900px] text-center text-[22px] font-bold text-[#222] md:text-[28px]">
        {title}
      </h2>

      <div className="relative mx-auto max-w-[1180px] lg:px-[70px]">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block"
          aria-label="Նախորդ"
        >
          <Arrow dir="left" />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
          aria-label="Հաջորդ"
        >
          <Arrow dir="right" />
        </button>

        <Swiper
          modules={[Pagination]}
          onSwiper={(s) => (swiperRef.current = s)}
          rewind
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          pagination={{ el: ".team-pagination", clickable: true }}
          className="!pt-6 !pb-2" 
        >
          {members.map((member) => (
            <SwiperSlide key={member.name} className="!h-auto">
              <TeamWordCard {...member} className="h-full" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="team-pagination mt-6 flex justify-center gap-3
                     [&_.swiper-pagination-bullet]:h-[10px] [&_.swiper-pagination-bullet]:w-[10px]
                     [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:rounded-full
                     [&_.swiper-pagination-bullet]:bg-[#d2d2d8]
                     [&_.swiper-pagination-bullet-active]:!bg-[#6a0fd9]"
        />
      </div>
    </section>
  );
};

export default TeamWordsSlider;