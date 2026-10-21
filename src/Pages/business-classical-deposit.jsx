import React, { useEffect, useState } from "react";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer";
import Navbar from "../Components/Menuall.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
import { EvocaReviewCard } from "../Components/EvocaReviewCard.jsx";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

const ClasicalDeposit = () => {
const cardData={title:"Դասական ավանդ",description:"Դասական ավանդը կայուն բարձր եկամտաբերությամբ կավելացնի ձեր խնայողությունները: Դասական ժամկետային ավանդն ընդունում ենք ֆիզիկական և իրավաբանական անձանցից: Ավանդ ներդնելիս ձեզ տրամադրում ենք անվճար միջազգային քարտ:",imageUrl:"https://www.evoca.am/images-cache/menu/1/1615568375393/780x585.jpg",altText:""}
  return (
    <>
      <BusinessHeader />
      
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
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 md:gap-24">
            <div className="hidden md:block shrink-0">
              <div className="sticky top-24">
                <SocialIcons />
              </div>
            </div>

            
          </div>
        </div>
      </section>

    

      <Footer />
    </>
  );
};

export default ClasicalDeposit;