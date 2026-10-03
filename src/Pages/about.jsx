import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Navbar from '../Components/Menu.jsx';
import HistorySlider from '../Components/HystorySlider.jsx';
import HumanFirstComponent from '../Components/X1.jsx';

const csrItems = [
  "Նորագույն տեխնոլոգիաների զարգացում, նորարար նախաձեռնություններ, startup-եր,",
  "Երիտասարդության կրթական, գիտական և մշակութային նախաձեռնություններ,",
  "Հասարակական կարևոր նշանակություն ունեցող նախաձեռնություններ,",
  "Հասարակության առավել խոցելի խմբեր, մասնավորապես՝ ծնողազուրկ կամ հատուկ խնամքի տակ գտնվող երեխաներ։",
];

const LOGO_SRC = '/evoca-logo.png';     
const BRANDBOOK_URL = '#';            
const YOUTUBE_ID = 'YOUR_VIDEO_ID'; 
const brandColors = [
  { text: "Սպիտակը խորհրդանշում է նորը։", dot: "bg-white border border-gray-300" },
  { text: "Մոխրագույնը խորհրդանշում է նորագույն տեխնոլոգիաների կիրառումը։", dot: "bg-gray-500" },
  { text: "Մանուշակագույնը երիտասարդության, ստեղծարարության և նորարարության գույնն է։", dot: "bg-[#6400dc]" },
];

