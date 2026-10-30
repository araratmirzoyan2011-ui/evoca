import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';

import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const Search = () => {
  const [sitemapData, setSitemapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'sitemap'));
        const rawDocs = querySnapshot.docs.map(doc => doc.data());
        
        const flattenedItems = [];

        rawDocs.forEach(doc => {
          if (doc.path) {
            flattenedItems.push({
              title: doc.title || doc.name || doc.path,
              path: doc.path,
              description: doc.description || ''
            });
          }

          if (Array.isArray(doc.subsections)) {
            doc.subsections.forEach(sub => {
              if (Array.isArray(sub.items)) {
                sub.items.forEach(item => {
                  if (item.label && item.path) {
                    flattenedItems.push({
                      title: item.label,
                      path: item.path,
                      description: item.description || ''
                    });
                  }
                });
              }
              if (sub.label && sub.path) {
                flattenedItems.push({
                  title: sub.label,
                  path: sub.path,
                  description: sub.description || ''
                });
              }
            });
          }
        });

        // Հեռացնում ենք կրկնօրինակները ըստ path-ի (կամ title-ի), որպեսզի նույն բանը 2 անգամ չլինի
        const uniqueItems = Array.from(
          new Map(flattenedItems.map(item => [item.path, item])).values()
        );

        setSitemapData(uniqueItems);
      } catch (error) {
        console.error('Սխալ տվյալները ստանալիս:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSitemap();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = sitemapData.filter(item => {
    const title = item.title || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xl text-gray-500 animate-pulse">Բեռնվում են տվյալները Firebase-ից...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
        {/* Վերնագիր */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
          Որոնման արդյունքներ
        </h1>

        {/* Որոնման դաշտ */}
        <div className="relative mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Որոնել ըստ անվանման..."
            className="w-full px-5 py-4 pl-5 pr-12 text-gray-800 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Որոնման արդյունքների ցուցադրում */}
        <div className="space-y-4 mb-12">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div 
                key={index} 
                className="group p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-200 flex items-center justify-between"
              >
                <Link to={item.path} className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                  {item.title}
                </Link>
                <span className="text-gray-300 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-lg">Ոչինչ չի գտնվել</p>
            </div>
          )}
        </div>

        {/* Էջավորման համակարգ (Pagination) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 py-4">
            {/* Ձախ սլաք */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-full transition duration-200 ${
                currentPage === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Էջերի համարներ */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
              const isActive = currentPage === number;
              return (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-10 h-10 rounded-full font-medium text-sm flex items-center justify-center transition duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {number}
                </button>
              );
            })}

            {/* Աջ սլաք */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-full transition duration-200 ${
                currentPage === totalPages 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-purple-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Search;