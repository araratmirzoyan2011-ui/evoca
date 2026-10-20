import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';

const fetchCollection = async (name) => {
  const snap = await getDocs(collection(db, name));
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
};

const CPAS = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cardsProvisionAccordions, setCardsProvisionAccordions] = useState([]);
  const [cpasReport, setCpasReport] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [m, accordions, reports] = await Promise.all([
          fetchCollection("Cardmenu"), 
          fetchCollection("cardsProvisionAccordions"),
          fetchCollection("CPASReport"),
        ]);
        
        setMenuItems(m);
        setCardsProvisionAccordions(accordions);
        setCpasReport(reports);
      } catch (err) {
        console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <section className="w-full bg-white py-10 px-4 md:px-12">
        {loading && (
          <p className="text-center text-gray-500 py-10">Բեռնվում է...</p>
        )}

        {error && (
          <p className="text-center text-red-600 py-10">
            Չհաջողվեց բեռնել տվյալները։ Խնդրում ենք փորձել կրկին։
          </p>
        )}

        <div className='flex w-[60%] ml-[18%] mb-[50px]'>
            <h1 className='text-3xl'>Քարտերի տրամադրում և սպասարկում</h1>
        </div>

        {!loading && !error && (
          <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
            <div className="hidden md:block shrink-0">
              <div className="sticky top-24">
                <SocialIcons />
              </div>
            </div>
            <div className="flex-1 max-w-4xl">
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
              </h2>
              
              <div className="space-y-4">
                {cardsProvisionAccordions.map((item) => (
                  <InfoAccordion
                    key={item.docId || item.id}
                    title={item.title}
                    blocks={item.blocks}
                  />
                ))}
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Փաստաթղթեր
                </h2>
                <div className="space-y-5">
                  {cpasReport.map((r) => (
                    <DocumentCard key={r.docId || r.order} title={r.title} url={r.url} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      
      <OnlineBanking />
      <Footer />
    </>
  );
};

export default CPAS;