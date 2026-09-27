import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import Navbar from './Menu.jsx';
function About() {

  return (
    <>
      <Header />
      <Navbar />
      <Footer />
    </>
  );
}

export default About;