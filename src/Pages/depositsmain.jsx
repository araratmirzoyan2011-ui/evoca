import React, { useState, useEffect } from 'react';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const IMG = "https://www.evoca.am/images-cache/deposits/1";

const DepositData = [
  {
    id: 1,
    title: "Դասական ավանդ",
    description: "Ձեր անհոգ ապագայի համար առաջարկում ենք ավելացնել Ձեր խնայողությունները՝ ներդնելով Դասական ավանդ՝ կայուն և բարձր եկամտաբերությամբ։",
    imageSrc: `${IMG}/1613390220029/415x261.jpg`,
    stats: [
      { label: "Գումար", value: "սկսած 100,000 ֏" },
      { label: "Ժամկետ", value: "31-1,825 օր" },
      { label: "Տոկոսադրույք", value: "մինչև 10.5%" },
      { label: "Համալրման հնարավորություն", value: "սկսած 100,000 ֏" }
    ]
  },
  {
    id: 2,
    title: "Մանկական ավանդ",
    description: "Ձեր երեխայի անհոգ ապագայի համար առաջարկում ենք ներդնել «Մանկական» ավանդ։ «Մանկական» ժամկետային ավանդն ընդունում ենք ֆիզիկական անձանցից՝ երեխաների անունով ներդնելու պայմանով։",
    imageSrc: `${IMG}/16133900414285/415x261.jpg`,
    stats: [
      { label: "Գումար", value: "սկսած 100,000 ֏" },
      { label: "Ժամկետ", value: "մինչև 18 լրանալը" },
      { label: "Տոկոսադրույք", value: "9.5%" },
      { label: "Համալրման հնարավորություն", value: "սկսած 40,000 ֏" }
    ]
  },
  {
    id: 3,
    title: "Ավանդ Evoca Online",
    description: "Ցանկանու՞մ եք ներդնել ավանդ բարձր տոկոսադրույքով, բայց չունե՞ք ժամանակ։ Ձևակերպե՛ք EvocaONLINE ավանդն՝ առանց բանկ այցելելու։ Իսկ մենք բոլոր փաստաթղթերը կուղարկենք Ձեր էլ. հասցեին։",
    imageSrc: `${IMG}/16133900122121/415x261.jpg`,
    stats: [
      { label: "Գումար", value: "սկսած 100,000 ֏" },
      { label: "Ժամկետ", value: "31-1,825 օր" },
      { label: "Տոկոսադրույք", value: "մինչև 10.75%" }
    ]
  }
];

const DepositMain = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuSnap = await getDocs(
          query(collection(db, "DepositMenu"), orderBy("order"))
        );
        setMenuItems(menuSnap.docs.map((d) => d.data()));
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

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <div className="container mx-auto px-4 max-[400px]:px-2 ml-[-18%] max-[400px]:ml-0 mt-[80px] max-[400px]:mt-16">
        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">
          Ավանդներ
        </h1>
      </div>

      <div className="container mx-auto px-4">
        {loading && <p className="text-center">Բեռնվում է...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading &&
          !error &&
          DepositData.map((deposit) => (
            <LoanCard
              key={deposit.id}
              title={deposit.title}
              description={deposit.description}
              imageSrc={deposit.imageSrc}
              stats={deposit.stats}
              onDetailsClick={() => handleDetailsClick(deposit.title)}
            />
          ))}
      </div>

      <Footer />
    </>
  );
};

export default DepositMain;