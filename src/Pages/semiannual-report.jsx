import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Menuall.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const semiAnnualReports = [
  {
    id: 1,
    title: "Կիսամյակային հաշվետվություն (2025 առաջին կիսամյակ)",
    url: "/files/semi-annual-2025.pdf", // փոխիր իրական հղումով
  },
  {
    id: 2,
    title: "Կիսամյակային հաշվետվություն (2024 առաջին կիսամյակ)",
    url: "/files/semi-annual-2024.pdf",
  },
  {
    id: 3,
    title: "Կիսամյակային հաշվետվություն (2023 առաջին կիսամյակ)",
    url: "/files/semi-annual-2023.pdf",
  },
  {
    id: 4,
    title: "Կիսամյակային հաշվետվություն (2022 առաջին կիսամյակ)",
    url: "/files/semi-annual-2022.pdf",
  },
  {
    id: 5,
    title: "Կիսամյակային հաշվետվություն (2021 առաջին կիսամյակ)",
    url: "/files/semi-annual-2021.pdf",
  },
];



function SemReports() {
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
          Կիսամյակային հաշվետվություն
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
              {semiAnnualReports.map((r) => (
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

export default SemReports;