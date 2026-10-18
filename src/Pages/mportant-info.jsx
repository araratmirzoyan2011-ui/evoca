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
  const [creditdata, setCreditdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuSnap = await getDocs(
          query(collection(db, "loansMenu"), orderBy("order"))
        );
        setMenuItems(menuSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

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