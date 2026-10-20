const DocCard = ({ title, href = "#", image, symbol = "" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center gap-3 text-center"
  >
    <span className="max-w-[140px] text-[13px] font-semibold uppercase leading-snug text-[#6a00d6] underline underline-offset-2 group-hover:opacity-80">
      {title}
    </span>

    {image ? (
      <img src={image} alt="" className="h-[110px] w-auto" loading="lazy" />
    ) : (
      // Պահեստային իկոնկա, երբ նկար չկա (օրինակ՝ ԵՎՐՈ)
      <svg width="90" height="110" viewBox="0 0 90 110">
        <rect x="6" y="4" width="78" height="102" rx="6" fill="none" stroke="#9ca3af" strokeWidth="5" />
        <path d="M22 28h46M22 42h46M22 56h46" stroke="#9ca3af" strokeWidth="5" strokeLinecap="round" />
        <text x="60" y="90" textAnchor="middle" fontSize="28" fontWeight="700" fill="#9ca3af">
          {symbol}
        </text>
      </svg>
    )}
  </a>
);

export default DocCard;