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
  const [pageLoading, setPageLoading] = useState(true);
    const [salaryitems, setSalaryitems] = useState([]);

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
      } catch (error) {
        console.error("Սխալ Firebase-ից տվյալներ կարդալիս:", error);
      } finally {
        setPageLoading(false);
      }
    };
    
    fetchDataFromFirebase();
  }, []);

  // Էջի ընդհանուր տվյալներ
  const pageHeaderData = {
    title: "Սակագներ",
    introParagraphs: [
      "Տերմինալը փողոցում, ինչպես նաև առևտրի կետերում վճարումների համար նախատեսված սարք է։ Տերմինալների միջոցով Դուք նաև կարող եք կատարել բանկային ծառայություններ՝ առանց բանկ այցելելու՝ հեշտ և հարմար տարբերակով։",
      "Եթե Ձեր տարածքում չկա Evocabank-ի մասնաճյուղ, Դուք կարող եք կատարել Ձեր վճարումները հետևյալ տերմինալների միջոցով․"
    ]
  };

  // Վճարային համակարգերի տվյալների զանգված
  const paymentSystems = [
    {
      id: "telcell",
      title: "Telcell",
      logoUrl: "https://www.evoca.am/file_manager/telcell-evoca-logo.png", 
      descriptions: [
        "Telcell վճարային տերմինալների միջոցով Դուք կարող եք 24/7 ռեժիմով կատարել ընթացիկ և քարտային հաշիվների համալրում և վարկի մարումներ։",
        <span>
          Telcell համակարգը հասանելի է ինչպես Հայաստանի Հանրապետության տարածքում, այնպես էլ Արցախի Հանրապետությունում։ Տերմինալների ցանկին և հասցեներին կարող եք ծանոթանալ{" "}
          <Link to="#" className="text-purple-700 underline font-medium">այստեղ</Link>։
        </span>,
        "Evocabank-ի մասնաճյուղերում տեղադրված Telcell տերմինալներից օգտվելիս գործում է 0% միջնորդավճար։ Այլ վայրերում տեղադրված Telcell տերմինալով Evocabank-ի վճարում կատարելիս գործում են հետևյալ միջնորդավճարները՝"
      ],
      table: {
        rows: [
          { service: "Հաշվի համալրում", condition: "մինչև 100,000 դրամը ներառյալ", fee: "300 ՀՀ դրամ" },
          { service: "Քարտային հաշվի համալրում", condition: "մինչև 100,000 դրամը ներառյալ", fee: "300 ՀՀ դրամ" },
          { service: "Վարկի մարում", condition: "մինչև 100,000 դրամը ներառյալ", fee: "300 ՀՀ դրամ" }
        ]
      }
    },
    {
      id: "upay",
      title: "uPay",
      logoUrl: "https://www.evoca.am/file_manager/uPay-evoca.png", 
      descriptions: [
        "uPay -ի միջոցով վճարումներ կարող եք կատարել ինչպես uPay հավելվածով, այնպես էլ այցելելով Ucom սպասարկման կենտրոններ։",
        "uPay-ում վճարում կատարելիս գործում են հետևյալ միջնորդավճարները՝"
      ],
      table: {
        rows: [
          {
            service: "Վարկերի մարում և փոխանցում բանկային հաշիվներին",
            conditions: [
              { text: "մինչև 35,000 ՀՀ դրամի դեպքում", fee: "200 ՀՀ դրամ" },
              { text: "35,001-ից ավելի ՀՀ դրամի դեպքում", fee: "0.6%, բայց ոչ ավել 1200 ՀՀ դրամ" }
            ]
          }
        ]
      }
    },
    {
      id: "mobidram",
      title: "ՄոբիԴրամ",
      logoUrl: "https://www.evoca.am/file_manager/mobidram-evoca.jpg", 
      descriptions: [
        <span>
          Տերմինալների ցանկին և հասցեներին կարող եք ծանոթանալ{" "}
          <Link to="#" className="text-purple-700 underline font-medium">այստեղ</Link>։
        </span>,
        "ՄոբիԴրամի տերմինալներով Evocabank-ի վճարում կատարելիս գործում են հետևյալ միջնորդավճարները՝"
      ],
      table: {
        rows: [
          {
            service: "Վարկի մարում",
            conditions: [
              { text: "մինչև 50,000 դրամի դեպքում", fee: "200 ՀՀ դրամ" },
              { text: "50,001 - 100,000 դրամի դեպքում", fee: "300 ՀՀ դրամ" }
            ]
          },
          {
            service: "Բանկային հաշիվների/քարտերի համալրում",
            conditions: [
              { text: "մինչև 50,000 դրամի դեպքում", fee: "200 ՀՀ դրամ" },
              { text: "50,001 - 100,000 դրամի դեպքում", fee: "300 ՀՀ դրամ" }
            ]
          }
        ]
      }
    },
    {
      id: "idram",
      title: "iDram",
      logoUrl: "https://www.evoca.am/file_manager/idram-evoca.png",
      descriptions: [
        "iDram հավելվածով կարող եք կատարել գործարքներ հետևյալ միջնորդավճարներով՝"
      ],
      table: {
        rows: [
          {
            service: "Վարկի մարում",
            conditions: [
              { text: "մինչև 15,000 դրամի դեպքում", fee: "100 ՀՀ դրամ" },
              { text: "15,001 - 50,000 դրամի դեպքում", fee: "200 ՀՀ դրամ" },
              { text: "50,001 - 100,000 դրամի դեպքում", fee: "300 ՀՀ դրամ" }
            ]
          }
        ]
      }
    },
    {
      id: "easypay",
      title: "EasyPay",
      logoUrl: "https://www.evoca.am/file_manager/easypay-evoca.png", 
      descriptions: [
        <span>
          2,000-ից ավել վճարային տերմինալ, որոնց ցանկին և հասցեներին կարող եք ծանոթանալ{" "}
          <Link to="#" className="text-purple-700 underline font-medium">այստեղ</Link>։
        </span>,
        "Evocabank-ի մասնաճյուղերում տեղադրված EasyPay տերմինալներից օգտվելիս գործում է 0% միջնորդավճար։ Այլ վայրերում տեղադրված EasyPay տերմինալներով Evocabank-ի վճարում կատարելիս գործում են հետևյալ միջնորդավճարները՝"
      ],
      table: {
        rows: [
          { service: "Հաշվի համալրում", condition: "1,000 - 100,000 դրամի դեպքում", fee: "300 ՀՀ դրամ (առավելագույնը 1,200 ՀՀ դրամ)" },
          { service: "Քարտային հաշվի համալրում", condition: "1,000 - 100,000 դրամի դեպքում", fee: "300 ՀՀ դրամ (առավելագույնը 1,200 ՀՀ դրամ)" },
          { service: "Վարկի մարում", condition: "1,000 - 100,000 դրամի դեպքում", fee: "300 ՀՀ դրամ" }
        ]
      }
    }
  ];

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
          
          {/* Սոցիալական ցանցերի կոճակներ */}
          <div className="hidden md:block shrink-0">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          {/* Հիմնական բովանդակություն */}
          <div className="flex-1 w-full min-w-0 max-w-4xl text-gray-800 space-y-8 text-sm xs:text-base leading-relaxed break-words">
            
            {/* Վերնագիր և ներածություն */}
            <div className="space-y-4">
              <h1 className="text-2xl xs:text-3xl font-bold text-gray-900">
                {pageHeaderData.title}
              </h1>
              {pageHeaderData.introParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Վճարային համակարգերի բաժիններ */}
            {paymentSystems.map((system) => (
              <div key={system.id} className="pt-6 border-t border-gray-100 space-y-4">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900">
                  {system.title}
                </h2>

                {/* Լոգո */}
                <div className="w-32 xs:w-40 py-2">
                  <img
                    src={system.logoUrl}
                    alt={system.title}
                    className="w-full h-auto object-contain rounded-md"
                  />
                </div>

                {/* Նկարագրություններ */}
                {system.descriptions.map((desc, idx) => (
                  <p key={idx}>{desc}</p>
                ))}

                {/* Աղյուսակներ */}
                <div className="w-full overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse text-xs xs:text-sm min-w-[500px]">
                    <tbody>
                      {/* Telcell & EasyPay Աղյուսակների ձևաչափ */}
                      {(system.id === "telcell" || system.id === "easypay") &&
                        system.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b last:border-b-0 hover:bg-gray-50">
                            <td className="p-3 font-medium bg-gray-50/50 w-1/3 border-r">{row.service}</td>
                            <td className="p-3 text-gray-600 border-r">{row.condition}</td>
                            <td className="p-3 font-semibold text-gray-900 w-1/4">{row.fee}</td>
                          </tr>
                        ))}

                      {/* uPay, MobiDram, iDram Աղյուսակների ձևաչափ */}
                      {(system.id === "upay" || system.id === "mobidram" || system.id === "idram") &&
                        system.table.rows.map((row, rIdx) => (
                          <React.Fragment key={rIdx}>
                            {row.conditions.map((cond, cIdx) => (
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
                              <EvocaNewsCard key={item.id} item={item} />
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