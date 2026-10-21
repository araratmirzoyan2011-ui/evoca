import React, { useEffect, useState } from "react";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer";
import SocialIcons from "../Components/SocialIcons.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
import { db } from "../firebase";
import { OnlineBanking } from "../Components/OnlineBanking.jsx";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import InfoAccordion from "../Components/InfoAccordion.jsx";

const ClasicalDeposit = () => {
  const [cardData, setCardData] = useState(null);
  const [ClasicdepositAccordionData, setClasicdepositAccordionData] = useState([]);
  const [generalInfo, setGeneralInfo] = useState([]);
  const [interestCalculationInfo, setInterestCalculationInfo] = useState([]);
  const [accountInfo, setAccountInfo] = useState([]);
  const [otherConditions, setOtherConditions] = useState([]);
  const [guaranteeInfo, setGuaranteeInfo] = useState([]);
  const [depositTableRates, setDepositTableRates] = useState([]);
  const [earlyTerminationRates, setEarlyTerminationRates] = useState([]);
  const [cardTypesTable, setCardTypesTable] = useState([]);

  const [loading, setLoading] = useState(true);

  // Firebase-ից բոլոր տվյալների ներմուծում (Fetch)
  const fetchAllDataFromFirebase = async () => {
    setLoading(true);
    try {
      // 1. cardData
      const cardSnap = await getDoc(doc(db, "classicalCardData", "info"));
      if (cardSnap.exists()) setCardData(cardSnap.data());

      // 2. ClasicdepositAccordionData
      const accSnap = await getDocs(collection(db, "classicalAccordionData"));
      const accList = accSnap.docs.map((d) => d.data());
      accList.sort((a, b) => (a.order || 0) - (b.order || 0));
      setClasicdepositAccordionData(accList);

      // 3. generalInfo
      const genSnap = await getDocs(collection(db, "classicalGeneralInfo"));
      const genList = genSnap.docs.map((d) => d.data().content || d.data());
      setGeneralInfo(genList);

      // 4. interestCalculationInfo
      const intSnap = await getDocs(collection(db, "classicalInterestInfo"));
      const intList = intSnap.docs.map((d) => d.data().content || d.data());
      setInterestCalculationInfo(intList);

      // 5. accountInfo
      const accountSnap = await getDocs(collection(db, "classicalAccountInfo"));
      const accountList = accountSnap.docs.map((d) => d.data().content);
      setAccountInfo(accountList);

      // 6. otherConditions
      const otherSnap = await getDocs(collection(db, "classicalOtherConditions"));
      const otherList = otherSnap.docs.map((d) => d.data().content);
      setOtherConditions(otherList);

      // 7. guaranteeInfo
      const guarSnap = await getDocs(collection(db, "classicalGuaranteeInfo"));
      const guarList = guarSnap.docs.map((d) => d.data().content || d.data());
      setGuaranteeInfo(guarList);

      // 8. depositTableRates
      const ratesSnap = await getDocs(collection(db, "classicalDepositTableRates"));
      setDepositTableRates(ratesSnap.docs.map((d) => d.data()));

      // 9. earlyTerminationRates
      const termSnap = await getDocs(collection(db, "classicalEarlyTerminationRates"));
      setEarlyTerminationRates(termSnap.docs.map((d) => d.data()));

      // 10. cardTypesTable
      const cardTypesSnap = await getDocs(collection(db, "classicalCardTypesTable"));
      setCardTypesTable(cardTypesSnap.docs.map((d) => d.data()));

    } catch (err) {
      console.error("Firebase fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500 font-medium">
        Տվյալները բեռնվում են...
      </div>
    );
  }

  return (
    <>
      <BusinessHeader />
      
      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
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

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 md:gap-24">
            <div className="hidden md:block shrink-0">
              <div className="sticky top-24">
                <SocialIcons />
              </div>
            </div>

            <div className="flex-1 max-w-4xl text-gray-700 leading-relaxed space-y-8">
              
              {/* Անհրաժեշտ տեղեկատվություն */}
              {generalInfo.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Անհրաժեշտ տեղեկատվություն</h2>
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Ընդհանուր տեղեկատվություն</h3>
                  <ul className="list-disc pl-5 space-y-4">
                    {generalInfo.map((item, idx) => (
                      <li key={idx}>
                        {typeof item === "string" ? item : (
                          <>
                            {item.text}
                            {item.sub && (
                              <ul className="list-disc pl-5 mt-2 space-y-2">
                                {item.sub.map((subItem, sIdx) => (
                                  <li key={sIdx}>{subItem}</li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-purple-50 p-4 rounded-lg my-4 text-sm text-purple-900">
                    <span className="font-bold">Ուշադրություն.</span> Մեր կողմից պարբերաբար անցկացվող ավանդային ակցիաների պայմանները տարբերվում են մեր համակարգում ավանդների ներգրավման ընդհանուր պայմաններից և գործում են միայն պաշտոնապես հրապարակված ակցիայի շրջանակում ներգրավված ավանդների նկատմամբ։
                  </div>
                </div>
              )}

              {/* Ավանդի տոկոսագումարների հաշվարկման և վճարման կարգը */}
              {interestCalculationInfo.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Ավանդի տոկոսագումարների հաշվարկման և վճարման կարգը</h3>
                  <ul className="list-disc pl-5 space-y-4">
                    {interestCalculationInfo.map((item, idx) => (
                      <li key={idx}>
                        {typeof item === "string" ? item : (
                          <>
                            {item.text}
                            {item.sub && (
                              <ul className="list-disc pl-5 mt-2 space-y-2">
                                {item.sub.map((subItem, sIdx) => (
                                  <li key={sIdx}>{subItem}</li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-purple-50 p-4 rounded-lg my-4 text-sm text-purple-900">
                    <span className="font-bold">Ուշադրություն՝</span> Ձեր հաշվին առկա միջոցների նկատմամբ տոկոսագումարները հաշվում ենք ԱՆՎԱՆԱԿԱՆ տոկոսադրույքի հիման վրա, իսկ տարեկան ՏՈԿՈՍԱՅԻՆ ԵԿԱՄՏԱԲԵՐՈՒԹՅՈՒՆԸ ցույց է տալիս, թե որքան եկամուտ կստանյաք դուք, եթե ձեր ավանդի դիմաց ստացված տոկոսագումարները վերաներդրեյք ավանդի տեսքով։ Տարեկան տոկոսային եկամտաբերության հաշվարկման կարգին (Կանոնակարգ 8-02) կարող եք ծանոթանալ www.cba.am կայքում։
                  </div>
                </div>
              )}

              {/* Ավանդային հաշվի վերաբերյալ տրամադրվող տեղեկատվություն */}
              {accountInfo.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Ավանդային հաշվի վերաբերյալ տրամադրվող տեղեկատվություն</h3>
                  <ul className="list-disc pl-5 space-y-4">
                    {accountInfo.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Այլ պայմաններ */}
              {otherConditions.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Այլ պայմաններ</h3>
                  <ul className="list-disc pl-5 space-y-4">
                    {otherConditions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Երաշխավորված ավանդների սահմանաչափերը */}
              {guaranteeInfo.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Երաշխավորված ավանդների սահմանաչափերը</h3>
                  <p className="mb-4">
                    Համաձայն «Ֆիզիկական անձանց բանկային ավանդների հատուցումը երաշխավորելու մասին» ՀՀ օրենքի՝ բանկում բացված հաշվարկային, ընթացիկ, ժամկետային, խնայողական կամ այլ հաշվի վրա գտնվող դրամական միջոցները համարվում են բանկային ավանդ։ ՀՀ օրենքով երաշխավորված ավանդները հատուցում է Ավանդների հատուցումը երաշխավորող հիմնադրամը։
                  </p>
                  <h4 className="font-bold mb-2">Եթե դուք անվճարունակ բանկում ունեք՝</h4>
                  <ul className="list-disc pl-5 space-y-4">
                    {itemSubList(guaranteeInfo)}
                  </ul>

                  <div className="bg-purple-50 p-4 rounded-lg my-4 text-sm text-purple-900">
                    <span className="font-bold">Ծանոթագրություն.</span> Նույն բանկում ունեցած ձեր բոլոր դրամային ավանդները համարվում են մեկ ավանդ, և բոլոր արտարժութային ավանդները՝ մեկ ավանդ։ Եթե ունեք ավանդներ ՀՀ տարածքում գործող մի քանի բանկերում, ապա դրանք երաշխավորվում են յուրաքանչյուր բանկում՝ առավելագույն սահմանաչափով։
                  </div>
                </div>
              )}

              {/* Պայմաններ և սակագներ */}
              {depositTableRates.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Պայմաններ և սակագներ</h2>
                  
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-200 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border p-2">Ներգրավվող գումարների սահմանաչափեր ըստ արժույթի</th>
                          <th className="border p-2">91 - 180 օր</th>
                          <th className="border p-2">181 - 365 օր</th>
                          <th className="border p-2">366 -545 օր</th>
                          <th className="border p-2">546 - 730 օր</th>
                          <th className="border p-2">731 - 1095 օր</th>
                        </tr>
                      </thead>
                      <tbody>
                        {depositTableRates.map((row, idx) => (
                          <tr key={idx} className="text-center">
                            <td className="border p-2 font-medium text-left">{row.range}</td>
                            <td className="border p-2">{row.r1}</td>
                            <td className="border p-2">{row.r2}</td>
                            <td className="border p-2">{row.r3}</td>
                            <td className="border p-2">{row.r4}</td>
                            <td className="border p-2">{row.r5}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <ol className="list-decimal pl-5 space-y-4 mt-4">
                    <li>Ավանդն ընդունվում է ֆիզիկական և իրավաբանական անձանցից, ինչպես նաև Բանկի գործունեության վայրում, այնպես էլ՝ «EvocaTouch» կամ «EvocaOnline» հեռակառավարման համակարգերի միջոցով։</li>
                    <li>Տոկոսագումարների պարբերական (ամենամսյա, եռամսյակային, կիսամյակային, տարեկան) վճարման դեպքում ՀՀ դրամով ավանդների համար սահմանվում է վերոհիշյալ սանդղակի տոկոսադրույքներից 0.5 %-ով պակաս տոկոսադրույք, իսկ ԱՄՆ դոլարով, Եվրոյով և ՌԴ ռուբլով ավանդների համար սահմանվում է վերոհիշյալ սանդղակի տոկոսադրույքներից 0.25 %-ով պակաս տոկոսադրույք։</li>
                    <li>
                      Ավանդատուն կարող է համալրել (ավելացնել) իր Ավանդի գումարը սկսված նվազագույնը 200.000 ՀՀ դրամից, 500 ԱՄՆ դոլարից, 500 Եվրոյից կամ 30.000 ՌԴ ռուբլուց։ 
                      Ավելացման հնարավորությամբ ավանդ ներդնելու դեպքում ՀՀ դրամով ավանդների համար սահմանվում է վերոհիշյալ սանդղակի տոկոսադրույքներից 0.5 %-ով պակաս տոկոսադրույք, իսկ ԱՄՆ դոլարով, Եվրոյով և ՌԴ ռուբլով ավանդների համար՝ 0.25 %-ով պակաս։ Կատարված բոլոր համալրումների հանրագումարը չկարող է գերազանցել Ավանդի ներդրման սկզբնական գումարը։ Ավանդային պայմանագրի գործողության վերջին 3 (երեք) ամիսների ընթացքում Ավանդի գումարի համալրում չի թույլատրվում։
                    </li>
                    {earlyTerminationRates.length > 0 && (
                      <li>
                        Ավանդատուի պահանջով ավանդային պայմանագիրը ժամկետից շուտ լուծելու դեպքում Բանկն իրականացնում է Ավանդի տոկոսագումարների վերահաշվարկ հետևյալ դրույքաչափերով՝
                        
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full border border-gray-200 text-sm">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="border p-2">Ավանդի արժույթ</th>
                                <th className="border p-2">Մինչև 365 օր</th>
                                <th className="border p-2">366 - 1095 օր</th>
                              </tr>
                            </thead>
                            <tbody>
                              {earlyTerminationRates.map((row, idx) => (
                                <tr key={idx} className="text-center">
                                  <td className="border p-2 font-medium text-left">{row.currency}</td>
                                  <td className="border p-2">{row.r1}</td>
                                  <td className="border p-2">{row.r2}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </li>
                    )}
                    <li>Ավանդի գումարի մասնակի նվազեցում չի թույլատրվում։</li>
                  </ol>
                </div>
              )}

              {/* Լրացուցիչ պայմաններ */}
              {cardTypesTable.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Լրացուցիչ պայմաններ</h3>
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>Ավանդատուի ցանկության դեպքում, Բանկը կարող է տրամադրել վճարային քարտ առանց տարեկան սպասարկման վճարի գանձման։</li>
                    <li>
                      Տրամադրվող վճարային քարտի տեսակները, ըստ ներդրվող ավանդի գումարի, սահմանվում են ստորև․
                      
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full border border-gray-200 text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="border p-2">Ավանդի արժույթ/Քարտի տեսակ</th>
                              <th className="border p-2">Mastercard Standart/ Visa Classic</th>
                              <th className="border p-2">Mastercard Gold/Visa Gold</th>
                              <th className="border p-2">VISA Infinite</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cardTypesTable.map((row, idx) => (
                              <tr key={idx} className="text-center">
                                <td className="border p-2 font-medium text-left">{row.currency}</td>
                                <td className="border p-2">{row.standard}</td>
                                <td className="border p-2">{row.gold}</td>
                                <td className="border p-2">{row.infinite}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </li>
                  </ol>
                </div>
              )}

              {/* Accordions */}
              {ClasicdepositAccordionData.length > 0 && (
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                    ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
                  </h2>
                  <div className="space-y-4">
                    {ClasicdepositAccordionData.map((item, index) => (
                      <InfoAccordion
                        key={index}
                        title={item.title}
                        blocks={item.blocks}
                      />
                    ))}
                  </div>
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

function itemSubList(arr) {
  const item = arr.find((el) => typeof el === "object" && el.sub);
  return item ? item.sub.map((sub, i) => <li key={i}>{sub}</li>) : null;
}

export default ClasicalDeposit;