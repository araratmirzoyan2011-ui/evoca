import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import Navbar from "../Components/Menuall.jsx";

function CreditLoans() {
  const [menuItems, setMenuItems] = useState([]);
  const [creditBlocks, setCreditBlocks] = useState([]);
  const [creditdata, setCreditdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuSnap = await getDocs(
          query(collection(db, "loansMenu"), orderBy("order"))
        );
        setMenuItems(menuSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        const blocksSnap = await getDocs(
          query(collection(db, "creditBlocks"), orderBy("id"))
        );
        setCreditBlocks(blocksSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        const dataSnap = await getDocs(collection(db, "creditdata"));
        setCreditdata(dataSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Սխալ տվյալների բեռնման ժամանակ:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              Կարևոր տեղեկատվություն վարկային պատմության վերաբերյալ
            </h1>

            {creditBlocks.map((b) => {
              if (b.type === "p") {
                return (
                  <p key={b.id} className="mb-6">
                    {b.text.split("**").map((part, i) =>
                      i % 2 ? <strong key={i}>{part}</strong> : part
                    )}
                  </p>
                );
              }

              if (b.type === "sub") {
                return (
                  <div key={b.id} className="mb-4 mt-8 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#6d1fd1]" />
                    <h3 className="text-[16px] font-bold text-black">{b.text}</h3>
                  </div>
                );
              }

              if (b.type === "list") {
                return (
                  <ul
                    key={b.id}
                    className="mb-6 list-disc space-y-3 pl-6 marker:text-[#6d1fd1]"
                  >
                    {b.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              }

              if (b.type === "h2") {
                return (
                  <h2
                    key={b.id}
                    className="mb-4 mt-10 text-[28px] font-medium text-[#333] max-[400px]:text-[22px]"
                  >
                    {b.text}
                  </h2>
                );
              }

              if (b.type === "boldline") {
                return (
                  <p key={b.id} className="mb-4 font-bold text-black">
                    {b.text}
                  </p>
                );
              }

              if (b.type === "links") {
                return (
                  <p key={b.id} className="mb-6">
                    {b.before}
                    {b.links.map((l, i) => (
                      <React.Fragment key={i}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-[#6d1fd1] underline"
                        >
                          {l.label}
                        </a>
                        {i < b.links.length - 2 ? ", " : i === b.links.length - 2 ? " և " : ""}
                      </React.Fragment>
                    ))}
                    {b.after}
                  </p>
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

export default CreditLoans;