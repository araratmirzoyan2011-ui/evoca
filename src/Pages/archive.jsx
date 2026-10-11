import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import Navbar from "../Components/Menuall.jsx";

const menuItems = [
  { label: "Վարկեր ֆիզիկական անձանց", path: "/individual-loans" },
  { label: "Վարկեր իրավաբանական անձանց", path: "/legal-loans" },
  { label: "Միջնորդավճարների սակագներ", path: "/tariffs" },
  { label: "Ավանդների սակագներ", path: "/deposits" },
  { label: "Արխիվ", path: "/archive" }
];

function Archive() {
  return (
    <>
      <Header />
      <Navbar items={menuItems} />
      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333] max-[400px]:mb-8 max-[400px]:text-[24px]">
              Արխիվ
            </h1>

            
            <h2 className="mb-6 text-[24px] font-bold uppercase text-black max-[400px]:text-[18px]">
              Անհրաժեշտ տեղեկատվություն
            </h2>

            
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Archive;