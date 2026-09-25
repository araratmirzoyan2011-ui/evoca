export function HeroBackground({ children }) {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* 1. Կետավոր ֆոն (dots pattern) — երևում է միայն սպիտակ հատվածում */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #a78bfa 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
      ></div>

      {/* 2. Հիմնական մանուշակագույն blob-ը — մեծ շրջան, decentered դեպի աջ ու վերև */}
      <div className="absolute top-[-40%] right-[-15%] w-[130%] h-[180%] bg-purple-700 rounded-full pointer-events-none"></div>

      {/* 3. Ավելի բաց երանգի overlay շրջան (խորության էֆեկտ) */}
      <div className="absolute top-[-5%] right-[0%] w-[55%] h-[65%] bg-purple-500/25 rounded-full pointer-events-none"></div>

      {/* 4. Եռանկյուն դեկորներ */}
      <svg className="absolute top-8 left-[30%] w-8 h-8 sm:w-10 sm:h-10 text-purple-300 opacity-90 rotate-12 pointer-events-none" viewBox="0 0 40 40" fill="currentColor">
        <polygon points="20,2 38,36 2,36" />
      </svg>
      <svg className="absolute top-14 right-[6%] w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 -rotate-6 pointer-events-none" viewBox="0 0 40 40" fill="currentColor">
        <polygon points="20,2 38,36 2,36" />
      </svg>
      <svg className="absolute bottom-[22%] right-[4%] w-6 h-6 sm:w-8 sm:h-8 text-purple-300 opacity-70 pointer-events-none" viewBox="0 0 40 40" fill="currentColor">
        <polygon points="20,2 38,36 2,36" />
      </svg>

      {/* 5. Կլոր акценты */}
      <div className="absolute bottom-[10%] left-[8%] w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[8%] right-[9%] w-7 h-7 sm:w-8 sm:h-8 border-4 border-pink-400 rounded-full pointer-events-none"></div>

      {/* 6. Իրական բովանդակությունը (statue, վերնագիր, քարտեր) */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}