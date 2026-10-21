import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import Navbar from "../Components/Menuall.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import LeasingAccordion from "../Components/LeasingAccordion.jsx";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const SpecialOfferAccordionsData = [
  {
    order: 1,
    title: "Լոջիք Գրուպ ՍՊԸ",
    blocks: [
      {
        type: "text",
        text: "Արտադրողականության խթանման նպատակային ծրագրից չօգտվող հաճախորդների համար Evocabank-ը ներկայացնում է նոր առաջարկ, ըստ որի կտրամադրվեն լիզինգներ հետևյալ պայմաններով՝",
      },
      {
        type: "table",
        headers: ["AMD", "USD", "EUR", "ժամկետ ամիս"],
        cells: [
          ["5.0%", "0.0%", "0.0%", "12"],
          ["8.5%", "5.0%", "4.0%", "24"],
          ["10.0%", "6.0%", "5.0%", "36"],
          ["10.75%", "7.00%", "6.0%", "48"],
          ["11.50%", "7.50%", "7.0%", "60"],
        ],
      },
    ],
  },
  {
    order: 2,
    title: "Ավտո Գելլրի ՓԲԸ",
    blocks: [
      {
        type: "text",
        text: "Արտադրողականության խթանման նպատակային ծրագրի շրջանակում՝ Evocabank-ը և իր գործընկեր «Ավտո Գելլրի» ՓԲԸ-ն համատեղ ներկայացնում են նոր առաջարկ, ըստ որի կտրամադրվեն լիզինգներ՝",
      },
      {
        type: "list",
        items: [
          "0.1% տարեկան տոկոսադրույքով",
          "մինչև 36 ամիս մարման ժամկետով",
          "5% կանխավճարով",
        ],
      },
      { type: "text", text: "Առաջարկը գործում է միայն բեռնատար ավտոմեքենաների համար։" },
      {
        type: "text",
        text: "Շտապիր օգտվել այս բացառիկ առաջարկից և ձեռք բերել ամենահարմար ու մատչելի պայմաններով լիզինգը հենց այսօր։",
      },
    ],
  },
];

const SpecialOffer = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
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
                  {SpecialOfferAccordionsData.map((item, index) => (
                    <LeasingAccordion
                      key={item.order || index}
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