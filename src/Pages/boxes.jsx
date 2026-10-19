import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import InfoCard from '../Components/AccountsCard.jsx';

const Boxes = () => {
const boxesReports=[{title:"Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025թ."}]
const cardData={title:"Անհատական պահատուփեր",description:"Հայաստանի ռեզիդենտ և ոչ ռեզիդենտ ֆիզիկական անձանց առաջարկում ենք արժեքավոր իրերը պահպանելու հուսալի և անվտանգ միջոց՝ չհրկիզվող անհատական պահատուփեր:",imageUrl:"https://www.evoca.am/images-cache/menu/1/17738350520558/780x585.jpg",altText:""}
  return (
    <>
      <Header />
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
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-12">
          <div className="hidden md:block">
            <div className="sticky top-24 mt-20">
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {boxesReports.map((r) => (
                  <DocumentCard key={r.docId} title={r.title} url={r.url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnlineBanking />
      <Footer />
    </>
  );
};

export default Boxes;