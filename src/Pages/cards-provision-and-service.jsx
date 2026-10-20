import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const fetchCollection = async (name) => {
  const snap = await getDocs(collection(db, name));
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
};

const CPAS = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [accordionsData, setAccordionsData] = useState([]);
  const [accountsReport, setAccountsReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [m, a, r] = await Promise.all([
          fetchCollection("Cardmenu"), // Navbar-ի տվյալները Cardmenu-ից
          fetchCollection("accordionsData"),
          fetchCollection("accountsReport"),
        ]);
        setMenuItems(m);
        setAccordionsData(a);
        setAccountsReport(r);
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
                    {accountsReport.map((r) => (
                      <DocumentCard key={r.docId || r.order} title={r.title} url={r.url} />
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

export default CPAS;