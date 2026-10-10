import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menuall.jsx';
import { db } from '../firebase.js';
import {
  collection,
  getDocs,
} from 'firebase/firestore';

function Reports() {
const menuItems = [
  { label: "Աուդիտորական եզրակացություն", path: "/audit" },
  { label: "Ֆինանսական հաշվետվություններ", path: "/financial-reports" },
  { label: "Ներդրողների համար", path: "/investors" },
  { label: "Կիսամյակային հաշվետվություն", path: "/semiannual-report" },
  { label: "Տարեկան հաշվետվություն", path: "/annual-report" },
];
  
  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <Footer />
    </>
  );
}

export default Reports;