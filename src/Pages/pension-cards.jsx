import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import InfoCard from '../Components/AccountsCard.jsx';

const PensionCard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [additionalParagraphs, setAdditionalParagraphs] = useState([]);
  const [cardOperations, setCardOperations] = useState(null);
  const [usefulInfo, setUsefulInfo] = useState(null);
  const [warnings, setWarnings] = useState(null);
  const [pensionCardReport, setPensionCardReport] = useState([]);

  useEffect(() => {
    const loadDataFromFirebase = async () => {
      try {
        const [
          cardSnap,
          paragraphsSnap,
          operationsSnap,
          usefulSnap,
          warningsSnap,
          reportSnap
        ] = await Promise.all([
          getDoc(doc(db, "PensionCardData", "cardData")),
          getDoc(doc(db, "PensionCardData", "additionalParagraphs")),
          getDoc(doc(db, "PensionCardData", "cardOperations")),
          getDoc(doc(db, "PensionCardData", "usefulInfo")),
          getDoc(doc(db, "PensionCardData", "warnings")),
          getDoc(doc(db, "PensionCardData", "PensionCardReport"))
        ]);

        if (cardSnap.exists()) setCardData(cardSnap.data());
        if (paragraphsSnap.exists()) setAdditionalParagraphs(paragraphsSnap.data().items || []);
        if (operationsSnap.exists()) setCardOperations(operationsSnap.data());
        if (usefulSnap.exists()) setUsefulInfo(usefulSnap.data());
        if (warningsSnap.exists()) setWarnings(warningsSnap.data());
        if (reportSnap.exists()) setPensionCardReport(reportSnap.data().items || []);

      } catch (err) {
        console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Բեռնվում է...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Տեղի է ունեցել սխալ տվյալները բեռնելիս:</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
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
          <div className="hidden md:block shrink-0">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>
          
          <div className="flex-1 max-w-4xl space-y-8">
            
            {additionalParagraphs.length > 0 && (
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {additionalParagraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            )}

            {cardOperations && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {cardOperations.title}
                </h2>
                {cardOperations.subtitle && (
                  <h3 className="text-purple-700 font-semibold mb-4">
                    {cardOperations.subtitle}
                  </h3>
                )}
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {cardOperations.items?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                {cardOperations.note && (
                  <p className="mt-4 text-gray-700 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                    {cardOperations.note}
                  </p>
                )}
              </div>
            )}

            {usefulInfo && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {usefulInfo.title}
                </h2>
                {usefulInfo.subtitle && (
                  <h3 className="text-purple-700 font-semibold mb-4">
                    {usefulInfo.subtitle}
                  </h3>
                )}
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {usefulInfo.items?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {warnings && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {warnings.title}
                </h2>
                <ul className="list-disc pl-5 space-y-3 text-gray-700">
                  {warnings.items?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {pensionCardReport.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Փաստաթղթեր
                </h2>
                <div className="space-y-5">
                  {pensionCardReport.map((r, index) => (
                    <DocumentCard key={r.docId || index} title={r.title} url={r.url} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
      
      <OnlineBanking />
      <Footer />
    </>
  );
};

export default PensionCard;