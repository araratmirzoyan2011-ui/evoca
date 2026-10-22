import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
import { OnlineBanking } from "../Components/OnlineBanking.jsx";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

const Pos = () => {
  const [menuItems, setMenuItems] = useState([]);
  
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const menuSnapshot = await getDocs(collection(db, "munuItems2"));
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

  const cardData={title:"POS Տերմինալ",description:"POS-ը (point of sale) վճարային համակարգ է, որն օգտագործվում է անկանխիկ վճարումներ ընդունելու համար։ Արագ և տեղում վճարումներ կատարելն այսօր կարևոր նախապայման է Ձեր գնորդների համար։",imageUrl:"https://www.evoca.am/images-cache/menu/1/16158085302978/780x585.jpg",altText:""}
  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />

      <main className="w-full py-6 px-2 xs:px-4 md:px-12 bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
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

export default Pos;