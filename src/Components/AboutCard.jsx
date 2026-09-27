export default function PromoCard({ text, image, imageAlt = "", reverse = false }) {
  return (
    <div
      className={`w-full flex items-center gap-10 max-[400px]:flex-col max-[400px]:gap-5 ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className="flex-1 bg-[#f3f0f7] rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px]
                   p-10 max-[400px]:p-6 max-[400px]:rounded-[24px]"
      >
        <p className="text-[15px] leading-relaxed text-gray-700 max-[400px]:text-[13px]">
          {text}
        </p>
      </div>

      <div className="flex-1">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-auto rounded-2xl shadow-lg object-cover max-[400px]:rounded-xl"
        />
      </div>
    </div>
  );
}