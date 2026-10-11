import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";

function Dealers() {

  return (
    <>
      <Header />

      

      <Footer />
    </>
  );
}

export default Dealers;