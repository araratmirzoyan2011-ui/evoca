import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, orderBy, query } from 'firebase/firestore';

const OnlineReports=[{title:"Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025թ."},{title:"SWIFT Transfers (20.03.2026)"},{title:"SWIFT переводы в РФ (20.03.2026)"}]
const OnlineAccordionsData = [
  {
    title: "Անվտանգությունը",
    blocks: [
      "Համակարգն առավել անվտանգ դարձնելու նպատակով մեր EvocaOnline համակարգի օգտատերերին առաջարկում ենք Vasco Token Digipass GO-6 սարք:",
      "Vasco Token Digipass GO-6 անվտանգության սարքը մեր սեփականությունն է, որը տրամադրում ենք ձեզ EvocaOnline համակարգ մուտք գործելու անվտանգության համապատասխան գաղտնանիշերի գեներացման համար:",
      "Տվյալների գաղտնագրման համար օգտագործվում է Secure Socket Layer (SSL) տեխնոլոգիան:",
    ],
  },
  {
    title: "Ակտիվացման կարգը",
    blocks: [
      "Հավելվածը մեր հաճախորդներին տրամադրում ենք «Միայն դիտելու» կամ «Դիտելու և գործարքներ կատարելու» հնարավորությամբ:",
      "Մեր և ձեր միջև բանկային ծառայությունների մատուցման որևէ պայմանագիր կնքելու դեպքում (հաշիվների բացում, վարկերի տրամադրում, ավանդների ներգրավում և այլն), հավելվածն ակտիվանում է ավտոմատ կերպով՝ «Միայն դիտելու» հնարավորությամբ: Համակարգեր մուտք գործելու տվյալները (Login, Password) առկա են ծառայությունների մատուցման պայմանագրերում: Պայմանագրերում առկա է նաև QR կոդի տեսքով հղում՝ հավելվածը App Store-ից կամ Play-Store-ից ներբեռնելու համար:",
      "Ցանկության դեպքում կարող եք ակտիվացնել հավելվածը՝ «Դիտելու և գործարքներ կատարելու» հնարավորությամբ:",
      "Եթե արդեն օգտվում եք մեր ծառայություններից, ապա կարող եք դիմել մեզ և ակտիվացնել հավելվածը՝ «Միայն դիտելու» կամ «Դիտելու և գործարքներ կատարելու» հնարավորությամբ:",
    ],
  },
];
const Dot = () => (
  <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#6a00d4]" />
);

const Dash = () => (
  <span className="mt-[13px] h-[2px] w-3 shrink-0 bg-[#6a00d4]" />
);

const renderItem = (item) => {
  if (typeof item === "string") return item;
  return (
    <>
      {item.text}
      <a href={item.linkUrl} className="text-[#6a00d4] hover:underline">
        {item.linkText}
      </a>
      :
    </>
  );
};

const Online = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const snap = await getDocs(collection(db, "OnlineInfo"));
      setBlocks(
        snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
      );
    } catch (error) {
      console.error("Սխալ տվյալները ներմուծելիս:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const seedData = async () => {
    for (const block of onlineBlocks) {
      const { id, ...data } = block;
      await setDoc(doc(db, "OnlineInfo", id), data);
    }
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Տվյալները բեռնվում են...</p>
      </div>
    );
  }

  const mainBlocks = blocks.filter((b) => b.variant === "main");
  const noticeBlock = blocks.find((b) => b.variant === "notice");

  return (
    <>
      <Header />

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-12">
          <div className="hidden md:block">
            <div className="sticky top-24 mt-20">
              <SocialIcons />
            </div>
          </div>

          <div className="max-w-4xl flex-1 text-[15px] leading-7 text-gray-900">
            <h1 className="mb-14 text-3xl font-medium text-gray-800">EvocaONLINE</h1>

            <h2 className="mb-5 text-[32px] font-medium leading-tight text-gray-800">
              Նկարագիրը և հնարավորությունները
            </h2>

            {blocks.length === 0 ? (
              <button
                onClick={seedData}
                className="rounded-lg bg-[#6a00d4] px-4 py-2 text-white"
              >
                Ավելացնել տվյալները Firestore-ում
              </button>
            ) : (
              <>
                <p className="mb-6">
                  EvocaOnline-ը բանկային հաշիվների հեռակառավարման ինտերնետ-բանկ համակարգ է, որի
                  միջոցով կարող եք հեռակառավարել ձեր բանկային հաշիվները: EvocaOnline-ից կարող եք
                  օգտվել մեր կայքի համապատասխան հղման միջոցով: Համակարգի միջոցով կարող եք՝
                </p>

                <ul className="space-y-6">
                  {mainBlocks.map((block) => (
                    <li key={block.id} className="flex gap-4 pl-4">
                      <Dot />
                      <div className="flex-1">
                        <p className="text-[#6a00d4]">{block.title}</p>
                        <ul className="mt-3 space-y-3 pl-3">
                          {block.items.map((item, i) => (
                            <li key={i} className="flex gap-3">
                              <Dash />
                              <span>{renderItem(item)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>

                {noticeBlock && (
                  <div className="mt-12">
                    <p className="mb-4 text-[#6a00d4]">{noticeBlock.title}</p>
                    <ul className="space-y-5 pl-2">
                      {noticeBlock.items.map((item, i) => (
                        <li key={i} className="flex gap-4">
                          <Dot />
                          <span>{renderItem(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
              ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
            </h2>
            <div className="max-w-4xl space-y-4">
              {OnlineAccordionsData.map((item) => (
                <InfoAccordion
                  key={item.docId}
                  title={item.title}
                  blocks={item.blocks}
                />
              ))}
            </div>

            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {OnlineReports.map((r) => (
                  <DocumentCard key={r.docId} title={r.title} url={r.url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <OnlineBanking />
      <Footer />
    </>
  );
};

export default Online;

