import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';


const Online = () => {

  return (
    <>
      <Header />

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-10">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
              ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
            </h2>
            {/* <div className="max-w-4xl space-y-4">
              {accordionsData.map((item) => (
                <InfoAccordion
                  key={item.docId}
                  title={item.title}
                  blocks={item.blocks}
                />
              ))}
            </div> */}

            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              {/* <div className="space-y-5">
                {nonResidentReports.map((r) => (
                  <DocumentCard key={r.docId} title={r.title} url={r.url} />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <OnlineBanking />
      <Footer />
    </>
  );
};

export default Online;