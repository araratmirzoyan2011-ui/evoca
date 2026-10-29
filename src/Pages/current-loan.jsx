import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import { OnlineBanking } from "../Components/OnlineBanking.jsx";
import CardHero from "../Components/CardHero.jsx";
import LoanTariff from "../Components/LoanTariff.jsx";
import SeedLoanDetails from "../Components/SeedLoanDetails.jsx";
const tabs = [
  { key: "about", label: "Վարկի մասին" },
  { key: "conditions", label: "Պայմաններ" },
  { key: "documents", label: "Պահանջվող փաստաթղթերի ցանկ" },
];

const LoanDetails = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
    const stats = loan?.stats ?? [];
  const details = loan?.details ?? [];
    const renderHighlighted = (text) => text;
  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const snap = await getDoc(doc(db, "loans", id));
        if (snap.exists()) {
          setLoan({ ...snap.data(), docId: snap.id });
        } else {
          setError("Վարկը չի գտնվել");
        }
      } catch (e) {
        console.error(e);
        setError("Չհաջողվեց բեռնել տվյալները");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id]);

 return (
    <>
      <Header />

      {loan && (
        <CardHero
          title={loan.title}
          description={loan.description}
          image={loan.imageSrc}
        />
      )}

      <div className="container mx-auto px-4 mt-10">
        {loading && <p className="text-center">Բեռնվում է...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {loan && (
          <>
            {/* Tab-երի տող */}
            <div className="flex gap-10 border-b border-gray-200 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-4 whitespace-nowrap text-sm font-semibold cursor-pointer transition-colors border-b-4 -mb-px ${
                    activeTab === tab.key
                      ? "text-gray-900 border-purple-700"
                      : "text-gray-500 border-transparent hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-8">
              {activeTab === "about" && (
  <div
    className={`grid items-start gap-10 ${
      stats.length > 0
        ? "lg:grid-cols-[minmax(0,570px)_minmax(0,657px)] lg:justify-between"
        : "flex justify-center"
    }`}
  >
    <div
      className={`space-y-6 text-[18px] leading-[26px] text-gray-950 ${
        stats.length === 0 ? "max-w-[700px] mx-auto w-full text-center" : ""
      }`}
    >
      {details.map((paragraph, index) => (
        <p key={index}>{renderHighlighted(paragraph)}</p>
      ))}
    </div>

    {stats.length > 0 && <LoanTariff stats={stats} />}
  </div>
)}
              {activeTab === "conditions" && <div>
               
                </div>}
              {activeTab === "documents" && <div>{/* loan.documents */}</div>}
            </div>
          </>
        )}
      </div>

      <OnlineBanking />
      <Footer />
    </>
  );
};
export default LoanDetails