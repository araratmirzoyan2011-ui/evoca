import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../Components/Menuall.jsx";

function Deposits() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "menuItems"));
        const menuList = menuSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(menuList);

      } catch (err) {
        console.error("Սխալ տվյալների բեռնման ժամանակ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      {!loading && <Navbar items={menuItems} />}
      
      <Footer />
    </>
  );
}

export default Deposits;