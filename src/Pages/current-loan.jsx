import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import { OnlineBanking } from "../Components/OnlineBanking.jsx";
import CardHero from "../Components/CardHero.jsx";
const LoanDetails = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const snap = await getDoc(doc(db, "loans", id));
        if (snap.exists()) {
          setLoan({ ...snap.data(), docId: snap.id });
        } else {
          setError("Վարկը չի գտնվել");
        }
      } catch (e) {
        console.error(e);
        setError("Չհաջողվեց բեռնել տվյալները");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id]);

  return (
    <>
      <Header />
        
      {loan && (
      <CardHero
        title={loan.title}
        description={loan.description}
        image={loan.imageSrc}
      />
    )}

      <div className="container mx-auto px-4 mt-[80px]">
        {loading && <p className="text-center">Բեռնվում է...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {loan && (
          <>
            <h1 className="text-3xl font-bold text-center mb-4">{loan.title}</h1>
            <p className="text-gray-600 text-center">{loan.description}</p>
            {/* այստեղ կարող ես օգտագործել loan.stats, loan.imageSrc և այլն */}
          </>
        )}
      </div>

      <OnlineBanking />
      <Footer />
    </>
  );
};

export default LoanDetails;