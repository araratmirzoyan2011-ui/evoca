const CardImage = ({ src, title }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={src}
        alt={title}
        className="w-full max-w-[270px] h-auto rounded-lg object-contain"
      />
      <h3 className="text-[16px] font-semibold text-[#1a1a1a] text-center">
        {title}
      </h3>
    </div>
  );
};

export default CardImage;