import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import InfoCard from '../Components/AccountsCard.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';

const Bond = () => {
  const [loading, setLoading] = useState(true);
  
  const [securitiesmenu, setSecuritiesmenu] = useState([]);
  const [securitiesitems, setSecuritiesitems] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "securitiesmenu"));
        if (!menuSnapshot.empty) {
          setSecuritiesmenu(menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
        
        const securitiesSnapshot = await getDocs(collection(db, "securitiesitems"));
        if (!securitiesSnapshot.empty) {
          setSecuritiesitems(securitiesSnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
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
    title: "Պարտատոմսեր",
    description: "Evocabank-ը հնարավորություն է տալիս ձեռք բերել պարտատոմսեր և ստանալ բարձր եկամուտներ։ Մենք ցանկանում ենք դառնալ Ձեր բարեկեցիկ ապագայի մի մասնիկը։",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/16783548543339/780x585.jpg",
    altText: ""
  };

  // Նկարի տեքստերի զանգվածը
  const bondDescriptionBlocks = [
    {
      id: 1,
      type: 'paragraph',
      content: (
        <>
          Առաջին անգամ հայկական ֆինանսական համակարգում <span className="font-semibold text-purple-700">Evocabank</span>-ը, որպես նորարար և ժամանակակից Բանկ, իրականացրել է իր կողմից թողարկված պարտատոմսերի օնլայն տեղաբաշխում՝ <span className="font-semibold text-purple-700">EvocaTOUCH</span> հավելվածի միջոցով[cite: 1]։
        </>
      )
    },
    {
      id: 2,
      type: 'section',
      title: 'Պարտատոմսերը',
      subtitle: 'պահանջված և բարձր եկամտաբեր ֆինանսական գործիքներ են: Դրանք ապահով են և ունեն մի շարք առավելություններ[cite: 1]՝',
      listItems: [
        'Անվանական պարտատոմսերով ներգրավված դրամական միջոցները համարվում են երաշխավորված բանկային ավանդ և ՀՀ օրենսդրությամբ սահմանված չափերով երաշխավորված են «Ավանդների հատուցումը երաշխավորող հիմնադրամ»-ի կողմից[cite: 1]:',
        'ՀՀ Ֆոնդային Բորսայում ցուցակված պարտատոմսերից ստացված եկամուտները ազատվում են եկամտային հարկից և ոչ ռեզիդենտի շահութահարկից՝ ապահովելով ավելի բարձր եկամտաբերություն[cite: 1]:'
      ]
    }
  ];

  const Bonditems = [];
  const BondReport = [];

  return (
    <>
      <Header />
      <Navbar items={securitiesmenu} />

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
          
          {/* Սոցիալական կոճակներ */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          {/* Հիմնական բովանդակության ճիշտ կառուցվածք */}
          <div className="flex-1 max-w-4xl text-gray-800 space-y-8">
            
            {/* Զանգվածից տվյալների արտածում (նկարի տեքստ) */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm space-y-6 leading-relaxed border border-gray-100">
              {bondDescriptionBlocks.map((block) => {
                if (block.type === 'paragraph') {
                  return <p key={block.id}>{block.content}</p>;
                }
                if (block.type === 'section') {
                  return (
                    <div key={block.id}>
                      <h3 className="text-lg md:text-xl font-bold text-purple-700 mb-3">
                        {block.title}
                      </h3>
                      {block.subtitle && <p className="mb-4">{block.subtitle}</p>}
                      {block.listItems && (
                        <ul className="list-disc pl-5 space-y-3">
                          {block.listItems.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Հաճախ տրվող հարցեր */}
            <div className="pt-4">
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
              </h2>
              <div className="max-w-4xl space-y-4">
                {Bonditems.map((item) => (
                  <InfoAccordion
                    key={item.docId}
                    title={item.title}
                    blocks={item.blocks}
                  />
                ))}
              </div>
            </div>

            {/* Փաստաթղթեր */}
            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {BondReport.map((r) => (
                  <DocumentCard key={r.docId || r.order} title={r.title} url={r.url} />
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

export default Bond;