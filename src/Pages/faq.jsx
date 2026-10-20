import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import FaqAccordion from '../Components/FaqAccordion2';
const Faq = () => {


  return (
    <>
      <Header />
      

      <Footer />
    </>
  );
};

export default Faq;