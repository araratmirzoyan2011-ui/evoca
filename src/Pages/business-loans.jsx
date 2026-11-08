import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import LoanCard from "../Components/LoanCard";
import BusinessHeader from '../Components/Busines-Header.jsx';
import Footer from '../Components/Footer';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const businessLoansResources = {
  hy: {
    businessLoans: {
      title: 'Բիզնես Վարկեր',
      loading: 'Բեռնվում է...',
      loadError: 'Չհաջողվեց բեռնել տվյալները',
      empty: 'Վարկեր առայժմ առկա չեն',
    },
  },
  en: {
    businessLoans: {
      title: 'Business Loans',
      loading: 'Loading...',
      loadError: 'Failed to load data',
      empty: 'There are no loans available yet',
    },
  },
  ru: {
    businessLoans: {
      title: 'Бизнес-кредиты',
      loading: 'Загрузка...',
      loadError: 'Не удалось загрузить данные',
      empty: 'Кредитов пока нет',
    },
  },
};
Object.entries(businessLoansResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

const BusinessLoans = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loansData, setLoansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // բանալի, ոչ տեքստ

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const docRef = doc(db, "businessLoansCollection", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLoansData(docSnap.data().loans || []);
        } else {
          console.log("Տվյալներ չեն գտնվել Firestore-ում");
        }
      } catch (err) {
        console.error("Սխալ տվյալներ ստանալիս:", err);
        setError('loadError');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleDetailsClick = (loanId) => {
    navigate(`/current-loan/${loanId}?type=business`);
  };

  return (
    <>
      <BusinessHeader />

      <main className="w-full max-w-5xl mx-auto px-4 md:px-0 pt-10 md:pt-16 pb-16">
        <h1 className="text-left text-[28px] md:text-[34px] font-bold leading-tight mb-8 md:mb-10">
          {t('businessLoans.title')}
        </h1>

        {loading && <p className="text-center py-10">{t('businessLoans.loading')}</p>}
        {error && <p className="text-center text-red-600 py-10">{t(`businessLoans.${error}`)}</p>}

        {!loading && !error && loansData.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            {t('businessLoans.empty')}
          </p>
        )}

        {!loading &&
          !error &&
          loansData.map((loan) => (
            <LoanCard
              key={loan.id}
              title={loan.title}
              description={loan.description}
              imageSrc={loan.imageSrc}
              stats={loan.stats}
              onDetailsClick={() => handleDetailsClick(loan.id)}
            />
          ))}
      </main>

      <Footer />
    </>
  );
};

export default BusinessLoans;