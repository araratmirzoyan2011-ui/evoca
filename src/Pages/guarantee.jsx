import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import InfoAccordion from "../Components/InfoAccordion.jsx";

const Guarantee = () => {
  const [loading, setLoading] = useState(true);
  
  const [menuItems, setMenuItems] = useState([]);
  const [securitiesitems, setSecuritiesitems] = useState([]);
  const [introTexts, setIntroTexts] = useState([]);
  const [clientSteps, setClientSteps] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        // Ներմուծում ենք մենյուն 'gurantmenu' կոլեկցիայից և սորտավորում ըստ order-ի
        const menuSnapshot = await getDocs(collection(db, "gurantmenu"));
        if (!menuSnapshot.empty) {
          const menuData = menuSnapshot.docs.map(doc => doc.data());
          menuData.sort((a, b) => (a.order || 0) - (b.order || 0));
          setMenuItems(menuData);
        }

        const securitiesSnapshot = await getDocs(collection(db, "securitiesitems"));
        if (!securitiesSnapshot.empty) {
          setSecuritiesitems(securitiesSnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
        }

        const introSnapshot = await getDocs(collection(db, "introTexts"));
        if (!introSnapshot.empty) {
          setIntroTexts(introSnapshot.docs.map(doc => doc.data().text));
        }

        const stepsSnapshot = await getDocs(collection(db, "clientSteps"));
        if (!stepsSnapshot.empty) {
          setClientSteps(stepsSnapshot.docs.map(doc => doc.data()));
        }

        const contactDocRef = doc(db, "contactInfo", "main");
        const contactDocSnap = await getDoc(contactDocRef);
        if (contactDocSnap.exists()) {
          setContactInfo(contactDocSnap.data());
        }

        const warningsSnapshot = await getDocs(collection(db, "warnings"));
        if (!warningsSnapshot.empty) {
          setWarnings(warningsSnapshot.docs.map(doc => doc.data().text));
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

          <div className="flex-1 max-w-4xl text-gray-800 space-y-8">
            <h1 className="text-5xl">Ներդրումային ծառայություններ</h1>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {introTexts.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            <div className="space-y-4">
              {clientSteps.map((step, index) => (
                <div key={index} className="space-y-2">
                  {step.title && <h3 className="text-xl font-bold text-purple-800">{step.title}</h3>}
                  <p>
                    {step.description} {step.linkText && <a href={step.linkUrl} className="text-purple-600 underline font-medium">{step.linkText}</a>}
                  </p>
                </div>
              ))}
            </div>

            {contactInfo && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-purple-800">Հասցե`</h3>
                <p>{contactInfo.address}</p>

                <h3 className="text-xl font-bold text-purple-800 pt-2">Հետադարձ կապ`</h3>
                <p>Հեռ.՝ {contactInfo.phones?.join(', ')}</p>
                <p>Էլ. հասցե՝ <a href={`mailto:${contactInfo.email}`} className="text-purple-600 underline">{contactInfo.email}</a></p>
              </div>
            )}
            
            <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-purple-800 space-y-2">
              {warnings.map((warn, index) => (
                <p key={index} className="text-sm font-semibold text-gray-800">{warn}</p>
              ))}
            </div>

            <div className="pt-8">
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ՀԱՃԱԽ ՏՐՎՈՂ ՀԱՐՑԵՐ
              </h2>
              <div className="max-w-4xl space-y-4">
                {securitiesitems.map((item) => (
                  <InfoAccordion
                    key={item.docId}
                    title={item.title}
                    blocks={item.blocks}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Guarantee;