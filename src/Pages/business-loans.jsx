import React, { useState, useEffect } from 'react';
import LoanCard from "../Components/LoanCard";
import BusinessHeader from '../Components/Busines-Header.jsx'; 
import Footer from '../Components/Footer';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const BusinessLoans = () => {
  const navigate = useNavigate();
  const [loansData, setLoansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (error) {
        console.error("Սխալ տվյալներ ստանալիս:", error);
        setError("Չհաջողվեց բեռնել տվյալները");
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
      
      {/* Քարտերի նույն լայնությունը՝ max-w-5xl, ուստի ձախ եզրը ընդհանուր է Loans էջի հետ */}
      <main className="w-full max-w-5xl mx-auto px-4 md:px-0 pt-10 md:pt-16 pb-16">
        <h1 className="text-left text-[28px] md:text-[34px] font-bold leading-tight mb-8 md:mb-10">
          Բիզնես Վարկեր
        </h1>

        {loading && <p className="text-center py-10">Բեռնվում է...</p>}
        {error && <p className="text-center text-red-600 py-10">{error}</p>}

        {!loading && !error && loansData.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            Վարկեր առայժմ առկա չեն
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