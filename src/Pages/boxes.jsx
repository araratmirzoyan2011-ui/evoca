import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Boxes = () => {
  const [boxesParagraphs, setBoxesParagraphs] = useState([]);
  const [boxSizes, setBoxSizes] = useState([]);
  const [tariffTables, setTariffTables] = useState([]);
  const [boxesReports, setBoxesReports] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const paragraphsSnap = await getDocs(collection(db, "boxesParagraphs"));
        const paragraphsData = paragraphsSnap.docs.map((d) => d.data().text);
        setBoxesParagraphs(paragraphsData);

        const sizesSnap = await getDocs(collection(db, "boxSizes"));
        const sizesData = sizesSnap.docs.map((d) => d.data().size);
        setBoxSizes(sizesData);

        const tablesSnap = await getDocs(collection(db, "tariffTables"));
        const tablesData = tablesSnap.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        setTariffTables(tablesData);

        const reportsSnap = await getDocs(collection(db, "boxesReports"));
        const reportsData = reportsSnap.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        setBoxesReports(reportsData);

        const cardSnap = await getDocs(collection(db, "boxesCardData"));
        if (!cardSnap.empty) {
          setCardData(cardSnap.docs[0].data());
        }

      } catch (error) {
        console.error("Սխալ տվյալները ներմուծելիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Տվյալները բեռնվում են...</p>
      </div>
    );
  }

  const cellBase =
    "border border-gray-200 px-1.5 py-1.5 align-middle break-words sm:px-3 sm:py-2";

  return (
    <>
      <Header />

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
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-12">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="min-w-0 max-w-4xl flex-1 text-[14px] leading-6 text-gray-900 sm:text-[15px] sm:leading-7">
            <div className="space-y-6">
              {boxesParagraphs.map((text, i) => (
                <p key={i} className="break-words">{text}</p>
              ))}
            </div>

            <div className="mt-8 space-y-8">
              {tariffTables.map((t) => {
                const textAlign = t.align === "center" ? "text-center" : "text-left";
                const tableText = "text-[11px] leading-4 sm:text-[13px] sm:leading-5";

                return (
                  <div key={t.id}>
                    <h3 className="mb-4 text-[14px] font-bold leading-6 sm:text-[15px]">
                      {t.title}
                    </h3>

                    <div className="overflow-x-auto rounded-lg bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
                      <table className={`w-full table-fixed border-collapse ${tableText}`}>
                        <colgroup>
                          <col className={t.firstColClass} />
                          <col className={t.otherColClass} />
                          <col className={t.otherColClass} />
                          <col className={t.otherColClass} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th rowSpan={2} className={`${cellBase} text-left font-normal`}>
                              ժամկետ
                            </th>
                            <th colSpan={3} className={`${cellBase} ${textAlign} font-normal`}>
                              {t.sizeLabel}
                            </th>
                          </tr>
                          <tr>
                            {boxSizes.map((size) => (
                              <th key={size} className={`${cellBase} ${textAlign} font-normal`}>
                                {size}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {t.periods?.map((row) => {
                            const merged = row.values?.every((v) => v === row.values[0]);
                            return (
                              <tr key={row.label}>
                                <td className={cellBase}>{row.label}</td>
                                {merged && (
                                  <td colSpan={3} className={`${cellBase} ${textAlign} sm:hidden`}>
                                    {row.values[0]}
                                  </td>
                                )}
                                {row.values?.map((v, i) => (
                                  <td
                                    key={i}
                                    className={`${cellBase} ${textAlign} ${
                                      merged ? "hidden sm:table-cell" : ""
                                    }`}
                                  >
                                    {v}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <table className={`-mt-px w-full table-fixed border-collapse ${tableText}`}>
                        <colgroup>
                          <col className={t.labelColClass} />
                          <col />
                        </colgroup>
                        <tbody>
                          {t.extras?.map((row) => (
                            <tr key={row.label}>
                              <td className={cellBase}>{row.label}</td>
                              <td className={cellBase}>{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-[12px] sm:text-[13px]">
              <span className="font-bold">Նշում</span> - Միջնորդավճարները ներկայացված են ներառյալ ԱԱՀ:
            </p>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {boxesReports.map((r, index) => (
                  <DocumentCard key={r.id || index} title={r.title} url={r.url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnlineBanking />
      <Footer />
    </>
  );
};

export default Boxes;