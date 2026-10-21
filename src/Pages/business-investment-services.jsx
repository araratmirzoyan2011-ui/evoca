import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import LeasingAccordion from "../Components/LeasingAccordion.jsx";
import { EvocaNewsCard } from "../Components/EVocaCard1.jsx";

const Garant = () => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [introTexts, setIntroTexts] = useState([]);
  const [guaranteeTypes, setGuaranteeTypes] = useState([]);
  const [advantages, setAdvantages] = useState([]);
  const [garantAccordionsData, setGarantAccordionsData] = useState([]);
  const [salaryitems, setSalaryitems] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnap = await getDocs(collection(db, "garantMenu"));
        if (!menuSnap.empty) {
          const menuData = menuSnap.docs.map((doc) => doc.data());
          menuData.sort((a, b) => (a.order || 0) - (b.order || 0));
          setMenuItems(menuData);
        }

        const introSnap = await getDocs(collection(db, "garantIntroTexts"));
        if (!introSnap.empty) {
          setIntroTexts(introSnap.docs.map((doc) => doc.data().text));
        }

        const typesSnap = await getDocs(collection(db, "garantTypes"));
        if (!typesSnap.empty) {
          setGuaranteeTypes(typesSnap.docs.map((doc) => doc.data()));
        }

        const advSnap = await getDocs(collection(db, "garantAdvantages"));
        if (!advSnap.empty) {
          setAdvantages(advSnap.docs.map((doc) => doc.data().text));
        }

        const accordionsSnap = await getDocs(collection(db, "garantAccordionsData"));
        if (!accordionsSnap.empty) {
          setGarantAccordionsData(
            accordionsSnap.docs.map((doc) => ({
              docId: doc.id,
              ...doc.data(),
            }))
          );
        }

        const newsSnapshot = await getDocs(collection(db, "salaryNewsCollection"));
        const newsDocs = newsSnapshot.docs.map((doc) => doc.data());
        if (newsDocs.length > 0 && newsDocs[0].items) {
          setSalaryitems(newsDocs[0].items);
        }

      } catch (error) {
        console.error("Firestore-ից տվյալների բեռնման սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-medium text-lg">
        Բեռնվում է տվյալները Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-8 text-base leading-relaxed">
            
            <h1 className="text-3xl font-bold text-gray-900">Երաշխիք</h1>

            {introTexts.length > 0 && (
              <div className="space-y-4 text-gray-700">
                {introTexts.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            )}

            {guaranteeTypes.length > 0 && (
              <div className="pt-4">
                <h2 className="text-xl font-bold text-purple-800 mb-6">
                  Բանկային երաշխիքների հիմնական տեսակները
                </h2>

                <div className="space-y-6">
                  {guaranteeTypes.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-700"></span>
                        {item.title}
                      </h3>

                      <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm space-y-2">
                        {item.subtitle && (
                          <p className="text-sm italic text-gray-500">{item.subtitle}</p>
                        )}
                        <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {advantages.length > 0 && (
              <div className="pt-6">
                <h2 className="text-xl font-bold text-purple-800 mb-4">
                  Բանկային երաշխիքների առավելությունները
                </h2>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  {advantages.map((adv, index) => (
                    <li key={index}>{adv}</li>
                  ))}
                </ul>
              </div>
            )}

            {garantAccordionsData.length > 0 && (
              <>
                <div className="pt-2">
                  <h2 className="text-xl font-bold text-purple-800 mb-2">
                    Բանկային երաշխիքի պայմաններ
                  </h2>
                </div>
                
                <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                  ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
                </h2>
                
                <div className="space-y-4">
                  {garantAccordionsData.map((item) => (
                    <LeasingAccordion
                      key={item.docId}
                      title={item.title}
                      blocks={item.blocks}
                    />
                  ))}
                </div>
              </>
            )}

            {salaryitems.length > 0 && (
              <div className="pt-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <Link to="/news" className="hover:opacity-80 transition-opacity">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight cursor-pointer">
                      Վերջին նորությունները
                    </h2>
                  </Link>
                  
                  <Link 
                    to="/news" 
                    className="flex items-center space-x-2 bg-purple-100/70 hover:bg-purple-200/80 text-purple-700 px-4 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 group cursor-pointer"
                  >
                    <span>Բոլոր նորությունները</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {salaryitems.map((item) => (
                    <EvocaNewsCard key={item.id || item.title} item={item} />
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Garant;