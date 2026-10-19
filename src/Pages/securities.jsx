import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { EvocaReviewCard } from '../Components/EvocaReviewCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { EvocaNewsCard } from '../Components/EVocaCard1.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { Link } from 'react-router-dom';

const Securities = () => {
  const [loading, setLoading] = useState(true);

  const [benefitsData, setBenefitsData] = useState([]);
  const [loanTypesData, setLoanTypesData] = useState([]);
  const [salaryreports, setSalaryreports] = useState([]);
  const [salaryitems, setSalaryitems] = useState([]);

  // Տվյալները զանգվածներում
  const introTexts = [
    "Բանկն իր հաճախորդներին ներդրումային ծառայություններ է մատուցում ինչպես տեղական, այնպես էլ՝ միջազգային շուկաներում: Բանկի կողմից առաջարկվող ծառայությունները հասանելի են իրավաբանական և ֆիզիկական անձ հանդիսացող հաճախորդներին[cite: 1]:"
  ];

  const clientSteps = [
    {
      title: "Ինչպե՞ս դառնալ հաճախորդ:",
      description: "Ներդրումային ծառայություններից օգտվելու համար անհրաժեշտ է Բանկում ունենալ ընթացիկ բանկային հաշիվ, որի բացման համար պահանջվող փաստաթղթերին կարող եք ծանոթանալ[cite: 1]",
      linkText: "այստեղ",
      linkUrl: "#"
    },
    {
      description: "Բրոքերային հաշվի բացման համար անհրաժեշտ է այցելել Բանկի գլխամասային գրասենյակ[cite: 1]:"
    }
  ];

  const contactInfo = {
    address: "Երևան, Հանրապետության 44/2[cite: 1]",
    phones: ["374 33 777 453[cite: 1]", "374 33 603 055[cite: 1]"],
    email: "investsecurities@evoca.am[cite: 1]"
  };

  const warnings = [
    "ՈՒՇԱԴՐՈՒԹՅՈՒՆ. Ֆինանսական շուկաներում գործարքների իրականացման հետ կապված ՌԻՍԿԸ ԿՐՈՒՄ Է ՀԱՃԱԽՈՐԴԸ: Բանկը ՉԻ ՓՈԽՀԱՏՈՒՑԵԼՈՒ հաճախորդի վնասները, եթե դրանք չեն պատճառվել Բանկի կողմից անբարեխիղճ վարքագծի արդյունքում[cite: 1]:"
  ];

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const benefitsSnapshot = await getDocs(collection(db, "benefitsDataCollection"));
        if (!benefitsSnapshot.empty) {
          setBenefitsData(benefitsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        const loansSnapshot = await getDocs(collection(db, "loanTypesDataCollection"));
        if (!loansSnapshot.empty) {
          setLoanTypesData(loansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        const reportsSnapshot = await getDocs(collection(db, "salaryreportsCollection"));
        if (!reportsSnapshot.empty) {
          setSalaryreports(reportsSnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
        }

        const newsSnapshot = await getDocs(collection(db, "salaryNewsCollection"));
        const newsDocs = newsSnapshot.docs.map(doc => doc.data());
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

  const cardData = {
    title: "Ներդրումային ծառայություններ",
    description: "Evocabank-ն առաջարկում է ներդրումային ծառայություններ և տալիս եկամտի նոր աղբյուրների հնարավորություն՝ ձեր պահանջներին և ցանկություններին համապատասխան։",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/16781890566687/780x585.jpg",
    altText: ""
  };

  return (
    <>
      <Header />
      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {cardData && (
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
            />
          )}
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-8">
            
            {/* Ներածական տեքստեր զանգվածից */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {introTexts.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            {/* Հաճախ դառնալու քայլեր զանգվածից */}
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

            {/* Հասցե և կոնտակտային տվյալներ */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-purple-800">Հասցե`</h3>
              <p>{contactInfo.address}</p>

              <h3 className="text-xl font-bold text-purple-800 pt-2">Հետադարձ կապ`</h3>
              <p>Հեռ.՝ {contactInfo.phones.join(', ')}</p>
              <p>Էլ. հասցե՝ <a href={`mailto:${contactInfo.email}`} className="text-purple-600 underline">{contactInfo.email}</a></p>
            </div>

            {/* Ուշադրություն բաժին զանգվածից */}
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
                {salaryreports.map((item) => (
                  <InfoAccordion
                    key={item.docId}
                    title={item.title}
                    blocks={item.blocks}
                  />
                ))}
              </div>
            </div>
                
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                  <EvocaNewsCard key={item.id} item={item} />
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

export default Securities;