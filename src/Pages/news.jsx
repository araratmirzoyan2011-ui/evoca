import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import NewsCard from '../Components/NewsCard.jsx';
import NewsGridCard from '../Components/news-gridcard.jsx';
import NewsPagination from '../Components/Newspagination.jsx';
import FeaturedNewsCard from '../Components/FeaturedNewsCard.jsx';
import LargeNewsCard from '../Components/LargeNewsCard.jsx';
import NewsFilter from '../Components/NewsFilter.jsx';
import { seedNews } from '../Components/SeedNews.jsx';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const MAIN = 'Գլխավոր';
const OTHER = 'Այլ';
const ALL = 'Բոլորը';
const CATEGORIES = [
  MAIN,
  'Բանկային',
  'Հարցազրույցներ',
  'Պրոդուկտներ',
  'Նորարարություններ',
  'Կենսակերպ',
  'Մրցանակներ',
  'CSR',
  OTHER,
];
// «Այլ»-ը ցույց է տալիս այն նորությունները, որոնց կատեգորիան այս ցանկում չկա
const NAMED = CATEGORIES.filter((c) => c !== MAIN && c !== OTHER);

const PAGE_SIZE = 20;

// Կատեգորիայի գույնը՝ վերևի featured քարտի քառակուսու և անկյունների համար
const ACCENT_COLORS = {
  'Մրցանակներ': '#FFE600',
  'Պրոդուկտներ': '#D400E0',
  'Հարցազրույցներ': '#5B12D6',
  'Բանկային': '#5B12D6',
  'Կենսակերպ': '#9DFF00',
  'Նորարարություններ': '#25E4FF',
};
const DEFAULT_ACCENT = '#9DFF00';

// "26.10.2026" -> timestamp
const toTime = (s) => {
  const [d, m, y] = String(s || '').split('.').map(Number);
  return y ? new Date(y, m - 1, d).getTime() : 0;
};

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
  const [active, setActive] = useState(MAIN);
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

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

  const handleCategory = (c) => {
    setActive(c);
    setPage(1);
  };

  const goToPage = (p) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // «Գլխավոր»-ի դասավորություն
  const [featured, big, ...small] = news;
  const lom = featuredList[0];

  // Ընտրված կատեգորիայի նորությունները՝ երեք collection-ից, նորից հինը
  const allNews = [
    ...news.map((i) => ({ ...i, collection: 'news' })),
    ...featuredList.map((i) => ({ ...i, collection: 'newsFeatured' })),
    ...bottomNews.map((i) => ({ ...i, collection: 'newsBottom' })),
  ];

  const list = allNews
    .filter((i) => {
      if (active === ALL) return true;
      if (active === OTHER) return !NAMED.includes(i.category);
      return i.category === active;
    })
    .sort((a, b) => toTime(b.date) - toTime(a.date));

  const top = list[0];
  const totalPages = Math.ceil(list.length / PAGE_SIZE);
  const pageItems = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Header />
      
      <main className="pt-24">
        <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-10">
          <h1 className="text-[30px] font-extrabold text-[#1a1a1a]">
            Նորություններ
          </h1>
          <NewsFilter
            categories={CATEGORIES}
            allLabel={ALL}
            active={active}
            onChange={handleCategory}
          />
        </section>

        {loading ? (
          <div className="py-40 text-center text-gray-500">Բեռնվում է...</div>
        ) : (
          <>
            {active === MAIN ? (
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
              </>
            ) : top ? (
              <>
                {/* Վերևում՝ կատեգորիայի ամենաթարմ նորությունը */}
                <FeaturedNewsCard
                  id={top.id}
                  collection={top.collection}
                  category={top.category}
                  title={top.title}
                  description={top.description}
                  date={top.date}
                  image={top.image}
                  reverse={false}
                  accent={ACCENT_COLORS[top.category] || DEFAULT_ACCENT}
                />

                {/* Բոլոր նորությունները՝ 4 սյունակով */}
                <section
                  ref={gridRef}
                  className="mx-auto max-w-[1200px] scroll-mt-28 px-6 pt-16 pb-16"
                >
                  <div className="grid gap-x-[33px] gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {pageItems.map((item) => (
                      <NewsGridCard
                        key={`${item.collection}-${item.id}`}
                        item={item}
                        collection={item.collection}
                      />
                    ))}
                  </div>

                  {/* 20-ից շատ քարտ լինելու դեպքում միայն */}
                  {totalPages > 1 && (
                    <NewsPagination
                      page={page}
                      totalPages={totalPages}
                      onChange={goToPage}
                    />
                  )}
                </section>
              </>
            ) : (
              <div className="py-24 text-center text-gray-500">
                Այս կատեգորիայում նորություններ չկան։
              </div>
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