import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { db } from "../firebase";
import { useLocalized } from "../hooks/useLocalized.js";
import CardImage from "./CardImage";

/* ===================== i18n ===================== */
const sliderResources = {
  hy: { loanSlider: { other: "Այլ վարկեր", prev: "Նախորդ", next: "Հաջորդ" } },
  en: { loanSlider: { other: "Other loans", prev: "Previous", next: "Next" } },
  ru: { loanSlider: { other: "Другие кредиты", prev: "Предыдущий", next: "Следующий" } },
};
Object.entries(sliderResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, "translation", tr, true, true);
});

const Arrow = ({ direction, onClick }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? t("loanSlider.prev") : t("loanSlider.next")}
      className="flex h-8 w-8 shrink-0 items-center justify-center text-[#6a00d8] transition hover:scale-125 cursor-pointer"
    >
      <svg
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <polyline points="10 2 2 10 10 18" />
        ) : (
          <polyline points="2 2 10 10 2 18" />
        )}
      </svg>
    </button>
  );
};

const LoanSlider = ({ currentId, heading }) => {
  const { t } = useTranslation();
  const l = useLocalized();
  const [loans, setLoans] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const snap = await getDocs(collection(db, "loans"));
        const list = snap.docs
          .map((d) => ({ ...d.data(), id: d.id }))
          .filter((loan) => loan.id !== currentId);
        setLoans(list);
      } catch (error) {
        console.error("Սխալ վարկերը ստանալիս:", error);
      }
    };
    fetchLoans();
  }, [currentId]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el || !el.firstElementChild) return;
    const step = el.firstElementChild.getBoundingClientRect().width;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  if (loans.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-100 pt-10">
      <h2 className="mb-8 text-[28px] font-semibold text-gray-900">
        {heading ?? t("loanSlider.other")}
      </h2>

      <div className="flex items-center gap-4">
        <Arrow direction="left" onClick={() => scroll("left")} />

        <div
          ref={trackRef}
          className="flex flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loans.map((loan) => (
            <Link
              key={loan.id}
              to={`/current-loan/${loan.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full shrink-0 snap-start px-3 sm:w-1/2 lg:w-1/4"
            >
              <CardImage src={loan.imageSrc || loan.image} title={l(loan.title)} />
            </Link>
          ))}
        </div>

        <Arrow direction="right" onClick={() => scroll("right")} />
      </div>
    </section>
  );
};

export default LoanSlider;