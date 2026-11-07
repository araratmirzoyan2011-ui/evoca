import React, { useEffect, useState, useMemo } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import Navbar from "../Components/Menuall.jsx";
import { useLocalized } from "../hooks/useLocalized.js";
import i18n from "i18next";

function CreditLoans() {
  const [menuItems, setMenuItems] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [creditdata, setCreditdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const l = useLocalized();

  // Ապահովում ենք, որ i18n լեզուն փոխվելիս էջը վերառենդերվի
  const [, setForceUpdate] = useState(0);
  useEffect(() => {
    const handleLanguageChanged = () => setForceUpdate((prev) => prev + 1);
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuSnap, blocksSnap, dataSnap] = await Promise.all([
          getDocs(query(collection(db, "loansMenu"), orderBy("order"))),
          getDocs(query(collection(db, "creditBlocks"), orderBy("id"))), // id-ով կարգավորում, որ համընկնի բազայի հետ
          getDocs(collection(db, "creditdata")),
        ]);

        setMenuItems(menuSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        setBlocks(
          blocksSnap.docs.map((d) => {
            const data = d.data();
            return data.type === "table" && data.rows
              ? { ...data, rows: data.rows.map((r) => r.cells || r) }
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

  const localizedMenuItems = useMemo(() => {
    const currentLang = i18n.language || "hy";

    return menuItems.map((item) => {
      let titleText = "";

      if (Array.isArray(item.label)) {
        const found = item.label.find((obj) => obj[currentLang]);
        titleText = found ? found[currentLang] : item.label[0]?.hy || item.label[0]?.en || "";
      } else {
        titleText = l(item.label) || l(item.title) || l(item.name);
      }

      return {
        ...item,
        title: titleText,
        name: titleText,
        label: titleText,
      };
    });
  }, [menuItems, l, i18n.language]);

  const renderInline = (text) => {
    const localizedText = l(text);
    if (typeof localizedText !== "string") return localizedText || "";

    return localizedText.split(/(\*\*[\s\S]+?\*\*|\[\[[\s\S]+?\]\])/g).map((part, i) => {
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

      <Navbar items={localizedMenuItems} />

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-8 text-[32px] font-medium leading-[40px] text-[#333] max-[400px]:mb-6 max-[400px]:text-[24px] max-[400px]:leading-[30px]">
              {l({
                hy: "Կարևոր տեղեկատվություն վարկային պատմության վերաբերյալ",
                en: "Important information regarding credit history",
                ru: "Важная информация о кредитной истории",
              })}
            </h1>

            {blocks.map((b, idx) => {
              if (b.type === "p") {
                return (
                  <p key={idx} className="mb-6 whitespace-pre-line">
                    {renderInline(b.text)}
                  </p>
                );
              }

              if (b.type === "sub") {
                return (
                  <div key={idx} className="mb-4 mt-8 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#6d1fd1]" />
                    <h3 className="text-[16px] font-bold text-black">{renderInline(b.text)}</h3>
                  </div>
                );
              }

              if (b.type === "list") {
                return (
                  <ul
                    key={idx}
                    className="mb-6 list-disc space-y-3 pl-6 marker:text-[#6d1fd1]"
                  >
                    {b.items &&
                      b.items.map((item, i) => (
                        <li key={i}>{renderInline(item)}</li>
                      ))}
                  </ul>
                );
              }

              if (b.type === "h2") {
                return (
                  <h2
                    key={idx}
                    className="mb-4 mt-10 text-[28px] font-medium text-[#333] max-[400px]:text-[22px]"
                  >
                    {renderInline(b.text)}
                  </h2>
                );
              }

              if (b.type === "boldline") {
                return (
                  <p key={idx} className="mb-4 font-bold text-black">
                    {renderInline(b.text)}
                  </p>
                );
              }

              if (b.type === "links") {
                return (
                  <p key={idx} className="mb-6">
                    {renderInline(b.before)}
                    {b.links &&
                      b.links.map((linkItem, i) => (
                        <React.Fragment key={i}>
                          <a
                            href={linkItem.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-[#6d1fd1] underline"
                          >
                            {l(linkItem.label)}
                          </a>
                          {i < b.links.length - 2
                            ? ", "
                            : i === b.links.length - 2
                            ? i18n.language === "ru"
                              ? " и "
                              : i18n.language === "en"
                              ? " and "
                              : " և "
                            : ""}
                        </React.Fragment>
                      ))}
                    {renderInline(b.after)}
                  </p>
                );
              }

              return null;
            })}

            <h2 className="mb-6 mt-10 text-xl font-bold text-gray-900">
              {l({
                hy: "Փաստաթղթեր",
                en: "Documents",
                ru: "Документы",
              })}
            </h2>

            <div className="space-y-5">
              {creditdata.map((r) => (
                <DocumentCard key={r.id} title={l(r.title)} url={r.url} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default CreditLoans;