import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Map = () => {

  return (
    <>
      <Header />
        
      <Footer />
    </>
  );
};

export default Map;