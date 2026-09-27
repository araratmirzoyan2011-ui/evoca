import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from '../Components/Footer.jsx';
function Busines() {

  return (
    <>
      <Header />
      
      <Footer />

    </>
  );
}

export default Busines;