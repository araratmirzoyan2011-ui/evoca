const WhyWorkSection = ({ title, text, image, imageAlt = "" }) => {
  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-[788px] mx-auto">
        <h2 className="text-[24px] font-bold text-[#222] mb-4">{title}</h2>
        <p className="text-[16px] leading-7 text-[#333] mb-6">{text}</p>
        <img
          src={image}
          alt={imageAlt || title}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default WhyWorkSection;