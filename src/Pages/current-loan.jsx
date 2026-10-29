import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import CardHero from "../Components/CardHero";
import CardTariffs from "../Components/Components/CardTariffs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AdvantageCard } from "../Components/AdvantageCard";
import CardSlider from "../Components/CardSlider2";
import { OnlineBanking } from '../Components/OnlineBanking.jsx';

const LoanDetails = () => {
  return (
    <>
      <Header />
      
      <OnlineBanking />
      <Footer />
    </>
  );
};

export default LoanDetails;