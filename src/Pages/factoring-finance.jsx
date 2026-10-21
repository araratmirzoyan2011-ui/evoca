import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BusinessHeader from "../Components/Busines-Header.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import { EvocaNewsCard } from "../Components/EVocaCard1.jsx";

const Finance = () => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [introTexts, setIntroTexts] = useState([]);
  const [factoringTable, setFactoringTable] = useState([]);
  const [financeReport, setFinanceReport] = useState([]);
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

        const introSnap = await getDocs(collection(db, "factoringIntroTexts"));
        if (!introSnap.empty) {
          const introDocs = introSnap.docs.map((doc) => doc.data().text);
          setIntroTexts(introDocs);
        }

        const tableSnap = await getDocs(collection(db, "factoringTableData"));
        if (!tableSnap.empty) {
          const tableData = tableSnap.docs.map((doc) => doc.data());
          tableData.sort((a, b) => (a.id || 0) - (b.id || 0));
          setFactoringTable(tableData);
        }

        const reportSnap = await getDocs(collection(db, "factoringReports"));
        if (!reportSnap.empty) {
          const reportData = reportSnap.docs.map((doc) => doc.data());
          reportData.sort((a, b) => (a.id || 0) - (b.id || 0));
          setFinanceReport(reportData);
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
            
            <h1 className="text-3xl font-bold text-gray-900">Ֆակտորինգային ֆինանսավորում</h1>

            {introTexts.length > 0 && (
              <div className="space-y-4 text-gray-700">
                {introTexts.map((text, index) => (
                  <p key={index}>
                    {text.includes("Evocabank") ? (
                      text.split("Evocabank").map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="text-purple-700 font-semibold">Evocabank</span>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      text
                    )}
                  </p>
                ))}
              </div>
            )}

            {factoringTable.length > 0 && (
              <div className="pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Պայմաններ և սակագներ`
                </h2>

                <div className="overflow-x-auto border border-purple-100 rounded-xl shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {factoringTable.map((row) => (
                        <tr key={row.id || row.label} className="border-b border-purple-100 last:border-none hover:bg-gray-50/50 transition-colors">
                          <td className="w-12 p-4 text-center text-gray-500 font-medium align-top border-r border-purple-100">
                            {row.id}.
                          </td>
                          <td className="w-1/3 p-4 font-semibold text-gray-800 align-top border-r border-purple-100">
                            {row.label}
                          </td>
                          <td className="p-4 text-gray-700 align-top">
                            {Array.isArray(row.value) ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {row.value.map((item, idx) => (
                                  <div key={idx} className="flex justify-between p-2 bg-purple-50/50 rounded-lg border border-purple-100">
                                    <span className="font-medium text-purple-900">{item.currency}</span>
                                    <span className="text-gray-700">{item.rate}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="whitespace-pre-line">{row.value}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {financeReport.length > 0 && (
              <div className="pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Փաստաթղթեր
                </h2>
                <div className="space-y-5">
                  {financeReport.map((r, index) => (
                    <DocumentCard key={r.docId || r.id || index} title={r.title} url={r.url} />
                  ))}
                </div>
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

export default Finance;