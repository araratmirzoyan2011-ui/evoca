import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';

import { db } from '../firebase';
import { collection, getDocs, orderBy, query, doc, getDoc, setDoc } from 'firebase/firestore';

const fetchCollection = async (name) => {
  const snap = await getDocs(query(collection(db, name), orderBy("order")));
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
};

const fetchSingleDoc = async (collName, docId) => {
  const docSnap = await getDoc(doc(db, collName, docId));
  return docSnap.exists() ? docSnap.data() : null;
};

const BulletList = ({ children }) => (
  <ul className="space-y-3 my-4">{children}</ul>
);

const Bullet = ({ children }) => (
  <li className="flex items-start gap-4 text-gray-800">
    <span className="mt-2 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
    <span>{children}</span>
  </li>
);

// Տվյալները թարմացվել են ըստ նկարի
const cardData = {
  title: "Հաշիվների բացում և սպասարկում",
  description: "Առաջարկում ենք բացել դրամային և արտարժութային ընթացիկ բանկային հաշիվներ, որոնց սպասարկումն իրականացնում ենք մեր սակագների համաձայն: Մեզ մոտ հաշիվներ կարող են բացել Հայաստանի ռեզիդենտ և ոչ ռեզիդենտ ֆիզիկական անձիք:",
  imageUrl: "https://www.evoca.am/files/images/savings.jpg", // Փոխարինեք համապատասխան նկարի հղումով, անհրաժեշտության դեպքում
  altText: "Հաշիվների բացում և սպասարկում"
};

const Savings = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [features, setFeatures] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [yieldPoints, setYieldPoints] = useState([]);
  const [accordionsData, setAccordionsData] = useState([]);
  const [accountsreport, setAccountsReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [f, b, y, a, r, m] = await Promise.all([
          fetchCollection("features"),
          fetchCollection("benefits"),
          fetchCollection("yieldPoints"),
          fetchCollection("accordionsData"),
          fetchCollection("accountsReport"),
          fetchCollection("menuItems"),
        ]);
        setFeatures(f);
        setBenefits(b);
        setYieldPoints(y);
        setAccordionsData(a);
        setAccountsReport(r);
        setMenuItems(m);
      } catch (err) {
        console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
            />
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        {loading && (
          <p className="text-center text-gray-500 py-10">Բեռնվում է...</p>
        )}

        {error && (
          <p className="text-center text-red-600 py-10">
            Չհաջողվեց բեռնել տվյալները։ Խնդրում ենք փորձել կրկին։
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
              <div className="hidden md:block">
                <div className="sticky top-24">
                  <SocialIcons />
                </div>
              </div>

              <div className="flex-1 max-w-4xl text-gray-800 leading-relaxed">
                <p>
                  Մեր և Ձեր պայմանագրային փոխհարաբերությունները կարգավորվում են ՀԱՄԱԼԻՐ ԲԱՆԿԱՅԻՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐԻ ՄԱՏՈՒՑՄԱՆ ՊԱՅՄԱՆՆԵՐՈՎ, որը հրապարակային առաջարկ (օֆերտա) է և Ձեր կողմից համարվում է ընդունված այն պահից, երբ առձեռն կամ հեռակառավարման համակարգերի միջոցով մեզ եք ներկայացնում պատշաճ լրացված և վավերացված բանկային ծառայություններից օգտվելու հայտ/դիմում: Համալիր բանկային ծառայությունների մատուցման պայմաններին կարող եք ծանոթանալ{" "}
                  <a
                    href="https://www.evoca.am/files/global_files/1/provision-terms-for-general-banking-services-arm.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-purple-800 underline"
                  >
                    այստեղ
                  </a>:
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10">
              <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
                <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                  ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
                </h2>
                <div className="max-w-4xl space-y-4">
                  {accordionsData.map((item) => (
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
                    {accountsreport.map((r) => (
                      <DocumentCard key={r.docId} title={r.title} url={r.url} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Savings;