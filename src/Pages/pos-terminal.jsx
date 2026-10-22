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
  const [posCardData, setPosCardData] = useState(null);
  const [introParagraphs, setIntroParagraphs] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [tariffTable1, setTariffTable1] = useState(null);
  const [tariffTable2, setTariffTable2] = useState(null);
  const [securityFeatures, setSecurityFeatures] = useState([]);
  const [steps, setSteps] = useState([]);
  
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const menuSnapshot = await getDocs(collection(db, "munuItems2"));
        const menuList = menuSnapshot.docs.map(doc => doc.data());
        menuList.sort((a, b) => a.order - b.order);
        setMenuItems(menuList);

        const cardSnapshot = await getDocs(collection(db, "PosCardData"));
        if (!cardSnapshot.empty) {
          setPosCardData(cardSnapshot.docs[0].data());
        }

        const introSnapshot = await getDocs(collection(db, "introParagraphs"));
        setIntroParagraphs(introSnapshot.docs.map(doc => doc.data().text));

        const benefitsSnapshot = await getDocs(collection(db, "benefits"));
        setBenefits(benefitsSnapshot.docs.map(doc => doc.data().text));

        const tariff1Snapshot = await getDocs(collection(db, "tariffTable1"));
        if (!tariff1Snapshot.empty) {
          setTariffTable1(tariff1Snapshot.docs[0].data());
        }

        const tariff2Snapshot = await getDocs(collection(db, "tariffTable2"));
        if (!tariff2Snapshot.empty) {
          setTariffTable2(tariff2Snapshot.docs[0].data());
        }

        const securitySnapshot = await getDocs(collection(db, "securityFeatures"));
        setSecurityFeatures(securitySnapshot.docs.map(doc => doc.data().text));

        const stepsSnapshot = await getDocs(collection(db, "steps"));
        setSteps(stepsSnapshot.docs.map(doc => doc.data().text));

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

      <main className="w-full py-6 px-2 xs:px-4 md:px-12 bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {posCardData && (
            <InfoCard
              title={posCardData.title}
              description={posCardData.description}
              imageUrl={posCardData.imageUrl}
              altText={posCardData.altText}
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
            
            {introParagraphs[0] && (
              <p>
                Ձեր գնորդները կկարողանան գնումներ կատարել իրենց միջազգային VISA, Mastercard և տեղական ArCa{" "}
                <Link to="#" className="text-purple-700 underline">վճարային քարտերով</Link>:
              </p>
            )}
            {introParagraphs[1] && <p>{introParagraphs[1]}</p>}

            <h3 className="text-lg xs:text-xl font-bold text-gray-900 pt-4">
              Իսկ ինչո՞ւ տեղադրել Evocabank-ի POS տերմինալ
            </h3>

            <ul className="list-disc pl-4 xs:pl-5 space-y-3">
              {benefits[0] && (
                <li>
                  Evocabank-ը POS-ով կատարված վաճառքներից կգանձի{" "}
                  <span className="font-semibold">նվազագույն միջնորդավճարներ</span>՝ հատուկ Ձեր բիզնեսի համար,
                </li>
              )}
              {benefits[1] && (
                <li>
                  Սպասարկման կետի գրանցման համար անհրաժեշտ POS, ՀՌՄ-POS, mPOS, VENDISTA տերմինալների տեղադրման{" "}
                  <Link to="#" className="text-purple-700 underline">ստանդարտ սակագներ ու պայմաններ</Link>:
                </li>
              )}
            </ul>

            {tariffTable1 && (
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
            )}

            {tariffTable2 && (
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
            )}

            <p className="text-xs text-gray-500 italic">
              mPOS և VENDISTA տերմինալների մասով ամսական միջնորդավճարների նվազագույն չափ չի սահմանվում:
            </p>

            <ul className="list-disc pl-4 xs:pl-5 space-y-3 pt-4">
              {securityFeatures[0] && <li>{securityFeatures[0]}</li>}
              <li>
                <span className="text-purple-700 font-semibold">Անվճար տեխնիկական խորհրդատվություն և տեխնիկական սպասարկում</span>{" "}
                Բանկի մասնագետների կողմից,
              </li>
              {securityFeatures[2] && <li>{securityFeatures[2]}</li>}
            </ul>

            <ol className="list-decimal pl-4 xs:pl-5 space-y-4 pt-4">
              <li>
                POS տերմինալ տեղադրելու համար{" "}
                <Link to="#" className="text-purple-700 underline font-bold">
                  լրացրեք հայտը հենց հիմա
                </Link>
                :
              </li>
              {steps[1] && <li>{steps[1]}</li>}
            </ol>

            <div className="pt-4 font-bold text-gray-900">
              Կառուցեք Ձեր ապագան Evocabank-ի հետ:
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