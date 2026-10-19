const renderParagraph = (text, highlight) => {
  if (!highlight || !text.includes(highlight)) return text;
  const [before, ...rest] = text.split(highlight);
  return (
    <>
      {before}
      <span className="text-[#6a00d4]">{highlight}</span>
      {rest.join(highlight)}
    </>
  );
};

const PartnerCard = ({ logo, name, description = [], highlight, info = [] }) => {
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white px-6 py-7 text-center shadow-[0_2px_12px_rgba(120,100,255,0.12)]">
      <div className="mb-6 flex h-[70px] items-center justify-center">
        {logo && (
          <img src={logo} alt={name} className="max-h-full max-w-[160px] object-contain" />
        )}
      </div>

      <div className="flex-1 space-y-4 text-[14px] leading-6 text-gray-800">
        {paragraphs.map((p, i) => (
          <p key={i}>{renderParagraph(p, highlight)}</p>
        ))}
      </div>

      {info.length > 0 && (
        <>
          <hr className="my-6 border-gray-200" />
          <div className="space-y-1">
            {info.map((block, i) => (
              <div key={i}>
                <p className="text-sm font-bold leading-6 text-[#6a00d4]">{block.label}</p>
                {block.lines?.map((line, j) =>
                  block.phone ? (
                    <a
                      key={j}
                      href={`tel:${line.replace(/\s/g, "")}`}
                      className="block text-sm leading-6 text-gray-800"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={j} className="text-sm leading-6 text-gray-800">{line}</p>
                  )
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PartnerCard;