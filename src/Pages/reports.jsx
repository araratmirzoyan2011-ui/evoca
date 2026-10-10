import React, { useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Menuall.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import { db } from "../firebase.js";
import { doc, writeBatch } from "firebase/firestore";

const menuItems = [
  { label: "Աուդիտորական եզրակացություն", path: "/reports" },
  { label: "Ֆինանսական հաշվետվություններ", path: "/financial-reports" },
  { label: "Ներդրողների համար", path: "/investors" },
  { label: "Կիսամյակային հաշվետվություն", path: "/semiannual-report" },
  { label: "Տարեկան հաշվետվություն", path: "/annual-report" },
];

const documentsList = Array.from({ length: 20 }, (_, i) => {
  const year = 2025 - i;
  return {
    id: String(year),
    year,
    title: `${year} Աուդիտորական եզրակացություն`,
    url: `/files/audit-${year}.pdf`,
  };
});

function Reports() {
  const [seeding, setSeeding] = useState(false);

  const seedFirestore = async () => {
    setSeeding(true);
    try {
      const batch = writeBatch(db);

      // reportsMenu: doc id = index (path-ը "/" է պարունակում, id չի կարող լինել)
      menuItems.forEach((item, index) => {
        batch.set(doc(db, "reportsMenu", String(index + 1).padStart(2, "0")), {
          ...item,
          order: index + 1,
        });
      });

      // auditReports: doc id = տարին
      documentsList.forEach(({ id, ...data }) => {
        batch.set(doc(db, "auditReports", id), data);
      });

      await batch.commit();
      alert("Պատրաստ է. reportsMenu և auditReports collection-ները ստեղծվեցին։");
    } catch (err) {
      console.error(err);
      alert("Սխալ՝ " + err.message);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-bold text-gray-900">
            Աուդիտորական եզրակացություն
          </h1>

          {/* ժամանակավոր, seed-ից հետո ջնջիր */}
          <button
            onClick={seedFirestore}
            disabled={seeding}
            className="px-4 py-2 rounded bg-[#6200d9] text-white text-sm disabled:opacity-50"
          >
            {seeding ? "Գրվում է..." : "Seed Firestore"}
          </button>
        </div>

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
      </main>

      <Footer />
    </>
  );
}

export default Reports;