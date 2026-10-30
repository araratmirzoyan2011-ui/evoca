import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import NewsCard from '../Components/NewsCard.jsx';
import FeaturedNewsCard from '../Components/FeaturedNewsCard.jsx';
import LargeNewsCard from '../Components/LargeNewsCard.jsx';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const fetchCollection = async (name) => {
  const q = query(collection(db, name), orderBy('order'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

function News() {
  const [news, setNews] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [bottomNews, setBottomNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [n, f, b] = await Promise.all([
          fetchCollection('news'),
          fetchCollection('newsFeatured'),
          fetchCollection('newsBottom'),
        ]);
        setNews(n);
        setFeaturedList(f);
        setBottomNews(b);
      } catch (err) {
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const [featured, big, ...small] = news;
  const lom = featuredList[0];

  return (
    <>
      <Header />

      <main className="pt-24">
        {loading ? (
          <div className="py-40 text-center text-gray-500">Բեռնվում է...</div>
        ) : (
          <>
            {featured && (
  <FeaturedNewsCard
    id={featured.id}
    collection="news"
    category={featured.category}
    title={featured.title}
    description={featured.description}
    date={featured.date}
    image={featured.image}
    reverse={false}
  />
)}

{big && (
  <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-20 grid gap-y-16 lg:grid-cols-[512px_1fr] lg:gap-x-[100px]">
    <LargeNewsCard item={big} collection="news" />

    <div className="grid gap-x-[34px] gap-y-10 sm:grid-cols-2 content-start">
      {small.slice(0, 4).map((item) => (
        <NewsCard key={item.id} item={item} collection="news" />
      ))}
    </div>
  </section>
)}

{lom && (
  <FeaturedNewsCard
    id={lom.id}
    collection="newsFeatured"
    category={lom.category}
    title={lom.title}
    description={lom.description}
    date={lom.date}
    image={lom.image}
    reverse={true}
  />
)}

{bottomNews.length > 0 && (
  <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-16 grid gap-x-[45px] gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
    {bottomNews.map((item) => (
      <NewsCard
        key={item.id}
        item={item}
        collection="newsBottom"
      />
    ))}
  </section>
)}

            <div className="border-t border-gray-100">
              <div className="mx-auto max-w-[1200px] px-6 py-4 text-right text-[11px] text-gray-500">
                Թարմացվել է՝ 02/10/2026 17:00
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default News;