import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase.js';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import EvocaCard from '../Components/PaymentCard.jsx';
import JobCard from '../Components/JobCard.jsx';

function Intership() {

  return (
    <>
      <Header />
      <Navbar />
        {sections2.culture && (
            <CultureBanner {...sections6.culture} className="mb-[60px]" />
          )}
      

      <Footer />
    </>
  );
}

export default Intership;