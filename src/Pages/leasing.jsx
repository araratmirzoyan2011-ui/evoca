import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import Navbar from "../Components/Menuall.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import LeasingAccordion from "../Components/LeasingAccordion.jsx";
import { db } from "../firebase";
import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";

const Leasing = () => {
  const [LeasingAccordionsData, setLeasingAccordionsData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [menuSeeding, setMenuSeeding] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const qAccordions = query(collection(db, "leasingAccordions"), orderBy("order"));
      const snapAccordions = await getDocs(qAccordions);
      setLeasingAccordionsData(snapAccordions.docs.map((d) => ({ docId: d.id, ...d.data() })));

      const snapMenu = await getDocs(collection(db, "Leazingmenu"));
      setMenuItems(snapMenu.docs.map((d) => d.data()));
    } catch (err) {
      console.error("Fetch error:", err);
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
        leasingAccordionsData.map((item) =>
          setDoc(doc(db, "leasingAccordions", `leasing-${item.order}`), item)
        )
      );
      await fetchData();
    } catch (err) {
      console.error("Leasing seed error:", err);
    } finally {
      setSeeding(false);
    }
  };

  const seedLeazingMenu = async () => {
    setMenuSeeding(true);
    const initialMenuItems = [
      { label: "Evoca Leasing", path: "/leasing" },
      { label: "Հատուկ առաջարկ", path: "/special-offer" },
    ];
    try {
      await Promise.all(
        initialMenuItems.map((item, index) =>
          setDoc(doc(db, "Leazingmenu", `menu-item-${index + 1}`), item)
        )
      );
      await fetchData();
      alert("Leazingmenu հավաքածուն հաջողությամբ ստեղծվեց և բեռնվեց։");
    } catch (err) {
      console.error("Leazingmenu seed error:", err);
      alert("Սխալ տեղի ունեցավ մենյուն ավելացնելիս։");
    } finally {
      setMenuSeeding(false);
    }
  };

  return (
    <>
      <Header />
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
              <h1 className="text-2xl font-bold text-gray-800 mb-8">Evoca Leasing</h1>
              

              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
              </h2>

              {loading ? (
                <p className="text-gray-500">Բեռնվում է...</p>
              ) : LeasingAccordionsData.length === 0 ? (
                <button
                  onClick={seedData}
                  disabled={seeding}
                  className="rounded-lg bg-[#6a0dde] px-5 py-2 text-white disabled:opacity-60"
                >
                  {seeding ? "Ավելացվում է..." : "Seed Firestore"}
                </button>
              ) : (
                <div className="space-y-4">
                  {LeasingAccordionsData.map((item) => (
                    <LeasingAccordion
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

export default Leasing;