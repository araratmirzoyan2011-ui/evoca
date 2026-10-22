import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";
import { OnlineBanking } from "../Components/OnlineBanking.jsx";
const BusinesMoneyTransfers = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const menuSnapshot = await getDocs(collection(db, "Anothermenu"));
        const menuList = menuSnapshot.docs.map(doc => doc.data());
        menuList.sort((a, b) => a.order - b.order);
        setMenuItems(menuList);


      } catch (error) {
        console.error("Սխալ Firebase-ից տվյալներ կարդալիս:", error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50 text-purple-700 font-semibold text-lg">
        Բեռնվում է Firebase-ից...
      </div>
    );
  }
const BusinesTransferCardData={title:"Դրամական փոխանցումներ",description:"Իրականացնում ենք Հայաստանի ռեզիդենտ և ոչ ռեզիդենտ իրավաբանական անձանց և անհատ ձեռնարկատերերի դրամական փոխանցումներ Հայաստանի տարածքում և դեպի արտերկիր՝ դրամով և արտարժույթով: Փոխանցումներն իրականացվում են միջազգային բանկային ստանդարտներին համապատասխանող համակարգերով:",imageUrl:"https://www.evoca.am/images-cache/menu/1/161163847135/780x585.jpg",altText:""}
  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />

      <main className="w-full py-6 px-2 xs:px-4 md:px-12 bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {BusinesTransferCardData && (
            <InfoCard
              title={BusinesTransferCardData.title}
              description={BusinesTransferCardData.description}
              imageUrl={BusinesTransferCardData.imageUrl}
              altText={BusinesTransferCardData.altText}
            />
          )}
        </div>
      </main>

      <section className="w-full bg-white py-8 px-2 xs:px-4 md:px-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          <div className="hidden md:block shrink-0">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 w-full min-w-0 max-w-4xl text-gray-800 space-y-6 text-sm xs:text-base leading-relaxed break-words">
            

          </div>

        </div>
      </section>
          <OnlineBanking />
      <Footer />
    </>
  );
};

export default BusinesMoneyTransfers;