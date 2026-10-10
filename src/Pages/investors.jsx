import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Menuall.jsx";
import PresentationCard from "../Components/PresentationCard.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function InvestReports() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const investorPresentations = [
    {
      year: 2026,
      presentations: [
        {
          title: "Q1 2026",
          image: "https://www.evoca.am/images-cache/presentations/1/178056974111/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/17815227523432.pdf",
        },
        {
          title: "Q2 2026",
          image: "https://www.evoca.am/images-cache/presentations/1/17878389620338/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/1787838962036.pdf",
        },
      ],
    },
    {
      year: 2025,
      presentations: [
        {
          title: "Q1 2025",
          image: "https://www.evoca.am/images-cache/presentations/1/1770815788229/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/17470583456152.pdf",
        },
        {
          title: "Q2 2025",
          image: "https://www.evoca.am/images-cache/presentations/1/17664748278434/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/17663899054056.pdf",
        },
        {
          title: "Q3 2025",
          image: "https://www.evoca.am/images-cache/presentations/1/17664748747987/310x249.jpg",
          url: "http://evoca2025q1.tilda.ws/evocabankir-q32025",
        },
        {
          title: "Q4 2025",
          image: "https://www.evoca.am/images-cache/presentations/1/17708157882398/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/17713982923618.pdf",
        },
      ],
    },
    {
      year: 2024,
      presentations: [
        {
          title: "Q1 2024",
          image: "https://www.evoca.am/images-cache/presentations/1/17302985228644/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/17302985228655.pdf",
        },
        {
          title: "Q2 2024",
          image: "https://www.evoca.am/images-cache/presentations/1/1730298522869/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/17302987788269.pdf",
        },
        {
          title: "Q3 2024",
          image: "https://www.evoca.am/images-cache/presentations/1/17314145677663/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/17314140720543.pdf",
        },
        {
          title: "Q4 2024",
          image: "https://www.evoca.am/images-cache/presentations/1/17387814643422/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/17394717404736.pdf",
        },
      ],
    },
    {
      year: 2023,
      presentations: [
        {
          title: "Q1 2023",
          image: "https://www.evoca.am/images-cache/presentations/1/17302968217456/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/1730296821747.pdf",
        },
        {
          title: "Q2 2023",
          image: "https://www.evoca.am/images-cache/presentations/1/17302969174799/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/17302969174812.pdf",
        },
        {
          title: "Q3 2023",
          image: "https://www.evoca.am/images-cache/presentations/1/17302969839597/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/17302969839608.pdf",
        },
        {
          title: "Q4 2023",
          image: "https://www.evoca.am/images-cache/presentations/1/17302970478884/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/17302970478894.pdf",
        },
      ],
    },
    {
      year: 2022,
      presentations: [
        {
          title: "Q1 2022",
          image: "https://www.evoca.am/images-cache/presentations/1/16524487203697/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/16524487203708.pdf",
        },
        {
          title: "Q2 2022",
          image: "https://www.evoca.am/images-cache/presentations/1/16596266074476/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/16596266074488.pdf",
        },
        {
          title: "Q3 2022",
          image: "https://www.evoca.am/images-cache/presentations/1/16673786499924/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/16673786499937.pdf",
        },
      ],
    },
    {
      year: 2021,
      presentations: [
        {
          title: "Q1 2021",
          image: "https://www.evoca.am/images-cache/presentations/1/16214240534691/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/16214240534699.pdf",
        },
        {
          title: "Q2 2021",
          image: "https://www.evoca.am/images-cache/presentations/1/16306514387262/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/16306514387274.pdf",
        },
        {
          title: "Q3 2021",
          image: "https://www.evoca.am/images-cache/presentations/1/16386106744165/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/16386106744178.pdf",
        },
        {
          title: "Q4 2021",
          image: "https://www.evoca.am/images-cache/presentations/1/16458579670074/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/16458579670083.pdf",
        },
      ],
    },
    {
      year: 2020,
      presentations: [
        {
          title: "Q1 2020",
          image: "https://www.evoca.am/images-cache/presentations/1/16164091530204/310x249.jpg",
          url: "https://www.evoca.am/files/presentations/1/16164091530214.pdf",
        },
        {
          title: "Q2 2020",
          image: "https://www.evoca.am/images-cache/presentations/1/16164091530255/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/16164091530299.pdf",
        },
        {
          title: "Q3 2020",
          image: "https://www.evoca.am/images-cache/presentations/1/16164091530333/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/1616409153034.pdf",
        },
        {
          title: "Q4 2020",
          image: "https://www.evoca.am/images-cache/presentations/1/16164091530349/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/16164091530356.pdf",
        },
      ],
    },
    {
      year: 2019,
      presentations: [
        {
          title: "Q3 2019",
          image: "https://www.evoca.am/images-cache/presentations/1/16164099260851/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/1616409926086.pdf",
        },
        {
          title: "Q4 2019",
          image: "https://www.evoca.am/images-cache/presentations/1/161640992609/310x249.png",
          url: "https://www.evoca.am/files/presentations/1/16164099260962.pdf",
        },
      ],
    },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const menuSnap = await getDocs(query(collection(db, "reportsMenu"), orderBy("order")));
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

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-12">
          Ներդրողների համար
        </h1>

        <div className="space-y-10">
          {investorPresentations.map((y) => (
            <section key={y.year}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-5">
                {y.year}
              </h2>

              <div className="bg-gradient-to-b from-gray-100 to-purple-50 p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {y.presentations.map((p) => (
                    <a
                      key={p.title}
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <PresentationCard imageSrc={p.image} title={p.title} />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default InvestReports;