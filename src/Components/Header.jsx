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

                    
                </div>
            </div>
        </header>
    );
}