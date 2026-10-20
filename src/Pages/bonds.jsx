import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import InfoCard from '../Components/AccountsCard.jsx';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import BondAccordion from '../Components/BondAccordion.jsx';

const Bond = () => {
  const [loading, setLoading] = useState(true);

  // Firestore-ից բեռնվող state-եր
  const [securitiesmenu, setSecuritiesmenu] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [bondDescriptionBlocks, setBondDescriptionBlocks] = useState([]);
  const [bondAccordions, setBondAccordions] = useState([]);
  const [bondReports, setBondReports] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        // 1. Securities Menu
        const menuSnapshot = await getDocs(collection(db, "securitiesmenu"));
        if (!menuSnapshot.empty) {
          setSecuritiesmenu(menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        // 2. Card Data (վերցնում ենք առաջին փաստաթուղթը)
        const cardSnapshot = await getDocs(collection(db, "cardData"));
        if (!cardSnapshot.empty) {
          setCardData(cardSnapshot.docs[0].data());
        }

        // 3. Bond Description Blocks
        const blocksSnapshot = await getDocs(collection(db, "bondDescriptionBlocks"));
        if (!blocksSnapshot.empty) {
          const blocks = blocksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          // Եթե ունեք id դաշտ, դասավորում ենք ըստ ինդեքսի/id-ի
          blocks.sort((a, b) => (a.id > b.id ? 1 : -1));
          setBondDescriptionBlocks(blocks);
        }

        // 4. Bond Accordions
        const accordionsSnapshot = await getDocs(collection(db, "bondAccordions"));
        if (!accordionsSnapshot.empty) {
          setBondAccordions(accordionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        // 5. Bond Reports
        const reportsSnapshot = await getDocs(collection(db, "bondReports"));
        if (!reportsSnapshot.empty) {
          setBondReports(reportsSnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
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

          {/* Սոցիալական կոճակներ */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-8">

            {/* Նկարագրության բլոկներ (Firestore-ից) */}
            {bondDescriptionBlocks.length > 0 && (
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm space-y-6 leading-relaxed border border-gray-100">
                {bondDescriptionBlocks.map((block) => {
                  if (block.type === 'paragraph') {
                    return <p key={block.id}>{block.content}</p>;
                  }
                  if (block.type === 'section') {
                    return (
                      <div key={block.id}>
                        <h3 className="text-lg md:text-xl font-bold text-purple-700 mb-3">
                          {block.title}
                        </h3>
                        {block.subtitle && <p className="mb-4">{block.subtitle}</p>}
                        {block.listItems && (
                          <ul className="list-disc pl-5 space-y-3">
                            {block.listItems.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}

            {/* Ակորդեոններ (Firestore-ից) */}
            {bondAccordions.length > 0 && (
              <div className="pt-4">
                <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                  ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
                </h2>
                <div className="max-w-4xl space-y-4">
                  {bondAccordions.map((item, i) => (
                    <BondAccordion key={item.id || i} {...item} />
                  ))}
                </div>
              </div>
            )}

            {/* Փաստաթղթեր (Firestore-ից) */}
            {bondReports.length > 0 && (
              <div className="mt-10 max-w-4xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Փաստաթղթեր
                </h2>
                <div className="space-y-5">
                  {bondReports.map((r) => (
                    <DocumentCard key={r.docId || r.id} title={r.title} url={r.url} />
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Bond;