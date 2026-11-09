import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { db } from "../firebase";
import { useLocalized } from "../hooks/useLocalized.js";
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

const detailsResources = {
  hy: {
    loanDetails: {
      tabAbout: "Վարկի մասին",
      tabConditions: "Պայմաններ",
      tabDocuments: "Պահանջվող փաստաթղթերի ցանկ",
      loading: "Բեռնվում է...",
      notFound: "Վարկը չի գտնվել",
      loadError: "Չհաջողվեց բեռնել տվյալները",
    },
  },
  en: {
    loanDetails: {
      tabAbout: "About the loan",
      tabConditions: "Conditions",
      tabDocuments: "List of required documents",
      loading: "Loading...",
      notFound: "Loan not found",
      loadError: "Failed to load data",
    },
  },
  ru: {
    loanDetails: {
      tabAbout: "О кредите",
      tabConditions: "Условия",
      tabDocuments: "Перечень необходимых документов",
      loading: "Загрузка...",
      notFound: "Кредит не найден",
      loadError: "Не удалось загрузить данные",
    },
  },
};

Object.entries(detailsResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, "translation", tr, true, true);
});

const tabs = [
  { key: "about", labelKey: "loanDetails.tabAbout" },
  { key: "conditions", labelKey: "loanDetails.tabConditions", hideForBusiness: true },
  { key: "documents", labelKey: "loanDetails.tabDocuments", hideForBusiness: true },
];

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

// Query parameter-ով տվյալների բեռնում
const fetchLoanById = async (id, isBusiness) => {
  if (isBusiness) {
    const snap = await getDoc(doc(db, "businessLoansCollection", "main"));
    if (!snap.exists()) return null;
    const found = (snap.data().loans || []).find(
      (l) => String(l.id) === String(id) || String(l.docId) === String(id)
    );
    return found ? { ...found, docId: String(found.id) } : null;
  }

  const snap = await getDoc(doc(db, "loans", id));
  return snap.exists() ? { ...snap.data(), docId: snap.id } : null;
};

const LoanDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isBusiness = searchParams.get("type") === "business"; // Կարդում ենք search parameter-ը
  const { t } = useTranslation();
  const l = useLocalized();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

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
          setError("notFound");
        }
      } catch (e) {
        console.error(e);
        setLoan(null);
        setError("loadError");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, isBusiness]);

  const details = (loan?.details ?? []).map((p) => l(p));

  const stats = (loan?.stats ?? []).map((s) => {
    const out = { ...s, label: l(s.label), value: l(s.value) };
    if (s.topText !== undefined) out.topText = l(s.topText);
    return out;
  });

  const conditions = loan?.conditions
    ? loan.conditions.map((c) => {
        const out = { ...c, label: l(c.label) };
        if ("value" in c) {
          out.value = Array.isArray(c.value) ? c.value.map((v) => l(v)) : l(c.value);
        }
        if (Array.isArray(c.columns)) {
          out.columns = c.columns.map((col) => ({ ...col, title: l(col.title), value: l(col.value) }));
        }
        if (Array.isArray(c.rows)) {
          out.rows = c.rows.map((r) => l(r));
        }
        return out;
      })
    : loan?.conditions;

  const documents = loan?.documents ? loan.documents.map((d) => l(d)) : loan?.documents;

  return (
    <>
      {isBusiness ? <BusinessHeader /> : <Header />}

      {loan && (
        <CardHero
          title={l(loan.title)}
          description={l(loan.description)}
          image={loan.imageSrc}
        />
      )}

      <div className="container mx-auto px-4 mt-10">
        {loading && <p className="text-center">{t("loanDetails.loading")}</p>}
        {error && <p className="text-center text-red-600">{t(`loanDetails.${error}`)}</p>}

        {loan && (
          <>
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
                  {t(tab.labelKey)}
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
                <LoanConditions conditions={conditions} />
              )}

              {activeTab === "documents" && !isBusiness && (
                <LoanDocuments documents={documents} />
              )}
            </div>
          </>
        )}
      </div>

      {loan && activeTab === "about" && loan.bannersrc && (
        <InfoBanner title={l(loan.bannertitle)} imageSrc={loan.bannersrc} />
      )}

      {loan && (
        <div className="container mx-auto px-4">
          <LoanSlider currentId={id} isBusiness={isBusiness} />
        </div>
      )}

      {!isBusiness && <OnlineBanking />}
      <Footer />
    </>
  );
};

export default LoanDetails;