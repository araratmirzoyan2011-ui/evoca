import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function BusinessHeader() {
    const [isOnlineAppsOpen, setIsOnlineAppsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleEvocaOnlineClick = async () => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            try {
                const docRef = doc(db, "Users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data().fullName) {
                    navigate("/user");
                    return;
                }
            } catch (err) {
                console.error("Ստուգման սխալ:", err);
            }
        }
        
        navigate("/login");
    };

    return (
        <header className="w-full bg-white border-b border-gray-200 font-sans relative">
            <div className="hidden md:flex max-w-7xl mx-auto px-4 h-12 items-center justify-between text-sm border-b border-gray-100">
                <nav className="flex items-center space-x-4 lg:space-x-6 overflow-x-auto">
                    <Link to="/loans" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Անհատ</Link>
                    <Link to="/business-loans" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Բիզնես</Link>
                    <Link to="/instant-payments" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Ակնթարթային վճարումներ</Link>
                    <Link to="/about" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Մեր մասին</Link>
                    <Link to="/news" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Նորություններ</Link>
                    <Link to="/blog" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Բլոգ</Link>
                    <Link to="/career" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Կարիերա</Link>
                </nav>

                <div className="flex items-center space-x-4 lg:space-x-6 relative flex-shrink-0">
                    <div className="relative">
                        <div
                            onClick={() => {
                                setIsOnlineAppsOpen(!isOnlineAppsOpen);
                                setIsContactOpen(false);
                            }}
                            className="flex items-center space-x-1 text-purple-700 font-medium cursor-pointer select-none py-2 whitespace-nowrap"
                        >
                            <span>Առցանց հայտեր</span>
                            <svg className={`w-4 h-4 transform transition-transform ${isOnlineAppsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isOnlineAppsOpen && (
                            <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-3 z-50 text-gray-800">
                                <Link to="/online-applications/sme-loan" className="block px-6 py-2.5 hover:bg-purple-50 hover:text-purple-700 font-medium">ՖՄՁ վարկավորում</Link>
                                <Link to="/online-applications/visa-infinite" className="block px-6 py-2.5 hover:bg-purple-50 hover:text-purple-700 font-medium">Visa Infinite</Link>
                                <Link to="/online-applications/mastercard-gold" className="block px-6 py-2.5 hover:bg-purple-50 hover:text-purple-700 font-medium">MasterCard Gold</Link>
                                <Link to="/online-applications/visa-gold" className="block px-6 py-2.5 hover:bg-purple-50 hover:text-purple-700 font-medium">Visa Gold</Link>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <div
                            onClick={() => {
                                setIsContactOpen(!isContactOpen);
                                setIsOnlineAppsOpen(false);
                            }}
                            className="flex items-center space-x-1 text-purple-700 font-medium cursor-pointer select-none py-2 whitespace-nowrap"
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

                    <div className="flex items-center space-x-3 lg:space-x-4 text-gray-700">
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
                    </div>
                </div>
            </div>

            {/* Հիմնական տող */}
            <div className="sticky top-0 z-50 bg-white shadow-md w-full">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 sm:h-20 flex items-center justify-between">
                    {/* Լոգո */}
                    <Link to="/" className="flex items-center space-x-1 cursor-pointer flex-shrink-0">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wider text-gray-700">evoca</span>
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-600 rounded-full inline-block mt-1 sm:mt-2"></span>
                    </Link>

                    <nav className="hidden lg:flex items-center space-x-6 text-gray-800 font-medium">
                        <Link to="/business-loans" className="hover:text-purple-700 whitespace-nowrap">Վարկեր</Link>
                        <Link to="/leasing" className="hover:text-purple-700 whitespace-nowrap">Լիզինգ</Link>
                        <Link to="/business-account-opening-and-services" className="hover:text-purple-700 whitespace-nowrap">Հաշիվներ</Link>
                        <Link to="/business-classical-deposit" className="hover:text-purple-700 whitespace-nowrap">Ավանդներ</Link>
                        <Link to="/guarantee" className="hover:text-purple-700 whitespace-nowrap">Արժեթղթերի շուկա</Link>
                        <Link to="/business-investment-services" className="hover:text-purple-700 whitespace-nowrap">Առևտրի ֆինանսավորում</Link>
                        <Link to="/v-pos-terminal" className="hover:text-purple-700 whitespace-nowrap">Դիջիթայլ</Link>
                        <Link to="/boxes" className="hover:text-purple-700 whitespace-nowrap">Այլ</Link>
                    </nav>

                    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                        <button
                            onClick={handleEvocaOnlineClick}
                            className="hidden sm:inline-block bg-purple-700 hover:bg-purple-800 text-white font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md transition duration-200 text-sm sm:text-base whitespace-nowrap cursor-pointer"
                        >
                            EvocaONLINE
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-700 hover:text-purple-700 transition"
                            title="Մենյու"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-3 space-y-1">
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Վարկեր</a>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Լիզինգ</a>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Ավանդներ</a>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Հաշիվներ</a>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Առևտրի ֆինանսավորում</a>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Արժեթղթերի շուկա</a>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Դիջիթայլ</a>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Այլ</a>
                    <div className="border-t border-gray-100 my-2"></div>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Անհատ</a>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Բիզնես</a>
                    <a href="#" className="block py-2 text-gray-800 font-medium hover:text-purple-700">Մեր մասին</a>
                    <a href="tel:8444" className="block py-2 text-purple-700 font-bold">Զանգել՝ 8444</a>
                    
                    <div className="pt-2">
                        <button 
                            onClick={handleEvocaOnlineClick}
                            className="w-full sm:hidden text-center bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-2.5 rounded-full shadow-md transition duration-200 cursor-pointer"
                        >
                            EvocaONLINE
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}