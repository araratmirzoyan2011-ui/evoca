import React, { useState, useEffect } from 'react';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { db } from "../firebase.js";
import { doc, getDoc } from 'firebase/firestore';

const Loans = () => {

  return (
    <>
      <Header />
      
      <div className="container mx-auto px-4 max-[400px]:px-2 ml-[-18%] max-[400px]:ml-0 mt-[80px] max-[400px]:mt-16">
        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4"> Վարկեր</h1>
      </div>

      <div className="container mx-auto px-4">
        {/* {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">Բեռնվում է...</div>
        ) : loansData.length === 0 ? (
          <div className="text-center py-20 text-gray-500">Վարկեր առայժմ առկա չեն</div>
        ) : (
          loansData.map((loan) => (
            <LoanCard 
              key={loan.id}
              title={loan.title}
              description={loan.description}
              imageSrc={loan.imageSrc}
              stats={loan.stats}
              onDetailsClick={() => handleDetailsClick(loan.title)}
            />
          ))
        )} */}
      </div>

      <Footer />
    </>
  );
};

export default Loans;