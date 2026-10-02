import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Group() {

  return (
    <>
      <Header />
      <Navbar />
     
      <Footer />
    </>
  );
}

export default  Group;