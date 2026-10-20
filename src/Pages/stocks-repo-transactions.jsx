import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { EvocaNewsCard } from '../Components/EVocaCard1.jsx';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';

const Repo = () => {
  const [loading, setLoading] = useState(true);
  
  const [securitiesmenu, setSecuritiesmenu] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "securitiesmenu"));
        if (!menuSnapshot.empty) {
          setSecuritiesmenu(menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        const cardDocRef = doc(db, "cardDataCollection", "main");
        const cardDocSnap = await getDoc(cardDocRef);
        if (cardDocSnap.exists()) {
          setCardData(cardDocSnap.data());
        }

        const textsSnapshot = await getDocs(collection(db, "serviceTextsCollection"));
        if (!textsSnapshot.empty) {
          setServiceTexts(textsSnapshot.docs.map(doc => doc.data().text));
        }

        const linksSnapshot = await getDocs(collection(db, "serviceLinksCollection"));
        if (!linksSnapshot.empty) {
          setServiceLinks(linksSnapshot.docs.map(doc => doc.data()));
        }

        const newsSnapshot = await getDocs(collection(db, "salaryNewsCollection"));
        const newsDocs = newsSnapshot.docs.map(doc => doc.data());
        if (newsDocs.length > 0 && newsDocs[0].items) {
          setSalaryitems(newsDocs[0].items);
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
        Բեռնվում է տվյալները Firebase-ից...
      </div>
    );
  }
  const cardData={title:"Ռեպո/Հակադարձ Ռեպո գործարքներ",description:"Կարճաժամկետ դրամական միջոցներ ներգրավելու և տեղաբաշխելու նպատակով Evocabank-ն իրականացնում է Ռեպո/Հակադարձ Ռեպո գործարքներ։ Ռեպո/Հակադարձ Ռեպո գործարքների շնորհիվ՝ Բանկը կատարում է կարճաժամկետ իրացվելիության կառավարում։",imageUrl:"https://www.evoca.am/images-cache/menu/1/16783548886405/780x585.jpg",altText:""}
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

export default Repo;