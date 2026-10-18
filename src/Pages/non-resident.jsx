import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const fetchCollection = async (name) => {
  const snap = await getDocs(query(collection(db, name), orderBy("order")));
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
};

const cardData = {
  title: "Ոչ ռեզիդենտ հաճախորդների հեռավար սպասարկում",
  description: "Բանկ այցելելն այլևս պարտադիր չէ։ Անգամ եթե չեք բնակվում ՀՀ-ում, Evocabank-ի հետ Դուք կարող եք բացել հաշիվներ օնլայն եղանակով աշխարհի ցանկացած կետից և ցանկացած պահի։",
  imageUrl: "https://www.evoca.am/images-cache/menu/1/17510033256067/780x585.png",
  altText: "Հաշիվների բացում և սպասարկում"
};

const NonResident = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [accordionsData, setAccordionsData] = useState([]);
  const [nonResidentReports, setNonResidentReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Ներբեռնում ենք բոլոր 3 collection-ները զուգահեռաբար (Promise.all)
        const [menuData, accordions, reports] = await Promise.all([
          fetchCollection("menuItems"),
          fetchCollection("accordionsData"),
          fetchCollection("nonResidentReport")
        ]);

        setMenuItems(menuData);
        setAccordionsData(accordions);
        setNonResidentReports(reports);
      } catch (err) {
        console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Բեռնվում է...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-600">Տեղի է ունեցել սխալ տվյալները ստանալիս։</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <InfoCard
            title={cardData.title}
            description={cardData.description}
            imageUrl={cardData.imageUrl}
            altText={cardData.altText}
          />
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 leading-relaxed space-y-4">
            <p>
              24/7 անձնական մենեջեր, ֆինանսական ծառայությունների հասանելիություն աշխարհի ցանկացած կետից, փաստաթղթերի անվճար առաքում Ձեր գտնվելու վայր. բոլոր մանրուքները մտածված են, որ Դուք խնայեք Ձեր ժամանակը, չշեղվեք կարևոր գործերից և, իհարկե, օգտվեք prime սպասարկումից:
            </p>
            <p>
              Ուղարկեք փաստաթղթերը, անցեք տեսազանգով նույնականացում և բացեք Ձեր հաշիվը՝ առանց Բանկ այցելելու:
            </p>
            <p>
              Մանրամասները և քայլ առ քայլ ուղեցույցը՝ ներքևում:
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
              ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
            </h2>
            <div className="max-w-4xl space-y-4">
              {accordionsData.map((item) => (
                <InfoAccordion
                  key={item.docId}
                  title={item.title}
                  blocks={item.blocks}
                />
              ))}
            </div>

            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {nonResidentReports.map((r) => (
                  <DocumentCard key={r.docId} title={r.title} url={r.url} />
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

export default NonResident;