// src/Components/SlideCard.jsx
const SlideCard = ({
  type = "video",
  src, 
  title,
  isActive = false,
  isPlaying = false,
  onPlay,
}) => {
  const isVideo = type === "video";

  return (
    <div className="bg-white p-2 rounded shadow-lg">
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        {isVideo ? (
          isActive && isPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${src}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={title}
            />
          ) : (
            <button
              type="button"
              onClick={() => isActive && onPlay?.()}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={`https://img.youtube.com/vi/${src}/hqdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-5xl">
                ▶
              </span>
            </button>
          )
        ) : (
          <img src={src} alt={title} className="w-full h-full object-cover" />
        )}
      </div>
      <p className="mt-2 px-1 text-[14px] font-semibold text-[#222]">{title}</p>
    </div>
  );
};

export default SlideCard;