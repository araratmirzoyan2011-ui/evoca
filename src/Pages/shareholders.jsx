import Header from '../Components/About-us-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLocalized } from '../hooks/useLocalized.js';
const shareholdersResources = {
  hy: {
    shareholders: {
      loading: 'Բեռնվում է...',
      title: 'Բաժնետերեր',
      shareholderAlt: 'Բաժնետեր',
      note: 'Նշում.',
      infoTitle: 'ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ',
      documents: 'փաստաթղթեր',
      docCharter: 'Կանոնադրություն',
      docLicense: 'Բանկային գործունեության լիցենզիա',
      docCertificate: 'Բանկի Գրանցման վկայականը',
    },
  },
  en: {
    shareholders: {
      loading: 'Loading...',
      title: 'Shareholders',
      shareholderAlt: 'Shareholder',
      note: 'Note.',
      infoTitle: 'ESSENTIAL INFORMATION',
      documents: 'Documents',
      docCharter: 'Charter',
      docLicense: 'Banking license',
      docCertificate: 'Bank registration certificate',
    },
  },
  ru: {
    shareholders: {
      loading: 'Загрузка...',
      title: 'Акционеры',
      shareholderAlt: 'Акционер',
      note: 'Примечание.',
      infoTitle: 'НЕОБХОДИМАЯ ИНФОРМАЦИЯ',
      documents: 'Документы',
      docCharter: 'Устав',
      docLicense: 'Лицензия на осуществление банковской деятельности',
      docCertificate: 'Свидетельство о регистрации Банка',
    },
  },
};

Object.entries(shareholdersResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

function Sarheholder() {
  const { t } = useTranslation();
  const l = useLocalized();

  const [shareholder, setShareholder] = useState(null);
  const [accordionItems, setAccordionItems] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const documentsList = [
    { id: 1, titleKey: 'shareholders.docCharter' },
    { id: 2, titleKey: 'shareholders.docLicense' },
    { id: 3, titleKey: 'shareholders.docCertificate' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'shareholders', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setShareholder(docSnap.data());
        }

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
        {t('shareholders.loading')}
      </div>
    );
  }

  // Լոկալիզացված արժեքներ (Firestore-ում՝ {hy, en, ru})
  const shareholderName = shareholder?.name ? l(shareholder.name) : '';

  return (
    <>
      <Header />
      <Navbar />
      
      <div className='w-full mt-[60px] flex justify-center'>
        <h1 className="text-3xl font-medium mb-10 max-[400px]:pl-0 max-[400px]:text-xl max-[400px]:mb-5">
          {t('shareholders.title')}
        </h1>
      </div>

      <div className="min-h-[60vh] bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8">
          
          <div className="flex md:flex-col items-center">
            <SocialIcons />
          </div>

          <div className="w-full md:w-[400px] flex-shrink-0">
            {shareholder?.photo && (
              <img 
                src={shareholder.photo} 
                alt={shareholderName || t('shareholders.shareholderAlt')} 
                className="w-full h-auto object-cover rounded-md shadow-sm"
              />
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-4">
              {shareholderName}
            </h2>
            
            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
              {shareholder?.bio ? l(shareholder.bio) : ''}
            </p>

            {shareholder?.note && (
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                <span className="font-bold">{t('shareholders.note')}</span> {l(shareholder.note)}
              </p>
            )}
          </div>

        </div>

        <div className="max-w-5xl mx-auto mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 tracking-wide">
            {t('shareholders.infoTitle')}
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
                  <span className="text-base sm:text-lg">{l(item.title)}</span>
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
                    {l(item.content)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className="max-w-3xl mx-auto ml-[16%] p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('shareholders.documents')}</h1>

        {documentsList.map((doc) => (
          <DocumentCard 
            key={doc.id}
            title={t(doc.titleKey)}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Sarheholder;