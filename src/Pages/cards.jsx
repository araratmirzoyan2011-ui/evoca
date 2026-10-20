import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Cards = () => {

  return (
    <>
      <Header />

      
      <Footer />
    </>
  );
};

export default Cards;