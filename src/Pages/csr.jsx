import React from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import { EvocaNewsCard } from '../Components/EVocaCard1.jsx';
import PromoCard from '../Components/Promocard2.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import CsrInfoSection from '../Components/CsrInfoSection.jsx';
function Csr() {
    const csrNewsItems = [
  {
    id: 1,
    category: "CSR",
    title: "Evoca-ն` Yerevan Open շախմատային մրցաշարի ֆինանսական հովանավոր",
    date: "18.12.2025",
    image: "https://www.evoca.am/images-cache/news/1/17690803274151/439x320.png",
    isCustomBanner: false
  },
  {
    id: 2,
    category: "CSR",
    title: "50 մլն դրամ Սպանդարյանի ջրանցքի վերակառուցման համար",
    date: "24.12.2025",
    image: "https://www.evoca.am/images-cache/news/1/17666423680322/439x320.png", 
    isCustomBanner: false
  },
  {
    id: 3,
    category: "CSR",
    title: "5 մլն դրամ «Երաժշտություն հանուն ապագայի» հիմնադրամին",
    date: "13.12.2024",
    image: "https://www.evoca.am/images-cache/news/1/17340920050867/439x320.png",
    isCustomBanner: false
  }
];
  return (
    <>
       <Header />
      <Navbar />

        <PromoCard
            image="https://www.evoca.am/images-cache/menu/1/17108330711252/780x585.png"
            title={"Կորպորատիվ Սոցիալական Պատասխանատվություն"}
            text={"Մենք մեծ կարևորություն ենք տալիս CSR-ին՝ ապահովելով մեր գործունեության դրական ազդեցությունը թե՛ հասարակության, թե՛ շրջակա միջավայրի վրա:"}
        />
        <CsrInfoSection />


<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Վերջին նորությունները
          </h2>
          
          <button className="flex items-center space-x-2 bg-purple-100/70 hover:bg-purple-200/80 text-purple-700 px-4 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 group cursor-pointer">
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
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {csrNewsItems.map((item) => (
            <EvocaNewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Csr;