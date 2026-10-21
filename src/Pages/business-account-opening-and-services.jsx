import React, { useEffect, useState } from "react";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer";
import Navbar from "../Components/Menuall.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import InfoAccordion from "../Components/InfoAccordion.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { OnlineBanking } from "../Components/OnlineBanking.jsx";

const BAOAS = () => {
  const [accordions, setAccordions] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllDataFromFirebase = async () => {
    setLoading(true);
    try {
      const accSnap = await getDocs(query(collection(db, "baosAccordions"), orderBy("order")));
      const accList = accSnap.docs.map((d) => ({ docId: d.id, ...d.data() }));
      setAccordions(accList);

      const menuSnap = await getDocs(query(collection(db, "baosMenuItems"), orderBy("order")));
      const menuList = menuSnap.docs.map((d) => ({ docId: d.id, ...d.data() }));
      setMenuItems(menuList);

      const cardDocRef = doc(db, "baosCardData", "card-info");
      const cardSnap = await getDoc(cardDocRef);
      if (cardSnap.exists()) {
        setCardData(cardSnap.data());
      } else {
        setCardData(null);
      }
    } catch (err) {
      console.error("Firebase fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDataFromFirebase();
  }, []);

  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />
      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {cardData ? (
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
            />
          ) : (
            loading && <p className="text-gray-500">Բեռնվում է...</p>
          )}
        </div>
      </main>
      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 md:gap-24">
            <div className="hidden md:block shrink-0">
              <div className="sticky top-24">
                <SocialIcons />
              </div>
            </div>

            <div className="flex-1 max-w-4xl">
              <p className="text-gray-700 text-base mb-4 leading-relaxed">
                Հաշիվների սպասարկումն իրականացնում ենք մեր{" "}
                <a
                  href="/current-account-tariffs"
                  className="text-purple-700 underline hover:text-purple-900 font-medium"
                >
                  Ընթացիկ հաշիվների սպասարկման սակագներին համապատասխան
                </a>
                : Հաշիվներ բացելու համար կարող եք դիմել մեր Գլխամասային գրասենյակ և ցանկացած մասնաճյուղ:
              </p>

              <p className="text-gray-700 text-base mb-8 leading-relaxed">
                <span className="text-purple-700 font-semibold">Ուշադրություն.</span>{" "}
                <a
                  href="/business-unallocated-metal-accounts"
                  className="text-purple-700 underline hover:text-purple-900 font-medium"
                >
                  Առարկայազուրկ մետաղական հաշիվների
                </a>
                , Ավանդային և Քարտային հաշիվների սպասարկման պայմաններին կարող եք ծանոթանալ Առարկայազուրկ մետաղական հաշիվներ, Վճարային քարտեր ենթաբաժիններում և իրավաբանական անձանց բանկային ծառայությունների Ավանդներ բաժնում:
              </p>

              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
              </h2>

              {loading ? (
                <p className="text-gray-500">Բեռնվում է...</p>
              ) : accordions.length === 0 ? (
                <p className="text-gray-500">Տվյալներ չեն գտնվել:</p>
              ) : (
                <div className="space-y-4">
                  {accordions.map((item) => (
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
      <OnlineBanking />
      <Footer />
    </>
  );
};

export default BAOAS;