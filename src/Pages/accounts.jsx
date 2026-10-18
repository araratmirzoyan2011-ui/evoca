import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { db } from "../firebase.js";
import { DocumentCard } from '../Components/DocumentCard';
import { collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore';
import SocialIcons from '../Components/SocialIcons.jsx';

const Accounts = () => {
  const Accountsmenu=[{title:""}]
const menuItems = [
  { path: "/accounts", label: "Evoca խնայողական հաշիվ" },
  { path: "/savings", label: "Հաշիվների բացում և սպասարկում" },
  { path: "/metal-accounts", label: "Առարկայազուրկ մետաղական հաշիվներ" },
  { path: "/non-resident", label: "Ոչ ռեզիդենտ հաճախորդների հեռավար սպասարկում" }
];
  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <main className="relative w-full bg-white">
        
      </main>

      <Footer />
    </>
  );
};

export default Accounts