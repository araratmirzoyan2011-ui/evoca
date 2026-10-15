import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";

function Rights() {
const rigtspdp=[{title:"«Անցանկալի հաճախորդների հետ հարաբերությունների կառավարման» ընթացակարգ (Ուժի մեջ է 30.04.20"},
    {title:"Բողոքների քննության կանոններ (01.09.2026թ.)"},
    {title:"Ինչ անել, եթե բողոք ունեք (01.09.2026թ.)"},
    {title:"Բողոքի ներկայացման հայտ (01.09.2026թ.)"},
    {title:"Անձնական տվյալների մշակման և երրորդ անձանց փոխանցման Համաձայնություն"},
    {title:"Հաճախորդներին ծառայությունների մատուցման նպատակով Բանկի կողմից «ԷԿԵՆԳ» ՓԲԸ և «ՆՈՐՔ» կենտրոնից ստացվող տեղեկու"}
]
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
              Արխիվ
            </h1>

            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Փաստաթղթեր
            </h2>

            {loading ? (
              <div className="py-8 text-center text-gray-500">
                Բեռնվում են փաստաթղթերը...
              </div>
            ) : documents.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                Փաստաթղթեր չեն գտնվել:
              </div>
            ) : (
              <div className="space-y-5">
                {documents.map((doc) => (
                  <DocumentCard key={doc.id} title={doc.title} url={doc.url} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Rights;