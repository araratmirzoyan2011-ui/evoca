import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function Regulation() {
  const [groups, setGroups] = useState([]);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsSnap, docsSnap] = await Promise.all([
          getDocs(query(collection(db, "regulationGroups"), orderBy("order"))),
          getDocs(query(collection(db, "regulationDocs"), orderBy("order"))),
        ]);

        setGroups(groupsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setDocs(docsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333] max-[400px]:mb-8 max-[400px]:text-[24px]">
              Կարգավորում
            </h1>

            {loading && <p>Բեռնվում է...</p>}

            {groups.length > 0 && (
              <>
                <h2 className="mb-6 text-[32px] font-medium leading-[40px] text-[#333] max-[400px]:mb-4 max-[400px]:text-[24px] max-[400px]:leading-[30px]">
                  Բանկի կողմից ծառայությունների մատուցումը կարգավորվում է՝
                </h2>

                <ul className="mb-14 space-y-6 pl-4 max-[400px]:mb-10 max-[400px]:space-y-4 max-[400px]:pl-1">
                  {groups.map((group) => (
                    <li key={group.id}>
                      <div className="flex items-start gap-4 max-[400px]:gap-3">
                        <span className="mt-[8px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#6200d6] max-[400px]:mt-[6px] max-[400px]:h-2 max-[400px]:w-2" />
                        <span className="font-bold text-[#222]">{group.title}</span>
                      </div>

                      {group.items.length > 0 && (
                        <ul className="mt-4 space-y-4 pl-10 max-[400px]:mt-3 max-[400px]:space-y-3 max-[400px]:pl-6">
                          {group.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-4 max-[400px]:gap-3">
                              <span className="mt-[13px] h-[2px] w-3 shrink-0 bg-[#6200d6] max-[400px]:mt-[11px] max-[400px]:w-2.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {docs.length > 0 && (
              <>
                <h2 className="mb-6 text-xl font-bold text-gray-900 max-[400px]:mb-4 max-[400px]:text-lg">
                  Փաստաթղթեր
                </h2>

                <div className="space-y-5 max-[400px]:space-y-3">
                  {docs.map((r) => (
                    <DocumentCard key={r.id} title={r.title} url={r.url} />
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Regulation;