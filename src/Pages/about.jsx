import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import Header from '../Components/About-us-Header.jsx';
import Footer from '../Components/Footer.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import Navbar from '../Components/Menu.jsx';
import HistorySlider from '../Components/HystorySlider.jsx';
import HumanFirstComponent from '../Components/X1.jsx';
import { useLocalized } from '../hooks/useLocalized.js';

const BRANDBOOK_URL = '#';

function About() {
  const { t } = useTranslation();
  const l = useLocalized();

  const [values, setValues] = useState([]);
  const [history, setHistory] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  const [csrItems, setCsrItems] = useState([]);
  const [brandColors, setBrandColors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. i18n ռեսուրսների բեռնում Firebase-ից
        const resourcesDoc = await getDoc(doc(db, 'settings', 'i18n_about'));
        if (resourcesDoc.exists()) {
          const aboutResources = resourcesDoc.data();
          Object.entries(aboutResources).forEach(([lng, tr]) => {
            i18n.addResourceBundle(lng, 'translation', tr, true, true);
          });
        }

        // 2. Բոլոր collection-ների բեռնում
        const [valuesSnap, historySnap, paragraphsSnap, csrSnap, colorsSnap] = await Promise.all([
          getDocs(query(collection(db, 'values'), orderBy('order'))),
          getDocs(query(collection(db, 'history'), orderBy('year', 'desc'))),
          getDocs(query(collection(db, 'paragraphs'), orderBy('order'))),
          getDocs(query(collection(db, 'csr'), orderBy('order'))),
          getDocs(query(collection(db, 'colors'), orderBy('order'))),
        ]);

        setValues(valuesSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setHistory(historySnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setParagraphs(paragraphsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setCsrItems(csrSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setBrandColors(colorsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Firebase error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const localizedHistory = history.map((h) => ({ ...h, text: l(h.text) }));

  return (
    <>
      <Header />
      <Navbar />

      <div className="w-full mt-[80px] px-4">
        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">
          {t('about.title')}
        </h1>
      </div>

      <section className="w-full mt-[60px] bg-[#f0edf0] py-16 max-[400px]:py-10">
        <div
          className="max-w-6xl mx-auto px-6 grid grid-cols-2 gap-14 items-center
                     max-[400px]:grid-cols-1 max-[400px]:gap-8 max-[400px]:px-4"
        >
          <div className="flex flex-col gap-5 max-[400px]:order-2 max-[400px]:gap-4">
            {loading ? (
              <p className="text-gray-500">{t('about.loading')}</p>
            ) : (
              paragraphs.map((p) => (
                <p
                  key={p.id}
                  className="text-[15px] leading-relaxed text-gray-600 max-[400px]:text-[13px] max-[400px]:leading-relaxed"
                >
                  {l(p.text)}
                </p>
              ))
            )}
          </div>

          <div className="max-[400px]:order-1">
            <img
              src="https://www.evoca.am/images-cache/about_pages/1/16201288751575/780x570.png"
              alt="Evocabank"
              className="w-full h-auto rounded-2xl shadow-lg object-cover
                         max-[400px]:rounded-xl max-[400px]:shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-[#6400dc] text-white py-14 max-[400px]:py-8">
        <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-8 max-[400px]:text-xl max-[400px]:mb-5">
            {t('about.visionTitle')}
          </h2>

          <span className="h-[2px] w-10 bg-white mb-6 max-[400px]:w-6 max-[400px]:mb-4" />

          <p className="text-[15px] leading-relaxed text-purple-100 max-w-2xl max-[400px]:text-[13px]">
            {t('about.visionText')}
          </p>
        </div>
      </section>

      <section className="w-full py-16 max-[400px]:py-10">
        <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
          <h2 className="text-3xl font-bold mb-8 max-[400px]:text-2xl max-[400px]:mb-5 ml-[35%]">
            {t('about.missionTitle')}
          </h2>

          <div className="relative mb-24 max-[400px]:mb-0">
            <img
              src="https://www.evoca.am/images-cache/about_pages/1/160992374514/946x430.jpg"
              alt="Evoca office"
              className="w-full h-[420px] object-cover rounded-2xl shadow-lg
                         max-[400px]:h-[220px] max-[400px]:rounded-xl"
            />

            <div
              className="absolute -bottom-16 left-8 w-[60%]
                         bg-gradient-to-br from-white to-purple-50 border-l-4 border-[#6400dc]
                         shadow-xl rounded-lg p-8
                         max-[400px]:static max-[400px]:w-full max-[400px]:mt-[-1.5rem]
                         max-[400px]:border-l-0 max-[400px]:border-t-4 max-[400px]:rounded-none
                         max-[400px]:text-center max-[400px]:p-5"
            >
              <p className="text-[15px] leading-relaxed text-gray-700 max-[400px]:text-[13px]">
                {t('about.missionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {localizedHistory.length > 0 && <HistorySlider data={localizedHistory} />}

      <section className="w-full py-12 max-[400px]:py-8">
        <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
          <h1 className="text-3xl font-bold mb-10 max-[400px]:text-2xl max-[400px]:mb-6 max-[400px]:text-center">
            {t('about.valuesTitle')}
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">{t('about.loading')}</p>
          ) : (
            <div className="grid grid-cols-3 gap-12 max-[400px]:grid-cols-1 max-[400px]:gap-8">
              {values.map((item) => (
                <HumanFirstComponent
                  key={item.id}
                  title={l(item.title)}
                  description={l(item.text)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="w-full bg-gradient-to-b from-[#f2f2f2] to-[#f7f1fc] py-16 max-[400px]:py-10">
        <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
          <h2 className="text-3xl font-bold leading-snug max-w-xl mb-8 max-[400px]:text-xl max-[400px]:mb-5 max-[400px]:text-center">
            {t('about.csrTitle')}
          </h2>

          <p className="text-[16px] leading-relaxed text-gray-800 max-w-3xl mb-10 max-[400px]:text-[13px] max-[400px]:mb-6 max-[400px]:text-center">
            {t('about.csrIntro')}
          </p>

          {loading ? (
            <p className="text-gray-500">{t('about.loading')}</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 max-w-4xl max-[400px]:grid-cols-1 max-[400px]:gap-y-5">
              {csrItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4 max-[400px]:gap-3">
                  <span className="mt-3 h-[3px] w-10 shrink-0 bg-[#6400dc] max-[400px]:mt-2.5 max-[400px]:w-6" />
                  <p className="text-[16px] leading-relaxed text-gray-800 max-[400px]:text-[13px]">
                    {l(item.text)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="w-full bg-white py-12 max-[400px]:py-8">
        <div className="max-w-3xl mx-auto px-6 max-[400px]:px-4">
          <h2 className="text-2xl font-bold mb-6 max-[400px]:text-lg max-[400px]:mb-4">
            {t('about.logoTitle')}
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-800 mb-8 max-[400px]:text-[13px] max-[400px]:mb-5">
            {t('about.logoText')}
          </p>
          <div className="flex justify-center mb-12 max-[400px]:mb-8">
            <img
              src="https://www.evoca.am/file_manager/icons/logo.png"
              alt={t('about.logoAlt')}
              className="w-full max-w-[600px] h-auto object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold mb-6 max-[400px]:text-lg max-[400px]:mb-4">
            {t('about.brandbookTitle')}
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-800 mb-6 max-[400px]:text-[13px] max-[400px]:mb-4">
            {t('about.brandbookText1')}
            <br />
            {t('about.brandbookText2')}
          </p>
          <a
            href={BRANDBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="relative flex flex-col items-center justify-center w-full h-[130px] mb-12
                       bg-gradient-to-r from-black via-[#2a0a55] to-[#6400dc] overflow-hidden
                       max-[400px]:h-[80px] max-[400px]:mb-8"
          >
            <span className="text-white font-extrabold tracking-wide text-5xl max-[400px]:text-2xl">
              BRANDBOOK
            </span>
            <span
              className="mt-2 px-4 py-1 rounded-full bg-white/20 text-white text-xs backdrop-blur
                         max-[400px]:mt-1 max-[400px]:px-3 max-[400px]:text-[10px]"
            >
              Click Here
            </span>
          </a>

          <h2 className="text-2xl font-bold mb-6 max-[400px]:text-lg max-[400px]:mb-4">
            {t('about.colorsTitle')}
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-800 mb-6 max-[400px]:text-[13px] max-[400px]:mb-4">
            {t('about.colorsText')}
          </p>

          {loading ? (
            <p className="text-gray-500">{t('about.loading')}</p>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6 mb-6 max-[400px]:p-4 max-[400px]:gap-4">
              {brandColors.map((c) => (
                <div key={c.id} className="flex items-center gap-4 max-[400px]:gap-3">
                  <span className={`h-6 w-6 shrink-0 rounded-full ${c.dot} max-[400px]:h-5 max-[400px]:w-5`} />
                  <p className="text-[13px] text-gray-800 max-[400px]:text-[12px]">{l(c.text)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="w-full aspect-video mb-12 max-[400px]:mb-8">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/QTuqGz3USRE?si=JfAzlEFrhsnW4oTn"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <h2 className="text-2xl font-bold mb-6 max-[400px]:text-lg max-[400px]:mb-4">
            {t('about.isoTitle')}
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-800 mb-6 max-[400px]:text-[13px] max-[400px]:mb-4">
            {t('about.isoText1')}
          </p>
          <p className="text-[15px] leading-relaxed text-gray-800 max-w-2xl max-[400px]:text-[13px]">
            {t('about.isoText2')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 max-[400px]:px-4 max-[400px]:mt-8">
          <div className="border-t border-gray-200 pt-4 text-right text-xs text-gray-500 max-[400px]:text-[10px]">
            {t('about.updated', { date: '18/08/2026 10:20' })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;