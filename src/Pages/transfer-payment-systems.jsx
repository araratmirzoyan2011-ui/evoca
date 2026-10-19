import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menuall.jsx';
import { db } from '../firebase.js';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import PartnerCard from '../assets/TransferCard.jsx';


const TransferPaymment = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const menuSnap = await getDocs(collection(db, "TransferMenu"));
      setMenuItems(
        menuSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
      );

      const sysSnap = await getDocs(collection(db, "TransferSystems"));
      setSystems(
        sysSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
      );
    } catch (error) {
      console.error("Սխալ տվյալները ներմուծելիս:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const seedData = async () => {
    for (const item of transferSystems) {
      const { id, ...data } = item;
      await setDoc(doc(db, "TransferSystems", id), data);
    }
    fetchData();
  };

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

      <section className="mx-auto w-full max-w-[1200px] px-4 py-6">
        <h2 className="mb-8 text-[28px] font-bold text-gray-900">Վճարային համակարգեր</h2>

        {systems.length === 0 ? (
          <button
            onClick={seedData}
            className="rounded-lg bg-[#6a00d4] px-4 py-2 text-white"
          >
            Ավելացնել տվյալները Firestore-ում
          </button>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {systems.map(({ id, ...props }) => (
              <PartnerCard key={id} {...props} />
            ))}
          </div>
        )}

        <p className="mt-10 text-right text-xs text-gray-600">
          Թարմացվել է՝ 08/12/2025 09:36
        </p>
      </section>

      <Footer />
    </>
  );
};

export default TransferPaymment;