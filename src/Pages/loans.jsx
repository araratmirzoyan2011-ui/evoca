import React, { useState, useEffect, useMemo } from 'react';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
// import { migrateLoans } from '../migrateLoans.js';
const loansResources = {
  hy: {
    loansPage: {
      title: 'Վարկեր',
      loading: 'Բեռնվում է...',
      loadError: 'Չհաջողվեց բեռնել տվյալները',
      empty: 'Այս կատեգորիայում վարկեր չկան',
      filters: {
        all: 'Բոլորը',
        secured: 'Գրավով ապահովված սպառողական վարկեր',
        unsecured: 'Անգրավ սպառողական վարկեր',
        mortgage: 'Հիփոթեքային վարկեր',
        auto: 'Ավտոմեքենաների ձեռքբերման ֆինանսավորում',
        installment: 'Ապառիկ',
        online: 'Օնլայն վարկեր',
      },
    },
  },
  en: {
    loansPage: {
      title: 'Loans',
      loading: 'Loading...',
      loadError: 'Failed to load data',
      empty: 'There are no loans in this category',
      filters: {
        all: 'All',
        secured: 'Secured consumer loans',
        unsecured: 'Unsecured consumer loans',
        mortgage: 'Mortgage loans',
        auto: 'Car purchase financing',
        installment: 'Installment',
        online: 'Online loans',
      },
    },
  },
  ru: {
    loansPage: {
      title: 'Кредиты',
      loading: 'Загрузка...',
      loadError: 'Не удалось загрузить данные',
      empty: 'В этой категории кредитов нет',
      filters: {
        all: 'Все',
        secured: 'Потребительские кредиты с залогом',
        unsecured: 'Потребительские кредиты без залога',
        mortgage: 'Ипотечные кредиты',
        auto: 'Финансирование покупки автомобилей',
        installment: 'Рассрочка',
        online: 'Онлайн-кредиты',
      },
    },
  },
};
Object.entries(loansResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

const FILTER_KEYS = ['all', 'secured', 'unsecured', 'mortgage', 'auto', 'installment', 'online'];

const Loans = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loansData, setLoansData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // բանալի, ոչ տեքստ
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loansSnap, menuSnap] = await Promise.all([
          getDocs(query(collection(db, "loans"), orderBy("id"))),
          getDocs(query(collection(db, "loansMenu"), orderBy("order"))),
        ]);
        setLoansData(loansSnap.docs.map((d) => ({ ...d.data(), docId: d.id })));
        setMenuItems(menuSnap.docs.map((d) => d.data()));
      } catch (e) {
        console.error(e);
        setError('loadError');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredLoans = useMemo(() => {
    if (activeFilter === 'all') return loansData;
    return loansData.filter((loan) => loan.categories?.includes(activeFilter));
  }, [loansData, activeFilter]);

  const handleDetailsClick = (docId) => {
    navigate(`/current-loan/${docId}`);
  };
filteredLoans.forEach(loan => console.log(loan.bannertitle));

  return (
    <>
      <Header />
      <Navbar items={menuItems} />
       {/* <button onClick={migrateLoans} className="m-4 px-4 py-2 bg-red-600 text-white rounded">Migrate loans</button> */}
      <main className="w-full max-w-5xl mx-auto px-4 md:px-0 pt-10 md:pt-16 pb-16">
        <h1 className="text-left text-[28px] md:text-[34px] font-bold leading-tight mb-8 md:mb-10">
          {t('loansPage.title')}
        </h1>

        {/* Filter chips */}
        <div
          className="
            flex gap-x-[14px] gap-y-3 mb-10 md:mb-12
            max-md:flex-nowrap max-md:overflow-x-auto max-md:-mx-4 max-md:px-4 max-md:pb-2
            md:flex-wrap
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {FILTER_KEYS.map((key) => {
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                aria-pressed={isActive}
                className={`shrink-0 whitespace-nowrap rounded-full px-[14px] py-[9px] text-[13px] leading-[18px] transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#6a00e0] text-white font-medium'
                    : 'bg-[#f2f2f2] text-[#222] hover:bg-[#e6e6e6]'
                }`}
              >
                {t(`loansPage.filters.${key}`)}
              </button>
            );
          })}
        </div>

        {loading && <p className="text-center py-10">{t('loansPage.loading')}</p>}
        {error && <p className="text-center text-red-600 py-10">{t(`loansPage.${error}`)}</p>}

        {!loading && !error && filteredLoans.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            {t('loansPage.empty')}
          </p>
        )}

        {!loading &&
          !error &&
          filteredLoans.map((loan) => (
            <LoanCard
              key={loan.docId}
              title={loan.title}
              description={loan.description}
              imageSrc={loan.imageSrc}
              stats={loan.stats}
              onDetailsClick={() => handleDetailsClick(loan.docId)}
            />
          ))}
      </main>

      <Footer />
    </>
  );
};

export default Loans;