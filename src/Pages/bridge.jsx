import React, { useEffect, useState } from 'react';
import Header from '../Components/Carrer-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menuall.jsx';
import { db } from '../firebase.js';
import CultureBanner from '../Components/CultureBanner.jsx';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

function Bridge() {
  const [sections7, setSections7] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsSnap, menuSnap] = await Promise.all([
          getDocs(collection(db, "CareerSections7")),
          getDocs(query(collection(db, "CultureMenuItems2"), orderBy("order"))),
        ]);

        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections7(s);

        setMenuItems(menuSnap.docs.map((d) => d.data()));
      } catch (err) {
        console.error("Bridge data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const bridgeData = sections7.bridgeInfo || sections7.bridge;

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center text-[#6a0fd9] font-medium">
          Բեռնվում է...
        </div>
      ) : (
        <div className="pt-0 mb-[60px]">
          {sections7.culture && (
            <CultureBanner {...sections7.culture} className="mb-[60px]" />
          )}

          {bridgeData ? (
            <div className="max-w-5xl mx-auto px-4 py-6 text-[#2d124d]">
              {bridgeData.introTitle && (
                <h2 className="text-xl md:text-2xl font-bold text-[#6a0fd9] mb-6 leading-relaxed">
                  {bridgeData.introTitle}
                </h2>
              )}

              {bridgeData.benefits && bridgeData.benefits.length > 0 && (
                <ul className="space-y-4 mb-8">
                  {bridgeData.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#6a0fd9] mt-1 font-bold text-lg">✓</span>
                      <span className="text-gray-800 text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {bridgeData.requirementsTitle && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#6a0fd9] flex items-center gap-2 mb-4">
                    <span>💼</span> {bridgeData.requirementsTitle}
                  </h3>
                  <ul className="space-y-4">
                    {bridgeData.requirements?.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#6a0fd9] mt-1 font-bold text-lg">✓</span>
                        <span className="text-gray-800 text-base leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {bridgeData.applyTitle && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#6a0fd9] flex items-center gap-2 mb-4 flex-wrap">
                    <span>💼</span>
                    <span>
                      EvocaBRIDGE-ին մասնակցելու համար{" "}
                      <a
                        href={`mailto:${bridgeData.applyEmail || "evocabridge@evoca.am"}`}
                        className="underline hover:text-[#550ab2] transition-colors"
                      >
                        {bridgeData.applyEmail || "evocabridge@evoca.am"}
                      </a>{" "}
                      էլեկտրոնային հասցեին ուղարկիր.
                    </span>
                  </h3>
                  {bridgeData.applyDocs && bridgeData.applyDocs.length > 0 && (
                    <ul className="space-y-4 mb-6">
                      {bridgeData.applyDocs.map((docItem, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#6a0fd9] mt-1 font-bold text-lg">✓</span>
                          <span className="text-gray-800 text-base leading-relaxed">{docItem}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {bridgeData.interviewNote && (
                    <p className="text-gray-700 leading-relaxed font-medium mt-4">
                      {bridgeData.interviewNote}
                    </p>
                  )}
                </div>
              )}

              {bridgeData.detailsTitle && (
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-[#6a0fd9] mb-2">
                    {bridgeData.detailsTitle}
                  </h3>
                  {bridgeData.detailsSubtitle && (
                    <p className="text-gray-800 font-medium mb-6">
                      {bridgeData.detailsSubtitle}
                    </p>
                  )}

                  {bridgeData.stages && bridgeData.stages.length > 0 && (
                    <div className="space-y-4">
                      {bridgeData.stages.map((stage, index) => (
                        <div key={index} className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                          <p className="text-gray-800 leading-relaxed">
                            <span className="font-bold text-[#6a0fd9]">{stage.title}: </span>
                            {stage.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">Տվյալներ առայժմ առկա չեն</div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default Bridge;