import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Menuall.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function AnualReports() {
  const [menuItems, setMenuItems] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [menuSnap, reportsSnap] = await Promise.all([
          getDocs(query(collection(db, "reportsMenu"), orderBy("order"))),
          getDocs(query(collection(db, "annualReports"), orderBy("order"))),
        ]);

        setMenuItems(menuSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setReports(reportsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
        setError("Չհաջողվեց բեռնել տվյալները։");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <main className="max-w-[1040px] mx-auto px-4 pb-16">
        <h1 className="mt-6 md:ml-[140px] text-3xl md:text-[34px] font-medium text-[#333]">
          Տարեկան հաշվետվություն
        </h1>

        <div className="mt-12 flex flex-col md:flex-row">
          <aside className="md:w-[60px] shrink-0 mb-6 md:mb-0">
            <div className="md:sticky md:top-24">
              <SocialIcons />
            </div>
          </aside>

          <section className="flex-1 md:pl-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Փաստաթղթեր
            </h2>

            {loading && <p className="text-gray-500">Բեռնվում է...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
              <div className="space-y-5">
                {reports.map((r) => (
                  <DocumentCard key={r.id} title={r.title} url={r.url} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AnualReports;