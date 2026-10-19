import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { EvocaReviewCard } from '../Components/EvocaReviewCard.jsx';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

import InfoCard from '../Components/AccountsCard.jsx';

const EvocaSalary = () => {
  const cardData = {
    title: "EVOCA ԱՇԽԱՏԱՎԱՐՁԱՅԻՆ ՆԱԽԱԳԻԾ",
    description: "Քո աշխատավարձը կարող է քեզ տալ շատ ավելին։ Պարզապես պետք է ընտրել Evocabank-ը։",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/17738355890361/780x585.png",
    altText: ""
  };

  // 1. Առավելությունների (Benefits) տվյալների զանգված
  const benefitsData = [
    {
      id: 1,
      title: "Բեր աշխատավարձդ Evoca, տար անվճար Mastercard Gold",
      items: [
        "Պրեմիում դասի քարտ",
        "Հասանելի ամբողջ աշխարհում",
        "Գումարի անվտանգության բարձր մակարդակ",
        <>Դրական մնացորդի նկատմամբ <strong className="text-purple-700">2% տարեկան տոկոսադրույք</strong></>
      ]
    },
    {
      id: 2,
      title: "Բեր աշխատավարձդ Evoca, տար 50% զեղչով Evoca Travel Card",
      items: [
        <>Մինչև <strong className="text-purple-700">1.5% cashback</strong> արտասահմանում իրականացրած վճարումների համար</>,
        <>Անվճար <strong className="text-purple-700">6 մուտք</strong> Lounge Key սրահներ քեզ և հյուրերիդ համար</>,
        <>Անվճար <strong className="text-purple-700">6 անգամ</strong> Fast track-ից օգտվելու հնարավորություն քեզ և հյուրերիդ համար</>,
        "Այլ ճամփորդական առավելություններ"
      ]
    },
    {
      id: 3,
      title: "Բեր աշխատավարձդ Evoca, տար մի շարք բենեֆիթներ",
      description: <>Դառնալով Evoca քարտապան՝ կունենաս հնարավորություն օգտվելու <span className="text-purple-700 font-semibold cursor-pointer hover:underline">Evoca Benefits</span> նախագծից և մեր 100-ից ավել գործընկերների մոտ կստանաս՝</>,
      items: [
        <>Մինչև <strong className="text-purple-700">25% զեղչ</strong></>,
        <>Մինչև <strong className="text-purple-700">25% cashback</strong></>,
        "Նվեր քարտեր"
      ]
    }
  ];

  // 2. Վարկատեսակների (Loans) տվյալների զանգված
  const loanTypesData = [
    {
      id: 1,
      title: "Օվերդրաֆտ կամ Մարման գրաֆիկով վարկ",
      items: [
        <>Մինչև աշխատավարձի <strong className="text-purple-700">15-ապատիկի չափով</strong></>,
        <>Մինչև <strong className="text-purple-700">10 մլն դրամ</strong> գումար</>,
        <>Մինչև <strong className="text-purple-700">60 ամիս</strong> մարման ժամկետ</>
      ]
    },
    {
      id: 2,
      title: "Ավտովարկ",
      items: [
        <><strong className="text-purple-700">0.5%-ով ցածր</strong> տոկոսադրույք</>,
        <>Մինչև <strong className="text-purple-700">50 մլն դրամ</strong> գումար</>,
        <>Մինչև <strong className="text-purple-700">84 ամիս</strong> մարման ժամկետ</>,
        "Նախընտրած մեքենայի ձեռքբերում՝ ինչպես առաջնային, այնպես էլ երկրորդային շուկայից"
      ]
    },
    {
      id: 3,
      title: "Անշարժ գույքի գրավով սպառողական վարկ",
      items: [
        <><strong className="text-purple-700">0.5%-ով ցածր</strong> տոկոսադրույք</>,
        <>Մինչև <strong className="text-purple-700">100 մլն դրամ</strong> գումար</>,
        <>Մինչև <strong className="text-purple-700">120 ամիս</strong> մարման ժամկետ</>
      ]
    }
  ];

  return (
    <>
      <Header />
      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {cardData && (
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
            />
          )}
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          {/* Ձախ կողմի սոցիալական կոճակներ */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          {/* Աջ կողմի հիմնական բովանդակությունը */}
          <div className="flex-1 max-w-4xl text-gray-800 space-y-8">
            
            {/* Ներածական տեքստ */}
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              Evoca աշխատավարձային նախագիծը մեկնարկել է նրանց համար, ովքեր, իրենց աշխատավարձը քարտին ստանալուց բացի, ցանկանում են նաև ստանալ <span className="text-purple-700 font-semibold cursor-pointer hover:underline">նոր հնարավորություններ ու առավելություններ</span>։
            </p>

            {/* Առավելությունների ցուցադրումը map-ով */}
            {benefitsData.map((benefit) => (
              <div key={benefit.id} className="space-y-3 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-700 cursor-pointer hover:underline">
                  {benefit.title}
                </h2>
                {benefit.description && (
                  <p className="text-gray-700">{benefit.description}</p>
                )}
                <ul className="space-y-2 text-gray-700 pl-2">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-purple-600 mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Վարկերի բաժին */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-700">
                Բեր աշխատավարձդ Evoca, տար ավելի ցածր տոկոսադրույքով վարկեր
              </h2>

              {/* Վարկատեսակների ցուցադրումը map-ով */}
              {loanTypesData.map((loan) => (
                <div key={loan.id} className="space-y-3 pt-2">
                  <h3 className="text-lg font-bold text-purple-700 cursor-pointer hover:underline">
                    {loan.title}
                  </h3>
                  <ul className="space-y-2 text-gray-700 pl-2">
                    {loan.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="text-purple-600 mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default EvocaSalary;