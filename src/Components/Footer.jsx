import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatModal from './ChatModal';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

// Ներմուծեք Firebase-ի ձեր db ինստանսը (ճշգրտեք ուղին ըստ ձեր նախագծի)
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

/* ===================== i18n Սկզբնավորում ===================== */
const alreadyInit = i18n.isInitialized || Array.isArray(i18n.options?.supportedLngs);

if (!alreadyInit) {
  i18n.use(initReactI18next).init({
    resources: {},
    lng: localStorage.getItem('lang') || 'hy',
    fallbackLng: 'hy',
    supportedLngs: ['hy', 'en', 'ru'],
    interpolation: { escapeValue: false },
    initImmediate: false,
    initAsync: false,
  });

  i18n.on('languageChanged', (lng) => {
    localStorage.setItem('lang', lng);
    document.documentElement.lang = lng;
  });

  document.documentElement.lang = i18n.language;
}

/* ===================== Footer Component ===================== */
export default function Footer() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  // Տվյալների ներբեռնումը բացառապես Firebase-ից
  useEffect(() => {
    const fetchTranslationsFromFirebase = async () => {
      try {
        const languages = ['hy', 'en', 'ru'];
        
        for (const langKey of languages) {
          const colRef = collection(db, `${langKey}_footer`);
          const snapshot = await getDocs(colRef);
          
          snapshot.forEach((docSnap) => {
            if (docSnap.exists()) {
              const langData = docSnap.data();
              // Ավելացնում ենք i18n բառարանին
              i18n.addResourceBundle(langKey, 'translation', langData, true, true);
            }
          });
        }
      } catch (error) {
        console.error('Սխալ Firebase-ից տվյալներ կարդալիս:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslationsFromFirebase();
  }, []);

  if (loading) {
    return <div className="py-10 text-center text-gray-500 text-xs">Բեռնվում է տվյալները Firebase-ից...</div>;
  }

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 py-10 px-5 font-sans relative">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8 max-[400px]:flex-col max-[400px]:items-center max-[400px]:text-center">
        
        {/* Բլոկ 1. Լոգո և հասցե */}
        <div className="flex-1 min-w-[200px] max-[400px]:w-full max-[400px]:flex max-[400px]:flex-col max-[400px]:items-center">
          <div className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-1">
            <Link to="/">
              evoca<span className="text-purple-700">BANK</span>
            </Link>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
            {t('footer.address')}
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-4 whitespace-pre-line">
            {t('footer.controlledBy')}
          </p>
          <p className="text-[10px] text-gray-400">
            {t('footer.rightsReserved')}
          </p>
        </div>

        {/* Բլոկ 2. Բանկի մասին */}
        <div className="flex-1 min-w-[180px] max-[400px]:w-full">
          <h3 className="text-sm font-bold text-gray-900 mb-4">{t('footer.aboutTitle')}</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/about" className="text-gray-600 hover:text-purple-700 transition">{t('footer.aboutUs')}</Link></li>
            <li><Link to="/management" className="text-gray-600 hover:text-purple-700 transition">{t('footer.management')}</Link></li>
            <li><Link to="/shareholders" className="text-gray-600 hover:text-purple-700 transition">{t('footer.shareholders')}</Link></li>
            <li><Link to="/reports" className="text-gray-600 hover:text-purple-700 transition">{t('footer.reports')}</Link></li>
            <li><Link to="/laws" className="text-gray-600 hover:text-purple-700 transition">{t('footer.laws')}</Link></li>
            <li><Link to="/tariffs" className="text-gray-600 hover:text-purple-700 transition">{t('footer.tariffs')}</Link></li>
            <li><Link to="/property" className="text-gray-600 hover:text-purple-700 transition">{t('footer.property')}</Link></li>
            <li><Link to="/builders" className="text-gray-600 hover:text-purple-700 transition">{t('footer.builders')}</Link></li>
            <li><Link to="/dealers" className="text-gray-600 hover:text-purple-700 transition">{t('footer.dealers')}</Link></li>
            <li><Link to="/archive" className="text-gray-600 hover:text-purple-700 transition">{t('footer.archive')}</Link></li>
          </ul>
        </div>

        {/* Բլոկ 3. Օգտակար հղումներ */}
        <div className="flex-1 min-w-[180px] max-[400px]:w-full">
          <h3 className="text-sm font-bold text-gray-900 mb-4">{t('footer.usefulTitle')}</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/rights" className="text-gray-600 hover:text-purple-700 transition whitespace-pre-line">{t('footer.rights')}</Link></li>
            <li><Link to="/criteria" className="text-gray-600 hover:text-purple-700 transition whitespace-pre-line">{t('footer.criteria')}</Link></li>
            <li><Link to="/regulation" className="text-gray-600 hover:text-purple-700 transition">{t('footer.regulation')}</Link></li>
            <li><Link to="/privacy" className="text-gray-600 hover:text-purple-700 transition whitespace-pre-line">{t('footer.privacy')}</Link></li>
            <li><Link to="/ombudsman" className="text-gray-600 hover:text-purple-700 transition">{t('footer.ombudsman')}</Link></li>
            <li><Link to="/security" className="text-gray-600 hover:text-purple-700 transition whitespace-pre-line">{t('footer.security')}</Link></li>
            <li><Link to="/cardholders" className="text-gray-600 hover:text-purple-700 transition whitespace-pre-line">{t('footer.cardholders')}</Link></li>
          </ul>
        </div>

        {/* Բլոկ 4. Այլ հղումներ */}
        <div className="flex-1 min-w-[180px] max-[400px]:w-full">
          <h3 className="text-sm font-bold text-gray-900 mb-4">{t('footer.otherTitle')}</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/online" className="text-gray-600 hover:text-purple-700 transition">{t('footer.online')}</Link></li>
            <li><Link to="/boxes" className="text-gray-600 hover:text-purple-700 transition">{t('footer.boxes')}</Link></li>
            <li><Link to="/faq" className="text-gray-600 hover:text-purple-700 transition">{t('footer.faq')}</Link></li>
            <li><Link to="/announcements" className="text-gray-600 hover:text-purple-700 transition">{t('footer.announcements')}</Link></li>
            <li><Link to="/dibrary" className="text-gray-600 hover:text-purple-700 transition">{t('footer.dibrary')}</Link></li>
            <li><Link to="/bulletins" className="text-gray-600 hover:text-purple-700 transition">{t('footer.bulletins')}</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-purple-700 transition">{t('footer.contact')}</Link></li>
            <li><Link to="/map" className="text-gray-600 hover:text-purple-700 transition">{t('footer.map')}</Link></li>
          </ul>
        </div>

        {/* Բլոկ 5. Սոց. ցանցեր, հավելվածներ և կապ */}
        <div className="flex-1 min-w-[180px] flex flex-col gap-4 max-[400px]:w-full max-[400px]:items-center">

          <div className="flex items-center gap-3 text-gray-500 mb-1 max-[400px]:justify-center">
            <Link to="/facebook" title="Facebook" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </Link>
            <Link to="/instagram" title="Instagram" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </Link>
            <Link to="/youtube" title="YouTube" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </Link>
            <Link to="/linkedin" title="LinkedIn" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </Link>
          </div>
          
          <div className="flex flex-col gap-2 mb-1 max-[400px]:items-center">
            <Link to="/appstore" className="inline-block">
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="App Store" 
                className="h-8 object-contain"
              />
            </Link>
            <Link to="/googleplay" className="inline-block">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Google Play" 
                className="h-8 object-contain"
              />
            </Link>
          </div>

          <ul className="space-y-2.5 text-xs">
            <li><Link to="/addresses" className="text-purple-700 font-medium hover:underline whitespace-pre-line">{t('footer.addressesAndHours')}</Link></li>
            <li><Link to="/reach-us" className="text-purple-700 font-medium hover:underline">{t('footer.reachUs')}</Link></li>
            <li><a href="tel:+37410605555" className="text-gray-800 font-semibold hover:text-purple-700 transition">+374 10 605555</a></li>
            <li><a href="tel:8444" className="text-gray-800 font-semibold hover:text-purple-700 transition">8444</a></li>
          </ul>
        </div>

      </div>

      <Link
        to="/online-map"
        title={t('footer.liveMap')}
        className="fixed bottom-6 right-24 z-50 w-14 h-14 rounded-full bg-purple-700 text-white flex items-center justify-center shadow-lg hover:bg-purple-800 transition"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
        </svg>
      </Link>

      <ChatModal />
    </footer>
  );
}