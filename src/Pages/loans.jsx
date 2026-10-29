import React, { useState, useEffect, useMemo } from 'react';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const FILTERS = [
  { key: 'all', label: 'Բոլորը' },
  { key: 'secured', label: 'Գրավով ապահովված սպառողական վարկեր' },
  { key: 'unsecured', label: 'Անգրավ սպառողական վարկեր' },
  { key: 'mortgage', label: 'Հիփոթեքային վարկեր' },
  { key: 'auto', label: 'Ավտոմեքենաների ձեռքբերման ֆինանսավորում' },
  { key: 'installment', label: 'Ապառիկ' },
  { key: 'online', label: 'Օնլայն վարկեր' },
];

const Loans = () => {
  const navigate = useNavigate();
  const [loansData, setLoansData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setError("Չհաջողվեց բեռնել տվյալները");
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

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      {/* Քարտերի նույն լայնությունը՝ max-w-5xl, ուստի ձախ եզրը ընդհանուր է */}
      <main className="w-full max-w-5xl mx-auto px-4 md:px-0 pt-10 md:pt-16 pb-16">
        <h1 className="text-left text-[28px] md:text-[34px] font-bold leading-tight mb-8 md:mb-10">
          Վարկեր
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
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={isActive}
                className={`shrink-0 whitespace-nowrap rounded-full px-[14px] py-[9px] text-[13px] leading-[18px] transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#6a00e0] text-white font-medium'
                    : 'bg-[#f2f2f2] text-[#222] hover:bg-[#e6e6e6]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {loading && <p className="text-center py-10">Բեռնվում է...</p>}
        {error && <p className="text-center text-red-600 py-10">{error}</p>}

        {!loading && !error && filteredLoans.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            Այս կատեգորիայում վարկեր չկան
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