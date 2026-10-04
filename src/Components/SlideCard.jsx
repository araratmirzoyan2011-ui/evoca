// src/Components/SlideCard.jsx
// video-ից հանում է src-ը (ընդունում է և ամբողջ <iframe>, և սովորական URL)
const getVideoSrc = (video = "") => {
  const match = video.match(/src=["']([^"']+)["']/i);
  const url = match ? match[1] : video.trim();
  if (!url) return "";
  return url + (url.includes("?") ? "&" : "?") + "autoplay=1";
};

const SlideCard = ({ image, title, video, videoId, isActive = false, isPlaying = false, onPlay }) => {
  const source = video || videoId;
  return (
    <div className="bg-white p-2 rounded shadow-lg">
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
            <span className="absolute inset-0 flex items-center justify-center text-white text-5xl">
              ▶
            </span>
          </button>
        )}
      </div>
      <p className="mt-2 px-1 text-[14px] font-semibold text-[#222]">{title}</p>
    </div>
  );
};

export default SlideCard;