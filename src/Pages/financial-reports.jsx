import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Menuall.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function FinReports() {
  const [menuItems, setMenuItems] = useState([]);
  const [finReports, setFinReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [menuSnap, reportsSnap] = await Promise.all([
          getDocs(query(collection(db, "reportsMenu"), orderBy("order"))),
          getDocs(query(collection(db, "finReports"), orderBy("year", "desc"))),
        ]);

        setMenuItems(menuSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setFinReports(reportsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
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

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-12">
          Ֆինանսական հաշվետվություններ
        </h1>

        {loading && <p className="text-gray-500">Բեռնվում է...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {finReports.map((y) => (
              <section key={y.id}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-5">
                  {y.year}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {y.reports.map((r) => (
                    <DocumentCard key={r.title} title={r.title} url={r.url} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default FinReports;