import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";

function Regulation() {
const regulationpdf=[{title:"«Անցանկալի հաճախորդների հետ հարաբերությունների կառավարման» ընթացակարգ (Ուժի մեջ է 30.04.2026-ից)"},{title:"Բնապահպանական և սոցիալական կառավարման համակարգ"},
    {title:"Հաճախորդների սպասարկման գործելակարգ 01.09.2026թ."},{title:"Տեղեկատվական անվտանգության քաղաքականություն (Ուժի մեջ է 25.12.2025թ.-ից)"},]

  return (
    <>
      <Header />
      

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333] max-[400px]:mb-8 max-[400px]:text-[24px]">
              Կարգավորում
            </h1>
            
            <div className="mb-6">
              <h2 className="text-[24px] font-bold uppercase text-black max-[400px]:text-[18px]">
                
              </h2>
            </div>
            
            
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Փաստաթղթեր
          </h2>

            <div className="space-y-5">
              {regulationpdf.map((r) => (
                <DocumentCard key={r.id} title={r.title} url={r.url} />
              ))}
            </div>
          </section>
          
        </div>

        
      </main>
      <Footer />
    </>
  );
}

export default Regulation;