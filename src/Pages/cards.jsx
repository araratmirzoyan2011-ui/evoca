import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import CardItem from "../Components/CardItem";

const ITEMS_PER_PAGE = 20;

const Cards = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const filterCategories = [
    { id: "all", label: "Բոլորը" },
    { id: "premium", label: "Պրեմիում" },
    { id: "gift-cards", label: "Նվեր քարտեր" },
    { id: "digital", label: "Թվային քարտեր" },
    { id: "arca", label: "arca" },
    { id: "visa", label: "VISA" },
    { id: "master", label: "mastercard" },
    { id: "unionpay", label: "UnionPay" },
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "CardmenuItems"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(items);
      } catch (error) {
        console.error("Սխալ տվյալների բեռնման ժամանակ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const filteredCards =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((card) => {
          if (Array.isArray(card.category)) {
            return card.category.includes(activeCategory);
          }
          return card.category === activeCategory;
        });

  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = filteredCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-[1310px] w-full mx-auto px-4 py-8">
        <h1 className="text-[36px] font-bold text-black mb-8">Քարտեր</h1>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          {filterCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#6a00d8] text-white shadow-md"
                    : "bg-[#f3f3f5] text-gray-800 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#6a00d8] font-medium">Բեռնվում է...</div>
        ) : (
          <div>
            {currentCards.length > 0 ? (
              currentCards.map((card) => <CardItem key={card.id} card={card} />)
            ) : (
              <div className="text-center py-20 text-gray-500">
                Այս կատեգորիայում քարտեր չեն գտնվել:
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12 mb-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full transition ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:text-[#6a00d8]"
                  }`}
                  aria-label="Previous Page"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-full text-base font-semibold flex items-center justify-center transition ${
                      currentPage === page
                        ? "bg-[#6a00d8] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full transition ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-[#6a00d8] hover:opacity-80"
                  }`}
                  aria-label="Next Page"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cards;