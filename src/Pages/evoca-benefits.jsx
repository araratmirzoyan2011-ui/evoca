import React, { useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { BenefitsHeader } from '../Components/BenefitsHeader';

const EvocaBenefits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <>
      <Header />
      
      <main className="w-full bg-white py-12 px-4 md:px-12">
        <BenefitsHeader 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </main>

      <Footer />
    </>
  );
};

export default EvocaBenefits;