import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import EvocaCard from '../Components/PaymentCard.jsx';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';

function Instant() {
  const [evocaCardsData, setEvocaCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const docRef = doc(db, "instantPaymentsCollection", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEvocaCardsData(docSnap.data().cards || []);
        } else {
          console.log("Տվյալներ չեն գտնվել Firestore-ում");
        }
      } catch (error) {
        console.error("Սխալ տվյալներ ստանալիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full mt-[80px]">
        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">Ակնթարթային վճարումներ</h1>
      </div>

      <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
        {loading ? (
          <div className="text-center text-gray-500 font-medium">Բեռնվում է...</div>
        ) : evocaCardsData.length === 0 ? (
          <div className="text-center text-gray-500">Տվյալներ առայժմ առկա չեն</div>
        ) : (
          <div 
            className="grid gap-8 justify-center w-full max-w-7xl"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 320px))' }}
          >
            {evocaCardsData.map((card) => (
              <EvocaCard 
                key={card.id}
                title={card.title}
                imageSrc={card.src}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Instant;