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

          <span className="h-[2px] w-10 bg-white mb-6 max-[400px]:w-6 max-[400px]:mb-4" />

          <p className="text-[15px] leading-relaxed text-purple-100 max-w-2xl max-[400px]:text-[13px]">
            Դառնալ գլոբալ ֆինտեխ գործընկեր, որը միավորում է լավագույն փորձն ու
            տեխնոլոգիական նորարարությունները հարմարավետ և ճկուն ծառայություններ
            ապահովելու համար։
          </p>
        </div>
      </section>

      {/* mission section */}
      <section className="w-full py-16 max-[400px]:py-10">
        <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
          <h2 className="text-3xl font-bold mb-8 max-[400px]:text-2xl max-[400px]:mb-5 ml-[35%]">
            Մեր առաքելությունը
          </h2>

          <div className="relative mb-24 max-[400px]:mb-0">
            <img
              src="https://www.evoca.am/images-cache/about_pages/1/160992374514/946x430.jpg"
              alt="Evoca office"
              className="w-full h-[420px] object-cover rounded-2xl shadow-lg
                         max-[400px]:h-[220px] max-[400px]:rounded-xl"
            />

            <div
              className="absolute -bottom-16 left-8 w-[60%]
                         bg-gradient-to-br from-white to-purple-50 border-l-4 border-[#6400dc]
                         shadow-xl rounded-lg p-8
                         max-[400px]:static max-[400px]:w-full max-[400px]:mt-[-1.5rem]
                         max-[400px]:border-l-0 max-[400px]:border-t-4 max-[400px]:rounded-none
                         max-[400px]:text-center max-[400px]:p-5"
            >
              <p className="text-[15px] leading-relaxed text-gray-700 max-[400px]:text-[13px]">
                Որպես human-first և խելացի ֆինտեխ ընկերություն` մենք հնարավորություն ենք
                տալիս մարդկանց երազելու ավելի համարձակ, բիզնեսներին` բացահայտելու նոր
                հորիզոններ, և հասարակությանը` կառուցելու ավելի լավ ապագա:
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;