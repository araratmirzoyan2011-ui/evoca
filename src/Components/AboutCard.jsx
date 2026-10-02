export default function PromoCard({ text, image, imageAlt = "", reverse = false }) {
  return (
    <div
      className={`w-full flex items-center gap-10 max-[400px]:flex-col max-[400px]:gap-6 ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      {/* text bubble */}
      <div
        className="flex-1 relative bg-gradient-to-br from-[#f6f2fb] to-[#efe8f8]
                   rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px]
                   p-10 shadow-sm max-[400px]:p-6 max-[400px]:rounded-[24px]
                   max-[400px]:text-center max-[400px]:flex max-[400px]:flex-col max-[400px]:items-center"
      >
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#6400dc] text-white text-lg font-bold mb-5 max-[400px]:w-8 max-[400px]:h-8 max-[400px]:mb-3">
          “
        </span>
        <p className="text-[15px] leading-[1.8] text-gray-700 max-[400px]:text-[13px] max-[400px]:leading-relaxed">
          {text}
        </p>
      </div>

      {/* image */}
      <div className="flex-1 overflow-hidden rounded-2xl shadow-lg">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
}