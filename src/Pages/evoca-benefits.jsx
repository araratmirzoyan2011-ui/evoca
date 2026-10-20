import React, { useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { BenefitsHeader } from '../Components/BenefitsHeader';
import Card from '../Components/Benefits-Card';

// Իրական Evoca Benefits գործընկերների հիմնական բազան՝ համապատասխան ֆիլտրման դաշտերով
const realEvocaPartners = [
  { title: "CEMI Café by Apicius Armenia", discount: "10%", badgeText: "Զեղչ", category: "Սրճարաններ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite", "Evoca Visa Platinum", "Visa Vision"] },
  { title: "ppls Dilijan", discount: "10%", badgeText: "Զեղչ", category: "Հանգիստ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Evoca Travel Card", "Mastercard Gold", "Visa Gold"] },
  { title: "Villa3 Community Hub", discount: "10%", badgeText: "Զեղչ", category: "Հանգիստ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite", "Mastercard Standard", "Visa Classic"] },
  { title: "Chronograph", discount: "15%", badgeText: "Զեղչ", category: "Աքսեսուարներ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite"] },
  { title: "Paul Armenia", discount: "10%", badgeText: "Զեղչ", category: "Սրճարաններ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite", "Evoca Visa Platinum", "Visa Digital"] },
  { title: "Henderson", discount: "15%", badgeText: "Զեղչ", category: "Նորաձևություն", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite", "Evoca Travel Card", "Visa Business"] },
  { title: "Pullman", discount: "5%", badgeText: "Զեղչ", category: "Ինտերիեր", location: "Արտերկիր", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite"] },
  { title: "Burmunk", discount: "10%", badgeText: "Զեղչ", category: "Աքսեսուարներ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite", "Mastercard Gold", "Arca Classic"] },
  { title: "Seven Visions Resort & Places, The Dvin", discount: "20%", badgeText: "Զեղչ", category: "Սրճարաններ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite"] },
  { title: "Body & Soul Fitness Center", discount: "20%", badgeText: "Զեղչ", category: "Սպորտ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite"] },
  { title: "TIME", discount: "15%", badgeText: "Զեղչ", category: "Աքսեսուարներ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite", "Evoca Travel Card", "Visa Business"] },
  { title: "Mayrig", discount: "16%", badgeText: "Cashback", category: "Սրճարաններ", location: "Հայաստան", benefit: "Cashback", platform: "Օֆլայն", cardTypes: ["Visa Infinite", "Evoca Visa Platinum"] },
  { title: "4u.am", discount: "20%", badgeText: "Cashback", category: "Նվերներ", location: "Հայաստան", benefit: "Cashback", platform: "Օնլայն", cardTypes: ["Visa Infinite", "Mastercard Gold", "Visa Digital"] },
  { title: "Ashley home", discount: "3.5%", badgeText: "Cashback", category: "Ինտերիեր", location: "Հայաստան", benefit: "Cashback", platform: "Օֆլայն", cardTypes: ["Visa Infinite", "Visa Classic", "Arca Classic"] },
  { title: "Cofix", discount: "15%", badgeText: "Զեղչ", category: "Սրճարաններ", location: "Հայաստան", benefit: "Զեղչ", platform: "Օֆլայն", cardTypes: ["Visa Infinite", "Evoca Visa Platinum", "Visa Vision"] }
];

// Գեներացնում ենք ճիշտ 63 քարտ
const evocaBenefitsCards = Array.from({ length: 63 }, (_, index) => {
  const partner = realEvocaPartners[index % realEvocaPartners.length];
  return {
    id: index + 1,
    title: index < realEvocaPartners.length ? partner.title : `${partner.title} (${Math.floor(index / realEvocaPartners.length) + 1})`,
    discount: partner.discount,
    badgeText: partner.badgeText,
    category: partner.category,
    location: partner.location,
    benefit: partner.benefit,
    platform: partner.platform,
    cardTypes: partner.cardTypes,
    imageSrc: `https://via.placeholder.com/400x200?text=${encodeURIComponent(partner.title)}`,
    socials: { instagram: true, website: index % 2 === 0 }
  };
});

