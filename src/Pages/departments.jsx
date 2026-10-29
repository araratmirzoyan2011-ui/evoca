import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase.js';
import Header from '../Components/About-us-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import CardComponent from '../Components/AwardCard.jsx';
import Pagination from '../Components/Pagination.jsx';

const ITEMS_PER_PAGE = 20;

function Departments() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const q = query(collection(db, 'awards'), orderBy('order'));
        const snapshot = await getDocs(q);
        setAwards(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Fetch awards error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  const totalPages = Math.ceil(awards.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = awards.slice(start, start + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 py-10">
        <h1 className="text-[#2d3436] text-4xl font-bold mb-8">Մրցանակներ</h1>

        {loading && <p className="text-center py-20 text-[#2d3436]">Բեռնվում է...</p>}

        {error && (
          <p className="text-center py-20 text-red-500">Սխալ՝ {error}</p>
        )}

        {!loading && !error && awards.length === 0 && (
          <p className="text-center py-20 text-[#2d3436]">Մրցանակներ չեն գտնվել։</p>
        )}

        {!loading && !error && awards.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentItems.map(({ id, year, title, sourceName, logoUrl }) => (
                <CardComponent
                  key={id}
                  year={year}
                  title={title}
                  sourceName={sourceName}
                  logoUrl={logoUrl}
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
      </main>

      <Footer />
    </>
  );
}

export default Departments;