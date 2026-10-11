import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import Navbar from "../Components/Menuall.jsx";
import Accordion from "../Components/ArchiveAccordion.jsx";

function Archive() {
  const [reports, setReports] = useState([
    { title: "Տեղեկատվական ամփոփագիր (Վարկային պրոդուկտներ) 07.04.2026", id: 1, url: "" }
  ]);
  
  const [accordionsData, setAccordionsData] = useState([]);
  const [accordionLoading, setAccordionLoading] = useState(true);
  const [accordionError, setAccordionError] = useState(null);

  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAccordionLoading(true);
        setMenuLoading(true);

        const accordionsSnapshot = await getDocs(collection(db, "archiveAccordions"));
        const accordionsList = accordionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAccordionsData(accordionsList);

        const menuSnapshot = await getDocs(collection(db, "menuItems"));
        const menuList = menuSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(menuList);

      } catch (err) {
        console.error("Սխալ տվյալների բեռնման ժամանակ:", err);
        setAccordionError("Չհաջողվեց բեռնել տվյալները բազայից:");
      } finally {
        setAccordionLoading(false);
        setMenuLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      
      {!menuLoading && <Navbar items={menuItems} />}

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333] max-[400px]:mb-8 max-[400px]:text-[24px]">
              Արխիվ
            </h1>
            
            <div className="mb-6">
              <h2 className="text-[24px] font-bold uppercase text-black max-[400px]:text-[18px]">
                Անհրաժեշտ տեղեկատվություն
              </h2>
            </div>
            
            <div className="w-full h-auto bg-white py-6 space-y-6 mb-[20px]">
  {accordionLoading && <p className="text-gray-500 text-center">Բեռնվում են տվյալները Firebase-ից...</p>}
  {accordionError && <p className="text-red-600 text-center">{accordionError}</p>}
  
  {!accordionLoading && !accordionError && accordionsData.map((item, index) => (
    <Accordion 
      key={item.id || index}
      title={item.title} 
      sections={item.sections} 
    />
  ))}
</div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Փաստաթղթեր
          </h2>

          {loading && <p className="text-gray-500">Բեռնվում է...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="space-y-5">
              {reports.map((r) => (
                <DocumentCard key={r.id} title={r.title} url={r.url} />
              ))}
            </div>
          )}
          </section>
          
        </div>

        
      </main>
      <Footer />
    </>
  );
}

export default Archive;