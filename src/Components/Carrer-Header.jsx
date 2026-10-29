import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Header() {
    const [isOnlineAppsOpen, setIsOnlineAppsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [lang, setLang] = useState('hy');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dropdownsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownsRef.current && !dropdownsRef.current.contains(e.target)) {
                setIsOnlineAppsOpen(false);
                setIsContactOpen(false);
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

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

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const mainNavItems = [
        { path: "/career", label: "Evoca Լայֆ" },
        { path: "/evokawork2", label: "Աշխատանք և պրակտիկա" },
    ];

    return (
        <header className="w-full bg-white border-b border-gray-200 font-sans relative z-50">
            {/* Վերին տող */}
            <div className="hidden md:flex relative z-[60] max-w-7xl mx-auto px-4 h-12 items-center justify-between text-sm border-b border-gray-100">
                <nav className="flex items-center space-x-4 lg:space-x-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <Link to="/loans" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Անհատ</Link>
                    <Link to="/business-loans" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Բիզնես</Link>
                    <Link to="/instant-payments" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Ակնթարթային վճարումներ</Link>
                    <Link to="/about" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Մեր մասին</Link>
                    <Link to="/news" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Նորություններ</Link>
                    <Link to="/blog" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Բլոգ</Link>
                    <Link to="/career" className="text-gray-700 hover:text-purple-700 whitespace-nowrap">Կարիերա</Link>
                </nav>

                <div ref={dropdownsRef} className="flex items-center space-x-4 lg:space-x-6 relative flex-shrink-0">
                    {/* Online Apps */}
                    <div className="relative">
                        <div
                            onClick={() => {
                                setIsOnlineAppsOpen(!isOnlineAppsOpen);
                                setIsContactOpen(false);
                                setIsLangOpen(false);
                            }}
                            className="flex items-center space-x-1 text-purple-700 font-medium cursor-pointer select-none py-2 whitespace-nowrap"
                        >
                            <span>Առցանց հայտեր</span>
                            <svg className={`w-4 h-4 transform transition-transform ${isOnlineAppsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isOnlineAppsOpen && (
                            <div className="absolute left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-[70] text-gray-800 text-center whitespace-nowrap">
                                <Link to="/online-applications/sme-loan" className="block px-2 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 font-medium">ՖՄՁ վարկավորում</Link>
                                <Link to="/online-applications/visa-infinite" className="block px-2 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 font-medium">Visa Infinite</Link>
                                <Link to="/online-applications/mastercard-gold" className="block px-2 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 font-medium">MasterCard Gold</Link>
                                <Link to="/online-applications/visa-gold" className="block px-2 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 font-medium">Visa Gold</Link>
                            </div>
                        )}
                    </div>

                    {/* Contact */}
                    <div className="relative">
                        <div
                            onClick={() => {
                                setIsContactOpen(!isContactOpen);
                                setIsOnlineAppsOpen(false);
                                setIsLangOpen(false);
                            }}
                            className="flex items-center space-x-1 text-purple-700 font-medium cursor-pointer select-none py-2 whitespace-nowrap"
                        >
                            <span>Հետադարձ կապ</span>
                            <svg className={`w-4 h-4 transform transition-transform ${isContactOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isContactOpen && (
                            <div className="absolute left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-[70] text-gray-800 text-center whitespace-nowrap">
                                <a href="tel:+37410605555" className="block px-2 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 font-bold">+374 10 605555</a>
                                <a href="tel:+37498205555" className="block px-2 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 font-bold">+374 98 205555</a>
                                <a href="tel:+37499605555" className="block px-2 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 font-bold">+374 99 605555</a>
                                <a href="tel:8444" className="block px-2 py-2 hover:bg-purple-50 hover:text-purple-700 font-bold text-lg">8444</a>
                                <div className="border-t border-gray-100 my-1"></div>
                                <a href="#" className="block px-2 py-2 text-sm text-purple-700 font-semibold hover:bg-purple-50">Պատվիրել զանգ</a>
                            </div>
                        )}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-3 lg:space-x-4 text-gray-700">
                        <Link to="/branches" className="hover:text-purple-700 transition" title="Մասնաճյուղեր">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </Link>
                        <Link to="/faq" className="hover:text-purple-700 transition" title="Օգնություն">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </Link>

                        {/* Լեզու */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsLangOpen(!isLangOpen);
                                    setIsOnlineAppsOpen(false);
                                    setIsContactOpen(false);
                                }}
                                className="hover:text-purple-700 transition"
                                title="Լեզու"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </button>

                            {isLangOpen && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-16 bg-white rounded-md shadow-xl z-[70] py-1">
                                    {[
                                        { code: 'hy', label: 'ՀԱՅ' },
                                        { code: 'en', label: 'ENG' },
                                        { code: 'ru', label: 'РУС' },
                                    ].map((item, i) => (
                                        <button
                                            key={item.code}
                                            onClick={() => {
                                                setLang(item.code);
                                                setIsLangOpen(false);
                                            }}
                                            className={`block w-full py-2 text-xs text-center hover:text-purple-700 transition ${
                                                i !== 0 ? 'border-t border-purple-600' : ''
                                            } ${lang === item.code ? 'font-extrabold text-black' : 'font-semibold text-gray-700'}`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Որոնում */}
                        <button
                            onClick={() => {
                                setIsSearchOpen(true);
                                setIsOnlineAppsOpen(false);
                                setIsContactOpen(false);
                                setIsLangOpen(false);
                            }}
                            className="hover:text-purple-700 transition"
                            title="Որոնում"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Հիմնական տող՝ Լոգո + Մենյուի լինկերը միասին ձախ կողմում */}
            <div className="sticky top-0 z-50 bg-white shadow-md w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                    
                    {/* Ձախ մաս․ Լոգոն և Մենյուն միասին */}
                    <div className="flex items-center space-x-8 lg:space-x-12">
                        {/* Լոգո */}
                        <Link to="/" className="flex items-center space-x-1 cursor-pointer flex-shrink-0">
                            <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider text-gray-700">evoca</span>
                            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-600 rounded-full inline-block mt-2"></span>
                        </Link>

                        {/* Նավիգացիոն հղումները հենց լոգոյի կողքից */}
                        <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8 text-sm sm:text-base font-bold">
                            {mainNavItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`whitespace-nowrap transition-colors ${
                                            isActive
                                                ? "text-purple-700 font-extrabold"
                                                : "text-gray-900 hover:text-purple-700"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Աջ մաս․ EvocaONLINE կոճակը */}
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                        <button
                            onClick={handleEvocaOnlineClick}
                            className="hidden sm:inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold px-5 sm:px-7 py-2 sm:py-2.5 rounded-full shadow-md transition duration-200 text-sm sm:text-base whitespace-nowrap cursor-pointer"
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-3 space-y-1">
                    {mainNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-gray-800 font-medium hover:text-purple-700"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="border-t border-gray-100 my-2"></div>
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

            {/* Որոնման վահանակ */}
            {isSearchOpen && (
                <>
                    <div
                        onClick={() => setIsSearchOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[80]"
                    />

                    <div className="fixed top-0 left-0 w-full bg-white z-[90] shadow-md">
                        <div className="max-w-7xl mx-auto px-4 h-[94px] flex items-center gap-6">
                            <span className="text-lg font-semibold text-gray-900 shrink-0 md:ml-24">Որոնում</span>

                            <div className="flex-1 flex items-center border border-gray-200 rounded-md px-3 h-11 bg-white">
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSearch();
                                    }}
                                    className="flex-1 outline-none text-gray-900 bg-transparent"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="text-gray-900 hover:text-purple-700 transition"
                                    aria-label="Որոնել"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>

                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="text-gray-300 hover:text-gray-500 transition shrink-0"
                                aria-label="Փակել"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}