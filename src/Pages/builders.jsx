import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Menuall.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import ConstructionAccordion from "../Components/ConstructionAccordion.jsx";
function Bulders() {

  return (
    <>
      <Header />

      <Footer />
    </>
  );
}

export default Bulders;