import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Menuall.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const annualReports = [
  {
    id: 1,
    title: "2021 Տարեկան հաշվետվություն",
    url: "/files/annual-2021.pdf", // փոխիր իրական հղումով
  },
  {
    id: 2,
    title: "2020 Տարեկան հաշվետվություն",
    url: "/files/annual-2020.pdf",
  },
  {
    id: 3,
    title: "2022 Տարեկան հաշվետվություն",
    url: "/files/annual-2022.pdf",
  },
  {
    id: 4,
    title: "2023 Տարեկան հաշվետվություն",
    url: "/files/annual-2023.pdf",
  },
  {
    id: 5,
    title: "2024 Տարեկան հաշվետվություն",
    url: "/files/annual-2024.pdf",
  },
  {
    id: 6,
    title: "2024 Տարեկան հաշվետվություն",
    url: "/files/annual-2024-2.pdf",
  },
  {
    id: 7,
    title: "2025 տարեկան հաշվետվություն",
    url: "/files/annual-2025.pdf",
  },
];

function AnualReports() {
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

            <div className="space-y-5">
              {annualReports.map((r) => (
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

export default AnualReports;