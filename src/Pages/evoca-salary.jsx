import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { EvocaReviewCard } from '../Components/EvocaReviewCard.jsx';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

import InfoCard from '../Components/AccountsCard.jsx';
const EvocaSalary = () => {
 const cardData={title:"EVOCA ԱՇԽԱՏԱՎԱՐՁԱՅԻՆ ՆԱԽԱԳԻԾ",description:"Քո աշխատավարձը կարող է քեզ տալ շատ ավելին։ Պարզապես պետք է ընտրել Evocabank-ը։",imageUrl:"https://www.evoca.am/images-cache/menu/1/17738355890361/780x585.png",altText:""}
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
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-3xl font-bold text-gray-900">EvocaTOUCH</h1>
            </div>

          </div>
        </div>

        
      </section>


      

      <Footer />
    </>
  );
};

export default EvocaSalary;