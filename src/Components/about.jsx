import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';

function About() {

  return (
    <>
      <Header />
      
      <Footer />
    </>
  );
}

export default About;