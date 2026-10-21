import React, { useEffect, useState } from "react";
import BusinessHeader from '../Components/Busines-Header.jsx';
import Footer from "../Components/Footer";
import Navbar from "../Components/Menuall.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import InfoAccordion from "../Components/InfoAccordion.jsx";
import { db } from "../firebase";
import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";

// Նախնական տվյալներ (Seed data) BAOAS-ի համար
const initialBaoasData = [
  {
    order: 1,
    title: "Հաշիվների բացում և սպասարկում",
    blocks: [
      {
        type: "text",
        text: "Բանկում հաշիվներ կարող են բացվել ինչպես ՀՀ դրամով, այնպես էլ արտարժույթով։",
      },
    ],
  },
];

const BAOAS = () => {
  const [baoasAccordionData, setBaoasAccordionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const menuItems = [
    { label: "Հաշիվների բացում և սպասարկում", path: "/business-account-opening-and-services" },
    { label: "Առարկայազուրկ մետաղական հաշիվներ", path: "/business-unallocated-metal-accounts" }
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "baoasAccordions"), orderBy("order"));
      const snap = await getDocs(q);
      setBaoasAccordionData(snap.docs.map((d) => ({ docId: d.id, ...d.data() })));
    } catch (err) {
      console.error("BAOAS fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const seedData = async () => {
    setSeeding(true);
    try {
      await Promise.all(
        initialBaoasData.map((item) =>
          setDoc(doc(db, "baoasAccordions", `baoas-${item.order}`), item)
        )
      );
      await fetchData();
    } catch (err) {
      console.error("BAOAS seed error:", err);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 md:gap-24">
            <div className="hidden md:block shrink-0">
              <div className="sticky top-24">
                <SocialIcons />
              </div>
            </div>

            <div className="flex-1 max-w-4xl">
              <h1 className="text-2xl font-bold text-gray-800 mb-8">Հաշիվների բացում և սպասարկում</h1>
              
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
              </h2>

              {loading ? (
                <p className="text-gray-500">Բեռնվում է...</p>
              ) : baoasAccordionData.length === 0 ? (
                <button
                  onClick={seedData}
                  disabled={seeding}
                  className="rounded-lg bg-[#6a0dde] px-5 py-2 text-white disabled:opacity-60"
                >
                  {seeding ? "Ավելացվում է..." : "Seed Firestore"}
                </button>
              ) : (
                <div className="max-w-4xl space-y-4">
                  {baoasAccordionData.map((item) => (
                    <InfoAccordion
                      key={item.docId}
                      title={item.title}
                      blocks={item.blocks}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BAOAS;