import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

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
  const [reports, setReports] = useState([]);
  const [accordions, setAccordions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const snap = await getDocs(collection(db, "OnlineInfo"));
        setBlocks(
          snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
        );

        const reportsSnap = await getDocs(collection(db, "OnlineReports"));
        setReports(reportsSnap.docs.map((d) => ({ docId: d.id, ...d.data() })));

        const accordionsSnap = await getDocs(collection(db, "OnlineAccordions"));
        setAccordions(accordionsSnap.docs.map((d) => ({ docId: d.id, ...d.data() })));

      } catch (error) {
        console.error("Սխալ տվյալները ներմուծելիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
              ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
            </h2>
            <div className="max-w-4xl space-y-4">
              {accordions.map((item) => (
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
                {reports.map((r) => (
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