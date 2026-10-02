import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Sarheholder() {
  return (
    <>
      <Header />
      <Navbar />
      
      <Footer />
    </>
  );
}

export default Sarheholder;