import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';

// Firebase imports
import { db } from '../firebase'; // փոխեք ըստ ձեր ֆայլերի կառուցվածքի
import { collection, getDocs } from 'firebase/firestore';

const Security = () => {
  const [cardInfo, setCardInfo] = useState(null);
  const [introText, setIntroText] = useState(null);
  const [mainConditionsList, setMainConditionsList] = useState([]);
  const [documentsList, setDocumentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Տվյալների բեռնում Firebase-ից
  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        // 1. Քաշել cardInfo-ն
        const cardSnapshot = await getDocs(collection(db, 'security_card_info'));
        if (!cardSnapshot.empty) {
          setCardInfo(cardSnapshot.docs[0].data());
        }

        // 2. Քաշել introText-ը
        const introSnapshot = await getDocs(collection(db, 'security_intro_text'));
        if (!introSnapshot.empty) {
          setIntroText(introSnapshot.docs[0].data());
        }

        // 3. Քաշել mainConditionsList-ը (դասավորել ըստ id-ի)
        const conditionsSnapshot = await getDocs(collection(db, 'security_main_conditions'));
        const conditionsData = conditionsSnapshot.docs.map(doc => doc.data());
        conditionsData.sort((a, b) => a.id - b.id);
        setMainConditionsList(conditionsData);

        // 4. Քաշել documentsList-ը
        const docsSnapshot = await getDocs(collection(db, 'security_documents'));
        const docsData = docsSnapshot.docs.map(doc => doc.data());
        setDocumentsList(docsData);

      } catch (error) {
        console.error('Սխալ Firebase-ից տվյալներ ստանալիս:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-purple-900 font-bold text-xl">
        Բեռնվում է Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {cardInfo && (
            <InfoCard
              title={cardInfo.title}
              description={cardInfo.description}
              imageUrl={cardInfo.imageUrl}
              altText={cardInfo.altText}
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

          <div className="flex-1 max-w-4xl text-gray-800 leading-relaxed space-y-6">
            {introText && (
              <>
                <p>{introText.text}</p>
                <p>{introText.subText}</p>
              </>
            )}

            <div>
              <ul className="space-y-6 text-gray-700">
                {mainConditionsList.map((item, index) => (
                  <li key={item.id || index} className="space-y-2">
                    <h3 className="text-xl font-bold text-purple-900">{item.title}</h3>
                    <p className="whitespace-pre-line">{item.content}</p>
                    {item.subItems && item.subItems.length > 0 && (
                      <ul className="list-disc pl-6 space-y-2 mt-2">
                        {item.subItems.map((sub, sIdx) => (
                          <li key={sIdx}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <div className="max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5 mt-6">
                {documentsList.map((docItem, index) => (
                  <DocumentCard key={index} title={docItem.title} url={docItem.url} />
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

export default Security;