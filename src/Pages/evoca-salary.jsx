import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { EvocaReviewCard } from '../Components/EvocaReviewCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { EvocaNewsCard } from '../Components/EVocaCard1.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { Link } from 'react-router-dom';

const EvocaSalary = () => {
  const [loading, setLoading] = useState(true);

  const [cardData, setCardData] = useState(null);
  const [benefitsData, setBenefitsData] = useState([]);
  const [loanTypesData, setLoanTypesData] = useState([]);
  const [salaryreports, setSalaryreports] = useState([]);
  const [salaryitems, setSalaryitems] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const cardSnapshot = await getDocs(collection(db, "cardDataCollection"));
        if (!cardSnapshot.empty) {
          setCardData(cardSnapshot.docs[0].data());
        }

        const benefitsSnapshot = await getDocs(collection(db, "benefitsDataCollection"));
        if (!benefitsSnapshot.empty) {
          setBenefitsData(benefitsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        const loansSnapshot = await getDocs(collection(db, "loanTypesDataCollection"));
        if (!loansSnapshot.empty) {
          setLoanTypesData(loansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        const reportsSnapshot = await getDocs(collection(db, "salaryreportsCollection"));
        if (!reportsSnapshot.empty) {
          setSalaryreports(reportsSnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
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

          <div className="flex-1 max-w-4xl text-gray-800 space-y-8">
            
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              Evoca աշխատավարձային նախագիծը մեկնարկել է նրանց համար, ովքեր, իրենց աշխատավարձը քարտին ստանալուց բացի, ցանկանում են նաև ստանալ <span className="text-purple-700 font-semibold cursor-pointer hover:underline">նոր հնարավորություններ ու առավելություններ</span>։
            </p>

            {benefitsData.map((benefit) => (
              <div key={benefit.id} className="space-y-3 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-700 cursor-pointer hover:underline">
                  {benefit.title}
                </h2>
                {benefit.description && (
                  <p className="text-gray-700">{benefit.description}</p>
                )}
                <ul className="space-y-2 text-gray-700 pl-2">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-purple-600 mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-6 pt-6 border-t border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-700">
                Բեր աշխատավարձդ Evoca, տար ավելի ցածր տոկոսադրույքով վարկեր
              </h2>

              {loanTypesData.map((loan) => (
                <div key={loan.id} className="space-y-3 pt-2">
                  <h3 className="text-lg font-bold text-purple-700 cursor-pointer hover:underline">
                    {loan.title}
                  </h3>
                  <ul className="space-y-2 text-gray-700 pl-2">
                    {loan.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="text-purple-600 mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                  <EvocaNewsCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="pt-8">
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ՀԱՃԱԽ ՏՐՎՈՂ ՀԱՐՑԵՐ
              </h2>
              <div className="max-w-4xl space-y-4">
                {salaryreports.map((item) => (
                  <InfoAccordion
                    key={item.docId}
                    title={item.title}
                    blocks={item.blocks}
                  />
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

export default EvocaSalary;