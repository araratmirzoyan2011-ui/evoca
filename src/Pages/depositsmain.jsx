import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const DepositMain = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const menuSnap = await getDocs(
          query(collection(db, "DepositMenu"), orderBy("order"))
        );
        setMenuItems(menuSnap.docs.map((d) => d.data()));

        const depositsSnap = await getDocs(collection(db, "Deposits"));
        setDeposits(
          depositsSnap.docs.map((d) => ({
            docId: d.id,
            ...d.data()
          }))
        );

      } catch (e) {
        console.error(e);
        setError("Չհաջողվեց բեռնել տվյալները");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

   const handleDetailsClick = (deposit) => {
    const id = deposit.docId || deposit.id;
    navigate(`/current-deposit/${id}`);
  };

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <div className="container mx-auto px-4 max-[400px]:px-2 ml-[-18%] max-[400px]:ml-0 mt-[80px] max-[400px]:mt-16">
        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">
          Ավանդներ
        </h1>
      </div>

       <div className="container mx-auto px-4">
        {loading && <p className="text-center">Բեռնվում է...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading &&
          !error &&
          deposits.map((deposit) => (
            <div
              key={deposit.docId || deposit.id}
              onClick={() => handleDetailsClick(deposit)}
              className="cursor-pointer"
            >
              <LoanCard
                title={deposit.title}
                description={deposit.description}
                imageSrc={deposit.imageSrc}
                stats={deposit.stats}
                onDetailsClick={() => handleDetailsClick(deposit)}
              />
            </div>
          ))}
      </div>

      <Footer />
    </>
  );
};

export default DepositMain;