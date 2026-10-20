import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { BenefitsHeader } from '../Components/BenefitsHeader';
import Card from '../Components/Benefits-Card';

// Firebase Firestore import-ներ
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ճշգրտեք ճանապարհը ըստ ձեր նախագծի

const EvocaBenefits = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(21);

  // Ֆիլտրերի բացված/փակված վիճակները (Բոլորը սկզբում բաց են՝ true)
  const [openSections, setOpenSections] = useState({
    sorting: true,
    cardType: true,
    location: true,
    benefit: true,
    sector: true,
    platform: true
  });

  // Առանձին ֆիլտրերի արժեքներ
  const [selectedSort, setSelectedSort] = useState('all');
  const [selectedCardTypes, setSelectedCardTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  // 1. Firebase Firestore-ից տվյալների ներբեռնում
  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'evoca_benefits'));
        const benefitsData = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
          socials: { instagram: true, website: index % 2 === 0 }
        }));
        setCards(benefitsData);
      } catch (error) {
        console.error('Սխալ Firebase-ից տվյալները ստանալիս:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (list, setList, item) => {
    setList(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
    setVisibleCount(21);
  };

  // 2. Ֆիլտրման տրամաբանություն
  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          card.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHeaderCategory = activeCategory ? card.category === activeCategory : true;
    
    const matchesCardType = selectedCardTypes.length > 0 ? card.cardTypes?.some(ct => selectedCardTypes.includes(ct)) : true;
    const matchesLocation = selectedLocations.length > 0 ? selectedLocations.includes(card.location) : true;
    const matchesBenefit = selectedBenefits.length > 0 ? selectedBenefits.includes(card.badgeText) : true;
    const matchesSector = selectedSectors.length > 0 ? selectedSectors.includes(card.category) : true;
    const matchesPlatform = selectedPlatforms.length > 0 ? selectedPlatforms.includes(card.platform) : true;

    return matchesSearch && matchesHeaderCategory && matchesCardType && matchesLocation && matchesBenefit && matchesSector && matchesPlatform;
  });

  // 3. Դասավորման (Sorting) տրամաբանություն
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
                  {['Սրճարաններ', 'Հանգիստ', 'Աքսեսուարներ', 'Նորաձևություն', 'Ինտերիեր', 'Սպորտ', 'Նվերներ', 'Առողջություն', 'Գեղեցկություն', 'Տեխնիկա', 'Կենսակերպ'].map((sector, idx) => (
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
            {loading ? (
              <div className="py-20 text-center text-gray-500 font-medium text-lg">
                Բեռնվում են տվյալները Firebase-ից...
              </div>
            ) : sortedCards.length > 0 ? (
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