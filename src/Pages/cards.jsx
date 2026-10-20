import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../Components/Menuall";

const Cards = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "CardmenuItems"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setMenuItems(items);
      } catch (error) {
        console.error("Սխալ տվյալների բեռնման ժամանակ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div className="w-full h-12 flex items-center justify-center bg-purple-900 text-white">
          Բեռնվում է...
        </div>
      ) : (
        <Navbar items={menuItems} />
      )}
      <Footer />
    </>
  );
};

export default Cards;