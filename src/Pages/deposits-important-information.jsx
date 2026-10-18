import React, { useState, useEffect } from 'react';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { db } from "../firebase.js";
import { DocumentCard } from '../Components/DocumentCard';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import SocialIcons from '../Components/SocialIcons.jsx';
const DepositImportant = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const menuSnap = await getDocs(
          query(collection(db, "DepositMenu"), orderBy("order"))
        );
        setMenuItems(menuSnap.docs.map((d) => d.data()));

        const depositsSnap = await getDocs(collection(db, "Deposits"));
        setDeposits(
          depositsSnap.docs.map((d) => ({
            docId: d.id,
            ...d.data()
          }))
        );

      } catch (e) {
        console.error(e);
        setError("Չհաջողվեց բեռնել տվյալները");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetailsClick = (title) => {
    console.log("Details:", title);
  };
const depositdata=[{title:"Տեղեկատվական ամփոփագիր (Ավանդներ) 09․06․2026"},{title:"Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025թ."},{title:"Դեբետային և կրեդիտային քարտեր (Տեղեկատվական ամփոփագիր) 17.03.2026"}]
  return (
    <>
      <Header />
      <Navbar items={menuItems} />

<main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-8 text-[32px] font-medium leading-[40px] text-[#333] max-[400px]:mb-6 max-[400px]:text-[24px] max-[400px]:leading-[30px]">
              Կարևոր տեղեկատվություն
            </h1>


              
            <h2 className="mb-6 mt-10 text-xl font-bold text-gray-900">
              Փաստաթղթեր
            </h2>

            <div className="space-y-5">
              {depositdata.map((r) => (
                <DocumentCard key={r.id} title={r.title} url={r.url} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default DepositImportant;