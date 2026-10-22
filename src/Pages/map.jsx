import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';

import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const Map = () => {
  const [sitemapData, setSitemapData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'sitemap'));
        const data = querySnapshot.docs.map(doc => doc.data());
        setSitemapData(data);
      } catch (error) {
        console.error('Սխալ տվյալները ստանալիս:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSitemap();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xl text-gray-600">Բեռնվում է տվյալները Firebase-ից...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-10 text-gray-900 border-b pb-4">Կայքի քարտեզ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start">
          {sitemapData.map((category, index) => (
            <div key={index} className="space-y-6 h-auto">
              <h2 className="text-xl font-bold border-b-2 border-purple-600 pb-2">
                <Link to={category.path} className="text-gray-900 hover:text-purple-700 transition-colors block">
                  {category.title}
                </Link>
              </h2>
              
              {category.subsections && category.subsections.map((sub, sIndex) => (
                <div key={sIndex} className="space-y-2">
                  <h3 className="font-bold text-sm">
                    <Link to={sub.path} className="text-gray-800 hover:text-purple-700 transition-colors block">
                      {sub.title}
                    </Link>
                  </h3>
                  <ul className="space-y-2 pl-1">
                    {sub.items && sub.items.map((item, iIndex) => (
                      <li key={iIndex}>
                        <Link 
                          to={item.path} 
                          className="text-gray-600 hover:text-purple-700 hover:underline text-sm transition-colors block"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Map;