import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import ResourceLogos from '../Components/ResourceLogos.jsx';

const Dibrary = () => {
  const [logos, setLogos] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [contentSections, setContentSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const logosSnapshot = await getDocs(collection(db, "logos"));
        const logosList = logosSnapshot.docs.map(doc => doc.data());
        setLogos(logosList);

        const cardDocRef = doc(db, "cardData", "mainCard");
        const cardDocSnap = await getDoc(cardDocRef);
        if (cardDocSnap.exists()) {
          setCardData(cardDocSnap.data());
        }

        const sectionsSnapshot = await getDocs(collection(db, "contentSections"));
        const sectionsList = sectionsSnapshot.docs.map(doc => doc.data());
        sectionsList.sort((a, b) => a.id - b.id);
        setContentSections(sectionsList);

      } catch (error) {
        console.error("Սխալ տվյալների բեռնման ժամանակ Firebase-ից:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-purple-700 font-semibold text-lg">
        Բեռնվում է տվյալները Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <Header />

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
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-12">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 text-gray-800 leading-relaxed space-y-6">
            {contentSections.map((section) => (
              <p key={section.id}>
                {section.textParts && section.textParts.map((part, index) => {
                  if (part.type === 'hashtag') {
                    return (
                      <span key={index} className="text-purple-700 font-semibold">
                        {part.value}
                      </span>
                    );
                  }
                  if (part.type === 'link') {
                    return (
                      <a
                        key={index}
                        href={part.href}
                        className="text-purple-700 font-semibold hover:underline"
                      >
                        {part.value}
                      </a>
                    );
                  }
                  return <React.Fragment key={index}>{part.value}</React.Fragment>;
                })}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <ResourceLogos logos={logos} />
      </div>

      <Footer />
    </>
  );
};

export default Dibrary;