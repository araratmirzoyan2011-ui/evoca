import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';

const EvocaInvest = () => {
  const [loading, setLoading] = useState(true);

  const [securitiesmenu, setSecuritiesmenu] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "securitiesmenu"));
        if (!menuSnapshot.empty) {
          setSecuritiesmenu(
            menuSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
          );
        }
        const cardSnapshot = await getDocs(collection(db, "repoCardData"));
        if (!cardSnapshot.empty) {
          setCardData(cardSnapshot.docs[0].data());
        }
        const textsSnapshot = await getDocs(collection(db, "repoTexts"));
        if (!textsSnapshot.empty) {
          setRepoTexts(
            textsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }

      } catch (error) {
        console.error("Firestore-ից տվյալների բեռնման սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-medium text-lg">
        Բեռնվում են տվյալները Firebase-ից...
      </div>
    );
  }
  const cardData={title:"Կատարիր ներդրումեր և ստացիր եկամուտ EvocaINVEST հավելվածով",description:"EvocaINVEST հավելվածի միջոցով կարող ես կատարել ներդրումներ մի շարք միջազգային ֆինանսական շուկաներում:",imageUrl:"https://www.evoca.am/images-cache/menu/1/17812682689927/780x585.png",altText:""}
  return (
    <>
      <Header />
      <Navbar items={securitiesmenu} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {cardData && (
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
            />
          )}
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-6 text-base leading-relaxed">
            
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EvocaInvest;