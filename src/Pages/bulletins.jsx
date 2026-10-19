import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';


const Bulletins = () => {

  return (
    <>
      <Header />

      <section className="w-full bg-white py-8 px-4 md:px-12">
        <div className="max-w-5xl mx-auto flex gap-6 md:gap-12">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Հետադարձ կապ
            </h2>

            
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Bulletins;