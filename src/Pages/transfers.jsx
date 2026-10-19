import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';

import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const Transfers = () => {
const cardInfo={title:"Դրամական փոխանցումներ",description:"Իրականացնում ենք դրամական փոխանցումներ Հայաստանի տարածքում և դեպի արտերկիր՝ դրամով և արտարժույթով: Փոխանցումներն իրականացվում են միջազգային բանկային ստանդարտներին համապատասխանող համակարգերով:",
    imageUrl:"https://www.evoca.am/images-cache/menu/1/16115828343472/780x585.jpg",altText:"Դրամական փոխանցումներ"
}
const transfersList=[{title:"Միջազգային վճարման հանձնարարականներով փոխանցումների իրականացման կանոններ"},{title:"Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025թ."},{title:"SWIFT Transfers (20.03.2026)"}]
const menuItems=[{label:"Դրամական փոխանցումներ", path:"/transfers",order:1},{label:"Վճարային համակարգեր",path:"transfer-payment-systems",order:2}] 
return (
    <>
      <Header />
        <Navbar items={menuItems} />
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

          
        </div>

        <div className="max-w-7xl mx-auto mt-12">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <div className="max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5 mt-6">
                {transfersList.map((docItem, index) => (
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

export default Transfers;