import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Arrow = ({ direction, onClick, hide }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === "left" ? "Նախորդ" : "Հաջորդ"}
    className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-[#6a00d8] transition hover:scale-125 ${
      hide ? "invisible" : ""
    }`}
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

// Մեծ էկրանին՝ 3, միջինում՝ 2, հեռախոսին՝ 1 (հաջորդի մի մասը երևում է)
const CARD =
  "shrink-0 basis-[85%] sm:basis-[calc((100%_-_1rem)/2)] lg:basis-[calc((100%_-_2rem)/3)]";

const DepositSlider = ({ currentId = null, heading = "Այլ ավանդներ" }) => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(0); // որ քարտից է սկսվում շարքը
  const touchX = useRef(null);

  // Տվյալների բեռնում
  useEffect(() => {
    let cancelled = false;

    const fetchDeposits = async () => {
      try {
        const snap = await getDocs(collection(db, "Deposits"));
        if (cancelled) return;

        // id-ն վերջում է, որպեսզի փաստաթղթի `id` դաշտը չվերագրանցի իրական ID-ն
        const list = snap.docs
          .map((d) => ({ ...d.data(), id: d.id }))
          .filter((d) => d.id !== currentId);

        setDeposits(list);
        setStart(0);
      } catch (error) {
        console.error("Սխալ ավանդները ստանալիս:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDeposits();
    return () => {
      cancelled = true;
    };
  }, [currentId]);

  const total = deposits.length;

  // Մեկ սեղմում = մեկ քարտ։ Վերջին քարտից հետո՝ նորից սկզբից (և հակառակը)
  const go = (dir) => {
    if (total < 2) return;
    setStart((s) => (s + (dir === "right" ? 1 : total - 1)) % total);
  };

  const ordered = [...deposits.slice(start), ...deposits.slice(0, start)];

  // Բեռնումից հետո, եթե ավանդ չկա՝ բաժինը թաքցնում ենք
  if (!loading && total === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-100 pt-10 mb-[50px]">
      <h2 className="mb-8 text-[28px] font-semibold text-gray-900 ml-[50px]">{heading}</h2>

      <div className="flex items-center gap-2">
        <Arrow direction="left" onClick={() => go("left")} hide={total < 2} />

        <div
          className="flex min-w-0 flex-1 gap-4 overflow-hidden py-2"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? "right" : "left");
          }}
        >
          {loading
            ? [0, 1, 2].map((i) => (
                <div key={i} className={CARD}>
                  <div className="aspect-[16/9] animate-pulse rounded-xl bg-gray-200" />
                  <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-gray-200" />
                </div>
              ))
            : ordered.map((deposit) => (
                <Link
                  key={deposit.id}
                  to={`/current-deposit/${deposit.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className={`${CARD} group block`}
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={deposit.imageSrc || deposit.image}
                      alt={deposit.title}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-[18px] font-semibold text-gray-900 group-hover:text-[#6a00d8]">
                    {deposit.title}
                  </p>
                </Link>
              ))}
        </div>

        <Arrow direction="right" onClick={() => go("right")} hide={total < 2} />
      </div>
    </section>
  );
};

export default DepositSlider;