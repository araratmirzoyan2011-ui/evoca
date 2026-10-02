import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function Structure() {

  return (
    <>
      <Header />
      
      <Footer />
    </>
  );
}

export default Structure;