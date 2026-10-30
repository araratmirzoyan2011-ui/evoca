import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Ֆոլբեք զանգված, եթե partners prop-ը դրսից չի փոխանցվել
const defaultPartners = [
  { name: "ՆՈՐ ՏՈՒՆ", type: "text" },
  { name: "factory.", type: "logo-serif" },
  { name: "indigo", type: "logo-script" },
  { name: "FUTURIS HOME", type: "logo-stack" },
];

function PartnerLogo({ partner }) {
  // Աջակցում ենք և string URL-ի, և { name, src } օբյեկտի ֆորմատին
  const src = typeof partner === "string" ? partner : partner.src;
  const name = typeof partner === "string" ? "partner logo" : partner.name;

  if (src) {
    return (
      <img
        src={src}
        alt={name || "partner logo"}
        className="max-h-10 w-auto object-contain grayscale transition hover:grayscale-0"
      />
    );
  }

  if (partner.type === "text") {
    return (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
          ⌂
        </span>
        <span className="text-lg font-extrabold tracking-tight text-zinc-900">
          {partner.name}
        </span>
      </div>
    );
  }

  if (partner.type === "logo-script") {
    return (
      <span className="font-serif text-2xl italic text-zinc-900">
        {partner.name}
      </span>
    );
  }

  if (partner.type === "logo-stack") {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
          F
        </span>
        <span className="text-[10px] tracking-widest text-zinc-700">
          {partner.name}
        </span>
      </div>
    );
  }

  // logo-serif / default
  return (
    <span className="text-2xl font-black italic tracking-tight text-zinc-900">
      {partner.name}
    </span>
  );
}

export default function PartnersSection({ partners = defaultPartners }) {
  const trackRef = useRef(null);
  const navigate = useNavigate();

  const goToPartners = () => navigate("/partners");

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        {/* Left: text */}
        <div>
          <h2 className="text-3xl font-extrabold text-zinc-900 md:text-4xl max-[400px]:text-2xl">
            Գործընկերներ
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-500 max-[400px]:mt-3 max-[400px]:text-sm">
            Դարձեք Evocabank-ի Գործընկեր և ևկեք միասին գնանք դեպի գունել նոր
            իրավանություն։ Դառնալով Evoca ընտանիքի անդամ՝ Դուք մուտք կգործեք
            ժամանակակից և յուրահատուկ աշխարհ։ Մենք մշտապես բաց ենք
            հետաքրքրիր առաջարկների ու համագործակցությունների համար։
          </p>
          <button
            onClick={goToPartners}
            className="group mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-violet-50 px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 max-[400px]:mt-5 max-[400px]:px-4 max-[400px]:py-2 max-[400px]:text-xs"
          >
            Բոլոր գործընկերները
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Right: illustration + carousel */}
        <div className="relative">
          {/* soft gradient backdrop */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-violet-50 via-white to-white" />

          <div className="relative flex items-center justify-center pt-4 max-[400px]:pt-2">
            {/* dotted ring */}
            <svg
              viewBox="0 0 200 200"
              className="absolute h-44 w-44 text-amber-400 md:h-52 md:w-52 max-[400px]:h-32 max-[400px]:w-32"
            >
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="1 10"
                strokeLinecap="round"
              />
            </svg>

            {/* hand / peace sign */}
            <div className="relative z-10 text-7xl md:text-8xl max-[400px]:text-5xl" role="img" aria-label="hand sign">
              ✌🏻
            </div>
          </div>

          {/* carousel */}
          <div className="relative mt-6 flex items-center rounded-2xl bg-zinc-50/80 py-6 shadow-sm max-[400px]:mt-4 max-[400px]:py-4">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Նախորդը"
              className="absolute left-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-violet-600 shadow hover:bg-violet-50 max-[400px]:left-1 max-[400px]:h-6 max-[400px]:w-6 max-[400px]:text-sm"
            >
              ‹
            </button>

            <div
              ref={trackRef}
              className="mx-10 flex flex-1 gap-0 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[400px]:mx-7"
            >
              {partners.map((p, i) => (
                <div
                  key={typeof p === "string" ? p : p.name || p.src || i}
                  className={`flex min-w-[130px] flex-1 items-center justify-center px-4 max-[400px]:min-w-[90px] max-[400px]:px-2 ${
                    i !== 0 ? "border-l border-zinc-200" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={goToPartners}
                    aria-label="Տեսնել բոլոր գործընկերներին"
                    className="flex cursor-pointer items-center justify-center rounded-lg p-1 transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    <PartnerLogo partner={p} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollByCard(1)}
              aria-label="Հաջորդը"
              className="absolute right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-violet-600 shadow hover:bg-violet-50 max-[400px]:right-1 max-[400px]:h-6 max-[400px]:w-6 max-[400px]:text-sm"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}