function About() {
  const [values, setValues] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const paragraphs = [
    "Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է, որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ կիրառմամբ:",
    "Մենք հատուկ ուշադրություն ենք դարձնում մոբայլ ծառայությունների զարգացմանը:",
    "Մենք աշխատում ենք mobile-first ֆորմատով՝ յուրաքանչյուր նոր ծառայություն նախագծելիս՝ նախևառաջ հաշվի ենք առնում դրա՝ հավելվածով օգտագործման հարմարավետությունը:",
    "Աշխարհը թվային է դառնում, և մենք պատրաստ ենք դրան:",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [valuesSnap, historySnap] = await Promise.all([
          getDocs(query(collection(db, 'values'), orderBy('order'))),
          getDocs(query(collection(db, 'history'), orderBy('year', 'desc'))),
        ]);

        setValues(valuesSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setHistory(historySnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Firebase error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      {history.length > 0 && <HistorySlider data={history} />}

      <section className="w-full py-12 max-[400px]:py-8">
        <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
          <h1 className="text-3xl font-bold mb-10 max-[400px]:text-2xl max-[400px]:mb-6 max-[400px]:text-center">
            Արժեքներ և առաջնայնություններ
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">Բեռնվում է...</p>
          ) : (
            <div className="grid grid-cols-3 gap-12 max-[400px]:grid-cols-1 max-[400px]:gap-8">
              {values.map((item) => (
                <HumanFirstComponent
                  key={item.id}
                  title={item.title}
                  description={item.text}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="w-full bg-gradient-to-b from-[#f2f2f2] to-[#f7f1fc] py-16 max-[400px]:py-10">
        <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
          <h2 className="text-3xl font-bold leading-snug max-w-xl mb-8 max-[400px]:text-xl max-[400px]:mb-5 max-[400px]:text-center">
            Կորպորատիվ սոցիալական պատասխանատվություն
          </h2>

          <p className="text-[16px] leading-relaxed text-gray-800 max-w-3xl mb-10 max-[400px]:text-[13px] max-[400px]:mb-6 max-[400px]:text-center">
            Բանկը շարունակաբար աջակցություն է ցուցաբերում հանրության տարբեր խմբերին և
            հասարակական նախաձեռնություններին հետևյալ ոլորտներում՝
          </p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 max-w-4xl max-[400px]:grid-cols-1 max-[400px]:gap-y-5">
            {csrItems.map((text, i) => (
              <div key={i} className="flex items-start gap-4 max-[400px]:gap-3">
                <span className="mt-3 h-[3px] w-10 shrink-0 bg-[#6400dc] max-[400px]:mt-2.5 max-[400px]:w-6" />
                <p className="text-[16px] leading-relaxed text-gray-800 max-[400px]:text-[13px]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 max-[400px]:py-8">
        <div className="max-w-3xl mx-auto px-6 max-[400px]:px-4">
          <h2 className="text-2xl font-bold mb-6 max-[400px]:text-lg max-[400px]:mb-4">
            Բանկի լոգոտիպը
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-800 mb-8 max-[400px]:text-[13px] max-[400px]:mb-5">
            Բանկի լոգոն կազմված է evolution՝ էվոլյուցիա բառի արմատից և նմանեցված է
            evoke՝ զարթեցնել բառին։ Բառի երկրորդ տառը՝ V-ն, պատկերված է կլորացված
            անկյուններով հավասարակողմ եռանկյան տեսքով և նմանեցված է դեպի աջ և վեր
            ուղղված սլաքի տեսքով՝ խորհրդանշելով Բանկի ձգտումը դեպի առաջընթաց։
          </p>
          <div className="flex justify-center mb-12 max-[400px]:mb-8">
            <img
              src="https://www.evoca.am/file_manager/icons/logo.png"
              alt="Evocabank logo"
              className="w-full max-w-[600px] h-auto object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold mb-6 max-[400px]:text-lg max-[400px]:mb-4">
            Բանկի բրենդբուքը
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-800 mb-6 max-[400px]:text-[13px] max-[400px]:mb-4">
            Բրենդբուքում կգտնեք Բանկի լոգոյի կիրառման կանոնները, բրենդային գույները,
            տառատեսակները և բրենդի այլ կարևոր տարրերը։
            <br />
            Սա պարզապես ուղեցույց չէ, այլ ոգեշնչման աղբյուր՝ ուժեղ և ճանաչելի բրենդ
            կառուցելու համար։
          </p>
          <a
            href={BRANDBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="relative flex flex-col items-center justify-center w-full h-[130px] mb-12
                       bg-gradient-to-r from-black via-[#2a0a55] to-[#6400dc] overflow-hidden
                       max-[400px]:h-[80px] max-[400px]:mb-8"
          >
            <span className="text-white font-extrabold tracking-wide text-5xl max-[400px]:text-2xl">
              BRANDBOOK
            </span>
            <span
              className="mt-2 px-4 py-1 rounded-full bg-white/20 text-white text-xs backdrop-blur
                         max-[400px]:mt-1 max-[400px]:px-3 max-[400px]:text-[10px]"
            >
              Click Here
            </span>
          </a>

          <h2 className="text-2xl font-bold mb-6 max-[400px]:text-lg max-[400px]:mb-4">
            Բանկի կորպորատիվ գույները
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-800 mb-6 max-[400px]:text-[13px] max-[400px]:mb-4">
            Բանկի կորպորատիվ գույներն են՝ սպիտակը, մոխրագույնը և մանուշակագույնը։
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6 mb-6 max-[400px]:p-4 max-[400px]:gap-4">
            {brandColors.map((c, i) => (
              <div key={i} className="flex items-center gap-4 max-[400px]:gap-3">
                <span className={`h-6 w-6 shrink-0 rounded-full ${c.dot} max-[400px]:h-5 max-[400px]:w-5`} />
                <p className="text-[13px] text-gray-800 max-[400px]:text-[12px]">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="w-full aspect-video mb-12 max-[400px]:mb-8">
           
            <iframe className='w-full h-full' src="https://www.youtube.com/embed/QTuqGz3USRE?si=JfAzlEFrhsnW4oTn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <h2 className="text-2xl font-bold mb-6 max-[400px]:text-lg max-[400px]:mb-4">
            ISO27001:2026 միջազգային հավաստագիր
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-800 mb-6 max-[400px]:text-[13px] max-[400px]:mb-4">
            Evocabank-ը ստացել է ISO27001:2026 միջազգային հավաստագիր։
          </p>
          <p className="text-[15px] leading-relaxed text-gray-800 max-w-2xl max-[400px]:text-[13px]">
            Հավաստագիրը վկայում է Բանկում ֆինանսական պրոդուկտների և ծառայությունների,
            տվյալների բազաների, տեղեկատվության մշակման և պահպանման օբյեկտների,
            հաճախորդների և բանկային հիմնական գործարքների վերաբերյալ ֆինանսական
            տեղեկատվության անվտանգ կառավարման համակարգի առկայության մասին։
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 max-[400px]:px-4 max-[400px]:mt-8">
          <div className="border-t border-gray-200 pt-4 text-right text-xs text-gray-500 max-[400px]:text-[10px]">
            Թարմացվել է՝ 18/08/2026 10:20
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;