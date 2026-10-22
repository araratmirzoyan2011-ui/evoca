import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import { EvocaNewsCard } from "../Components/EVocaCard1.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
const VPos = () => {const menuItems = [
  { label: "V-POS Տերմինալ", path: "/v-pos-terminal", order: 1 },
  { label: "POS Տերմինալ", path: "/pos-terminal", order: 2 },
  { label: "Սակագներ", path: "/terminals-tariffs", order: 3 },
  { label: "Տերմինալի տեղադրման հայտ", path: "/terminal-installation-application", order: 4 },
  { label: "Evoca Mobile POS' mPOS", path: "/evoca-mobile-pos-mpos", order: 5 }
];
const cardData={title:"V-POS Տերմինալ",description:"V-POS-ը (virtual point of sale) վիրտուալ վճարային համակարգը է, որը հարմարավետ, ապահով և հեշտ լուծում է օնլայն առևտրով զբաղվող բիզնեսների համար։ Արագ և տեղում օնլայն վճարումներ կատարելն այսօր կարևոր նախապայման է Ձեր գնորդների համար։",imageUrl:"https://www.evoca.am/images-cache/menu/1/16158111599306/780x585.jpg",altText:""}
  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />
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
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-6 text-base leading-relaxed">
            

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default VPos;