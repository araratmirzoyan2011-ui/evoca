import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CardImage from "./CardImage";

const Arrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    aria-label={direction === "left" ? "Նախորդ" : "Հաջորդ"}
    className="flex h-8 w-8 shrink-0 items-center justify-center text-[#6a00d8] transition hover:scale-125"
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

const CardSlider = ({ currentId, heading = "Այլ քարտեր" }) => {
  const [cards, setCards] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const snap = await getDocs(collection(db, "CardmenuItems"));
        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((c) => c.id !== currentId);
        setCards(list);
      } catch (error) {
        console.error("Սխալ քարտերը ստանալիս:", error);
      }
    };
    fetchCards();
  }, [currentId]);

  const scroll = (dir) => {
  const el = trackRef.current;
  if (!el || !el.firstElementChild) return;
  const step = el.firstElementChild.getBoundingClientRect().width; // մեկ քարտի լայնությունը
  el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
};

  if (cards.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-100 pt-10">
      <h2 className="mb-8 text-[28px] font-semibold text-gray-900">{heading}</h2>

      <div className="flex items-center gap-4">
        <Arrow direction="left" onClick={() => scroll("left")} />

        <div
          ref={trackRef}
          className="flex flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => (
            <Link
              key={card.id}
              to={`/cards/${card.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-full shrink-0 snap-start px-3 sm:w-1/2 lg:w-1/4"
            >
              <CardImage src={card.image} title={card.title} />
            </Link>
          ))}
        </div>

        <Arrow direction="right" onClick={() => scroll("right")} />
      </div>
    </section>
  );
};

export default CardSlider;