import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import { db } from '../firebase'; 
import { EvocaNewsCard } from '../Components/EVocaCard1.jsx';
import { collection, getDocs } from 'firebase/firestore';

function News() {


  return (
    <>
      <Header />
      

      <Footer />
    </>
  );
}

export default News;