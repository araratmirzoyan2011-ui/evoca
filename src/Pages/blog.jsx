import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import NewsCard from '../Components/NewsCard.jsx';
import FeaturedNewsCard from '../Components/FeaturedNewsCard.jsx';
import LargeNewsCard from '../Components/LargeNewsCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BannerNewsCard from '../Components/BannerNewsCard.jsx';
const fetchCollection = async (name) => {
  const snap = await getDocs(collection(db, name));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

function Blog() {
    
  const [news1, setNews1] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [bottomNews, setBottomNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerList, setBannerList] = useState([]);
  useEffect(() => {
    const load = async () => {
        const names = ['news1', 'newsFeautured2', 'newsBottom2', 'newsBanner'];
      const results = await Promise.allSettled(names.map(fetchCollection));

      results.forEach((r, i) => {
        if (r.status === 'rejected') console.error(names[i], r.reason);
      });

      if (results[0].status === 'fulfilled') setNews1(results[0].value);
      if (results[1].status === 'fulfilled') setFeaturedList(results[1].value);
      if (results[2].status === 'fulfilled') setBottomNews(results[2].value);
      if (results[3].status === 'fulfilled') setBannerList(results[3].value);
      setLoading(false);
    };
    load();
  }, []);

  const [featured, big, ...small] = news1;
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
                <LargeNewsCard item={big} />

                <div className="grid gap-x-[34px] gap-y-10 sm:grid-cols-2 content-start">
                  {small.slice(0, 4).map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {lom && (
              <FeaturedNewsCard
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
                  <NewsCard key={item.id} item={item} ratio="aspect-[4/3]" />
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
        {bannerList[0] && <BannerNewsCard {...bannerList[0]} />}
      <Footer />
    </>
  );
}

export default Blog;