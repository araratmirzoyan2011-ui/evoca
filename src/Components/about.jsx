import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import Navbar from './Menu.jsx';
import PromoCard from './AboutCard.jsx';
import HistorySlider from './HystorySlider.jsx';
import HumanFirstComponent from './X1.jsx';
const x=[
  {text:"Առաջին տեղում միշտ մարդիկ են՝ մեր հաճախորդները, էքսպերտների թիմը և հասարակությունը։ Չէ՞ որ աշխարհում ամեն ինչ արվում է մարդկանց կողմից մարդկանց համար։", title:"Human-first"},
  {text:"Նորարարությունը մեր ԴՆԹ-ի մասն է, իսկ փոփոխությունն այսօր միակ հաստատունն է։ Մենք բաց ենք և պատրաստակամ զարգանալու համար։", title:"Նորարարություն"},
  {text:"Մենք ձգտում ենք ունենալ դրական ազդեցություն և նպաստել աշխարհն ավելի լավը դարձնելուն։", title:"Դրական ազդեցություն"}
]
const historyData = [
  {
    year: 2026,
    text: "Բանկը բացեց նոր «Աջափնյակ» մասնաճյուղը, կնքեց նոր միջազգային համագործակցության պայմանագրեր, մասնակցեց միջազգային կոնֆերանսների, արժանացավ հեղինակավոր մրցանակների և կյանքի կոչեց Երևանը գունավորող street art-երը։",
    image: "https://www.evoca.am/images-cache/histories/1/17823049564741/450x330.png",
  },
  {
    year: 2025,
    text: "Բանկը փոխեց իր կազմակերպաիրավական ձևը՝ ՓԲԸ-ից ԲԲԸ-ի: Evoca-ն և EBRD-ն ստորագրեցին համագործակցության համաձայնագիր։ Ներկայացվեց Evoca Travel Card-ը։ Մեկնարկեցին Evoca Partners Club-ն և Evoca Benefits նախագիծը։",
    image: "https://www.evoca.am/images-cache/histories/1/17574211752061/450x330.png",
  },
  {
    year: 2024,
    text: "Evocabank-ը ձեռք է բերել նոր միջազգային գործընկերներ, այդ թվում՝ EIB Global-ը, հովանավորել մի շարք նախագծեր, ներկայացրել իր նոր EvocaHOME օվերդրաֆտը, ինչպես նաև արժանացել միջազգային մրցանակների։",
    image: "https://www.evoca.am/images-cache/histories/1/17240707281875/450x330.png",
  },
  {
    year: 2023,
    text: "Evocabank-ը թողարկել է նոր, գերժամանակակից EvocaTOUCH 2 և EvocaINVEST հավելվածները։ Գործընկերներին է ներկայացրել Evoca Digital քարտը, Action օնլայն վարկը, Էլեկտրոնային ստորագրության e-Sign համակարգը։",
    image: "https://www.evoca.am/images-cache/histories/1/17001230844576/450x330.jpg",
  },
  {
    year: 2022,
    text: "Evoca-ն համալրել է կանոնադրական կապիտալը 3 մլրդ դրամով: Թողարկել է պարտատոմսեր։ Ներկայացրել է Visa Vision քարտը։ ՀայՓոստի հետ սկսել է համագործակցություն՝ հարմարավետ և հասանելի ֆինտեխ ծառայությունների գծով։ Գործարկել է Evoca mobile POS-ը։",
    image: "https://www.evoca.am/images-cache/histories/1/16542512333235/450x330.png",
  },
  {
    year: 2021,
    text: "Evoca-ի նոր, կրեատիվ լուծումներով կայքը Awwwards թիմի կողմից արժանացել է 2 մրցանակի: Բանկը ներկայացրել է իր Evoca Gift Card-ը: Բանկը 2 փուլով թողարկել է պարտատոմսեր, այդ թվում՝ online տարբերակով:",
    image: "https://www.evoca.am/images-cache/histories/1/16448252170155/450x330.png",
  },
  {
    year: 2020,
    text: "Evocabank-ը յուրահատուկ կերպով նշեց Բանկի հիմնադրման 30-ամյակը՝ առաջին անգամ Հայաստանում կազմակերպելով լուսային դրոն շոու: 300 դրոն միաժամանակ լուսավորեցին Երևանի երկինքը՝ շնորհավորելով Evocabank-ի տարեդարձը:",
    image: "https://www.evoca.am/images-cache/histories/1/16328279547034/450x330.png",
  },
  {
    year: 2019,
    text: "Evocabank-ի Վարչության նախագահի տեղակալ Կարեն Եղիազարյանը նշանակվել է Բանկի Վարչության նախագահ: Ներկայացվել է Visa Infinite քարտը: Բանկը դարձել է Եվրատեսիլ 2019-ի հեռարձակման գլխավոր հովանավոր։",
    image: "https://www.evoca.am/images-cache/histories/1/16099255150877/450x330.jpg",
  },
  {
    year: 2018,
    text: "Evocabank-ը երկրորդ տարին անընդմեջ Global Finance հեղինակավոր ամսագրի կողմից ճանաչվել է Լավագույն սպառողական թվային բանկը Հայաստանում: Ներկայացվել են ArCa-MIR և Shopping Card քարտերը:",
    image: "https://www.evoca.am/images-cache/histories/1/16099254755799/450x330.jpg",
  },
  {
    year: 2017,
    text: "Բանկը վերանվանվել է Evocabank-ի՝ փոխելով իր ռազմավարությունը և բիզնես մոդելը՝ անցնելով mobile-first ֆորմատի: Անդամակցել է VISA վճարային համակարգին: Ներկայացրել է SingleTOUCH օնլայն վարկատեսակը:",
    image: "https://www.evoca.am/images-cache/histories/1/16099254320292/450x330.jpg",
  },
  {
    year: 2016,
    text: "Բանկի նորմատիվային ընդհանուր կապիտալը գերազանցել է ԿԲ սահմանած 30 մլրդ. ՀՀ դրամ նվազագույն պահանջը: Բանկը փոխեց իր կազմակերպաիրավական ձևը՝ վերակազմավորվելով ՍՊԸ-ից ՓԲԸ-ի:",
    image: "https://www.evoca.am/images-cache/histories/1/16099253889356/450x330.jpg",
  },
  {
    year: 2015,
    text: "Ներդրվել է Prometey Mobile բջջային հավելվածը և իրականացվել է հավելվածի՝ Իվետա Մուկուչյանի մասնակցությամբ գովազդային արշավը, որի շրջանակներում թողարկվել է հատուկ բրենդավորված քարտ: Գործարկվել է Prometey Token անվտանգության բջջային հավելվածն App Store-ում և Play Store-ում:",
    image: "https://www.evoca.am/images-cache/histories/1/16099253491717/450x330.jpg",
  },
  {
    year: 2012,
    text: "Միացել է \"UNIStream\" դրամական փոխանցումների համակարգին: \"Global Finance\" ամսագիրը, երկրորդ տարին անդընդմեջ, Բանկին ճանաչել է որպես աշխարհի լավագույն ենթապահառու բանկերից մեկը և 2012թ. «Լավագույն ենթապահառու բանկը» Հայաստանում:",
    image: "https://www.evoca.am/images-cache/histories/1/1609925307811/450x330.jpg",
  },
  {
    year: 2008,
    text: "Առաջին անգամ Հայաստանում՝ Բանկը թողարկել և Շվեյցարական առաջատար բանկերից մեկին է վաճառել սեփական ոչ փաստաթղթային առանց ապահովվածության պարտատոմսեր:",
    image: "https://www.evoca.am/images-cache/histories/1/16099252548716/450x330.jpg",
  },
  {
    year: 2006,
    text: "Ստացել է «MasterCard Europe» վճարային համակարգի աֆիլիատ անդամի կարգավիճակ: Սկսել է թողարկել «Maestro», «MasterCard Standard», «MasterCard Gold», «MasterCard Business» տիպի պլաստիկ քարտեր:",
    image: "https://www.evoca.am/images-cache/histories/1/16099251674213/450x330.jpg",
  },
  {
    year: 2005,
    text: "Դարձել է «Արմենիան Քարդ» ՓԲԸ բաժնետեր և «ԱրՔա» վճարային համակարգի լիիրավ անդամ:",
    image: "https://www.evoca.am/images-cache/histories/1/1609925107995/450x330.jpg",
  },
  {
    year: 2000,
    text: "Անդամակցել է S.W.I.F.T. միջազգային փոխանցումների համակարգին:",
    image: "https://www.evoca.am/images-cache/histories/1/16099250658162/450x330.jpg",
  },
  {
    year: 1993,
    text: "Լիցենզավորվել է ՀՀ Կենտրոնական բանկի կողմից՝ թիվ 27 ընդհանուր արտոնագրով:",
    image: "https://www.evoca.am/images-cache/histories/1/16099250213165/450x330.jpg",
  },
  {
    year: 1990,
    text: "Բանկը հիմնադրվել է 1990թ. և մինչև 2017թ. գործել է Պրոմեթևս և Պրոմեթեյ Բանկ անուններով:",
    image: "https://www.evoca.am/images-cache/histories/1/16099221719641/450x330.jpg",
  },
];

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

      <HistorySlider data={historyData} />
            <section className="w-full py-12 max-[400px]:py-8">
  <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
    <h1 className="text-3xl font-bold mb-10 max-[400px]:text-2xl max-[400px]:mb-6 max-[400px]:text-center">
      Արժեքներ և առաջնայնություններ
    </h1>

    <div className="grid grid-cols-3 gap-12 max-[400px]:grid-cols-1 max-[400px]:gap-8">
      {x.map((item, i) => (
        <HumanFirstComponent
          key={i}
          title={item.title}
          description={item.text}
        />
      ))}
    </div>
  </div>
</section>

      <Footer />
    </>
  );
}

export default About;