import React, { useEffect, useState } from "react";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer";
import SocialIcons from "../Components/SocialIcons.jsx";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Navbar from "../Components/Menuall.jsx";
const Guarantee = () => {
const guranteaccordion=[]
  return (
    <>
      <BusinessHeader />
      {/* <Navbar items={menuItems} />? */}
      

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 md:gap-24">
            <div className="hidden md:block shrink-0">
              <div className="sticky top-24">
                <SocialIcons />
              </div>
            </div>

            <div className="flex-1 max-w-4xl text-gray-700 leading-relaxed space-y-8">
              
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                    ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
                  </h2>
                  <div className="space-y-4">
                    {guranteaccordion.map((item, index) => (
                      <InfoAccordion
                        key={index}
                        title={item.title}
                        blocks={item.blocks}
                      />
                    ))}
                  </div>
                </div>

            </div>
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
};

export default Guarantee;