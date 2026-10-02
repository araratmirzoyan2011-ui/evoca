import React from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';

function Group() {
  return (
    <>
      <Header />
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-12 items-start relative">
          
          <div className="md:sticky md:top-8">
            <SocialIcons />
          </div>

          <div className="flex-1 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Էվոկա ֆինանսական խումբ
            </h1>

            <div className="space-y-6 text-gray-800 leading-relaxed text-base">
              <p>
                ՀՀ կենտրոնական բանկի խորհրդի 30.06.2025թ. թիվ 05 ԲԳ Ա որոշմամբ
                <strong className="font-bold">Evocabank</strong>-ը («ԷՎՈԿԱԲԱՆԿ» ՓԲԸ) և
                <strong className="font-bold">Wilco</strong>-ն («Վիլկո» ՍՊԸ) միավորվում են՝ դառնալով մեկ ֆինանսական խումբ՝
                <span className="font-semibold">Evoca</span> անվամբ[cite: 4]:
              </p>

              <p>
                <strong className="font-bold">Evocabank</strong>-ը նշանակվել է
                <span className="font-semibold">Evoca</span> ֆինանսական խմբի պատասխանատու անձ։
              </p>

              <p>
                <strong className="font-bold">Wilco</strong> կապիտալի կառավարման ընկերության մասին ամբողջական տեղեկատվություն՝
                <a 
                  href="#" 
                  className="text-purple-700 underline hover:text-purple-900 font-medium"
                >
                  այստեղ
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Group;