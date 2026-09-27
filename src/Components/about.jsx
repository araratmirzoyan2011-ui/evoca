import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import Navbar from './Menu.jsx';

function About() {
  const paragraphs = [
    "Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է, որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ կիրառմամբ:",
    "Մենք հատուկ ուշադրություն ենք դարձնում մոբայլ ծառայությունների զարգացմանը:",
    "Մենք աշխատում ենք mobile-first ֆորմատով՝ յուրաքանչյուր նոր ծառայություն նախագծելիս՝ նախևառաջ հաշվի ենք առնում դրա՝ հավելվածով օգտագործման հարմարավետությունը:",
    "Աշխարհը թվային է դառնում, և մենք պատրաստ ենք դրան:",
  ];

  return (
    <>
      <Header />
      <Navbar />

      <div className="w-full mt-[80px] px-4">
        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">
          Ընդհանուր տեղեկատվություն
        </h1>
      </div>

      <section className="w-full mt-[60px] bg-[#f0edf0] py-16 max-[400px]:py-10">
        <div
          className="max-w-6xl mx-auto px-6 grid grid-cols-2 gap-14 items-center
                     max-[400px]:grid-cols-1 max-[400px]:gap-8 max-[400px]:px-4"
        >
          <div className="flex flex-col gap-5 max-[400px]:order-2 max-[400px]:gap-4">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="text-[15px] leading-relaxed text-gray-600 max-[400px]:text-[13px] max-[400px]:leading-relaxed"
              >
                {text}
              </p>
            ))}
          </div>

          <div className="max-[400px]:order-1">
            <img
              src="https://www.evoca.am/images-cache/about_pages/1/16201288751575/780x570.png"
              alt="Evocabank"
              className="w-full h-auto rounded-2xl shadow-lg object-cover
                         max-[400px]:rounded-xl max-[400px]:shadow-md"
            />
          </div>
        </div>
      </section>

      {/* vision section */}
      <section className="w-full bg-[#6400dc] text-white py-14 max-[400px]:py-8">
        <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-8 max-[400px]:text-xl max-[400px]:mb-5">
            Մեր տեսլականը
          </h2>

          <div className="flex items-start gap-6 max-[400px]:gap-3">
            <span className="mt-3 h-[2px] w-10 bg-white shrink-0 max-[400px]:mt-2 max-[400px]:w-6" />
            <p className="text-[15px] leading-relaxed text-purple-100 max-w-2xl max-[400px]:text-[13px]">
              Դառնալ գլոբալ ֆինտեխ գործընկեր, որը միավորում է լավագույն փորձն ու
              տեխնոլոգիական նորարարությունները հարմարավետ և ճկուն ծառայություններ
              ապահովելու համար։
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;

