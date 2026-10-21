import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import BusinessHeader from "../Components/Busines-Header.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import { EvocaNewsCard } from "../Components/EVocaCard1.jsx";

const Credit = () => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [salaryitems, setSalaryitems] = useState([]);
  const [creditData, setCreditData] = useState(null);

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

        const newsSnapshot = await getDocs(collection(db, "salaryNewsCollection"));
        const newsDocs = newsSnapshot.docs.map((doc) => doc.data());
        if (newsDocs.length > 0 && newsDocs[0].items) {
          setSalaryitems(newsDocs[0].items);
        }

        const creditDocRef = doc(db, "creditTariffs", "tariffsDoc");
        const creditDocSnap = await getDoc(creditDocRef);
        if (creditDocSnap.exists()) {
          setCreditData(creditDocSnap.data());
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
            
            <h1 className="text-3xl font-bold text-gray-900">Ակրեդիտիվ</h1>

            {creditData?.description && (
              <div className="space-y-4 text-gray-700">
                {creditData.description.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {creditData?.conditions && (
              <div className="space-y-4">
                {creditData.conditionsTitle && (
                  <h2 className="text-xl font-bold text-gray-900">{creditData.conditionsTitle}</h2>
                )}
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {creditData.conditions.map((cond, idx) => (
                    <li key={idx}>{cond}</li>
                  ))}
                </ul>
                {creditData.contactInfo && (
                  <p className="text-gray-700 pt-2">{creditData.contactInfo}</p>
                )}
              </div>
            )}

            {creditData?.items && creditData.items.length > 0 && (
              <div className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-900">Սակագներ</h2>
                
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 font-semibold text-gray-900">Ակրեդիտիվի`</th>
                        <th className="p-3 font-semibold text-gray-900"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {creditData.items.map((tariff, index) => (
                        <tr key={index}>
                          <td className="p-3 text-gray-700">{tariff.title}</td>
                          <td className="p-3 text-gray-900 font-medium">{tariff.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {creditData.note && (
                  <p className="text-xs text-gray-500 italic pt-1">
                    <span className="font-bold not-italic text-gray-700">Նշում</span> - {creditData.note}
                  </p>
                )}
              </div>
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

export default Credit;