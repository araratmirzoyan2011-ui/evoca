import React from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import CardItem from "../Components/CardItem";
import useCartStore from "../Components/useCarStore";

const Cart = () => {
  const items = useCartStore((s) => s.items);
  const clearAll = useCartStore((s) => s.clearAll);

  return (
    <>
      <Header />

      <main className="min-h-[60vh]">
        <div className="max-w-[1310px] mx-auto px-4 py-8 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={items.length > 0 ? "#6a00d8" : "none"}
              stroke="#6a00d8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
            <h1 className="text-[32px] font-bold">
              Հավանածներ ({items.length})
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearAll}
              className="text-[15px] font-semibold text-[#6a00d8] hover:underline"
            >
              Մաքրել բոլորը
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="max-w-[1310px] mx-auto px-4 text-gray-600">
            Դեռ ոչինչ չես հավանել։
          </p>
        ) : (
          items.map((card) => <CardItem key={card.title} card={card} />)
        )}
      </main>

      <Footer />
    </>
  );
};

export default Cart;