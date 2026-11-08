import React, { useState, useEffect, useRef } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import NewsCard from '../Components/NewsCard.jsx';
import NewsGridCard from '../Components/news-gridcard.jsx';
import NewsPagination from '../Components/Newspagination.jsx';
import FeaturedNewsCard from '../Components/FeaturedNewsCard.jsx';
import LargeNewsCard from '../Components/LargeNewsCard.jsx';
import BannerNewsCard from '../Components/BannerNewsCard.jsx';
import { useDeepLocalized } from '../Usedeeplocalized.js';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

/* ===================== i18n ===================== */
const blogResources = {
  hy: {
    blog: {
      title: 'Բլոգ',
      archive: 'Արխիվ',
      loading: 'Բեռնվում է...',
      empty: 'Այս կատեգորիայում հոդվածներ չկան։',
      updated: 'Թարմացվել է՝ {{date}}',
      categories: { business: 'Բիզնես', lifestyle: 'Կենսակերպ', investments: 'Ներդրումներ' },
    },
  },
  en: {
    blog: {
      title: 'Blog',
      archive: 'Archive',
      loading: 'Loading...',
      empty: 'There are no articles in this category.',
      updated: 'Updated: {{date}}',
      categories: { business: 'Business', lifestyle: 'Lifestyle', investments: 'Investments' },
    },
  },
  ru: {
    blog: {
      title: 'Блог',
      archive: 'Архив',
      loading: 'Загрузка...',
      empty: 'В этой категории статей нет.',
      updated: 'Обновлено: {{date}}',
      categories: { business: 'Бизнес', lifestyle: 'Образ жизни', investments: 'Инвестиции' },
    },
  },
};
Object.entries(blogResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

const CATEGORIES = [
  { key: 'Բիզնես', label: 'business' },
  { key: 'Կենսակերպ', label: 'lifestyle' },
  { key: 'Ներդրումներ', label: 'investments' },
];
const ARCHIVE = 'archive';

const PAGE_SIZE = 2;
const ARCHIVE_PAGE_SIZE = 20;

const ACCENT_COLORS = {
  'Բիզնես': '#5B12D6',
  'Կենսակերպ': '#9DFF00',
  'Ներդրումներ': '#25E4FF',
};
const DEFAULT_ACCENT = '#9DFF00';

const toTime = (s) => {
  const [d, m, y] = String(s || '').split('.').map(Number);
  return y ? new Date(y, m - 1, d).getTime() : 0;
};

const clean = (v) => (typeof v === 'string' ? v.trim() : v);

const catKey = (c) => {
  if (c && typeof c === 'object') {
    return String(c.hy || Object.values(c)[0] || '').trim();
  }
  return String(c || '').trim();
};

const fetchCollection = async (name) => {
  const snap = await getDocs(collection(db, name));
  return snap.docs
    .map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        category: data.category,
        date: clean(data.date),
        title: data.title,
      };
    })
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
};

function Blog() {
  const { t } = useTranslation();
  const deep = useDeepLocalized();

  const [news1, setNews1] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [bottomNews, setBottomNews] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

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

  const handleCategory = (c) => {
    setActive((prev) => (prev === c ? null : c));
    setPage(1);
  };

  const goToPage = (p) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const loc = (item) => {
    const localized = deep(item);
    return {
      ...localized,
      category: typeof localized.category === 'object' ? (localized.category.hy || '') : localized.category,
      categoryKey: catKey(item.category),
    };
  };

  const news1L = news1.map(loc);
  const featuredL = featuredList.map(loc);
  const bottomL = bottomNews.map(loc);

  const [featured, big, ...small] = news1L;
  const lom = featuredL[0];

  const allNews = [
    ...news1L.map((i) => ({ ...i, collection: 'news1' })),
    ...featuredL.map((i) => ({ ...i, collection: 'newsFeautured2' })),
    ...bottomL.map((i) => ({ ...i, collection: 'newsBottom2' })),
  ];

  const isArchive = active === ARCHIVE;
  const pageSize = isArchive ? ARCHIVE_PAGE_SIZE : PAGE_SIZE;

  const list = allNews
    .filter((i) => isArchive || i.categoryKey === active)
    .sort((a, b) => toTime(b.date) - toTime(a.date));

  const top = list[0];
  const totalPages = Math.ceil(list.length / pageSize);
  const pageItems = list.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <Header />

      <main className="pt-12">
        <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-10">
          <h1 className="text-[30px] font-extrabold text-[#1a1a1a]">{t('blog.title')}</h1>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => handleCategory(c.key)}
                  className={`rounded-full px-4 py-2 text-[13px] transition-colors ${
                    active === c.key
                      ? 'bg-[#6600D9] text-white font-semibold'
                      : 'bg-[#F1F1F1] text-[#1a1a1a] hover:bg-[#E6E6E6]'
                  }`}
                >
                  {t(`blog.categories.${c.label}`)}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleCategory(ARCHIVE)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold transition-colors ${
                isArchive
                  ? 'bg-[#6600D9] text-white'
                  : 'bg-[#EDE4F7] text-[#6600D9] hover:bg-[#E3D6F3]'
              }`}
            >
              {t('blog.archive')}
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path
                  d="M1 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </section>

        {loading ? (
          <div className="py-40 text-center text-gray-500">{t('blog.loading')}</div>
        ) : (
          <>
            {!active ? (
              <>
                {featured && (
                  <FeaturedNewsCard
                    id={featured.id}
                    collection="news1"
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
                    <LargeNewsCard item={big} collection="news1" />

                    <div className="grid gap-x-[34px] gap-y-10 sm:grid-cols-2 content-start">
                      {small.slice(0, 4).map((item) => (
                        <NewsCard key={item.id} item={item} collection="news1" />
                      ))}
                    </div>
                  </section>
                )}

                {lom && (
                  <FeaturedNewsCard
                    id={lom.id}
                    collection="newsFeautured2"
                    category={lom.category}
                    title={lom.title}
                    description={lom.description}
                    date={lom.date}
                    image={lom.image}
                    reverse={true}
                  />
                )}

                {bottomL.length > 0 && (
                  <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-16 grid gap-x-[45px] gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {bottomL.map((item) => (
                      <NewsCard
                        key={item.id}
                        item={item}
                        collection="newsBottom2"
                        ratio="aspect-[4/3]"
                      />
                    ))}
                  </section>
                )}
              </>
            ) : top ? (
              <>
                <FeaturedNewsCard
                  id={top.id}
                  collection={top.collection}
                  category={top.category}
                  title={top.title}
                  description={top.description}
                  date={top.date}
                  image={top.image}
                  reverse={false}
                  accent={ACCENT_COLORS[top.categoryKey] || DEFAULT_ACCENT}
                />

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
                {t('blog.empty')}
              </div>
            )}

            <div className="border-t border-gray-100">
              <div className="mx-auto max-w-[1200px] px-6 py-4 text-right text-[11px] text-gray-500">
                {t('blog.updated', { date: '02/10/2026 17:00' })}
              </div>
            </div>
          </>
        )}
      </main>

      {!active && bannerList[0] && <BannerNewsCard {...deep(bannerList[0])} />}
      <Footer />
    </>
  );
}

export default Blog;