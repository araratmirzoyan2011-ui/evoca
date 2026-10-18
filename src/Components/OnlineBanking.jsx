import React from "react";

export function OnlineBanking() {
  return (
    <section className="relative w-full overflow-hidden rounded-tl-[220px] bg-[#6600dd] px-6 py-14 text-white sm:px-10 lg:px-16 max-[400px]:rounded-tl-[90px] max-[400px]:px-4 max-[400px]:py-10 mb-[60px]">
      {/* decorative shapes */}
      <div className="pointer-events-none absolute left-[9%] top-[14%] h-12 w-12 rounded-full border-[12px] border-fuchsia-400 max-lg:hidden" />
      <div
        className="pointer-events-none absolute left-[4%] top-[58%] h-16 w-16 bg-yellow-300 max-lg:hidden"
        style={{ clipPath: "polygon(0 40%, 100% 0, 60% 100%)" }}
      />
      <div
        className="pointer-events-none absolute right-[4%] top-[20%] h-12 w-12 bg-fuchsia-400/80 max-lg:hidden"
        style={{ clipPath: "polygon(0 0, 100% 20%, 40% 100%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[22%] right-[3%] h-12 w-8 bg-fuchsia-500 max-lg:hidden"
        style={{ clipPath: "polygon(0 0, 40% 0, 40% 55%, 100% 55%, 100% 100%, 0 100%)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: laptop + phone side by side */}
        <div className="flex w-full items-end justify-center gap-4 lg:w-[58%] lg:gap-6 max-[400px]:gap-2">
          {/* Laptop */}
          <div className="w-[70%]">
            <div className="rounded-t-2xl border-[3px] border-[#1c1c1c] bg-black px-2 pb-2 pt-3 max-[400px]:border-2 max-[400px]:px-1 max-[400px]:pb-1 max-[400px]:pt-1.5">
              <div className="relative aspect-video w-full overflow-hidden bg-[#ece8f5]">
                <iframe
                  className="absolute inset-0 h-full w-full border-0"
                  src="https://www.youtube.com/embed/KwAgMHEx8ys?si=wMX5_XmUhYNMJ8W1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
            {/* laptop base */}
            <div className="mx-[-4%] h-3 rounded-b-2xl bg-gradient-to-b from-[#8a8a8f] to-[#4a4a4f] shadow-[0_12px_20px_-6px_rgba(0,0,0,0.5)] max-[400px]:h-2" />
          </div>

          {/* Phone */}
          <div className="w-[16%] min-w-[70px] shrink-0 rounded-[1.6rem] border-[3px] border-[#0b0b0b] bg-[#0b0b0b] p-1 shadow-2xl max-[400px]:min-w-[56px] max-[400px]:rounded-xl max-[400px]:border-2">
            <div className="relative flex aspect-[9/19] w-full items-center justify-center overflow-hidden rounded-[1.3rem] bg-gradient-to-b from-[#7a1fe0] to-[#3a00a8] max-[400px]:rounded-lg">
              <div className="absolute -left-2 top-6 h-6 w-6 rounded-full bg-fuchsia-500/70 blur-[2px]" />
              <div className="absolute bottom-6 right-2 h-5 w-5 rotate-12 bg-fuchsia-500/60" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
              <span className="relative text-lg font-extrabold tracking-wider max-lg:text-sm max-[400px]:text-xs">
                evoca
              </span>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="w-full text-center lg:w-[40%] lg:text-left">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl max-[400px]:text-2xl">
            Օնլայն և մոբայլ բանկինգ
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white lg:mx-0 max-[400px]:mt-4 max-[400px]:text-sm">
            Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է,
            որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ
            կիրառմամբ։
          </p>

          {/* QR + app stores */}
          <div className="mt-8 flex items-center justify-center gap-5 lg:justify-start max-[400px]:mt-5 max-[400px]:gap-3">
            <img
              src="https://www.evoca.am/img/biometric-section-QR-Code.png"
              alt="QR Code"
              className="h-24 w-24 bg-white object-contain p-0.5 max-[400px]:h-16 max-[400px]:w-16"
            />

            <div className="space-y-3 text-left">
              <span className="block text-xs font-semibold max-[400px]:text-[10px]">
                Ներբեռնել հավելվածները՝
              </span>
              <div className="flex items-center gap-3 max-[400px]:gap-2">
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-md border border-white/30 bg-black px-3 py-1.5 transition hover:bg-black/80 max-[400px]:gap-1 max-[400px]:px-2"
                >
                  <svg viewBox="0 0 384 512" className="h-5 w-5 fill-white max-[400px]:h-4 max-[400px]:w-4">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 8 184.8 8 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 37.5 59 129.3 107.2 127.7 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-84.1 102.6-121.7-65.2-30.7-65.7-90-65.7-91.9zM254.7 88.1c26.9-32 24.5-61.2 23.7-71.7-23.8 1.4-51.4 16.4-67.1 34.9-17.3 19.6-27.5 43.9-25.4 71.1 25.6 2 49-11.4 68.8-34.3z" />
                  </svg>
                  <span className="text-[8px] leading-tight max-[400px]:text-[6px]">
                    Download on the
                    <br />
                    <strong className="text-sm font-medium max-[400px]:text-[10px]">App Store</strong>
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 rounded-md border border-white/30 bg-black px-3 py-1.5 transition hover:bg-black/80 max-[400px]:gap-1 max-[400px]:px-2"
                >
                  <svg viewBox="0 0 512 512" className="h-5 w-5 max-[400px]:h-4 max-[400px]:w-4">
                    <path fill="#00d2ff" d="M99.6 493.7L327 266.3 99.6 38.9c-9.8 5.9-16.3 16.4-16.3 28.9v397c0 12.5 6.5 23 16.3 28.9z" />
                    <path fill="#ffce00" d="M366.2 305.5L275 214.3l-138.1 138.1L366.2 495c17.1-9.5 27.9-27.5 27.9-47.5 0-19.5-10.4-37.2-27.9-46.5z" />
                    <path fill="#ff3a44" d="M366.2 206.5c17.5-9.3 27.9-27 27.9-46.5 0-20-10.8-38-27.9-47.5L136.9 60.6 275 198.7z" />
                  </svg>
                  <span className="text-[8px] leading-tight max-[400px]:text-[6px]">
                    GET IT ON
                    <br />
                    <strong className="text-sm font-medium max-[400px]:text-[10px]">Google Play</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}