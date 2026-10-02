import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Sarheholder() {
  const [shareholder, setShareholder] = useState(null);
  const [accordionItems, setAccordionItems] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Բաժնետիրոջ տվյալների բեռնում
        const docRef = doc(db, 'shareholders', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setShareholder(docSnap.data());
        }

        // 2. Անհրաժեշտ տեղեկատվության (ակորդեոնների) բեռնում
        const querySnapshot = await getDocs(collection(db, 'shareholderInfo'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAccordionItems(items);

      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Բեռնվում է...
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar />
      
      <div className='w-full mt-[60px] flex justify-center'>
        <h1 className="text-3xl font-medium mb-10 max-[400px]:pl-0 max-[400px]:text-xl max-[400px]:mb-5">
          Բաժնետերեր
        </h1>
      </div>

      <div className="min-h-[60vh] bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8">
          
          {/* Սոց. կոճակներ ձախ մասում */}
          <div className="flex md:flex-col items-center">
            <SocialIcons />
          </div>

          {/* Նկար */}
          <div className="w-full md:w-[400px] flex-shrink-0">
            {shareholder?.photo && (
              <img 
                src={shareholder.photo} 
                alt={shareholder?.name || 'Բաժնետեր'} 
                className="w-full h-auto object-cover rounded-md shadow-sm"
              />
            )}
          </div>

          {/* Տեքստային մաս */}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-4">
              {shareholder?.name}
            </h2>
            
            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
              {shareholder?.bio}
            </p>

            {shareholder?.note && (
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                <span className="font-bold">Նշում.</span> {shareholder.note.replace(/^Նշում\.\s*/, '')}
              </p>
            )}
          </div>

        </div>

        {/* ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ ԲԱԺԻՆ */}
        <div className="max-w-5xl mx-auto mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 tracking-wide">
            ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
          </h3>

          <div className="flex flex-col gap-4">
            {accordionItems.map((item, index) => (
              <div 
                key={item.id || index}
                className="border border-purple-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-purple-900 font-semibold hover:bg-purple-50/50 transition-colors"
                >
                  <span className="text-base sm:text-lg">{item.title}</span>
                  <svg 
                    className={`w-5 h-5 text-purple-700 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-700 text-sm sm:text-base border-t border-purple-100 pt-3 whitespace-pre-line bg-purple-50/20">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Sarheholder;