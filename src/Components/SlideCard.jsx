// src/Components/SlideCard.jsx
const getVideoSrc = (video = "") => {
  const match = video.match(/src=["']([^"']+)["']/i);
  const url = match ? match[1] : video.trim();
  if (!url) return "";
  return url + (url.includes("?") ? "&" : "?") + "autoplay=1";
};

const SlideCard = ({
  image,
  title,
  video,
  videoId,
  isActive = false,
  isPlaying = false,
  onPlay,
}) => {
  const source = video || videoId;

  return (
    <div
  className={`bg-white rounded-[10px] shadow-xl ${
    isActive ? "p-[12px] lg:p-[27px]" : "p-[30px]"
  }`}
>
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        {isActive && isPlaying ? (
          <iframe
            className="absolute inset-0 w-full h-full swiper-no-swiping"
            src={getVideoSrc(source)}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title={title}
          />
        ) : (
          <button
            type="button"
            onClick={() => isActive && onPlay?.()}
            className="absolute inset-0 w-full h-full"
          >
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center text-white text-6xl">
              ▶
            </span>
          </button>
        )}
      </div>

      <p
    className={`mt-4 font-bold text-[#222] ${
      isActive
        ? "text-[16px] lg:text-[22px]"
        : "text-[38px] leading-tight truncate"
    }`}
  >
    {title}
  </p>
    </div>
  );
};

export default SlideCard;