import React, { useEffect, useState } from "react";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer";
import Navbar from "../Components/Menuall.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
import { EvocaReviewCard } from "../Components/EvocaReviewCard.jsx";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

const BUMA = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [mainConditions, setMainConditions] = useState([]);
  const [legalEntityDocuments, setLegalEntityDocuments] = useState([]);
  const [individualEntrepreneurDocuments, setIndividualEntrepreneurDocuments] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);

  const fetchMenuItemsFromFirebase = async () => {
    try {
      const menuSnap = await getDocs(collection(db, "baosMenuItems"));
      const menuList = menuSnap.docs.map((d) => ({ docId: d.id, ...d.data() }));
      menuList.sort((a, b) => a.docId.localeCompare(b.docId));
      setMenuItems(menuList);
    } catch (err) {
      console.error("Menu fetch error:", err);
    }
  };

  const fetchReviewsFromFirebase = async () => {
    try {
      const snap = await getDoc(doc(db, "reviewsCollection", "main"));
      if (snap.exists()) {
        setReviewsData(snap.data().reviews || []);
      }
    } catch (err) {
      console.error("Reviews fetch error:", err);
    }
  };

  const fetchBumaDataFromFirebase = async () => {
    try {
      const cardSnap = await getDoc(doc(db, "bumaCardData", "card-info"));
      if (cardSnap.exists()) {
        setCardData(cardSnap.data());
      }

      const condSnap = await getDocs(query(collection(db, "bumaMainConditions"), orderBy("order")));
      const condList = condSnap.docs.map((d) => d.data().content);
      setMainConditions(condList);

      const legalSnap = await getDocs(query(collection(db, "bumaLegalEntityDocuments"), orderBy("order")));
      const legalList = legalSnap.docs.map((d) => d.data().text);
      setLegalEntityDocuments(legalList);

      const ieSnap = await getDocs(query(collection(db, "bumaIndividualEntrepreneurDocuments"), orderBy("order")));
      const ieList = ieSnap.docs.map((d) => d.data().text);
      setIndividualEntrepreneurDocuments(ieList);
    } catch (err) {
      console.error("BUMA data fetch error:", err);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchMenuItemsFromFirebase(),
        fetchReviewsFromFirebase(),
        fetchBumaDataFromFirebase(),
      ]);
      setLoading(false);
    };

    fetchAllData();
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

            <div className="flex-1 max-w-4xl text-gray-700 leading-relaxed">
              {loading ? (
                <p className="text-gray-500">Տվյալները բեռնվում են...</p>
              ) : (
                <>
                  {mainConditions.length > 0 && (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Հիմնական պայմաններ
                      </h2>
                      <ul className="list-disc pl-5 space-y-4 mb-8">
                        {mainConditions.map((cond, index) => (
                          <li key={index}>
                            {typeof cond === "string" ? (
                              cond
                            ) : (
                              <>
                                {cond.text}
                                {cond.sub && (
                                  <ul className="list-disc pl-5 mt-2 space-y-2">
                                    {cond.sub.map((subItem, subIndex) => (
                                      <li key={subIndex}>{subItem}</li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {legalEntityDocuments.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Իրավաբանական անձանց դեպքում՝
                      </h3>
                      <ul className="list-disc pl-5 space-y-4 mb-8">
                        {legalEntityDocuments.map((docItem, index) => (
                          <li key={index}>{docItem}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {individualEntrepreneurDocuments.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Անհատ ձեռնարկատերերի դեպքում՝
                      </h3>
                      <ul className="list-disc pl-5 space-y-4 mb-8">
                        {individualEntrepreneurDocuments.map((docItem, index) => (
                          <li key={index}>{docItem}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {reviewsData.length > 0 && (
        <div className="bg-[#fcfbfe] py-16 px-4 w-full overflow-hidden">
          <div className="w-full min-h-[220px] flex items-center justify-center">
            <EvocaReviewCard
              quote={reviewsData[reviewIndex].quote}
              author={reviewsData[reviewIndex].author}
              title={reviewsData[reviewIndex].title}
            />
          </div>

          <div className="flex justify-center items-center space-x-3 mt-8">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setReviewIndex(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  reviewIndex === index
                    ? "w-6 h-2.5 bg-purple-600"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default BUMA;