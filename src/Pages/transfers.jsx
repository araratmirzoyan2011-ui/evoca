import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoBanner from '../Components/infoBanner.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const Transfers = () => {
  const [cardInfo, setCardInfo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [transfersList, setTransfersList] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [transfersAccordionsData, setTransfersAccordionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const cardInfoSnapshot = await getDocs(collection(db, "cardInfo"));
        if (!cardInfoSnapshot.empty) {
          setCardInfo(cardInfoSnapshot.docs[0].data());
        }

        const bannerSnapshot = await getDocs(collection(db, "banner"));
        if (!bannerSnapshot.empty) {
          setBanner(bannerSnapshot.docs[0].data());
        }

        const transfersListSnapshot = await getDocs(collection(db, "transfersList"));
        const transfersListData = transfersListSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTransfersList(transfersListData);

        const menuItemsSnapshot = await getDocs(collection(db, "menuItems"));
        const menuItemsData = menuItemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => (a.order || 0) - (b.order || 0));
        setMenuItems(menuItemsData);

        const accordionsSnapshot = await getDocs(collection(db, "transfersAccordions"));
        const accordionsData = accordionsSnapshot.docs.map(doc => ({
          docId: doc.id,
          ...doc.data()
        }));
        setTransfersAccordionsData(accordionsData);

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
      
      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {cardInfo && (
            <InfoCard
              title={cardInfo.title}
              description={cardInfo.description}
              imageUrl={cardInfo.imageUrl}
              altText={cardInfo.altText}
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

          <div className="max-w-4xl text-gray-800 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ընդհանուր դրույթներ
            </h2>
            
            <p className="leading-relaxed">
              Ձեր բանկային փոխանցումներն իրականացնում ենք՝ ղեկավարվելով «Բանկերի և բանկային գործունեության մասին» ՀՀ օրենքով, ՀՀ Կենտրոնական բանկի իրավական ակտերով, ՀՀ այլ իրավական ակտերով, թղթակից բանկերի հետ կնքված պայմանագրերով և սպասարկման սահմանված պայմաններով:
            </p>

            <p className="leading-relaxed">
              Ձեր փոխանցումները կատարում ենք վճարման հանձնարարագրերի հիման վրա (կախված գումարի չափից, փոխանցման բնույթից և նպատակից՝ կարող են պահանջվել նաև այլ փաստաթղթեր):
            </p>

            <p className="leading-relaxed">
              Յուրաքանչյուր աշխատանքային օրվա ընթացքում՝ մինչև ժամը 15:30 ներկայացված վճարման հանձնարարագրերը կատարում ենք նույն բանկային օրը, իսկ ժամը 15:30-ից հետո ներկայացված վճարման հանձնարարագրերը՝ հաջորդ բանկային օրը: Մինչև ժամը 16:30 ներկայացված դրամով փոխանցումները (պետական և տեղական բյուջեի վճարներ, կոմունալ կամ սոցիալական այլ վճարներ) կատարման ենք ընդունում նույն բանկային օրը:
            </p>

            <p className="leading-relaxed">
              Դրամով և արտարժույթով բանկային փոխանցումներ իրականացնելիս ձեզանից գանձում ենք <a href="#" className="text-purple-600 underline font-medium">միջնորդավճարներ</a>՝ ըստ մեր դրույքաչափերի և սակագների: Կոմունալ վճարների սպասարկման դիմաց միջնորդավճար չենք գանձում: Միջնորդավճարները գանձվում են ՀՀ դրամով: Արտարժույթի տոկոսային հարաբերակցությամբ սահմանված միջնորդավճարները գանձվում են ՀՀ դրամով՝ հիմք ընդունելով գանձման օրը տվյալ արտարժույթի համար մեր կողմից սահմանված անկանխիկ վաճառքի փոխարժեքը:
            </p>

            <p className="leading-relaxed">
              Մենք պարտավոր ենք տրամադրել յուրաքանչյուր փոխանցման կատարումը հավաստող փաստաթուղթ, որտեղ նշված կլինեն փոխանցման գումարը, արժույթը, միջնորդավճարի չափը և այլ մանրամասներ:
            </p>
          </div>
        </div>

        {banner && <InfoBanner title={banner.title} imageSrc={banner.src} />}

        <div className="max-w-7xl mx-auto mt-12">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
              </h2>
              <div className="max-w-4xl space-y-4">
                {transfersAccordionsData.map((item) => (
                  <InfoAccordion
                    key={item.docId || item.id}
                    title={item.title}
                    blocks={item.blocks}
                  />
                ))}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2 mt-[40px]">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5 mt-6">
                {transfersList.map((docItem, index) => (
                  <DocumentCard key={docItem.id || index} title={docItem.title} url={docItem.url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnlineBanking />
      <Footer />
    </>
  );
};

export default Transfers;