const EvocaBenefits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(21);

  // Ֆիլտրերի բացված/փակված վիճակները
  const [openSections, setOpenSections] = useState({
    sorting: true,
    cardType: false,
    location: false,
    benefit: false,
    sector: true,
    platform: false
  });

  // Առանձին ֆիլտրերի արժեքներ
  const [selectedSort, setSelectedSort] = useState('all');
  const [selectedCardTypes, setSelectedCardTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (list, setList, item) => {
    setList(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
    setVisibleCount(21);
  };

  // Ֆիլտրման տրամաբանություն
  const filteredCards = evocaBenefitsCards.filter((card) => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          card.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHeaderCategory = activeCategory ? card.category === activeCategory : true;
    
    const matchesCardType = selectedCardTypes.length > 0 ? card.cardTypes.some(ct => selectedCardTypes.includes(ct)) : true;
    const matchesLocation = selectedLocations.length > 0 ? selectedLocations.includes(card.location) : true;
    const matchesBenefit = selectedBenefits.length > 0 ? selectedBenefits.includes(card.badgeText) : true;
    const matchesSector = selectedSectors.length > 0 ? selectedSectors.includes(card.category) : true;
    const matchesPlatform = selectedPlatforms.length > 0 ? selectedPlatforms.includes(card.platform) : true;

    return matchesSearch && matchesHeaderCategory && matchesCardType && matchesLocation && matchesBenefit && matchesSector && matchesPlatform;
  });

  // Դասավորման (Sorting) տրամաբանություն
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (selectedSort === 'high-to-low') {
      return parseFloat(b.discount) - parseFloat(a.discount);
    }
    if (selectedSort === 'low-to-high') {
      return parseFloat(a.discount) - parseFloat(b.discount);
    }
    return 0;
  });

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 21);
  };

  return (
    <>
      <Header />
      
      <main className="w-full bg-white py-8 px-4 md:px-12 max-w-[1400px] mx-auto">
        <BenefitsHeader 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          
          {/* Ձախ սյունյակ՝ Ֆիլտրներ */}
          <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ֆիլտրներ</h2>

            {/* 1. Դասավորել */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <button onClick={() => toggleSection('sorting')} className="w-full flex items-center justify-between font-bold text-gray-900">
                <span>Դասավորել</span>
                <svg className={`w-5 h-5 transition-transform ${openSections.sorting ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {openSections.sorting && (
                <div className="flex flex-col gap-3 mt-4 text-sm text-gray-700">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="sort" checked={selectedSort === 'all'} onChange={() => setSelectedSort('all')} className="w-4 h-4 text-purple-600 accent-purple-600"/>
                    <span>Բոլորը</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="sort" checked={selectedSort === 'high-to-low'} onChange={() => setSelectedSort('high-to-low')} className="w-4 h-4 text-purple-600 accent-purple-600"/>
                    <span>Բարձրից ցածր</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="sort" checked={selectedSort === 'low-to-high'} onChange={() => setSelectedSort('low-to-high')} className="w-4 h-4 text-purple-600 accent-purple-600"/>
                    <span>Ցածրից բարձր</span>
                  </label>
                </div>
              )}
            </div>

            {/* 2. Քարտատեսակ */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <button onClick={() => toggleSection('cardType')} className="w-full flex items-center justify-between font-bold text-gray-900">
                <span>Քարտատեսակ</span>
                <svg className={`w-5 h-5 transition-transform ${openSections.cardType ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {openSections.cardType && (
                <div className="flex flex-col gap-3 mt-4 text-sm text-gray-700 max-h-48 overflow-y-auto">
                  {['Visa Infinite', 'Evoca Visa Platinum', 'Evoca Travel Card', 'Mastercard Gold', 'Visa Gold', 'Visa Classic', 'Arca Classic'].map((cardType, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={selectedCardTypes.includes(cardType)}
                          onChange={() => handleCheckboxChange(selectedCardTypes, setSelectedCardTypes, cardType)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 accent-purple-600"
                        />
                        <span>{cardType}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Վայր */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <button onClick={() => toggleSection('location')} className="w-full flex items-center justify-between font-bold text-gray-900">
                <span>Վայր</span>
                <svg className={`w-5 h-5 transition-transform ${openSections.location ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {openSections.location && (
                <div className="flex flex-col gap-3 mt-4 text-sm text-gray-700">
                  {['Հայաստան', 'Արտերկիր'].map((loc, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={selectedLocations.includes(loc)}
                          onChange={() => handleCheckboxChange(selectedLocations, setSelectedLocations, loc)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 accent-purple-600"
                        />
                        <span>{loc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Բենեֆիթ */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <button onClick={() => toggleSection('benefit')} className="w-full flex items-center justify-between font-bold text-gray-900">
                <span>Բենեֆիթ</span>
                <svg className={`w-5 h-5 transition-transform ${openSections.benefit ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {openSections.benefit && (
                <div className="flex flex-col gap-3 mt-4 text-sm text-gray-700">
                  {['Զեղչ', 'Cashback'].map((ben, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={selectedBenefits.includes(ben)}
                          onChange={() => handleCheckboxChange(selectedBenefits, setSelectedBenefits, ben)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 accent-purple-600"
                        />
                        <span>{ben}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Ոլորտ */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <button onClick={() => toggleSection('sector')} className="w-full flex items-center justify-between font-bold text-gray-900">
                <span>Ոլորտ</span>
                <svg className={`w-5 h-5 transition-transform ${openSections.sector ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {openSections.sector && (
                <div className="flex flex-col gap-3 mt-4 text-sm text-gray-700">
                  {['Սրճարաններ', 'Հանգիստ', 'Աքսեսուարներ', 'Նորաձևություն', 'Ինտերիեր', 'Սպորտ', 'Նվերներ'].map((sector, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={selectedSectors.includes(sector)}
                          onChange={() => handleCheckboxChange(selectedSectors, setSelectedSectors, sector)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 accent-purple-600"
                        />
                        <span>{sector}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 6. Հարթակ */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <button onClick={() => toggleSection('platform')} className="w-full flex items-center justify-between font-bold text-gray-900">
                <span>Հարթակ</span>
                <svg className={`w-5 h-5 transition-transform ${openSections.platform ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {openSections.platform && (
                <div className="flex flex-col gap-3 mt-4 text-sm text-gray-700">
                  {['Օֆլայն', 'Օնլայն'].map((plat, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={selectedPlatforms.includes(plat)}
                          onChange={() => handleCheckboxChange(selectedPlatforms, setSelectedPlatforms, plat)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 accent-purple-600"
                        />
                        <span>{plat}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </aside>

          {/* Աջ հատված՝ Քարտերի ցանց (Grid) */}
          <section className="flex-1 flex flex-col items-center">
            {sortedCards.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                  {sortedCards.slice(0, visibleCount).map((card) => (
                    <Card
                      key={card.id}
                      imageSrc={card.imageSrc}
                      discount={card.discount}
                      title={card.title}
                      badgeText={card.badgeText}
                      category={card.category}
                      socials={card.socials}
                    />
                  ))}
                </div>

                {/* «Բեռնել ավելին» կոճակ */}
                {visibleCount < sortedCards.length && (
                  <button
                    onClick={handleLoadMore}
                    className="mt-10 px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-200 shadow-sm"
                  >
                    Բեռնել ավելին
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-gray-500 font-medium">
                Արդյունքներ չեն գտնվել
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default EvocaBenefits;