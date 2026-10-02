import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Parthner() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const docRef = doc(db, 'partnersCollection', 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.partners && Array.isArray(data.partners)) {
            const formattedPartners = data.partners.map((url, index) => ({
              id: index + 1,
              logo: url,
              name: `Partner ${index + 1}`
            }));
            setPartners(formattedPartners);
          }
        } else {
          console.log('Փաստաթուղթը գոյություն չունի!');
        }
      } catch (error) {
        console.error('Սխալ տվյալներ ստանիս:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const totalPages = Math.ceil(partners.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = partners.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Բեռնվում է...</div>;
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Գործընկերներ</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-purple-100 rounded-lg overflow-hidden bg-white mb-6 shadow-sm">
          {currentItems.length > 0 ? (
            currentItems.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center p-6 border border-purple-50 h-40 bg-white hover:shadow-sm transition-all"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-20 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-400">Գործընկերներ չեն գտնվել</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-start space-x-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-gray-400 hover:text-purple-600 disabled:opacity-30 cursor-pointer text-lg font-bold"
            >
              ←
            </button>

            <div className="flex items-center space-x-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-full font-medium transition-all ${
                    currentPage === i + 1
                      ? 'bg-purple-700 text-white shadow-md'
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-purple-700 hover:text-purple-900 disabled:opacity-30 cursor-pointer font-bold text-lg"
            >
              →
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Parthner;