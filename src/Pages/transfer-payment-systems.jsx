import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menuall.jsx';
import { db } from '../firebase.js'; 
import { collection, getDocs } from 'firebase/firestore';

const TransferPaymment = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const menuItemsSnapshot = await getDocs(collection(db, "TransferMenu"));
        const menuItemsData = menuItemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => (a.order || 0) - (b.order || 0));
        
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Սխալ տվյալները ներմուծելիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Տվյալները բեռնվում են...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      {menuItems.length > 0 && <Navbar items={menuItems} />}
      <Footer />
    </>
  );
};

export default TransferPaymment;