import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function Career() {

  return (
    <>
      <Header />
      <Navbar />
      <Footer />
    </>
  );
}

export default Career;