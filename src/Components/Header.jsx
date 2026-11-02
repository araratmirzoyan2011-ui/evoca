import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useState, useRef, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

// Սկզբնավորում ենք i18n-ը միանգամից, որպեսզի t() ֆունկցիան միանշանակ աշխատի
if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        resources: {},
        lng: localStorage.getItem('lang') || 'hy',
        fallbackLng: 'hy',
        supportedLngs: ['hy', 'en', 'ru'],
        interpolation: { escapeValue: false },
    });

    i18n.on('languageChanged', (lng) => {
        localStorage.setItem('lang', lng);
        document.documentElement.lang = lng;
    });

    document.documentElement.lang = i18n.language;
}

export function Header() {
    const { t } = useTranslation();
    const lang = i18n.resolvedLanguage || i18n.language;

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOnlineAppsOpen, setIsOnlineAppsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Տվյալների պահպանման վիճակներ (state-եր) Firebase-ից բեռնելու համար
    const [topLinks, setTopLinks] = useState([]);
    const [mainLinks, setMainLinks] = useState([]);
    const [onlineApps, setOnlineApps] = useState([]);
    const [phones, setPhones] = useState([]);
    const [langs, setLangs] = useState([]);
    
    // Ստեյթ՝ React-ին ստիպելու վերաֆրեյմ (re-render) անել թարգմանությունները բեռնվելուց հետո
    const [, setLoaded] = useState(false);

    const navigate = useNavigate();
    const dropdownsRef = useRef(null);

    // Տվյալների բեռնումը Firebase-ից բաղադրիչի բացվելիս (mount)
    useEffect(() => {
        const fetchFirebaseData = async () => {
            try {
                // 1. Բեռնել Resources (թարգմանությունները) Firebase-ից
                const resDoc = await getDoc(doc(db, 'resources', 'translations'));
                if (resDoc.exists()) {
                    const fetchedResources = resDoc.data();
                    
                    // Ավելացնում ենք թարգմանությունները i18n-ին
                    Object.keys(fetchedResources).forEach((lng) => {
                        i18n.addResourceBundle(lng, 'translation', fetchedResources[lng].translation, true, true);
                    });
                    
                    // Ստիպում ենք բաղադրիչին վերաթարմացվել, որ տեքստերը թարգմանվեն
                    setLoaded(prev => !prev);
                }

                // 2. Բեռնել topLinks կոլեկցիան
                const topLinksSnapshot = await getDocs(collection(db, 'topLinks'));
                setTopLinks(topLinksSnapshot.docs.map(doc => doc.data()));

                // 3. Բեռնել mainLinks կոլեկցիան
                const mainLinksSnapshot = await getDocs(collection(db, 'mainLinks'));
                setMainLinks(mainLinksSnapshot.docs.map(doc => doc.data()));

                // 4. Բեռնել onlineApps կոլեկցիան
                const onlineAppsSnapshot = await getDocs(collection(db, 'onlineApps'));
                setOnlineApps(onlineAppsSnapshot.docs.map(doc => doc.data()));

                // 5. Բեռնել phones կոլեկցիան
                const phonesSnapshot = await getDocs(collection(db, 'phones'));
                setPhones(phonesSnapshot.docs.map(doc => doc.data()));

                // 6. Բեռնել LANGS կոլեկցիան
                const langsSnapshot = await getDocs(collection(db, 'LANGS'));
                setLangs(langsSnapshot.docs.map(doc => doc.data()));

            } catch (error) {
                console.error('Սխալ Firebase-ից տվյալներ բեռնելիս:', error);
            }
        };

        fetchFirebaseData();
    }, []);

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
                const docSnap = await getDoc(doc(db, 'Users', currentUser.uid));
                if (docSnap.exists() && docSnap.data().fullName) {
                    navigate('/user');
                    return;
                }
            } catch (err) {
                console.error(t('header.checkError'), err);
            }
        }
        navigate('/login');
    };

    const submitSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const dropdownItem = 'block px-2 py-2 text-sm hover:bg-purple-50 hover:text-purple-700';

    return (
        <header className="w-full bg-white border-b border-gray-200 font-sans relative z-50">
            
            {/* Վերին տող */}
            <div className="hidden md:flex relative z-[60] max-w-7xl mx-auto px-4 h-12 items-center justify-between text-sm border-b border-gray-100">
                <nav className="flex items-center space-x-4 lg:space-x-6 overflow-x-auto">
                    {topLinks.map((l, index) => (
                        <Link key={index} to={l.to} className="text-gray-700 hover:text-purple-700 whitespace-nowrap">
                            {t(`header.${l.key}`)}
                        </Link>
                    ))}
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
                            <span>{t('header.onlineApps')}</span>
                            <svg className={`w-4 h-4 transform transition-transform ${isOnlineAppsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isOnlineAppsOpen && (
                            <div className="absolute left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-[70] text-gray-800 text-center whitespace-nowrap">
                                {onlineApps.map((a, index) => (
                                    <Link key={index} to={a.to} className={`${dropdownItem} font-medium`}>
                                        {a.key ? t(`header.${a.key}`) : a.label}
                                    </Link>
                                ))}
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
                            <span>{t('header.contact')}</span>
                            <svg className={`w-4 h-4 transform transition-transform ${isContactOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isContactOpen && (
                            <div className="absolute left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-[70] text-gray-800 text-center whitespace-nowrap">
                                {phones.map((p, index) => (
                                    <a key={index} href={p.href} className={`${dropdownItem} font-bold`}>{p.text}</a>
                                ))}
                                <a href="tel:8444" className="block px-2 py-2 hover:bg-purple-50 hover:text-purple-700 font-bold text-lg">8444</a>
                                <div className="border-t border-gray-100 my-1"></div>
                                <a href="#" className="block px-2 py-2 text-sm text-purple-700 font-semibold hover:bg-purple-50">
                                    {t('header.orderCall')}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-3 lg:space-x-4 text-gray-700">
                        <Link to="/branches" className="hover:text-purple-700 transition" title={t('header.branches')}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </Link>
                        <Link to="/faq" className="hover:text-purple-700 transition" title={t('header.help')}>
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
                                title={t('header.language')}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </button>

                            {isLangOpen && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-16 bg-white rounded-md shadow-xl z-[70] py-1">
                                    {langs.map((item, i) => (
                                        <button
                                            key={item.code}
                                            onClick={() => {
                                                i18n.changeLanguage(item.code);
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

                        <button
                            onClick={() => {
                                setIsSearchOpen(true);
                                setIsOnlineAppsOpen(false);
                                setIsContactOpen(false);
                                setIsLangOpen(false);
                            }}
                            className="hover:text-purple-700 transition"
                            title={t('header.search')}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Row */}
            <div className="sticky top-0 z-50 bg-white shadow-md w-full">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 sm:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-1 cursor-pointer flex-shrink-0">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wider text-gray-700">evoca</span>
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-600 rounded-full inline-block mt-1 sm:mt-2"></span>
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden lg:flex items-center space-x-6 text-gray-800 font-medium">
                        {mainLinks.map((l, index) => (
                            <Link key={index} to={l.to} className="hover:text-purple-700 whitespace-nowrap">
                                {l.key ? t(`header.${l.key}`) : l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side buttons */}
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
                            title={t('header.menu')}
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
                    {mainLinks.map((l, index) => (
                        <Link key={index} to={l.to} className="block py-2 text-gray-800 font-medium hover:text-purple-700">
                            {l.key ? t(`header.${l.key}`) : l.label}
                        </Link>
                    ))}
                    <div className="border-t border-gray-100 my-2"></div>
                    <Link to="/" className="block py-2 text-gray-800 font-medium hover:text-purple-700">{t('header.personal')}</Link>
                    <Link to="/business-loans" className="block py-2 text-gray-800 font-medium hover:text-purple-700">{t('header.business')}</Link>
                    <Link to="/about" className="block py-2 text-gray-800 font-medium hover:text-purple-700">{t('header.about')}</Link>
                    <a href="tel:8444" className="block py-2 text-purple-700 font-bold">{t('header.call')} 8444</a>

                    {/* Լեզու (mobile) */}
                    <div className="flex gap-2 py-2">
                        {langs.map((item) => (
                            <button
                                key={item.code}
                                onClick={() => i18n.changeLanguage(item.code)}
                                className={`px-3 py-1 text-xs rounded-full border ${
                                    lang === item.code ? 'bg-purple-700 text-white border-purple-700' : 'border-gray-300 text-gray-700'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                        <button
                            onClick={handleEvocaOnlineClick}
                            className="w-full sm:hidden text-center bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-2.5 rounded-full shadow-md transition duration-200 cursor-pointer"
                        >
                            EvocaONLINE
                        </button>
                    </div>
                </div>
            )}

            {/* Search overlay */}
            {isSearchOpen && (
                <>
                    {/* Մգացած ֆոն */}
                    <div onClick={() => setIsSearchOpen(false)} className="fixed inset-0 bg-black/50 z-[80]" />

                    {/* Վահանակ */}
                    <div className="fixed top-0 left-0 w-full bg-white z-[90] shadow-md">
                        <div className="max-w-7xl mx-auto px-4 h-[94px] flex items-center gap-6">
                            <span className="text-lg font-semibold text-gray-900 shrink-0 md:ml-24">{t('header.search')}</span>

                            <div className="flex-1 flex items-center border border-gray-200 rounded-md px-3 h-11 bg-white">
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                                    className="flex-1 outline-none text-gray-900 bg-transparent"
                                />
                                <button onClick={submitSearch} className="text-gray-900 hover:text-purple-700 transition" aria-label={t('header.searchAria')}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>

                            <button onClick={() => setIsSearchOpen(false)} className="text-gray-300 hover:text-gray-500 transition shrink-0" aria-label={t('header.close')}>
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