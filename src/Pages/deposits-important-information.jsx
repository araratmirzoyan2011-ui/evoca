import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { db } from "../firebase.js";
import { DocumentCard } from '../Components/DocumentCard';
import { collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';
import SocialIcons from '../Components/SocialIcons.jsx';

const DepositImportant = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [depositBlocks, setDepositBlocks] = useState([]);
  const [accordionData, setAccordionData] = useState([]);
  const [depositdata, setDepositdata] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIdx, setOpenIdx] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const menuSnap = await getDocs(
          query(collection(db, "DepositMenu"), orderBy("order"))
        );
        setMenuItems(menuSnap.docs.map((d) => d.data()));

        const blocksSnap = await getDocs(collection(db, "depositBlocks"));
        setDepositBlocks(blocksSnap.docs.map((d) => d.data()));

        const accordionSnap = await getDocs(collection(db, "accordionData"));
        setAccordionData(accordionSnap.docs.map((d) => d.data()));

        const depositDataSnap = await getDocs(collection(db, "depositdata"));
        setDepositdata(depositDataSnap.docs.map((d) => ({ docId: d.id, ...d.data() })));

      } catch (e) {
        console.error(e);
        setError("Չհաջողվեց բեռնել տվյալները");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUploadToFirebase = async () => {
    try {
      setUploading(value => !value);
      alert("Տվյալները պատրաստ են կամ արդեն վերբեռնված են Firebase-ում:");
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };
  const renderInline = (text) => {
    if (!text) return "";
    return text.split(/(\*\*[\s\S]+?\*\*|\[\[[\s\S]+?\]\])/g).map((part, i) => {
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
  };

  const renderBlock = (b) => {
    if (b.type === "h2") {
      return (
        <h2 className="mb-6 mt-4 text-[28px] font-medium leading-[36px] text-[#333] max-[400px]:text-[22px] max-[400px]:leading-[28px]">
          {b.text}
        </h2>
      );
    }

    if (b.type === "p") {
      return <p className="mb-4 whitespace-pre-line">{renderInline(b.text)}</p>;
    }

    if (b.type === "numlist") {
      return (
        <ol
          start={b.start || 1}
          className="mb-6 list-decimal space-y-4 pl-8 marker:font-bold marker:text-[#6d1fd1]"
        >
          {b.items?.map((item, i) => (
            <li key={i} className="pl-2">
              <span className="whitespace-pre-line">{renderInline(item.text)}</span>
              {item.sub && (
                <ol className="mt-4 list-decimal space-y-4 pl-8 marker:font-bold marker:text-[#6d1fd1]">
                  {item.sub.map((s, j) => (
                    <li key={j} className="pl-2">{renderInline(s)}</li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      );
    }

    if (b.type === "list") {
      return (
        <ul className="mb-6 list-disc space-y-3 pl-6 marker:text-[#6d1fd1]">
          {b.items?.map((item, i) => {
            const text = typeof item === "string" ? item : item.text;
            const sub = typeof item === "string" ? null : item.sub;
            return (
              <li key={i}>
                {renderInline(text)}
                {sub && (
                  <ul className="mt-3 list-disc space-y-3 pl-6 marker:text-[#6d1fd1]">
                    {sub.map((s, j) => (
                      <li key={j}>{renderInline(s)}</li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      );
    }

    if (b.type === "formula") {
      return (
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-50 px-4 py-4 text-center font-serif text-[18px] italic text-black max-[400px]:text-[15px]">
          {b.lines?.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      );
    }

    if (b.type === "table") {
      return (
        <div className="mb-8">
          {b.title && (
            <p className="mb-3 text-center font-bold text-black">{b.title}</p>
          )}
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
              <thead>
                <tr>
                  {b.columns?.map((c, i) => (
                    <th
                      key={i}
                      className="border border-[#e5d6fa] px-3 py-3 font-semibold text-black"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows?.map((row, r) =>
                  row.group ? (
                    <tr key={r}>
                      <td
                        colSpan={b.columns?.length}
                        className="border border-[#e5d6fa] bg-[#f3ecff] px-3 py-2 font-bold text-black"
                      >
                        {row.group}
                      </td>
                    </tr>
                  ) : (
                    <tr key={r}>
                      {row.cells?.map((cell, c) => (
                        <td
                          key={c}
                          className="whitespace-pre-line border border-[#e5d6fa] px-3 py-3 align-middle"
                        >
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return null;
  };

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
            
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-[32px] font-medium leading-[40px] text-[#333] max-[400px]:text-[24px] max-[400px]:leading-[30px]">
                Կարևոր տեղեկատվություն
              </h1>
            </div>

            {loading && <p>Բեռնվում է...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {depositBlocks.map((b, idx) => (
              <React.Fragment key={idx}>{renderBlock(b)}</React.Fragment>
            ))}

            <h2 className="mb-6 mt-10 text-[24px] font-bold uppercase text-black max-[400px]:text-[18px]">
              Անհրաժեշտ տեղեկատվություն
            </h2>

            <div className="space-y-3">
              {accordionData.map((acc, i) => (
                <div key={i} className="rounded-lg border border-[#e5d6fa]">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16px] font-bold text-black"
                  >
                    <span>{acc.title}</span>
                    <span
                      className={`shrink-0 text-[#6d1fd1] transition-transform ${
                        openIdx === i ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {openIdx === i && (
                    <div className="border-t border-[#e5d6fa] px-5 py-5">
                      {acc.blocks?.map((b, j) => (
                        <React.Fragment key={j}>{renderBlock(b)}</React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h2 className="mb-6 mt-10 text-xl font-bold text-gray-900">
              Փաստաթղթեր
            </h2>

            <div className="space-y-5">
              {depositdata.map((r) => (
                <DocumentCard key={r.docId || r.id} title={r.title} url={r.url} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default DepositImportant;