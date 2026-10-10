import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase.js';
import {
  collection,
  getDocs,
} from 'firebase/firestore';

function Reports() {

  
  return (
    <>
      <Header />
      <Navbar />

      <Footer />
    </>
  );
}

export default Reports;