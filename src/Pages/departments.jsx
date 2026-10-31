import React, { useEffect, useState } from 'react';
import Header from '../Components/About-us-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import CardComponent from '../Components/AwardCard.jsx';
import Pagination from '../Components/Pagination.jsx';
import AwardsDecor from '../Components/AwardsDecor.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ITEMS_PER_PAGE = 20;

function Departments() {
  const [awardsData, setAwardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Տվյալների բեռնումը Firebase-ից բաղադրիչը բացվելիս
  useEffect(() => {
    const fetchAwardsFromFirebase = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'DepartmentCardNews'));
        const items = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        
        // Ցանկության դեպքում կարող եք կարգավորել տեսակավորումը, օրինակ ըստ id-ի կամ տարեթվի
        setAwardsData(items);
      } catch (error) {
        console.error('Սխալ Firebase-ից տվյալներ ստանալիս:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAwardsFromFirebase();
  }, []);

  const totalPages = Math.ceil(awardsData.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = awardsData.slice(start, start + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <Navbar />

      <main>
        <div className="max-w-[1200px] mx-auto px-4 pt-10 pb-8">
          <h1 className="text-[#2d3436] text-4xl font-bold">Մրցանակներ</h1>
        </div>

        {/* Ֆոնով բլոկ */}
        <section className="relative overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-[#f3f3f9] md:rounded-tl-[260px]" />

          <div className="relative max-w-[1200px] mx-auto px-4">
            <div className="relative grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-10 items-start">
              <AwardsDecor />

              <div className="relative z-10">
                {loading ? (
                  <div className="py-20 text-center text-gray-500 font-medium">Բեռնվում է տվյալները Firebase-ից...</div>
                ) : awardsData.length === 0 ? (
                  <div className="py-20 text-center text-gray-500 font-medium">Տվյալներ չեն գտնվել Firebase-ում:</div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentItems.map(({ id, year, title, sourceName, logoUrl }) => (
                        <CardComponent
                          key={id}
                          year={year}
                          title={title}
                          sourceName={sourceName}
                          logoUrl={logoUrl}
                          to={`/news/awards/${id}`}
                        />
                      ))}
                    </div>

                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Departments;