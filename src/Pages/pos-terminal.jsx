import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
import { OnlineBanking } from "../Components/OnlineBanking.jsx";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

const Pos = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const menuSnapshot = await getDocs(collection(db, "munuItems2"));
        const menuList = menuSnapshot.docs.map(doc => doc.data());
        menuList.sort((a, b) => a.order - b.order);
        setMenuItems(menuList);
      } catch (error) {
        console.error("Սխալ Firebase-ից տվյալներ կարդալիս:", error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  const PosCardData = {
    title: "POS Տերմինալ",
    description: "POS-ը (point of sale) վճարային համակարգ է, որն օգտագործվում է անկանխիկ վճարումներ ընդունելու համար։ Արագ և տեղում վճարումներ կատարելն այսօր կարևոր նախապայման է Ձեր գնորդների համար։",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/16158085302978/780x585.jpg",
    altText: "POS Տերմինալ"
  };

  // Ներածական տեքստեր
  const introParagraphs = [
    <span>
      Ձեր գնորդները կկարողանան գնումներ կատարել իրենց միջազգային VISA, Mastercard և տեղական ArCa{" "}
      <Link to="#" className="text-purple-700 underline">վճարային քարտերով</Link>[cite: 7]:
    </span>,
    "POS-ը հասանելի կլինի ինչպես Ձեր կայքում, այնպես էլ մոբայլ հավելվածում[cite: 7]:"
  ];

  // Առավելություններ
  const benefits = [
    <span>
      Evocabank-ը POS-ով կատարված վաճառքներից կգանձի <span className="font-semibold">նվազագույն միջնորդավճարներ</span>՝ հատուկ Ձեր բիզնեսի համար[cite: 7],
    </span>,
    <span>
      Սպասարկման կետի գրանցման համար անհրաժեշտ POS, ՀՌՄ-POS, mPOS, VENDISTA տերմինալների տեղադրման{" "}
      <Link to="#" className="text-purple-700 underline">ստանդարտ սակագներ ու պայմաններ</Link>[cite: 7]:
    </span>
  ];

  // Առաջին աղյուսակ (Ստանդարտ սակագներ)
  const tariffTable1 = {
    conditionText: "Եթե վաճառակետի գործունեության տեսակը չի համընկնում ՀԲ կողմից ներկայացված տեսակի կոդին[cite: 7] կամ գերազանցում է տարեկան 150.000.000 ՀՀ դրամի իրացման շրջանառության շեմը[cite: 7]:",
    headers: [
      "Գործարքի տեսակ",
      "Արքա /ArCa/ վճարային համակարգի քարտերով կատարված գործարքների դեպքում[cite: 7]",
      "Արքա համակարգի ներքո թողարկված MasterCard, Visa, UPay քարտերի դեպքում[cite: 7]",
      "Ոչ Արքա համակարգի ներքո թողարկված MasterCard, Visa, UPay քարտերի դեպքում[cite: 7]",
      "QR կոդով վճարման դեպքում[cite: 7]"
    ],
    rows: [
      {
        type: "Վճարվող գումարի չափ[cite: 7]",
        values: ["1.5 %", "1.7 %", "3.0 %", "1 %"]
      },
      {
        type: "Յուրաքանչյուր տերմինալից գանձվող ամսական միջնորդավճարի նվազագույն չափ (ՀՀ դրամ)[cite: 7]",
        values: [
          "Բանկի կողմից տրամադրված POS տերմինալ: 10,000\nԲանկի կողմից տրամադրված ՀՌՄ-POS: 7,000\nՏնտեսվարողի ՀՌՄ-POS տերմինալ: 3,000",
          "", "", ""
        ]
      }
    ]
  };

  // Երկրորդ աղյուսակ (Անցումային շեմերով սակագներ)
  const tariffTable2 = {
    conditionText: "Եթե վաճառակետի գործունեության տեսակը համընկնում է ՀԲ կողմից ներկայացված տեսակի կոդին և չի գերազանցում տարեկան 150.000.000 ՀՀ դրամի իրացման շրջանառության շեմը[cite: 8]:",
    headers: [
      "Գործարքի տեսակ",
      "Արքա /ArCa/ վճարային համակարգի քարտերով կատարված գործարքների դեպքում[cite: 8]",
      "ՀՀ տարածքում գործող բանկերի կողմից թողարկված MasterCard, Visa քարտերի դեպքում առավելագույնը[cite: 8]",
      "ՀՀ տարածքում գործող բանկերի կողմից թողարկված UPay քարտերի դեպքում[cite: 8]",
      "Արտասահմանյան բանկերի կողմից թողարկված MasterCard, Visa, UPay քարտերի դեպքում[cite: 8]",
      "QR կոդով վճարման դեպքում[cite: 8]"
    ],
    rows: [
      {
        type: "Վճարվող գումարի չափ[cite: 8]",
        values: ["max 0.5 %", "max 0.9 %", "1.7 %", "3.0 %", "1 %"]
      },
      {
        type: "50.000 ՀՀ դրամ քարտային շրջանառության շեմը չգերազանցելու դեպքում յուրաքանչյուր տերմինալից գանձվող ամսական ընդհանուր միջնորդավճարների առավելագույն սահմանաչափ (ՀՀ դրամ)[cite: 8]",
        values: [
          "Ք.Երևան: 4,600\nՄարզային քաղաքներ: 3,000\nԳյուղեր: 1,000",
          "", "", "", ""
        ]
      }
    ]
  };

  // Հատկանիշներ
  const securityFeatures = [
    "Վճարման պարզ գործընթաց, Ձեր գնորդները վճարում կկատարեն 1 քայլով[cite: 9],",
    <span>
      <span className="text-purple-700 font-semibold">Անվճար տեխնիկական խորհրդատվություն և տեխնիկական սպասարկում</span>{" "}
      Բանկի մասնագետների կողմից[cite: 9],
    </span>,
    "Անհատական մոտեցում Ձեր բիզնեսին ու կայքին[cite: 9]:"
  ];

  // Քայլեր
  const steps = [
    <span>
      POS տերմինալ տեղադրելու համար <Link to="#" className="text-purple-700 underline font-bold">լրացրեք հայտը հենց հիմա</Link>[cite: 9]:
    </span>,
    "Մեր մասնագետը 1 աշխատանքային օրում կապ կհաստատի Ձեզ հետ, կներկայացնի պայմանները, կպատասխանի Ձեր բոլոր հարցերին և կպատրաստի գործընթացի համար անհրաժեշտ բոլոր փաստաթղթերը[cite: 9]։"
  ];

  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />

      <main className="w-full py-6 px-2 xs:px-4 md:px-12 bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {PosCardData && (
            <InfoCard
              title={PosCardData.title}
              description={PosCardData.description}
              imageUrl={PosCardData.imageUrl}
              altText={PosCardData.altText}
            />
          )}
        </div>
      </main>

      <section className="w-full bg-white py-8 px-2 xs:px-4 md:px-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          <div className="hidden md:block shrink-0">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 w-full min-w-0 max-w-4xl text-gray-800 space-y-6 text-sm xs:text-base leading-relaxed break-words">
            
            {introParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <h3 className="text-lg xs:text-xl font-bold text-gray-900 pt-4">
              Իսկ ինչո՞ւ տեղադրել Evocabank-ի POS տերմինալ
            </h3>

            <ul className="list-disc pl-4 xs:pl-5 space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>

            {/* Առաջին աղյուսակ */}
            <div className="space-y-2 pt-4">
              <p className="text-xs xs:text-sm font-medium text-purple-900 bg-purple-50 p-3 rounded-lg border border-purple-100">
                {tariffTable1.conditionText}
              </p>
              <div className="w-full overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full text-left border-collapse text-xs xs:text-sm min-w-[700px]">
                  <thead>
                    <tr className="bg-purple-50 text-gray-800 border-b border-gray-200">
                      {tariffTable1.headers.map((header, idx) => (
                        <th key={idx} className="p-2.5 xs:p-3 border-r last:border-r-0 font-semibold align-top">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tariffTable1.rows.map((row, idx) => (
                      <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                        <td className="p-2.5 xs:p-3 border-r font-medium bg-gray-50/50">{row.type}</td>
                        {idx === 0 ? (
                          row.values.map((val, vIdx) => (
                            <td key={vIdx} className="p-2.5 xs:p-3 border-r last:border-r-0 text-center font-semibold">
                              {val}
                            </td>
                          ))
                        ) : (
                          <td colSpan="4" className="p-2.5 xs:p-3 whitespace-pre-line">
                            {row.values[0]}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Երկրորդ աղյուսակ */}
            <div className="space-y-2 pt-6">
              <p className="text-xs xs:text-sm font-medium text-purple-900 bg-purple-50 p-3 rounded-lg border border-purple-100">
                {tariffTable2.conditionText}
              </p>
              <div className="w-full overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full text-left border-collapse text-xs xs:text-sm min-w-[750px]">
                  <thead>
                    <tr className="bg-purple-50 text-gray-800 border-b border-gray-200">
                      {tariffTable2.headers.map((header, idx) => (
                        <th key={idx} className="p-2.5 xs:p-3 border-r last:border-r-0 font-semibold align-top">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tariffTable2.rows.map((row, idx) => (
                      <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                        <td className="p-2.5 xs:p-3 border-r font-medium bg-gray-50/50">{row.type}</td>
                        {idx === 0 ? (
                          row.values.map((val, vIdx) => (
                            <td key={vIdx} className="p-2.5 xs:p-3 border-r last:border-r-0 text-center font-semibold">
                              {val}
                            </td>
                          ))
                        ) : (
                          <td colSpan="5" className="p-2.5 xs:p-3 whitespace-pre-line">
                            {row.values[0]}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs text-gray-500 italic">
              mPOS և VENDISTA տերմինալների մասով ամսական միջնորդավճարների նվազագույն չափ չի սահմանվում[cite: 8]:
            </p>

            <ul className="list-disc pl-4 xs:pl-5 space-y-3 pt-4">
              {securityFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <ol className="list-decimal pl-4 xs:pl-5 space-y-4 pt-4">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="pt-4 font-bold text-gray-900">
              Կառուցեք Ձեր ապագան Evocabank-ի հետ:[cite: 9]
            </div>

          </div>

        </div>
      </section>

      <OnlineBanking />
      <Footer />
    </>
  );
};

export default Pos;