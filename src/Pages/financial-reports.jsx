import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Menuall.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function FinReports() {
  const [menuItems, setMenuItems] = useState([]);
  const [documentsList, setDocumentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [menuSnap] = await Promise.all([
          getDocs(query(collection(db, "reportsMenu"), orderBy("order"))),
        ]);

        setMenuItems(menuSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
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
          Աուդիտորական եզրակացություն
        </h1>

        {loading && <p className="text-gray-500">Բեռնվում է...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8">
            {documentsList.map((d) => (
              <section key={d.id}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-5">
                  {d.year}
                </h2>
                <DocumentCard title={d.title} url={d.url} />
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