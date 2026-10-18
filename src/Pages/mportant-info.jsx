import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import Navbar from "../Components/Menuall.jsx";

function ImportantInfo() {
  const [menuItems, setMenuItems] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [creditdata, setCreditdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuSnap, blocksSnap, dataSnap] = await Promise.all([
          getDocs(query(collection(db, "loansMenu"), orderBy("order"))),
          getDocs(query(collection(db, "importantBlocks"), orderBy("order"))),
          getDocs(collection(db, "creditdata")),
        ]);

        setMenuItems(menuSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        // աղյուսակների rows-ը Firestore-ում պահվում է { cells: [...] } տեսքով
        setBlocks(
          blocksSnap.docs.map((d) => {
            const data = d.data();
            return data.type === "table"
              ? { ...data, rows: data.rows.map((r) => r.cells) }
              : data;
          })
        );

        setCreditdata(dataSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Սխալ տվյալների բեռնման ժամանակ:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // **թավ** և [[տեքստ|հղում]] նշումների վերածում JSX-ի
  const renderInline = (text) =>
    text.split(/(\*\*[\s\S]+?\*\*|\[\[[\s\S]+?\]\])/g).map((part, i) => {
      if (part.startsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("[[")) {
        const [label, href] = part.slice(2, -2).split("|");
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="break-words font-medium text-[#6d1fd1] underline"
          >
            {label}
          </a>
        );
      }
      return part;
    });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Բեռնվում է...</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <Navbar items={menuItems} />

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-8 text-[32px] font-medium leading-[40px] text-[#333] max-[400px]:mb-6 max-[400px]:text-[24px] max-[400px]:leading-[30px]">
              Կարևոր տեղեկատվություն
            </h1>

            {blocks.map((b, idx) => {
              if (b.type === "h2") {
                return (
                  <h2
                    key={idx}
                    className="mb-4 mt-10 text-[28px] font-medium leading-[36px] text-[#333] max-[400px]:text-[22px] max-[400px]:leading-[28px]"
                  >
                    {b.text}
                  </h2>
                );
              }

              if (b.type === "sub") {
                return (
                  <div key={idx} className="mb-4 mt-8 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#6d1fd1]" />
                    <h3 className="text-[16px] font-bold text-black">{b.text}</h3>
                  </div>
                );
              }

              if (b.type === "p") {
                return (
                  <p key={idx} className="mb-6 whitespace-pre-line">
                    {renderInline(b.text)}
                  </p>
                );
              }

              if (b.type === "indent") {
                return (
                  <p key={idx} className="mb-3 pl-8">
                    {b.text}
                  </p>
                );
              }

              if (b.type === "boldline") {
                return (
                  <p key={idx} className="mb-4 font-bold text-black">
                    {b.text}
                  </p>
                );
              }

              if (b.type === "list") {
                return (
                  <ul
                    key={idx}
                    className="mb-6 list-disc space-y-3 pl-6 marker:text-[#6d1fd1]"
                  >
                    {b.items.map((item, i) => (
                      <li key={i}>{renderInline(item)}</li>
                    ))}
                  </ul>
                );
              }

              if (b.type === "formula") {
                return (
                  <div
                    key={idx}
                    className="my-6 overflow-x-auto rounded-lg bg-gray-50 px-4 py-4 text-center font-serif text-[18px] italic text-black max-[400px]:text-[15px]"
                  >
                    {b.lines.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                );
              }

              if (b.type === "table") {
                return (
                  <div key={idx} className="mb-8">
                    {b.title && (
                      <p className="mb-4 text-center font-bold text-black">
                        {b.title}
                      </p>
                    )}
                    <div className="overflow-x-auto rounded-lg shadow-md">
                      <table className="w-full min-w-[600px] border-collapse text-left text-[14px]">
                        <thead>
                          <tr>
                            {b.columns.map((c, i) => (
                              <th
                                key={i}
                                className="border border-[#e5d6fa] px-4 py-3 font-semibold text-black"
                              >
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {b.rows.map((row, r) => (
                            <tr key={r}>
                              {row.map((cell, c) => (
                                <td
                                  key={c}
                                  className="whitespace-pre-line border border-[#e5d6fa] px-4 py-3 align-middle"
                                >
                                  {renderInline(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }

              return null;
            })}

            <h2 className="mb-6 mt-10 text-xl font-bold text-gray-900">
              Փաստաթղթեր
            </h2>

            <div className="space-y-5">
              {creditdata.map((r) => (
                <DocumentCard key={r.id} title={r.title} url={r.url} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ImportantInfo;