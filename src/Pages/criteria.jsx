import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function Criteria() {
  const [pageBlocks, setPageBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const q = query(collection(db, "criteriaBlocks"), orderBy("order"));
        const snapshot = await getDocs(q);
        setPageBlocks(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
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
              Հաճախորդի ռեզիդենտության չափանիշներ
            </h1>

            {loading && <p>Բեռնվում է...</p>}

            {pageBlocks.map((block) => (
              <React.Fragment key={block.id}>
                {block.type === "heading" && (
                  <h3 className="mb-6 font-bold text-[#6200d6] max-[400px]:mb-4">
                    {block.content}
                  </h3>
                )}

                {block.type === "paragraph" && (
                  <p className="mb-6 max-[400px]:mb-4">
                    {block.content.map((part, j) =>
                      typeof part === "string" ? (
                        part
                      ) : (
                        <span key={j} className="font-bold text-[#6200d6]">
                          {part.text}
                        </span>
                      )
                    )}
                  </p>
                )}

                {block.type === "bullets" && (
                  <ul className="mb-8 space-y-3 pl-4 max-[400px]:mb-5 max-[400px]:space-y-2">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-4 max-[400px]:gap-3">
                        <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#6200d6] max-[400px]:mt-[7px] max-[400px]:h-2 max-[400px]:w-2" />
                        <span>
                          {item.parts.map((part, k) =>
                            typeof part === "string" ? (
                              part
                            ) : (
                              <span key={k} className="font-bold text-[#6200d6]">
                                {part.text}
                              </span>
                            )
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {block.type === "orderedList" && (
                  <ol
                    start={block.start ?? 1}
                    className="mb-8 list-decimal space-y-4 pl-8 font-bold marker:font-bold marker:text-[#6200d6] max-[400px]:mb-5 max-[400px]:space-y-3 max-[400px]:pl-6"
                  >
                    {block.items.map((item, j) => (
                      <li key={j}>
                        <span className="text-[#6200d6]">{item.title}</span>
                        <p className="font-normal text-[#333]">{item.description}</p>

                        {item.bullets && (
                          <ul className="mt-6 space-y-4 font-normal max-[400px]:mt-4 max-[400px]:space-y-3">
                            {item.bullets.map((b, k) => (
                              <li key={k} className="flex items-start gap-4 max-[400px]:gap-3">
                                <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#6200d6] max-[400px]:mt-[7px] max-[400px]:h-2 max-[400px]:w-2" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </React.Fragment>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Criteria;