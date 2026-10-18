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

const Accounts = () => {
  const [cardData, setCardData] = useState(null);
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
        const [f, b, y, a, r, m, c] = await Promise.all([
          fetchCollection("features"),
          fetchCollection("benefits"),
          fetchCollection("yieldPoints"),
          fetchCollection("accordionsData"),
          fetchCollection("accountsReport"),
          fetchCollection("menuItems"),
          fetchSingleDoc("cardData", "mainCard"),
        ]);
        setFeatures(f);
        setBenefits(b);
        setYieldPoints(y);
        setAccordionsData(a);
        setAccountsReport(r);
        setMenuItems(m);
        setCardData(c);
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
          {loading ? (
            <p className="text-center text-gray-500 py-6">Բեռնվում է քարտը...</p>
          ) : cardData ? (
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
            />
          ) : null}
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
                  Գումարդ ավելանա՛մ, թէ՛ միշտ հասանելի մնա: Այլևս պետք չէ ընտրել:{" "}
                  <span className="font-bold text-purple-800">Evoca խնայողական հաշվի</span>{" "}
                  միջոցով կարող ես միաժամանակ և՛ խնայել, և՛ ավելացնել գումարդ, և՛ անհրաժեշտ պահին ունենալ դրա հասանելիությունը:
                </p>
                <p className="mt-2">
                  Պահիր գումարդ Evoca խնայողական հաշվին և ստացիր մինչև{" "}
                  <span className="font-bold text-purple-800">5.09% տարեկան տոկոսային եկամտաբերություն</span>:
                  Իսկ երբ գումարդ անհրաժեշտ լինի, պարզապես փոխանցիր այն Evocabank-ում գործող քո մեկ այլ հաշվին:
                </p>

                <h3 className="mt-10 font-bold text-purple-800">Ինչո՞ւ Evoca խնայողական հաշիվ</h3>

                {features.map((f) => (
                  <div key={f.docId} className="mt-8">
                    <h4 className="font-bold text-purple-800">{f.title}</h4>
                    <p>{f.text}</p>
                  </div>
                ))}

                <h3 className="mt-10 font-bold text-purple-800">
                  Ինչո՞ւ սկսել գումար կուտակել հենց այսօր:
                </h3>

                <p className="mt-8">Քանի որ</p>
                <BulletList>
                  {benefits.map((b) => (
                    <Bullet key={b.docId}>{b.text}</Bullet>
                  ))}
                </BulletList>

                <h3 className="mt-10 font-bold text-purple-800">
                  Ստացիր մինչև 5.09% տարեկան տոկոսային եկամտաբերություն
                </h3>
                <BulletList>
                  {yieldPoints.map((p) => (
                    <Bullet key={p.docId}>
                      {p.text}
                      {p.link && (
                        <a
                          href={p.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-purple-800 underline"
                        >
                          {p.link.label}
                        </a>
                      )}
                      {p.after}
                    </Bullet>
                  ))}
                </BulletList>

                <p className="mt-10">
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

export default Accounts;