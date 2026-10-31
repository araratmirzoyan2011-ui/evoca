import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Header } from "../Components/Header";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer";
import { OnlineBanking } from "../Components/OnlineBanking.jsx";
import CardHero from "../Components/CardHero.jsx";
import LoanTariff from "../Components/LoanTariff.jsx";
import LoanConditions from "../Components/LoanConditions.jsx";
import LoanDocuments from "../Components/LoanDocuments.jsx";
import LoanSlider from "../Components/LoanSlider.jsx";
import InfoBanner from "../Components/infoBanner.jsx";

const tabs = [
  { key: "about", label: "Վարկի մասին" },
  { key: "conditions", label: "Պայմաններ",hideForBusiness: true, },
  {
    key: "documents",
    label: "Պահանջվող փաստաթղթերի ցանկ",
    hideForBusiness: true,
  },
];

// «Evocabank» բառը ընդգծում է մանուշակագույնով
const renderHighlighted = (text = "") =>
  text.split(/(Evocabank)/g).map((part, i) =>
    part === "Evocabank" ? (
      <span key={i} className="text-[#6a00d8]">
        {part}
      </span>
    ) : (
      part
    )
  );

// Տվյալների աղբյուրը ըստ տիպի
const fetchLoanById = async (id, isBusiness) => {
  if (isBusiness) {
    // Բիզնես վարկերը մեկ փաստաթղթում են՝ loans զանգվածով
    const snap = await getDoc(doc(db, "businessLoansCollection", "main"));
    if (!snap.exists()) return null;
    const found = (snap.data().loans || []).find(
      (l) => String(l.id) === String(id)
    );
    return found ? { ...found, docId: String(found.id) } : null;
  }

  // Սովորական վարկեր՝ առանձին փաստաթուղթ loans կոլեկցիայում
  const snap = await getDoc(doc(db, "loans", id));
  return snap.exists() ? { ...snap.data(), docId: snap.id } : null;
};

const LoanDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isBusiness = searchParams.get("type") === "business";

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  const stats = loan?.stats ?? [];
  const details = loan?.details ?? [];

  // Բիզնես վարկերի համար «Փաստաթղթեր» tab-ը չի երևում
  const visibleTabs = tabs.filter((tab) => !(isBusiness && tab.hideForBusiness));

  useEffect(() => {
    const fetchLoan = async () => {
      setLoading(true);
      setError(null);
      setActiveTab("about");

      try {
        const data = await fetchLoanById(id, isBusiness);
        if (data) {
          setLoan(data);
        } else {
          setLoan(null);
          setError("Վարկը չի գտնվել");
        }
      } catch (e) {
        console.error(e);
        setLoan(null);
        setError("Չհաջողվեց բեռնել տվյալները");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, isBusiness]);

  return (
    <>
      {isBusiness ? <BusinessHeader /> : <Header />}

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
              {visibleTabs.map((tab) => (
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
                      stats.length === 0
                        ? "max-w-[700px] mx-auto w-full text-center"
                        : ""
                    }`}
                  >
                    {details.map((paragraph, index) => (
                      <p key={index}>{renderHighlighted(paragraph)}</p>
                    ))}
                  </div>

                  {stats.length > 0 && <LoanTariff stats={stats} />}
                </div>
              )}

              {activeTab === "conditions" && (
                <LoanConditions conditions={loan.conditions} />
              )}

              {activeTab === "documents" && !isBusiness && (
                <LoanDocuments documents={loan.documents} />
              )}
            </div>
          </>
        )}
      </div>

      {/* InfoBanner-ը աշխատում է 100% լայնությամբ */}
      {loan && activeTab === "about" && loan.bannersrc && (
        <InfoBanner title={loan.bannertitle} imageSrc={loan.bannersrc} />
      )}

      {loan && (
        <div className="container mx-auto px-4">
          <LoanSlider currentId={id} isBusiness={isBusiness} />
        </div>
      )}

      {/* Բիզնես էջում OnlineBanking-ը չի ցուցադրվում */}
      {!isBusiness && <OnlineBanking />}
      <Footer />
    </>
  );
};

export default LoanDetails;