import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../Components/Menuall.jsx";
import LoansTable from "../Components/LoansTable.jsx";

function LegalLoans() {
  const [menuItems, setMenuItems] = useState([]);
  const [tariffsCategories, setTariffsCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Բեռնում ենք menuItems-ը
        const menuSnapshot = await getDocs(collection(db, "menuItems"));
        const menuList = menuSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(menuList);

        // Բեռնում ենք tariffsCategories-ը Firebase-ից
        const tariffsSnapshot = await getDocs(collection(db, "tariffsCategories"));
        const tariffsList = tariffsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTariffsCategories(tariffsList);

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
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
          Տվյալները բեռնվում են...
        </div>
      ) : (
        <LoansTable categories={tariffsCategories} defaultCategoryId="" />
      )}
      <Footer />
    </>
  );
}

export default LegalLoans;