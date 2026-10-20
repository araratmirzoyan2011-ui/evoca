import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';

const cardData = {
  title: "Ռեպո/Հակադարձ Ռեպո գործարքներ",
  description:
    "Կարճաժամկետ դրամական միջոցներ ներգրավելու և տեղաբաշխելու նպատակով Evocabank-ն իրականացնում է Ռեպո/Հակադարձ Ռեպո գործարքներ։ Ռեպո/Հակադարձ Ռեպո գործարքների շնորհիվ՝ Բանկը կատարում է կարճաժամկետ իրացվելիության կառավարում։",
  imageUrl: "https://www.evoca.am/images-cache/menu/1/16783548886405/780x585.jpg",
  altText: "",
};

const repoTexts = [
  "Բանկը Ռեպո/Հակադարձ Ռեպո գործարքներ է կնքում բացառապես Հայաստանի Հանրապետության Կենտրոնական բանկի կողմից գրանցված և լիցենզավորված, մասնագիտացված ընկերությունների հետ (Բանկեր, Ներդրումային ընկերություններ, Ներդրումային ֆոնդեր, Վարկային կազմակերպություններ, Ապահովագրական ընկերություններ)։",
  "Գործարքները կնքվում են ՀՀ պետական գանձապետական և ԿԲ-ի կողմից թողարկված պարտատոմսերով, ինչպես նաև ՀՀ առևտրային բանկերի, վարկային կազմակերպությունների կողմից թողարկված և Հայաստանի Ֆոնդային Բորսայում ցուցակված այլ կորպորատիվ պարտատոմսերով։",
  "Գործարքի հիմնական պայմանները որոշվում են երկկողմ բանակցությունների արդյունքում։",
];

const Repo = () => {
  const [loading, setLoading] = useState(true);
  const [securitiesmenu, setSecuritiesmenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const menuSnapshot = await getDocs(collection(db, "securitiesmenu"));
        if (!menuSnapshot.empty) {
          setSecuritiesmenu(
            menuSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
          );
        }
      } catch (error) {
        console.error("Firestore-ից տվյալների բեռնման սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
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
      <Header />
      <Navbar items={securitiesmenu} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
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

          <div className="flex-1 max-w-4xl text-gray-800 space-y-6 text-base leading-relaxed">
            {repoTexts.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Repo;