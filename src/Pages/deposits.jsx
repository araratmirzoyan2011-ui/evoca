import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from "../Components/Menuall.jsx";
import LoansTable2 from "../Components/LoansTable2.jsx";

function Deposits() {
  const [menuItems, setMenuItems] = useState([]);
  const [depositPages, setDepositPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "Tarrifmenu"));
        const menuList = menuSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(menuList);

        const classicDoc = await getDoc(doc(db, "classicDeposit", "data"));
        const evocaDoc = await getDoc(doc(db, "evocaOnlineDeposit", "data"));
        const childDoc = await getDoc(doc(db, "childDeposit", "data"));

        const loadedPages = [];
        if (classicDoc.exists()) loadedPages.push(classicDoc.data());
        if (evocaDoc.exists()) loadedPages.push(evocaDoc.data());
        if (childDoc.exists()) loadedPages.push(childDoc.data());

        if (loadedPages.length > 0) {
          setDepositPages(loadedPages);
        }

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
        <div style={{ textAlign: "center", padding: "50px" }}>Բեռնվում է...</div>
      ) : depositPages.length > 0 ? (
        <LoansTable2 data={depositPages[page]} onSelect={setPage} />
      ) : (
        <div style={{ textAlign: "center", padding: "50px" }}>Տվյալներ չեն գտնվել Firebase-ում:</div>
      )}

      <Footer />
    </>
  );
}

export default Deposits;