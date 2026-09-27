import React, { useState, useEffect } from 'react';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';

const Instant = () => {


  return (
    <>
      <Header />
      
      <Footer />
    </>
  );
};

export default Instant;