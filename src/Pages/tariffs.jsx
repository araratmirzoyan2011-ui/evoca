import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../Components/Menuall.jsx";
import LoansTable from "../Components/LoansTable.jsx";

function Tariif() {
  const [menuItems, setMenuItems] = useState([]);
  const [loanCategories, setLoanCategories] = useState([]);
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

        // Բեռնում ենք loanCategories-ը Firebase-ից
        const loansSnapshot = await getDocs(collection(db, "loanCategories"));
        const loansList = loansSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLoanCategories(loansList);

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
        <LoansTable categories={loanCategories} />
      )}
      <Footer />
    </>
  );
}

export default Tariif;