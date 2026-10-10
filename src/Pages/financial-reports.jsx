import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Menuall.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const finReports = [
  {
    year: 2026,
    reports: [
      { title: "1-2026", url: "/files/fin-2026-q1.pdf" },
      { title: "2-2026", url: "/files/fin-2026-q2.pdf" },
    ],
  },
  {
    year: 2025,
    reports: [
      { title: "1-2025", url: "/files/fin-2025-q1.pdf" },
      { title: "2-2025", url: "/files/fin-2025-q2.pdf" },
      { title: "3-2025", url: "/files/fin-2025-q3.pdf" },
      { title: "4-2025", url: "/files/fin-2025-q4.pdf" },
    ],
  },
  {
    year: 2024,
    reports: [
      { title: "1-2024", url: "/files/fin-2024-q1.pdf" },
      { title: "2-2024", url: "/files/fin-2024-q2.pdf" },
      { title: "3-2024", url: "/files/fin-2024-q3.pdf" },
      { title: "4-2024", url: "/files/fin-2024-q4.pdf" },
    ],
  },
  {
    year: 2023,
    reports: [
      { title: "1-2023", url: "/files/fin-2023-q1.pdf" },
      { title: "2-2023", url: "/files/fin-2023-q2.pdf" },
      { title: "3-2023", url: "/files/fin-2023-q3.pdf" },
      { title: "4-2023", url: "/files/fin-2023-q4.pdf" },
    ],
  },
  {
    year: 2022,
    reports: [
      { title: "1-2022", url: "/files/fin-2022-q1.pdf" },
      { title: "2-2022", url: "/files/fin-2022-q2.pdf" },
      { title: "3-2022", url: "/files/fin-2022-q3.pdf" },
      { title: "4-2022", url: "/files/fin-2022-q4.pdf" },
    ],
  },
  {
    year: 2021,
    reports: [
      { title: "1-2021", url: "/files/fin-2021-q1.pdf" },
      { title: "2-2021", url: "/files/fin-2021-q2.pdf" },
      { title: "3-2021", url: "/files/fin-2021-q3.pdf" },
      { title: "4-2021", url: "/files/fin-2021-q4.pdf" },
    ],
  },
  {
    year: 2020,
    reports: [
      { title: "1-2020", url: "/files/fin-2020-q1.pdf" },
      { title: "2-2020", url: "/files/fin-2020-q2.pdf" },
      { title: "3-2020", url: "/files/fin-2020-q3.pdf" },
      { title: "4-2020", url: "/files/fin-2020-q4.pdf" },
    ],
  },
  {
    year: 2019,
    reports: [
      { title: "1-2019", url: "/files/fin-2019-q1.pdf" },
      { title: "2-2019", url: "/files/fin-2019-q2.pdf" },
      { title: "3-2019", url: "/files/fin-2019-q3.pdf" },
      { title: "4-2019", url: "/files/fin-2019-q4.pdf" },
    ],
  },
  {
    year: 2018,
    reports: [
      { title: "1-2018", url: "/files/fin-2018-q1.pdf" },
      { title: "2-2018", url: "/files/fin-2018-q2.pdf" },
      { title: "3-2018", url: "/files/fin-2018-q3.pdf" },
      { title: "4-2018", url: "/files/fin-2018-q4.pdf" },
    ],
  },
  {
    year: 2017,
    reports: [
      { title: "1-2017", url: "/files/fin-2017-q1.pdf" },
      { title: "2-2017", url: "/files/fin-2017-q2.pdf" },
      { title: "3-2017", url: "/files/fin-2017-q3.pdf" },
      { title: "4-2017", url: "/files/fin-2017-q4.pdf" },
    ],
  },
  {
    year: 2016,
    reports: [
      { title: "1-2016", url: "/files/fin-2016-q1.pdf" },
      { title: "2-2016", url: "/files/fin-2016-q2.pdf" },
      { title: "3-2016", url: "/files/fin-2016-q3.pdf" },
      { title: "4-2016", url: "/files/fin-2016-q4.pdf" },
      { title: "Տարեկան 2016", url: "/files/fin-2016-annual.pdf" },
    ],
  },
  {
    year: 2015,
    reports: [
      { title: "1-2015", url: "/files/fin-2015-q1.pdf" },
      { title: "2-2015", url: "/files/fin-2015-q2.pdf" },
      { title: "3-2015", url: "/files/fin-2015-q3.pdf" },
      { title: "4-2015", url: "/files/fin-2015-q4.pdf" },
      { title: "Տարեկան 2015", url: "/files/fin-2015-annual.pdf" },
    ],
  },
  {
    year: 2014,
    reports: [
      { title: "1-2014", url: "/files/fin-2014-q1.pdf" },
      { title: "2-2014", url: "/files/fin-2014-q2.pdf" },
      { title: "3-2014", url: "/files/fin-2014-q3.pdf" },
      { title: "4-2014", url: "/files/fin-2014-q4.pdf" },
      { title: "Տարեկան 2014", url: "/files/fin-2014-annual.pdf" },
    ],
  },
  {
    year: 2013,
    reports: [
      { title: "1-2013", url: "/files/fin-2013-q1.pdf" },
      { title: "2-2013", url: "/files/fin-2013-q2.pdf" },
      { title: "3-2013", url: "/files/fin-2013-q3.pdf" },
      { title: "4-2013", url: "/files/fin-2013-q4.pdf" },
      { title: "Տարեկան 2013", url: "/files/fin-2013-annual.pdf" },
    ],
  },
  {
    year: 2012,
    reports: [
      { title: "1-2012", url: "/files/fin-2012-q1.pdf" },
      { title: "2-2012", url: "/files/fin-2012-q2.pdf" },
      { title: "3-2012", url: "/files/fin-2012-q3.pdf" },
      { title: "4-2012", url: "/files/fin-2012-q4.pdf" },
      { title: "Տարեկան 2012", url: "/files/fin-2012-annual.pdf" },
    ],
  },
  {
    year: 2011,
    reports: [
      { title: "1-2011", url: "/files/fin-2011-q1.pdf" },
      { title: "2-2011", url: "/files/fin-2011-q2.pdf" },
      { title: "3-2011", url: "/files/fin-2011-q3.pdf" },
      { title: "4-2011", url: "/files/fin-2011-q4.pdf" },
      { title: "Տարեկան 2011", url: "/files/fin-2011-annual.pdf" },
    ],
  },
  {
    year: 2010,
    reports: [
      { title: "1-2010", url: "/files/fin-2010-q1.pdf" },
      { title: "2-2010", url: "/files/fin-2010-q2.pdf" },
      { title: "3-2010", url: "/files/fin-2010-q3.pdf" },
      { title: "4-2010", url: "/files/fin-2010-q4.pdf" },
      { title: "Տարեկան 2010", url: "/files/fin-2010-annual.pdf" },
    ],
  },
];

function FinReports() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "reportsMenu"), orderBy("order"))
        );
        setMenuItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      }
    };

    loadMenu();
  }, []);

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-12">
          Ֆինանսական հաշվետվություններ
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {finReports.map((y) => (
            <section key={y.year}>
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
      </main>

      <Footer />
    </>
  );
}

export default FinReports;