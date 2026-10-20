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
import InfoCard from '../Components/AccountsCard.jsx';
const PensionCard = () => {
  const [menuItems, setMenuItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [m, accordions, reports] = await Promise.all([
          fetchCollection("Cardmenu"), 
        ]);
        
        setMenuItems(m);
      } catch (err) {
        console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
const PensionCardReport=[]
const cardData = {
  title: " Սոցիալական ապահովության վճարային քարտեր",
  description: "Կենսաթոշակառուներին առաջարկում ենք ARCA կենսաթոշակային վճարային քարտեր՝ միայն կենսաթոշակների գումարների սպասարկման նպատակով: Քարտերը տրամադրում ենք Սոցիալական ապահովության պետական ծառայության հետ 2011թ. հունվարի 21-ին կնքած պայմանագրի համաձայն:",
  imageUrl: "https://www.evoca.am/images-cache/menu/1/17218011250749/780x585.jpg",
  altText: "Հաշիվների բացում և սպասարկում"
};
  return (
    <>
      <Header />
      <Navbar items={menuItems} />
      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <InfoCard
            title={cardData.title}
            description={cardData.description}
            imageUrl={cardData.imageUrl}
            altText={cardData.altText}
          />
        </div>
      </main>
      <section className="w-full bg-white py-10 px-4 md:px-12">
       
        {!loading && !error && (
          <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
            <div className="hidden md:block shrink-0">
              <div className="sticky top-24">
                <SocialIcons />
              </div>
            </div>
            <div className="flex-1 max-w-4xl">
              

              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Փաստաթղթեր
                </h2>
                <div className="space-y-5">
                  {PensionCardReport.map((r) => (
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

export default PensionCard;