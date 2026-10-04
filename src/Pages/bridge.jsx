import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase.js';
import CultureBanner from '../Components/CultureBanner.jsx';
import { collection, getDocs } from 'firebase/firestore';

function Bridge() {
  const [sections7, setSections7] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sectionsSnap = await getDocs(collection(db, "CareerSections7"));
        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections7(s);
      } catch (err) {
        console.error("Bridge data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Header />
      <Navbar />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center text-[#6a0fd9] font-medium">
          Բեռնվում է...
        </div>
      ) : (
        <div className="pt-0 mb-[60px]">
          {sections7.culture && (
            <CultureBanner {...sections7.culture} className="mb-[60px]" />
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default Bridge;