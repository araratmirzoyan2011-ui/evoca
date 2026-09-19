import { useState } from 'react';

export function Header() {
    const [isOnlineAppsOpen, setIsOnlineAppsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-gray-200 font-sans relative">
            <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between text-sm border-b border-gray-100">
                <nav className="flex items-center space-x-6">
                    <a href="#" className="text-purple-700 font-semibold border-b-2 border-purple-700 pb-3 pt-3">Անհատ</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Բիզնես</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Ակնթարթային վճարումներ</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Մեր մասին</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Նորություններ</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Բլոգ</a>
                    <a href="#" className="text-gray-700 hover:text-purple-700">Կարիերա</a>
                </nav>

                <div className="flex items-center space-x-6 relative">
                    
                    <div className="relative">
                        <div 
                            onClick={() => {
                                setIsOnlineAppsOpen(!isOnlineAppsOpen);
                                setIsContactOpen(false);
                            }}
                            className="flex items-center space-x-1 text-purple-700 font-medium cursor-pointer select-none py-2"
                        >
                            <span>Առցանց հայտեր</span>
                            <svg className={`w-4 h-4 transform transition-transform ${isOnlineAppsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                    <div className="relative">
                        <div 
                            onClick={() => {
                                setIsContactOpen(!isContactOpen);
                                setIsOnlineAppsOpen(false);
                            }}
                            className="flex items-center space-x-1 text-purple-700 font-medium cursor-pointer select-none py-2"
                        >
                            <span>Հետադարձ կապ</span>
                            <svg className={`w-4 h-4 transform transition-transform ${isContactOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                    <div className="flex items-center space-x-4 text-gray-700">
                        <button className="hover:text-purple-700 transition" title="Մասնաճյուղեր">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <button className="hover:text-purple-700 transition" title="Օգնություն">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <button className="hover:text-purple-700 transition" title="Լեզու">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </button>
                        <button className="hover:text-purple-700 transition" title="Որոնում">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button className="hover:text-purple-700 transition" title="Մենյու">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="sticky top-0 z-50 bg-white shadow-md w-full">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    {/* Լոգո */}
                    <div className="flex items-center space-x-1 cursor-pointer">
                        <span className="text-3xl font-black tracking-wider text-gray-700">evoca</span>
                        <span className="w-2.5 h-2.5 bg-purple-600 rounded-full inline-block mt-2"></span>
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
                        <button className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-2.5 rounded-full shadow-md transition duration-200">
                            EvocaONLINE
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}