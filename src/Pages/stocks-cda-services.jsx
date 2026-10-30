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

const CDAServices = () => {
  const [loading, setLoading] = useState(true);
  
  const [securitiesmenu, setSecuritiesmenu] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [serviceTexts, setServiceTexts] = useState([]);
  const [serviceLinks, setServiceLinks] = useState([]);
  const [salaryitems, setSalaryitems] = useState([]);

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
            
            {/* Տեքստերի ցուցադրում Firebase-ից ստացված state-ից */}
            {serviceTexts.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Հղումների ցուցադրում Firebase-ից ստացված state-ից */}
            <div className="pt-4 space-y-3">
              {serviceLinks.map((link, index) => (
                <div key={index}>
                  <Link to={link.to || '#'} className="text-purple-700 hover:underline font-medium">
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>

            {/* Նորությունների բաժինը */}
            <div className="pt-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <Link to="/news" className="hover:opacity-80 transition-opacity">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight cursor-pointer">
                    Վերջին նորությունները
                  </h2>
                </Link>
                
                <Link 
                  to="/news" 
                  className="flex items-center space-x-2 bg-purple-100/70 hover:bg-purple-200/80 text-purple-700 px-4 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 group cursor-pointer"
                >
                  <span>Բոլոր նորությունները</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {salaryitems.map((item) => (
                   <EvocaNewsCard key={item.id} item={item} collection="salaryNewsCollection" />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default CDAServices;