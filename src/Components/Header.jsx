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

               </div>
        </header>
    );
}