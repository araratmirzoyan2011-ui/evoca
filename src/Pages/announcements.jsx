import React, { useMemo, useState, useEffect } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import AccordionItem from "../Components/announcements-accordion.jsx";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

const ITEMS_PER_PAGE = 6;

const toISO = (d) => {
  if (!d) return "";
  const [dd, mm, yyyy] = d.split(".");
  return `${yyyy}-${mm}-${dd}`;
};

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const Announcements = () => {
  const [announcementsPages, setAnnouncementsPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchFromFirebase = async () => {
      try {
        setLoading(true);
        const fetchedPages = [];

        for (let i = 1; i <= 8; i++) {
          const querySnapshot = await getDocs(collection(db, `announcements_page${i}`));
          const pageItems = [];
          
          querySnapshot.forEach((doc) => {
            pageItems.push({ id: doc.id, ...doc.data() });
          });

          pageItems.sort((a, b) => Number(a.id) - Number(b.id));

          fetchedPages.push(pageItems);
        }

        setAnnouncementsPages(fetchedPages);
      } catch (error) {
        console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFromFirebase();
  }, []);

  const isFiltering = Boolean(from || to);

  const pages = useMemo(() => {
    if (announcementsPages.length === 0) return [];
    if (!isFiltering) return announcementsPages;

    const filtered = announcementsPages.flat().filter((a) => {
      const iso = toISO(a.date);
      if (from && iso < from) return false;
      if (to && iso > to) return false;
      return true;
    });
    return chunk(filtered, ITEMS_PER_PAGE);
  }, [announcementsPages, from, to, isFiltering]);

  const totalPages = Math.max(1, pages.length);
  const currentItems = pages[page - 1] || [];

  const goTo = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />

      <main className="bg-[#f3f2fa] min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Title + date filter */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Հայտարարություններ
            </h1>

            <div className="flex items-center gap-3 text-xs text-gray-600">
              <svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                />
              </svg>
              <input
                type="date"
                aria-label="Սկսած"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none focus:border-purple-700"
              />
              <span>-</span>
              <input
                type="date"
                aria-label="Մինչև"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none focus:border-purple-700"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            {loading ? (
              <p className="text-gray-500 text-center py-10">Բեռնվում է տվյալները Firebase-ից...</p>
            ) : currentItems.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                Հայտարարություններ չեն գտնվել
              </p>
            ) : (
              currentItems.map((a) => (
                <AccordionItem
                  key={a.id}
                  title={a.title}
                  date={a.date}
                  description={a.description}
                  items={a.items}
                />
              ))
            )}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-6 mt-8 select-none">
                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  className={`text-2xl ${
                    page === 1
                      ? "text-gray-300 cursor-default"
                      : "text-purple-700 cursor-pointer"
                  }`}
                  aria-label="Նախորդ"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => goTo(p)}
                      className={`w-9 h-9 rounded-full text-sm font-bold cursor-pointer transition-colors ${
                        p === page
                          ? "bg-purple-700 text-white"
                          : "text-gray-800 hover:text-purple-700"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => goTo(page + 1)}
                  disabled={page === totalPages}
                  className={`text-2xl ${
                    page === totalPages
                      ? "text-gray-300 cursor-default"
                      : "text-purple-700 cursor-pointer"
                  }`}
                  aria-label="Հաջորդ"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Announcements;