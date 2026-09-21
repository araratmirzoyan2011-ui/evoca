import { useState } from 'react';

export function Header() {
    const [isOnlineAppsOpen, setIsOnlineAppsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-gray-200 font-sans relative">
            {/* Վերին բար - մինչև 400px դեպքում թաքցնում ենք կամ դարձնում ավելի կոմպակտ */}
            <div className="max-w-7xl mx-auto px-2 max-[400px]:px-1 h-12 flex items-center justify-between text-sm border-b border-gray-100">
                {/* Ձախ մենյու (Անհատ, Բիզնես և այլն) - մինչև 400px թաքցնում ենք */}
                <nav className="hidden sm:flex items-center space-x-6 max-[400px]:hidden">
                    <a href="#" className="text-purple-700 font-semibold border-b-2 border-purple-700 pb-3 pt-3">Անհատ</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Բիզնես</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Ակնթարթային վճարումներ</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Մեր մասին</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Նորություններ</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Բլոգ</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Կարիերա</a>
                </nav>

                {/* Մինչև 400px դեպքում տեքստային հղումը փոխարինվում է կամ հարմարեցվում */}
                <div className="flex sm:hidden max-[400px]:flex items-center text-xs font-semibold text-purple-700">
                    <span>Evoca Բանկ</span>
                </div>

                <div className="flex items-center space-x-3 max-[400px]:space-x-1.5 relative">
                    
                    {/* Առցանց հայտեր */}
                    <div className="relative">
                        <div 
                            onClick={() => {
                                setIsOnlineAppsOpen(!isOnlineAppsOpen);
                                setIsContactOpen(false);
                            }}
                            className="flex items-center space-x-1 text-purple-700 font-medium cursor-pointer select-none py-2 text-xs sm:text-sm"
                        >
                            <span className="max-[400px]:hidden">Առցանց հայտեր</span>
                            <span className="hidden max-[400px]:inline">Հայտեր</span>
                            <svg className={`w-3.5 h-3.5 transform transition-transform ${isOnlineAppsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isOnlineAppsOpen && (
                            <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-3 z-50 text-gray-800">
                                <a href="#" className="block px-6 py-2.5 hover:bg-purple-50 hover:text-purple-700 font-medium">ՖՄՁ վարկավորում</a>
                                <a href="#" className="block px-6 py-2.5 hover:bg-purple-50 hover:text-purple-700 font-medium">Visa Infinite</a>
                                <a href="#" className="block px-6 py-2.5 hover:bg-purple-50 hover:text-purple-700 font-medium">MasterCard Gold</a>
                                <a href="#" className="block px-6 py-2.5 hover:bg-purple-50 hover:text-purple-700 font-medium">Visa Gold</a>
                            </div>
                        )}
                    </div>

                    {/* Հետադարձ կապ */}
                    <div className="relative">
                        <div 
                            onClick={() => {
                                setIsContactOpen(!isContactOpen);
                                setIsOnlineAppsOpen(false);
                            }}
                            className="flex items-center space-x-1 text-purple-700 font-medium cursor-pointer select-none py-2 text-xs sm:text-sm"
                        >
                            <span className="max-[400px]:hidden">Հետադարձ կապ</span>
                            <span className="hidden max-[400px]:inline">Կապ</span>
                            <svg className={`w-3.5 h-3.5 transform transition-transform ${isContactOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isContactOpen && (
                            <div className="absolute right-0 mt-1 w-60 bg-white border border-gray-100 rounded-lg shadow-xl py-3 z-50 text-gray-800 text-center">
                                <a href="tel:+37410605555" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 font-bold">+374 10 605555</a>
                                <a href="tel:+37498205555" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 font-bold">+374 98 205555</a>
                                <a href="tel:+37499605555" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 font-bold">+374 99 605555</a>
                                <a href="tel:8444" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 font-bold text-lg">8444</a>
                                <div className="border-t border-gray-100 my-1"></div>
                                <a href="#" className="block px-4 py-2.5 text-purple-700 font-semibold hover:bg-purple-50">Պատվիրել զանգ</a>
                            </div>
                        )}
                    </div>

                    {/* Աջ կողմի պատկերակներից շատ փոքրերի դեպքում թաքցնում ենք ոչ այնքան կարևորները */}
                    <div className="flex items-center space-x-2.5 text-gray-700">
                        <button className="hover:text-purple-700 transition max-[400px]:hidden" title="Մասնաճյուղեր">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <button className="hover:text-purple-700 transition max-[400px]:hidden" title="Օգնություն">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <button className="hover:text-purple-700 transition" title="Մենյու">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Ստորին բար (Լոգո և EvocaONLINE կոճակ) */}
            <div className="sticky top-0 z-50 bg-white shadow-md w-full">
                <div className="max-w-7xl mx-auto px-2 max-[400px]:px-2 h-16 sm:h-20 flex items-center justify-between">
                    {/* Լոգո */}
                    <div className="flex items-center space-x-1 cursor-pointer">
                        <span className="text-2xl sm:text-3xl font-black tracking-wider text-gray-700">evoca</span>
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-600 rounded-full inline-block mt-2"></span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
                        <a href="#" className="hover:text-purple-700">Վարկեր</a>
                        <a href="#" className="hover:text-purple-700">Քարտեր</a>
                        <a href="#" className="hover:text-purple-700">Ավանդներ</a>
                        <a href="#" className="hover:text-purple-700">Հաշիվներ</a>
                        <a href="#" className="hover:text-purple-700">Փոխանցումներ</a>
                        <a href="#" className="hover:text-purple-700">Արժեթղթեր</a>
                        <a href="#" className="hover:text-purple-700">EvocaSALARY</a>
                        <a href="#" className="hover:text-purple-700">EvocaTOUCH</a>
                    </nav>

                    <div>
                        <button className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-3.5 py-1.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm rounded-full shadow-md transition duration-200">
                            EvocaONLINE
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}