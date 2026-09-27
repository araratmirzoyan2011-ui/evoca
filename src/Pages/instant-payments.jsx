import React from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import EvocaCard from '../Components/PaymentCard.jsx';

function Instant() {
  const evocaCardsData = [
    {
      id: 1,
      title: "EVOCABANK",
      src: "https://resource.evoca.am/images/WebPayment/evoca.png"
    },
    {
      id: 2,
      title: "Միջազգային բջջային օպերատորներ",
      src: "https://resource.evoca.am/images/WebPayment/international.png"
    },
    {
      id: 3,
      title: "Կոմունալ վճարումներ",
      src: "https://resource.evoca.am/images/WebPayment/utility.png"
    },
    {
      id: 4,
      title: "Ինտերնետ և TV",
      src: "https://resource.evoca.am/images/WebPayment/internettv.png"
    },
    {
      id: 5,
      title: "ՃՈ վճարներ",
      src: "https://resource.evoca.am/images/WebPayment/roadpolice.png"
    },
    {
      id: 6,
      title: "Վարկային կազմակերպություններ",
      src: "https://resource.evoca.am/images/WebPayment/loan.png"
    },
    {
      id: 7,
      title: "Միջոցառումներ",
      src: "https://resource.evoca.am/images/WebPayment/event.png"
    },
  ];

  return (
    <>
      <Header />
      <div className="w-full mt-[80px]">
        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">Բիզնես Վարկեր</h1>
      </div>

      <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
        <div 
          className="grid gap-8 justify-center w-full max-w-7xl"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 320px))' }}
        >
          {evocaCardsData.map((card) => (
            <EvocaCard 
              key={card.id}
              title={card.title}
              imageSrc={card.src}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Instant;