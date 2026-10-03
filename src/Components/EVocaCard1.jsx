import React from "react";
export function EvocaNewsCard({ item }) {
  return (
    <div className="w-full max-w-[380px] mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 flex flex-col transition-transform duration-300 hover:scale-[1.01]">
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-purple-600">
        {item.isCustomBanner ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#9333EA] to-[#7C3AED] flex flex-col justify-between p-4 sm:p-5 text-white">
            <div className="flex justify-between items-start">
              <span className="font-bold text-lg sm:text-xl tracking-wider">evoca</span>
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-purple-200">Armenian</p>
                <p className="font-bold text-base sm:text-lg leading-tight">Auto Show <span className="text-lg sm:text-xl">3.0</span></p>
              </div>
            </div>
            <div className="my-auto">
              <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">
                Արի Evoca <br /> տաղավար
              </h3>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 text-[11px] sm:text-xs text-purple-100 pt-2 border-t border-purple-400/40">
              <div>
                <p>Սեպտեմբերի</p>
                <p className="font-bold text-white">25, 26, 27</p>
              </div>
              <div className="h-6 w-[1px] bg-purple-400/50"></div>
              <div>
                <p>Կարեն Դեմիրճյանի անվան</p>
                <p className="font-bold text-white">մարզահամերգային համալիր</p>
              </div>
            </div>
          </div>
        ) : (
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
        )}
      </div>

      <div className="p-4 sm:p-5 bg-white flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2 sm:mb-3">
            <div className="w-1 h-3.5 sm:h-4 bg-[#D946EF] rounded-full"></div>
            <span className="text-[11px] sm:text-xs font-semibold text-gray-900 tracking-wide uppercase">
              {item.category}
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug mb-4">
            {item.title}
          </h4>
        </div>

        {/* Ամսաթիվ */}
        <p className="text-[11px] sm:text-xs text-gray-400 font-medium pt-2">
          {item.date}
        </p>
      </div>
    </div>
  );
}