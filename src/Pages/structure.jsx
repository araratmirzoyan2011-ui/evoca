import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Navbar from '../Components/Menu.jsx';
function Structure() {

  return (
    <>
      <Header />
      <Navbar />
      <Footer />
    </>
  );
}

export default Structure;