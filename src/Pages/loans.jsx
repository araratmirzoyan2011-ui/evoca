import React, { useState, useEffect } from 'react';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const Loans = () => {
  const navigate = useNavigate();
  const [loansData, setLoansData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loansSnap, menuSnap] = await Promise.all([
          getDocs(query(collection(db, "loans"), orderBy("id"))),
          getDocs(query(collection(db, "loansMenu"), orderBy("order"))),
        ]);

        // docId-ն ավելացնում ենք data-ի հետ
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

  const handleDetailsClick = (docId) => {
    navigate(`/current-loan/${docId}`);
  };

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <div className="container mx-auto px-4 max-[400px]:px-2 ml-[-18%] max-[400px]:ml-0 mt-[80px] max-[400px]:mt-16">
        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">
          Վարկեր
        </h1>
      </div>

      <div className="container mx-auto px-4">
        {loading && <p className="text-center">Բեռնվում է...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading &&
          !error &&
          loansData.map((loan) => (
            <LoanCard
  key={loan.docId}
  title={loan.title}
  description={loan.description}
  imageSrc={loan.imageSrc}
  stats={loan.stats}
  onDetailsClick={() => handleDetailsClick(loan.docId)}
/>
          ))}
      </div>

      <Footer />
    </>
  );
};

export default Loans;