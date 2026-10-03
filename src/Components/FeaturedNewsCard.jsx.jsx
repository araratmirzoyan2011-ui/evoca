const FeaturedNewsCard = ({
  category,
  title,
  description,
  date,
  image,
  imageAlt = "",
  reverse ,
}) => {
  return (
    <section className="relative bg-[#f4f4f4] rounded-bl-[100px] overflow-hidden py-14">
      <div
        className={`mx-auto max-w-[1400px] px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Text side */}
        <div className="flex-1 lg:pl-24">
          {/* Category label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-8 h-6 bg-[#9dff00]" />
            <span className="text-sm font-semibold text-[#2a0a4a]">
              {category}
            </span>
          </div>

          <h2 className="text-3xl font-semibold leading-snug text-black max-w-[480px]">
            {title}
          </h2>

          <p className="mt-6 text-[15px] leading-7 text-gray-800 max-w-[480px]">
            {description}
          </p>

          <span className="block mt-12 text-sm text-gray-800">{date}</span>
        </div>
        <div className="relative flex-1 w-full max-w-[740px]">
          <span className="absolute -top-5 -left-4 w-8 h-8 border-t-[6px] border-l-[6px] border-[#9dff00]" />
          <span className="absolute -bottom-5 -left-4 w-8 h-8 border-b-[6px] border-l-[6px] border-[#9dff00]" />

          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsCard;