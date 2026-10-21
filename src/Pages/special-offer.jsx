import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import Navbar from "../Components/Menuall.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import LeasingAccordion from "../Components/LeasingAccordion.jsx";
import { db } from "../firebase";
import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
const SpecialOffer = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [accordions, setAccordions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const snapMenu = await getDocs(collection(db, "Leazingmenu"));
      setMenuItems(snapMenu.docs.map((d) => d.data()));

      const snapAcc = await getDocs(
        query(collection(db, "specialOfferAccordions"), orderBy("order"))
      );
      setAccordions(snapAcc.docs.map((d) => ({ docId: d.id, ...d.data() })));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const seedSpecialOffers = async () => {
    setSeeding(true);
    try {
      await Promise.all(
        SpecialOfferAccordionsData.map((item) =>
          setDoc(doc(db, "specialOfferAccordions", `special-${item.order}`), item)
        )
      );
      alert("specialOfferAccordions հավաքածուն հաջողությամբ ստեղծվեց և լցվեց տվյալներով։");
      await fetchData();
    } catch (err) {
      console.error("Special offers seed error:", err);
      alert("Սխալ տեղի ունեցավ տվյալները պահպանելիս։");
    } finally {
      setSeeding(false);
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
              <h1 className="text-2xl font-bold text-gray-800 mb-8">Հատուկ առաջարկ</h1>


              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
              </h2>

              {loading ? (
                <p className="text-gray-500">Բեռնվում է...</p>
              ) : (
                <div className="space-y-4">
                  {accordions.map((item) => (
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

export default SpecialOffer;