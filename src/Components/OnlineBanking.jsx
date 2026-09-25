import React from "react";

export function OnlineBanking() {
  return (
    <div className="relative mx-auto my-12 w-full max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#5b00c2] via-[#6f00d6] to-[#3d0091] px-6 py-16 text-white sm:px-10 lg:px-16 max-[400px]:rounded-2xl max-[400px]:px-4 max-[400px]:py-10">
      {/* soft ambient glow shapes — behind everything, low-key */}
      <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-fuchsia-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-amber-300/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-between max-[400px]:gap-10">
        {/* Left: device composition */}
        <div className="relative w-full lg:w-1/2">
          <div className="relative mx-auto max-w-md">
            {/* Laptop */}
            <div className="rounded-2xl border border-white/10 bg-[#141019] p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] max-[400px]:p-1.5">
              {/* browser chrome */}
              <div className="flex items-center gap-1.5 px-1.5 pb-2 max-[400px]:pb-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20 max-[400px]:h-1.5 max-[400px]:w-1.5" />
                <span className="h-2 w-2 rounded-full bg-white/20 max-[400px]:h-1.5 max-[400px]:w-1.5" />
                <span className="h-2 w-2 rounded-full bg-white/20 max-[400px]:h-1.5 max-[400px]:w-1.5" />
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full border-0"
                  src="https://www.youtube.com/embed/KwAgMHEx8ys?si=wMX5_XmUhYNMJ8W1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between px-1.5 pt-2.5 text-[11px] text-white/60 max-[400px]:pt-1.5 max-[400px]:text-[9px]">
                <span>Այլ տեսանյութեր</span>
                <a
                  href="https://www.youtube.com/watch?v=KwAgMHEx8ys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 font-semibold text-white/80 transition hover:bg-white/10 hover:text-white max-[400px]:px-1.5 max-[400px]:py-0.5"
                >
                  YouTube
                </a>
              </div>
              {/* laptop base */}
              <div className="mx-auto -mb-1 mt-2.5 h-1.5 w-2/3 rounded-b-xl bg-white/10 max-[400px]:mt-1.5" />
            </div>

            {/* Phone, overlapping the laptop's bottom-right corner */}
            <div className="absolute -bottom-8 -right-6 w-[110px] rotate-[6deg] rounded-[1.4rem] border-4 border-[#0e0b12] bg-[#0e0b12] p-1.5 shadow-2xl sm:-bottom-10 sm:-right-10 sm:w-[130px] max-[400px]:-bottom-5 max-[400px]:-right-3 max-[400px]:w-[78px] max-[400px]:rounded-xl max-[400px]:border-2">
              <div className="flex h-[210px] flex-col justify-between overflow-hidden rounded-[1rem] bg-gradient-to-b from-[#7a1fe0] to-[#2c0066] p-3 text-center sm:h-[250px] max-[400px]:h-[150px] max-[400px]:rounded-md max-[400px]:p-1.5">
                <span className="text-[11px] font-bold tracking-widest max-[400px]:text-[8px]">
                  evoca
                </span>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
                  <div className="h-16 w-16 rounded-full bg-pink-400 blur-xl max-[400px]:h-10 max-[400px]:w-10" />
                </div>
                <span className="relative text-[9px] text-white/70 max-[400px]:text-[7px]">
                  EvocaTOUCH
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="w-full space-y-6 text-center lg:w-1/2 lg:text-left max-[400px]:space-y-4">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl max-[400px]:text-2xl">
            Օնլայն և մոբայլ բանկինգ
          </h2>
          <p className="mx-auto max-w-md text-[15px] leading-relaxed text-white/80 lg:mx-0 max-[400px]:text-sm">
            Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է,
            որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ
            կիրառմամբ։
          </p>

          <button className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#5b00c2] shadow-lg transition hover:bg-white/90 sm:text-base max-[400px]:px-6 max-[400px]:py-2.5 max-[400px]:text-xs">
            Դառնալ հաճախորդ
          </button>

          {/* QR + app stores */}
          <div className="flex flex-col items-center gap-5 border-t border-white/15 pt-6 sm:flex-row sm:justify-center lg:justify-start max-[400px]:gap-3 max-[400px]:pt-4">
            <div className="rounded-xl bg-white p-2 shadow-md max-[400px]:p-1.5">
              <img
                src="https://www.evoca.am/img/biometric-section-QR-Code.png"
                alt="QR Code"
                className="h-20 w-20 object-contain max-[400px]:h-14 max-[400px]:w-14"
              />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <span className="block text-xs text-white/70 max-[400px]:text-[10px]">
                Ներբեռնել հավելվածները՝
              </span>
              <div className="flex items-center justify-center gap-3 sm:justify-start max-[400px]:gap-2">
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2 transition hover:bg-black/60 max-[400px]:gap-1 max-[400px]:px-2 max-[400px]:py-1.5"
                >
                  <svg viewBox="0 0 384 512" className="h-5 w-5 fill-white max-[400px]:h-3.5 max-[400px]:w-3.5">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 8 184.8 8 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 37.5 59 129.3 107.2 127.7 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-84.1 102.6-121.7-65.2-30.7-65.7-90-65.7-91.9zM254.7 88.1c26.9-32 24.5-61.2 23.7-71.7-23.8 1.4-51.4 16.4-67.1 34.9-17.3 19.6-27.5 43.9-25.4 71.1 25.6 2 49-11.4 68.8-34.3z" />
                  </svg>
                  <span className="text-left text-[10px] leading-tight max-[400px]:text-[7px]">
                    Download on the
                    <br />
                    <strong className="text-xs max-[400px]:text-[9px]">App Store</strong>
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2 transition hover:bg-black/60 max-[400px]:gap-1 max-[400px]:px-2 max-[400px]:py-1.5"
                >
                  <svg viewBox="0 0 512 512" className="h-5 w-5 fill-white max-[400px]:h-3.5 max-[400px]:w-3.5">
                    <path d="M99.6 493.7L327 266.3 99.6 38.9c-9.8 5.9-16.3 16.4-16.3 28.9v397c0 12.5 6.5 23 16.3 28.9zM366.2 305.5L275 214.3l-138.1 138.1L366.2 495c17.1-9.5 27.9-27.5 27.9-47.5 0-19.5-10.4-37.2-27.9-46.5v-0.5zM366.2 206.5c17.5-9.3 27.9-27 27.9-46.5 0-20-10.8-38-27.9-47.5L136.9 60.6 275 198.7l91.2-91.2v99z" />
                  </svg>
                  <span className="text-left text-[10px] leading-tight max-[400px]:text-[7px]">
                    GET IT ON
                    <br />
                    <strong className="text-xs max-[400px]:text-[9px]">Google Play</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}