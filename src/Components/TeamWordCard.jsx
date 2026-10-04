const QuoteMark = () => (
  <svg width="50" height="42" viewBox="0 0 50 42" fill="#6a0fd9" aria-hidden="true">
    <polygon points="0,0 20,0 20,42 0,26" />
    <polygon points="28,0 48,0 48,42 28,26" />
  </svg>
);

const TeamWordCard = ({ words = [], name, role, className = "" }) => {
  return (
    <div
      className={`relative flex min-h-[230px] flex-col justify-between
                  bg-[#faf7ff] px-9 pb-8 pt-12 ${className}`}
    >
      <div className="absolute right-6 -top-4">
        <QuoteMark />
      </div>

      <ul className="space-y-1">
        {words.map((word) => (
          <li
            key={word}
            className="text-[22px] font-bold leading-tight text-[#6a0fd9]"
          >
            {word}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <p className="text-[16px] font-medium text-[#222]">{name}</p>
        <p className="text-[13px] text-[#444]">{role}</p>
      </div>
    </div>
  );
};

export default TeamWordCard;