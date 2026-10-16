import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../Components/Menuall.jsx";

function Tariif() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMenuLoading(true);
        const menuSnapshot = await getDocs(collection(db, "menuItems"));
        const menuList = menuSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(menuList);
      } catch (err) {
        console.error("Սխալ տվյալների բեռնման ժամանակ:", err);
      } finally {
        setMenuLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      
      {!menuLoading && <Navbar items={menuItems} />}

      <Footer />
    </>
  );
}

export default Tariif;