const icons = {
  check: (
    <path d="M60 78l7 7 13-14" fill="none" stroke="#9ca3af" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  dram: (
    <g fill="none" stroke="#9ca3af" strokeWidth="5" strokeLinecap="round">
      <path d="M62 70h14M62 78h14M58 86h22" />
      <path d="M64 92c10 0 14-6 14-14s-4-14-14-14" />
    </g>
  ),
  dollar: (
    <g fill="none" stroke="#9ca3af" strokeWidth="5" strokeLinecap="round">
      <path d="M70 62v32" />
      <path d="M78 68c-2-3-6-4-9-4-5 0-8 3-8 6s3 5 8 6 8 3 8 6-3 6-8 6c-4 0-8-1-10-5" strokeWidth="4" />
    </g>
  ),
};

const DocCard = ({ title, href = "#", icon = "check" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center gap-3 text-center group"
  >
    <span className="text-[13px] font-semibold uppercase leading-snug text-[#6a00d6] underline underline-offset-2 group-hover:opacity-80">
      {title}
    </span>

    <svg width="90" height="110" viewBox="0 0 90 110">
      <rect x="6" y="4" width="78" height="102" rx="6" fill="none" stroke="#9ca3af" strokeWidth="5" />
      <path d="M22 28h46M22 42h46M22 56h46" stroke="#9ca3af" strokeWidth="5" strokeLinecap="round" />
      {icon === "check" && <circle cx="62" cy="82" r="14" fill="none" stroke="#9ca3af" strokeWidth="5" transform="translate(-0 0)" />}
      <g transform="translate(-10 -4)">{icons[icon]}</g>
    </svg>
  </a>
);

export default DocCard;