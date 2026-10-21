import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import InfoAccordion from "../Components/InfoAccordion.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";

const Garant = () => {
const menuItems=[{label:"Երաշխիկ",path:"/business-investment-services",order:1},{label:"Ֆակտորինգային ֆինանսավորում",path:"/factoring-finance",order:2},{label:"Ակրեդիտիվ",path:"/վ",order:3},{label:"Ինկասո",path:"/documentary-collection",order:4}]
  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />
      <section className="w-full bg-white py-10 px-4 md:px-12">
                    <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
                      <div className="hidden md:block">
                        <div className="sticky top-24">
                          <SocialIcons />
                        </div>
                      </div>
            
                      <div className="flex-1 max-w-4xl text-gray-800 space-y-6 text-base leading-relaxed">
                          <h1 className="text-3xl">Երաշխիք</h1>
                        
                      </div>
                    </div>
                  </section>
      
      <Footer />
    </>
  );
};

export default Garant;