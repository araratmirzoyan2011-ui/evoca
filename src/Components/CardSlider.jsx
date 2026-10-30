import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

export function CardSlider() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [offsetIndex, setOffsetIndex] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const snap = await getDocs(collection(db, 'CardmenuItems'));
        // id-ն document-ի անունն է (travel-card, arca-classic...), որ գնա /current-card/:id
        setCards(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
      } catch (error) {
        console.error('CardmenuItems բեռնելիս սխալ տեղի ունեցավ:', error);
      }
    };
    fetchCards();
  }, []);

  const handleCardPrev = () => {
    setOffsetIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleCardNext = () => {
    setOffsetIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  if (cards.length === 0) return null;

  const activeCard = cards[activeCardIndex] || cards[0];
  const getImg = (card) => card?.image || card?.img;

  const itemHeight = 74;

  return (
    <>
      <style>{`
        @media (max-width: 400px) {
          .card-slider-container {
            flex-direction: column !important;
          }
          .cards-thumb-wrapper {
            flex-direction: row !important;
            width: 100% !important;
            height: auto !important;
            overflow-x: auto !important;
            justify-content: flex-start !important;
            padding-bottom: 8px;
          }
          .cards-thumb-inner {
            flex-direction: row !important;
            position: static !important;
            transform: none !important;
            gap: 8px !important;
          }
          .card-thumb-item {
            width: 65px !important;
            height: 45px !important;
            flex-shrink: 0 !important;
          }
          .slider-nav-btn {
            display: none !important;
          }
        }
      `}</style>

      <div className="card-slider-container max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">

        <div className="flex flex-col items-center gap-3 w-full lg:w-auto">
          <button
            onClick={handleCardPrev}
            className="slider-nav-btn text-purple-700 hover:opacity-75 transition-opacity cursor-pointer p-1 z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>

          <div className="cards-thumb-wrapper h-[238px] overflow-hidden relative w-32 flex items-center justify-center">
            <div
              className="cards-thumb-inner absolute top-0 flex flex-col items-center gap-2.5 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateY(-${offsetIndex * itemHeight}px)` }}
            >
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => setActiveCardIndex(index)}
                  className={`card-thumb-item w-24 h-16 rounded-lg p-1.5 cursor-pointer transition-all border-2 flex items-center justify-center bg-white shadow-sm shrink-0 ${
                    activeCardIndex === index ? 'border-purple-600 scale-105 shadow-md' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  {getImg(card) ? (
                    <img src={getImg(card)} alt={card.title} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-[10px] font-bold text-center text-gray-800 truncate">{card.title}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleCardNext}
            className="slider-nav-btn text-purple-700 hover:opacity-75 transition-opacity cursor-pointer p-1 z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div className="flex-1 flex justify-center w-full">
          <div className="w-[280px] sm:w-[440px] h-[180px] sm:h-[270px] flex items-center justify-center transition-all duration-300">
            {getImg(activeCard) ? (
              <img
                src={getImg(activeCard)}
                alt={activeCard.title}
                className="w-full h-full object-contain drop-shadow-xl transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
                Նկար չկա
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center lg:items-start gap-4 text-center lg:text-left w-full">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
            {activeCard?.title}
          </h2>
          <button
            onClick={() => navigate(`/current-card/${activeCard.id}`)}
            className="bg-[#6600cc] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#5500aa] transition-all shadow-md cursor-pointer"
          >
            Մանրամասն
          </button>
        </div>

      </div>
    </>
  );
}

export default CardSlider;