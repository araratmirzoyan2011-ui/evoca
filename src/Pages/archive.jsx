import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import Navbar from "../Components/Menuall.jsx";

const menuItems = [
  { label: "Վարկեր ֆիզիկական անձանց", path: "/individual-loans" },
  { label: "Վարկեր իրավաբանական անձանց", path: "/legal-loans" },
  { label: "Միջնորդավճարների սակագներ", path: "/tariffs" },
  { label: "Ավանդների սակագներ", path: "/deposits" },
  { label: "Արխիվ", path: "/archive" }
];

function Archive() {
  return (
    <>
      <Header />
      <Navbar items={menuItems} />
      <Footer />
    </>
  );
}

export default Archive;