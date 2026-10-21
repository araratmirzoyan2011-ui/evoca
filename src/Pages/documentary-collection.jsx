import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import { EvocaNewsCard } from "../Components/EVocaCard1.jsx";

const Documentary = () => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [salaryitems, setSalaryitems] = useState([]);

  // Ինկասո էջի տվյալների զանգվածը
  const contentData = [
    {
      id: 1,
      type: "paragraph",
      text: "Ինկասոն վճարումների ստացման և պարտքերի մարման արագ, պարզ ու արդյունավետ գործիք է:",
    },
    {
      id: 2,
      type: "paragraph",
      text: "Այն վաճառողի հանձնարարությունն է մեզ՝ մատակարարված ապրանքների փաստաթղթերը, վճարի դիմաց, փոխանցելու գնորդին: Ընդ որում, մենք վճարման որևէ պարտավորություն չենք ստանձնում, այլ կատարում ենք փաստաթղթերը փոխանցողի (միջնորդի) դեր:",
    },
    {
      id: 3,
      type: "heading",
      text: "Ինկասոյի վճարման հիմնական ձևերն են՝",
    },
    {
      id: 4,
      type: "list",
      items: [
        <>
          <strong>Փաստաթղթեր՝ վճարման դիմաց</strong> (Documents Against Payment or D/P). փաստաթղթերը տրամադրում ենք գնորդին՝ միայն նրա կողմից ապրանքների դիմաց վճարելուց հետո:
        </>,
        <>
          <strong>Փաստաթղթեր՝ ակցեպտի դիմաց</strong> (Documents Against Acceptance or D/A). փաստաթղթերը տրամադրում ենք գնորդին՝ ապրանքների դիմաց հետագայում վճարելու պայմանով (վճարումների հետաձգման պարտավորագրի (մուրհակ) ակցեպտի դեպքում): Ինկասոյի այս ձևը կիրառվում է, երբ գնորդն ու վաճառողը պայմանավորվածություն ունեն վճարման հետաձգման վերաբերյալ:
        </>,
      ],
    },
    {
      id: 5,
      type: "heading",
      text: "Սակագներ",
    },
    {
      id: 6,
      type: "paragraph",
      text: "Ինկասոյի գործառնությունների վերաբերյալ լրացուցիչ տեղեկություններ և խորհրդատվություն ստանալու համար կարող եք դիմել մեր Գլխամասային գրասենյակ՝ «Միջազգային և արտարժույթային գործառնությունների» բաժին:",
    },
  ];

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnap = await getDocs(collection(db, "garantMenu"));
        if (!menuSnap.empty) {
          const menuData = menuSnap.docs.map((doc) => doc.data());
          menuData.sort((a, b) => (a.order || 0) - (b.order || 0));
          setMenuItems(menuData);
        }

        const newsSnapshot = await getDocs(collection(db, "salaryNewsCollection"));
        const newsDocs = newsSnapshot.docs.map((doc) => doc.data());
        if (newsDocs.length > 0 && newsDocs[0].items) {
          setSalaryitems(newsDocs[0].items);
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
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Ինկասո</h1>

            {/* Զանգվածի տվյալների արտապատկերում (Render contentData) */}
            {contentData.map((block) => {
              if (block.type === "paragraph") {
                return (
                  <p key={block.id} className="text-gray-700 font-medium">
                    {block.text}
                  </p>
                );
              }

              if (block.type === "heading") {
                return (
                  <h3 key={block.id} className="text-xl font-bold text-gray-900 pt-2">
                    {block.text}
                  </h3>
                );
              }

              if (block.type === "list") {
                return (
                  <ul key={block.id} className="space-y-4 my-4 pl-2">
                    {block.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="w-2.5 h-2.5 bg-purple-600 rounded-full mt-2 shrink-0"></span>
                        <div>{item}</div>
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}

            {salaryitems.length > 0 && (
              <div className="pt-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <Link to="/news" className="hover:opacity-80 transition-opacity">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight cursor-pointer">
                      Վերջին նորությունները
                    </h2>
                  </Link>
                  
                  <Link 
                    to="/news" 
                    className="flex items-center space-x-2 bg-purple-100/70 hover:bg-purple-200/80 text-purple-700 px-4 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 group cursor-pointer"
                  >
                    <span>Բոլոր նորությունները</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {salaryitems.map((item) => (
                    <EvocaNewsCard key={item.id || item.title} item={item} />
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Documentary;