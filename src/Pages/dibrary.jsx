import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Dibrary = () => {
const cardData={title:"Dibrary - Digital Library",description:"Evocabank-ի նոր և գերժամանակակից «Թումանյան» մասնաճյուղում` Թումանյան 15 հասցեով, բացի ստանդարտ բանկային ծառայություններից, կգործի նաև Dibrary – digital library:",imageUrl:"https://www.evoca.am/images-cache/menu/1/16117479662777/780x585.jpg",altText:"."}
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

        </div>
      </section>
\
      <Footer />
    </>
  );
};

export default Dibrary;