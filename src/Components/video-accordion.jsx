import React, { useState } from 'react';

const VideoAccordion = ({ title, videos = [], defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full border border-[#6a00d4] rounded-2xl bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center gap-4 px-5 py-5 text-left cursor-pointer"
      >
        <svg
          className={`w-5 h-5 shrink-0 text-[#6a00d4] transition-transform duration-300 ${
            open ? "" : "rotate-180"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 15 12 9 18 15" />
        </svg>
        <span className="font-bold text-base text-black">{title}</span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-2 space-y-8 md:px-10">
            {videos.map((video, i) => (
              <div key={video.id} className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title || `${title} ${i + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAccordion;