import React, { useState, useEffect } from 'react';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';

const BusinessLoans = () => {
  const [loansData, setLoansData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Տվյալների ներբեռնումը Firebase Firestore-ից (businessLoansCollection -> main փաստաթղթից)
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
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleDetailsClick = (title) => {
    console.log(`Սեղմվել է "${title}" վարկի մանրամասների կոճակը`);
  };

  return (
    <>
      <Header />
      
      <div className="container mx-auto px-4 ml-[-18%] mt-[80px]">
        <h1 className="text-3xl font-bold text-center mb-8">Բիզնես Վարկեր</h1>
      </div>

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">Բեռնվում է...</div>
        ) : loansData.length === 0 ? (
          <div className="text-center py-20 text-gray-500">Վարկեր առայժմ առկա չեն</div>
        ) : (
          loansData.map((loan) => (
            <LoanCard 
              key={loan.id}
              title={loan.title}
              description={loan.description}
              imageSrc={loan.imageSrc}
              stats={loan.stats}
              onDetailsClick={() => handleDetailsClick(loan.title)}
            />
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default BusinessLoans;