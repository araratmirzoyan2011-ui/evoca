import Header from '../Components/About-us-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLocalized } from '../hooks/useLocalized.js';

/* ===================== i18n ===================== */
const profileResources = {
  hy: {
    profilePage: {
      loading: 'Բեռնվում է...',
      back: 'Վերադառնալ',
      aboutUs: 'Մեր մասին',
      aboutEvoca: 'Evoca-ի մասին',
      management: 'Ղեկավարություն',
      notFound: 'Անձը չի գտնվել։',
      education: 'Կրթություն',
      career: 'Կարիերա',
    },
  },
  en: {
    profilePage: {
      loading: 'Loading...',
      back: 'Back',
      aboutUs: 'About us',
      aboutEvoca: 'About Evoca',
      management: 'Management',
      notFound: 'Person not found.',
      education: 'Education',
      career: 'Career',
    },
  },
  ru: {
    profilePage: {
      loading: 'Загрузка...',
      back: 'Назад',
      aboutUs: 'О нас',
      aboutEvoca: 'Об Evoca',
      management: 'Руководство',
      notFound: 'Сотрудник не найден.',
      education: 'Образование',
      career: 'Карьера',
    },
  },
};

Object.entries(profileResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

const COLLECTIONS = {
  board: 'boardMembers',
  management: 'managementMembers',
  audit: 'internalAudit',
};

// Ժամանակահատվածները Firestore-ում հայերեն են ('1992-1993թթ.', '2017թ.')։
// en-ում հանում ենք «թթ./թ.» վերջավորությունը, ru-ում դարձնում ենք «гг./г.»։
// Եթե արժեքը արդեն թարգմանված է (վերջավորություն չկա), անփոփոխ է մնում։
const PERIOD_SUFFIX = /\s*(թթ|թ)\.\s*$/;
const formatPeriod = (period, lang) => {
  if (!period || lang === 'hy' || typeof period !== 'string') return period;
  const match = period.match(PERIOD_SUFFIX);
  if (!match) return period;
  const base = period.replace(PERIOD_SUFFIX, '');
  if (lang === 'ru') return `${base} ${match[1] === 'թթ' ? 'гг.' : 'г.'}`;
  return base;
};

function Section({ title, items }) {
  const l = useLocalized();
  const { i18n: i18nInstance } = useTranslation();
  const lang = (i18nInstance.language || 'hy').slice(0, 2);

  if (!items || items.length === 0) return null;
  return (
    <section className="mt-14">
      <h2 className="mb-6 text-lg font-bold uppercase text-[#6a0fd6]">{title}</h2>
      <div className="text-[17px] leading-[27px] text-gray-800">
        {items.map((item, i) => (
          <p key={i} className={item.period ? '' : 'mt-3'}>
            {item.period && (
              <strong className="font-bold text-gray-900">{formatPeriod(l(item.period), lang)} - </strong>
            )}
            {l(item.text)}
          </p>
        ))}
      </div>
    </section>
  );
}

function ProfileManagment() {
  const { t } = useTranslation();
  const l = useLocalized();
  const { group, id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      setLoading(true);
      try {
        const col = COLLECTIONS[group];
        if (col) {
          const snap = await getDoc(doc(db, col, id));
          setPerson(snap.exists() ? { id: snap.id, ...snap.data() } : null);
        } else {
          setPerson(null);
        }
      } catch (err) {
        console.error('Error fetching profile from Firebase:', err);
        setPerson(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPerson();
  }, [group, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        {t('profilePage.loading')}
      </div>
    );
  }

  const personName = person?.name ? l(person.name) : '';

  return (
    <>
      <Header />
      <Navbar />

      <div className="mx-auto max-w-[1350px] px-4 py-8 sm:px-6">
        {/* Back button + breadcrumb */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            to="/management"
            className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 text-[13px] font-bold text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
              <path d="M19 7H2M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t('profilePage.back')}
          </Link>

          <nav className="hidden items-center gap-2 text-[12px] text-gray-600 md:flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>›</span>
            <span>{t('profilePage.aboutUs')}</span>
            <span>›</span>
            <span>{t('profilePage.aboutEvoca')}</span>
            <span>›</span>
            <Link to="/management" className="hover:text-[#6a0fd6]">{t('profilePage.management')}</Link>
            {person && (
              <>
                <span>›</span>
                <span className="text-gray-800">{personName}</span>
              </>
            )}
          </nav>
        </div>

        {!person ? (
          <p className="mt-12 min-h-[40vh] text-gray-700">{t('profilePage.notFound')}</p>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(260px,395px)_1fr] md:gap-[50px]">
            {/* Photo on purple triangle */}
            <div className="mx-auto w-full max-w-[395px] self-start">
              <div className="relative aspect-square w-full">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="profileTriangle" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6a1bd1" />
                      <stop offset="100%" stopColor="#8f3ef0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="9,9 91,9 50,90"
                    fill="url(#profileTriangle)"
                    stroke="url(#profileTriangle)"
                    strokeWidth="14"
                    strokeLinejoin="round"
                  />
                </svg>
                <img
                  src={person.photo}
                  alt={personName}
                  className="absolute inset-0 h-full w-full object-contain object-bottom"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <h1 className="text-[28px] font-medium uppercase leading-tight text-gray-900 sm:text-[34px]">
                {personName}
              </h1>
              <p className="mt-6 text-base text-gray-500">{person.role ? l(person.role) : ''}</p>

              <Section title={t('profilePage.education')} items={person.education} />
              <Section title={t('profilePage.career')} items={person.career} />
              {(person.extra || []).map((s, i) => (
                <section key={i} className="mt-14">
                  <h2 className="mb-6 text-lg font-bold uppercase text-[#6a0fd6]">{l(s.title)}</h2>
                  <p className="text-[17px] leading-[27px] text-gray-800">{l(s.text)}</p>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ProfileManagment;