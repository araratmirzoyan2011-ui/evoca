import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import { EvocaNewsCard } from "../Components/EVocaCard1.jsx";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

const TerminalTariff = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [salaryitems, setSalaryitems] = useState([]);
  const [pageHeaderData, setPageHeaderData] = useState(null);
  const [paymentSystems, setPaymentSystems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const menuSnapshot = await getDocs(collection(db, "munuItems2"));
        const menuList = menuSnapshot.docs.map(doc => doc.data());
        menuList.sort((a, b) => a.order - b.order);
        setMenuItems(menuList);

        const newsSnapshot = await getDocs(collection(db, "salaryNewsCollection"));
        const newsDocs = newsSnapshot.docs.map(doc => doc.data());
        if (newsDocs.length > 0 && newsDocs[0].items) {
          setSalaryitems(newsDocs[0].items);
        }

        const headerSnapshot = await getDocs(collection(db, "pageHeaderData"));
        if (!headerSnapshot.empty) {
          setPageHeaderData(headerSnapshot.docs[0].data());
        }

        const systemsSnapshot = await getDocs(collection(db, "paymentSystems"));
        const systemsList = systemsSnapshot.docs.map(doc => doc.data());
        setPaymentSystems(systemsList);

      } catch (error) {
        console.error("Սխալ Firebase-ից տվյալներ կարդալիս:", error);
      } finally {
        setPageLoading(false);
      }
    };
    
    fetchDataFromFirebase();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50 text-purple-700 font-semibold text-lg">
        Բեռնվում է Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />

      <section className="w-full bg-white py-8 px-2 xs:px-4 md:px-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          <div className="hidden md:block shrink-0">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 w-full min-w-0 max-w-4xl text-gray-800 space-y-8 text-sm xs:text-base leading-relaxed break-words">
            
            {pageHeaderData && (
              <div className="space-y-4">
                <h1 className="text-2xl xs:text-3xl font-bold text-gray-900">
                  {pageHeaderData.title}
                </h1>
                {pageHeaderData.introParagraphs?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {paymentSystems.map((system) => (
              <div key={system.id} className="pt-6 border-t border-gray-100 space-y-4">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900">
                  {system.title}
                </h2>

                {system.logoUrl && (
                  <div className="w-32 xs:w-40 py-2">
                    <img
                      src={system.logoUrl}
                      alt={system.title}
                      className="w-full h-auto object-contain rounded-md"
                    />
                  </div>
                )}

                {system.id === "telcell" && (
                  <>
                    <p>{system.descriptions[0]}</p>
                    <p>
                      Telcell համակարգը հասանելի է ինչպես Հայաստանի Հանրապետության տարածքում, այնպես էլ Արցախի Հանրապետությունում։ Տերմինալների ցանկին և հասցեներին կարող եք ծանոթանալ{" "}
                      <Link to="#" className="text-purple-700 underline font-medium">այստեղ</Link>։
                    </p>
                    <p>{system.descriptions[2]}</p>
                  </>
                )}

                {system.id === "upay" && (
                  system.descriptions?.map((desc, idx) => <p key={idx}>{desc}</p>)
                )}

                {system.id === "mobidram" && (
                  <>
                    <p>
                      Տերմինալների ցանկին և հասցեներին կարող եք ծանոթանալ{" "}
                      <Link to="#" className="text-purple-700 underline font-medium">այստեղ</Link>։
                    </p>
                    <p>{system.descriptions[1]}</p>
                  </>
                )}

                {system.id === "idram" && (
                  system.descriptions?.map((desc, idx) => <p key={idx}>{desc}</p>)
                )}

                {system.id === "easypay" && (
                  <>
                    <p>
                      2,000-ից ավել վճարային տերմինալ, որոնց ցանկին և հասցեներին կարող եք ծանոթանալ{" "}
                      <Link to="#" className="text-purple-700 underline font-medium">այստեղ</Link>։
                    </p>
                    <p>{system.descriptions[1]}</p>
                  </>
                )}

                {system.table && (
                  <div className="w-full overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                    <table className="w-full text-left border-collapse text-xs xs:text-sm min-w-[500px]">
                      <tbody>
                        {(system.id === "telcell" || system.id === "easypay") &&
                          system.table.rows?.map((row, rIdx) => (
                            <tr key={rIdx} className="border-b last:border-b-0 hover:bg-gray-50">
                              <td className="p-3 font-medium bg-gray-50/50 w-1/3 border-r">{row.service}</td>
                              <td className="p-3 text-gray-600 border-r">{row.condition}</td>
                              <td className="p-3 font-semibold text-gray-900 w-1/4">{row.fee}</td>
                            </tr>
                          ))}

                        {(system.id === "upay" || system.id === "mobidram" || system.id === "idram") &&
                          system.table.rows?.map((row, rIdx) => (
                            <React.Fragment key={rIdx}>
                              {row.conditions?.map((cond, cIdx) => (
                                <tr key={cIdx} className="border-b last:border-b-0 hover:bg-gray-50">
                                  {cIdx === 0 && (
                                    <td
                                      rowSpan={row.conditions.length}
                                      className="p-3 font-medium bg-gray-50/50 w-1/3 border-r align-middle"
                                    >
                                      {row.service}
                                    </td>
                                  )}
                                  <td className="p-3 text-gray-600 border-r">{cond.text}</td>
                                  <td className="p-3 font-semibold text-gray-900 w-1/4">{cond.fee}</td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            ))}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default TerminalTariff;