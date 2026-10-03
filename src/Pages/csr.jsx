import React from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { EvocaNewsCard } from '../Components/EVocaCard1.jsx';
import PromoCard from '../Components/Promocard2.jsx';
function Csr() {
  return (
    <>
       <Header />
      <Navbar />

        <PromoCard
                    image="https://www.evoca.am/images-cache/menu/1/17108330711252/780x585.png"
                    title={"Կորպորատիվ Սոցիալական Պատասխանատվություն"}
                    text={"Մենք մեծ կարևորություն ենք տալիս CSR-ին՝ ապահովելով մեր գործունեության դրական ազդեցությունը թե՛ հասարակության, թե՛ շրջակա միջավայրի վրա:"}
                  />



{/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
          {newsItems.map((item) => (
            <EvocaNewsCard key={item.id} item={item} />
          ))}
        </div>
      </div> */}
      <Footer />
    </>
  );
}

export default Csr;