import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function Property() {

  return (
    <>
      <Header />

      <Footer />
    </>
  );
}

export default Property;