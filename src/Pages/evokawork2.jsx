import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase.js';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import EvocaCard from '../Components/PaymentCard.jsx';

function Work2() {
  const [sections2, setSections2] = useState({});
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsSnap, benefitsSnap] = await Promise.all([
          getDocs(collection(db, "CareerSections5")),
          getDocs(collection(db, "CareerBenefits2"))
        ]);

        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections2(s);

        const bList = benefitsSnap.docs.map((d) => ({
          docId: d.id,
          ...d.data(),
        }));
        bList.sort((a, b) => (a.id || 0) - (b.id || 0));
        
        setBenefits(bList);
      } catch (err) {
        console.error("Career data load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Header />
      <Navbar />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center text-[#6a0fd9]">
          Բեռնվում է...
        </div>
      ) : (
        <div className="pt-0 mb-[40px]">
          {sections2.culture && (
            <CultureBanner {...sections2.culture} className="mb-[60px]" />
          )}

          <div className="w-full mt-[80px]">
            <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">
             Ինչպիսի թիմակից ենք մենք փնտրում ?
            </h1>
          </div>

          <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
            {benefits.length === 0 ? (
              <div className="text-center text-gray-500">Տվյալներ առայժմ առկա չեն</div>
            ) : (
              <div 
                className="grid gap-8 justify-center w-full max-w-7xl"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 320px))' }}
              >
                {benefits.map((card) => (
                  <EvocaCard 
                    key={card.docId}
                    title={card.title}
                    imageSrc={card.src}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Work2;