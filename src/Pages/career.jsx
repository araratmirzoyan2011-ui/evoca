import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import WhyWorkSection from '../Components/WhyWorkSection.jsx';
function Career() {
const cultureData = {
  title: "Մշակույթ",
  text: "Evoca-ում աշխատելը հաճելի է: Առօրյան լցված է նորարարություններով: Այստեղ տաղանդները անընդհատ զարգանում ու կատարելագործվում են:",
  bgImage: "/images/culture-banner.png",
};
const whyWorkData = {
  title: "Ինչո՞ւ աշխատել Evoca-ում",
  text: "«Բացահայտի՛ր, թե ինչն է Evoca-ն դարձնում այդքան յուրահատուկ: Աշխատակիցներն ուրախ են, մոտիվացված, իսկ առավելությունների մեծ փաթեթն օգնում է հոգ տանել իրենց և ընտանիքների մասին»",
  image: "https://www.evoca.am/file_manager/Career/evoca-girl.jpg",
};
  return (
    <>
      <Header />
      <Navbar />
      <div className='w-full mb-[60px] h-[300px] bg-[url("https://www.evoca.am/images-cache/menu/1/16195117975601/1920x634.jpg")] flex justify-center items-center'>
            <CultureBanner {...cultureData} />
      </div>
      <WhyWorkSection {...whyWorkData} />
      <Footer />
    </>
  );
}

export default Career;