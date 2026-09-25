export function slidecard1(bgcol, h1, p, butp, butc, img) {
    return (
        <div className={`relative ${bgcol} h-[380px] sm:h-[420px] md:h-[520px] overflow-hidden`}>
            <div className="absolute -bottom-[220px] -left-[220px] w-[280px] h-[280px] md:-bottom-[340px] md:-left-[340px] md:w-[400px] md:h-[400px] bg-white rounded-full z-10" />

            <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full px-4 sm:px-8 md:px-16 py-6 sm:py-10">
                <div className="max-w-lg space-y-3 sm:space-y-6 text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight">{h1}</h2>
                    <p className="text-sm sm:text-base md:text-lg opacity-80">{p}</p>
                    <button className={`${butc} font-semibold px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base rounded-full transition-all shadow-md`}>
                        {butp}
                    </button>
                </div>

                <div className="mt-4 sm:mt-10 md:mt-0 md:absolute md:right-8 lg:right-16 md:top-1/2 md:-translate-y-1/2">
                    <img
                        src={img}
                        alt={h1}
                        className="w-[160px] sm:w-[260px] md:w-[440px] object-contain"
                    />
                </div>
            </div>
        </div>
    );
}