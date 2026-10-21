import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import LeasingAccordion from '../Components/LeasingAccordion.jsx';
const Leasing = () => {

const LeasingAccordionsData=[]
const menuItems=[{label:"Evoca Leasing",path:"/leasing"},{label:"Հատուկ առաջարկ",path:"/special-offer"}]
  return (
    <>
      <Header />
      <Navbar items={menuItems} />

     

      <section className="w-full bg-white py-10 px-4 md:px-12">
        

          <>
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
                <div className="max-w-4xl space-y-4">
                  {LeasingAccordionsData.map((item) => (
                    <InfoAccordion
                      key={item.docId}
                      title={item.title}
                      blocks={item.blocks}
                    />
                  ))}
                </div>

              </div>
            </div>
          </>
      </section>
      <Footer />
    </>
  );
};

export default Leasing