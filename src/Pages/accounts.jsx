import React from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';

const Accounts = () => {
  const cardData = {
    title: "Evoca խնայողական հաշիվ",
    description: "Ստացիր եկամուտ՝ պարզապես գումարդ պահելով խնայողական հաշվիդ վրա:",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/17906902726456/780x585.png",
    altText: "Evoca խնայողական հաշիվ"
  };

  const menuItems = [
    { path: "/accounts", label: "Evoca խնայողական հաշիվ" },
    { path: "/savings", label: "Հաշիվների բացում և սպասարկում" },
    { path: "/metal-accounts", label: "Առարկայազուրկ մետաղական հաշիվներ" },
    { path: "/non-resident", label: "Ոչ ռեզիդենտ հաճախորդների հեռավար սպասարկում" }
  ];

  return (
    <>
      <Header />
      <Navbar items={menuItems} />
      
      {/* Ուղղված main հատվածը */}
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

      <Footer />
    </>
  );
};

export default Accounts;