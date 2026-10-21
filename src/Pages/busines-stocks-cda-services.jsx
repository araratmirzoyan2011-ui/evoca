import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import InfoAccordion from "../Components/InfoAccordion.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";

const CDAServices2 = () => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
    const [serviceTexts, setServiceTexts] = useState([]);
    const [serviceLinks, setServiceLinks] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "gurantmenu"));
        if (!menuSnapshot.empty) {
          const menuData = menuSnapshot.docs.map(doc => doc.data());
          menuData.sort((a, b) => (a.order || 0) - (b.order || 0));
          setMenuItems(menuData);
        }
        const textsSnapshot = await getDocs(collection(db, "serviceTextsCollection"));
                if (!textsSnapshot.empty) {
                  setServiceTexts(textsSnapshot.docs.map(doc => doc.data().text));
                }
        
                const linksSnapshot = await getDocs(collection(db, "serviceLinksCollection"));
                if (!linksSnapshot.empty) {
                  setServiceLinks(linksSnapshot.docs.map(doc => doc.data()));
                }

      } catch (error) {
        console.error("Firestore-ից տվյալների բեռնման սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-medium text-lg">
        Բեռնվում է տվյալները Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />
      
      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-6 text-base leading-relaxed">
            <h1 className=" text-5xl">Հայաստանի կենտրոնական դեպոզիտարիայի (ՀԿԴ) ծառայություններ</h1>
            {serviceTexts.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="pt-4 space-y-3">
              {serviceLinks.map((link, index) => (
                <div key={index}>
                  <Link to={link.to || '#'} className="text-purple-700 hover:underline font-medium">
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>

            

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default CDAServices2;