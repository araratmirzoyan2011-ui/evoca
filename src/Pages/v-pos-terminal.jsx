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

const VPos = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [introParagraphs, setIntroParagraphs] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [tariffTable, setTariffTable] = useState(null);
  const [securityFeatures, setSecurityFeatures] = useState([]);
  const [steps, setSteps] = useState([]);
  const [businessLoanData, setBusinessLoanData] = useState(null);
  const [overdraftData, setOverdraftData] = useState(null);
  
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const menuSnapshot = await getDocs(collection(db, "menuItems"));
        const menuList = menuSnapshot.docs.map(doc => doc.data());
        menuList.sort((a, b) => a.order - b.order);
        setMenuItems(menuList);

        const cardSnapshot = await getDocs(collection(db, "cardData"));
        if (!cardSnapshot.empty) {
          setCardData(cardSnapshot.docs[0].data());
        }

        const introSnapshot = await getDocs(collection(db, "introParagraphs"));
        setIntroParagraphs(introSnapshot.docs.map(doc => doc.data().text));

        const benefitsSnapshot = await getDocs(collection(db, "benefits"));
        setBenefits(benefitsSnapshot.docs.map(doc => doc.data().text));

        const tariffSnapshot = await getDocs(collection(db, "tariffTable"));
        if (!tariffSnapshot.empty) {
          setTariffTable(tariffSnapshot.docs[0].data());
        }

        const securitySnapshot = await getDocs(collection(db, "securityFeatures"));
        setSecurityFeatures(securitySnapshot.docs.map(doc => doc.data().text));

        const stepsSnapshot = await getDocs(collection(db, "steps"));
        setSteps(stepsSnapshot.docs.map(doc => doc.data().text));

        const loanSnapshot = await getDocs(collection(db, "businessLoanData"));
        if (!loanSnapshot.empty) {
          setBusinessLoanData(loanSnapshot.docs[0].data());
        }

        const overdraftSnapshot = await getDocs(collection(db, "overdraftData"));
        if (!overdraftSnapshot.empty) {
          setOverdraftData(overdraftSnapshot.docs[0].data());
        }

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
          {cardData && (
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
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
            
            <p>
              Evocabank-ը կապահովի Ձեր կայքում V-POS տերմինալի տեղադրումը: Այն հնարավորություն կտա Ձեզ{" "}
              <Link to="#" className="text-purple-700 underline">խուսափել լրացուցիչ ծրագրային ծախսերից</Link>
              , սերտիֆիկացումից և հետագա ծրագրային ապահովումից:
            </p>
            {introParagraphs[1] && <p>{introParagraphs[1]}</p>}
            <p>
              V-POS-ը հասանելի կլինի ինչպես <Link to="#" className="text-purple-700 underline">Ձեր կայքում</Link>
              , այնպես էլ <Link to="#" className="text-purple-700 underline">մոբայլ հավելվածում</Link>:
            </p>

            <h3 className="text-lg xs:text-xl font-bold text-gray-900 pt-4">
              Իսկ ինչո՞ւ տեղադրել Evocabank-ի V-POS տերմինալ
            </h3>

            <ul className="list-disc pl-4 xs:pl-5 space-y-3">
              <li>
                Օնլայն վաճառքների շնորհիվ <Link to="#" className="text-purple-700 underline">կաճեն Ձեր եկամուտները</Link>,
              </li>
              <li>
                Evocabank-ը V-POS-ով կատարված վաճառքներից կգանձի{" "}
                <span className="font-semibold">նվազագույն միջնորդավճարներ</span>՝ հատուկ Ձեր բիզնեսի համար:
              </li>
            </ul>

            <p className="pt-2">
              Սպասարկման կետի գրանցման համար անհրաժեշտ <span className="font-semibold text-purple-700">V-POS</span> տերմինալների տեղադրման ստանդարտ սակագներն են՝
            </p>

            {tariffTable && (
              <div className="w-full overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full text-left border-collapse text-xs xs:text-sm min-w-[600px]">
                  <thead>
                    <tr className="bg-purple-50 text-gray-800 border-b border-gray-200">
                      {tariffTable.headers.map((header, idx) => (
                        <th key={idx} className="p-2.5 xs:p-3 border-r last:border-r-0 font-semibold align-top">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tariffTable.rows.map((row, idx) => (
                      <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                        <td className="p-2.5 xs:p-3 border-r font-medium bg-gray-50/50">{row.type}</td>
                        {row.values.map((val, vIdx) => (
                          <td key={vIdx} className="p-2.5 xs:p-3 border-r last:border-r-0 text-center">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="text-xs text-gray-500 space-y-1">
              {tariffTable?.footnotes?.map((note, idx) => (
                <p key={idx}>{note}</p>
              ))}
            </div>

            <ul className="list-disc pl-4 xs:pl-5 space-y-3 pt-4">
              <li>
                Վճարումներն անվտանգ են, գործում են{" "}
                <Link to="#" className="text-purple-700 font-semibold underline">3D Secure Code</Link>{" "}
                անվտանգության համակարգերը,
              </li>
              <li>{securityFeatures[1]}</li>
              <li>
                <span className="text-purple-700 font-semibold">Անվճար տեխնիկական խորհրդատվություն և տեխնիկական սպասարկում</span>{" "}
                Բանկի մասնագետների կողմից,
              </li>
              <li>{securityFeatures[3]}</li>
            </ul>

            <p className="pt-4 font-medium">
              V-POS տերմինալ տեղադրելու համար լրացրեք{" "}
              <Link to="/terminal-installation-application" className="text-purple-700 underline font-bold inline-block">
                Տերմինալի տեղադրման հայտ
              </Link>{" "}
              հիմա:
            </p>

            <ol className="list-decimal pl-4 xs:pl-5 space-y-4 pt-2">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="pt-8 border-t border-gray-200 space-y-8">
              
              <div>
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2">
                  Կառուցեք Ձեր բիզնեսի թվային ապագան:
                </h2>
                <p className="text-gray-700 mb-6">
                  Evocabank-ում այսուհետ գործում են բիզնես վարկ և բիզնես օվերդրաֆտ POS տերմինալի շրջանառության հիման վրա:
                </p>

                <div className="my-6">
                  <img
                    src="https://www.evoca.am/file_manager/pos2-600x315.jpg"
                    alt="Բիզնես վարկ և օվերդրաֆտ POS տերմինալի շրջանառության հիման վրա"
                    className="rounded-xl shadow-lg w-full max-w-2xl h-auto object-cover"
                  />
                </div>
              </div>

              {businessLoanData && (
                <div className="space-y-4">
                  <h3 className="text-lg xs:text-xl font-bold text-purple-800">
                    {businessLoanData.title}
                  </h3>
                  <p>{businessLoanData.description}</p>

                  <p className="font-semibold text-gray-900 pt-2">
                    {businessLoanData.applicantsTitle}
                  </p>
                  <ul className="list-disc pl-4 xs:pl-5 space-y-2">
                    {businessLoanData.applicants.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <p className="font-semibold text-gray-900 pt-2">
                    {businessLoanData.collateralTitle}
                  </p>
                  <ul className="list-disc pl-4 xs:pl-5 space-y-2">
                    {businessLoanData.collateral.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <p className="pt-2">
                    Օգտվեք մեր կողմից տրվող հնարավորությունից և գրանցեք Ձեր նոր բիզնես հաջողությունները:
                  </p>
                  <p>
                    Վարկի պայմաններին կարող եք ծանոթանալ{" "}
                    <Link to="#" className="text-purple-700 underline font-bold">այստեղ</Link>:
                  </p>
                </div>
              )}

              {overdraftData && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-lg xs:text-xl font-bold text-purple-800">
                    {overdraftData.title}
                  </h3>
                  <p>{overdraftData.description}</p>

                  <p className="font-semibold text-gray-900 pt-2">
                    {overdraftData.applicantsTitle}
                  </p>
                  <ul className="list-disc pl-4 xs:pl-5 space-y-2">
                    {overdraftData.applicants.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <p className="pt-2">
                    Օվերդրաֆտի պայմաններին կարող եք ծանոթանալ{" "}
                    <Link to="#" className="text-purple-700 underline font-bold">այստեղ</Link>:
                  </p>
                  <p>
                    Մեր մյուս բիզնես վարկերին կարող եք ծանոթանալ{" "}
                    <Link to="#" className="text-purple-700 underline font-bold">այստեղ</Link>:
                  </p>
                  <p className="pt-2 font-medium">
                    Հարցերի դեպքում մեր թիմի հետ կարող եք կապ հաստատել հետևյալ{" "}
                    <Link to="#" className="text-purple-700 underline font-bold">հղումով</Link>:
                  </p>
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

export default VPos;