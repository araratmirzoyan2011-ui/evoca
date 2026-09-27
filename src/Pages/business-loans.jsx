import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from '../Components/Footer.jsx';
import LoanCard from '../Components/LoanCard.jsx';
function Busines() {
    const loanData = {
    title: "Արագ բիզնես վարկ/վարկային գիծ",
    description: "Արագ ֆինանսավորում Ձեր բիզնեսի զարգացման համար միայն երաշխավորությամբ և ցածր տոկոսադրույքով:",
    imageSrc: "/path-to-your-image.png", // Փոխարինիր նկարի ճանապարհով
    duration: {
      topText: "Մինչև",
      value: "60 ամիս",
      label: "Ժամկետ"
    },
    limit: {
      topText: "Մինչև",
      value: "30 մլն ֏",
      label: "Սահմանաչափ կամ համարժեք արտարժույթ"
    },
    rate: {
      value: "9.22%-17.89%",
      label: "Տարեկան տոկոսադրույք"
    }
  };
  const handleDetailsClick = () => {
    console.log("Մանրամասն կոճակը սեղմվեց");
    // Այստեղ կարող եք գրել այն լոգիկան, ինչ ուզում եք (օրինակ՝ նավիգացիա այլ էջ)
  };
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 mt-[80px] ml-[-10%]">
        <h1 className="text-3xl font-bold text-center mb-8">Բիզնես Առաջարկներ</h1>
      </div>
      <div className="container mx-auto px-4 mt-[80px] ml-[10%]">
        
        
        <LoanCard 
          title={loanData.title}
          description={loanData.description}
          imageSrc={loanData.imageSrc}
          duration={loanData.duration}
          limit={loanData.limit}
          rate={loanData.rate}
          onDetailsClick={handleDetailsClick}
        />
      </div>
      <Footer />

    </>
  );
}

export default Busines;