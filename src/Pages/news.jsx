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
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLocalized } from '../hooks/useLocalized.js';
import { useDeepLocalized } from '../Usedeeplocalized.js';
import { migrateNewsPage } from '../Migratenewspage.js';
/* ===================== i18n ===================== */
const newsResources = {
  hy: {
    newsPage: {
      title: 'Նորություններ',
      loading: 'Բեռնվում է...',
      empty: 'Այս կատեգորիայում նորություններ չկան։',
      updated: 'Թարմացվել է՝ {{date}}',
      categories: {
        main: 'Գլխավոր',
        banking: 'Բանկային',
        interviews: 'Հարցազրույցներ',
        products: 'Պրոդուկտներ',
        innovations: 'Նորարարություններ',
        lifestyle: 'Կենսակերպ',
        awards: 'Մրցանակներ',
        csr: 'CSR',
        other: 'Այլ',
        all: 'Բոլորը',
      },
    },
  },
  en: {
    newsPage: {
      title: 'News',
      loading: 'Loading...',
      empty: 'There is no news in this category.',
      updated: 'Updated: {{date}}',
      categories: {
        main: 'Main',
        banking: 'Banking',
        interviews: 'Interviews',
        products: 'Products',
        innovations: 'Innovations',
        lifestyle: 'Lifestyle',
        awards: 'Awards',
        csr: 'CSR',
        other: 'Other',
        all: 'All',
      },
    },
  },
  ru: {
    newsPage: {
      title: 'Новости',
      loading: 'Загрузка...',
      empty: 'В этой категории нет новостей.',
      updated: 'Обновлено: {{date}}',
      categories: {
        main: 'Главное',
        banking: 'Банковские',
        interviews: 'Интервью',
        products: 'Продукты',
        innovations: 'Инновации',
        lifestyle: 'Образ жизни',
        awards: 'Награды',
        csr: 'CSR',
        other: 'Другое',
        all: 'Все',
      },
    },
  },
};

Object.entries(newsResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

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
const NAMED = CATEGORIES.filter((c) => c !== MAIN && c !== OTHER);

const CATEGORY_I18N_KEYS = {
  [MAIN]: 'main',
  'Բանկային': 'banking',
  'Հարցազրույցներ': 'interviews',
  'Պրոդուկտներ': 'products',
  'Նորարարություններ': 'innovations',
  'Կենսակերպ': 'lifestyle',
  'Մրցանակներ': 'awards',
  'CSR': 'csr',
  [OTHER]: 'other',
  [ALL]: 'all',
};

const PAGE_SIZE = 20;

const ACCENT_COLORS = {
  'Մրցանակներ': '#FFE600',
  'Պրոդուկտներ': '#D400E0',
  'Հարցազրույցներ': '#5B12D6',
  'Բանկային': '#5B12D6',
  'Կենսակերպ': '#9DFF00',
  'Նորարարություններ': '#25E4FF',
};
const DEFAULT_ACCENT = '#9DFF00';

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
  const { t } = useTranslation();
  const l = useLocalized();
  const deep = useDeepLocalized();

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

  const loc = (v) => {
    if (v && typeof v === 'object') {
      return l(v);
    }
    return v;
  };

  const categoryKey = (c) => {
    if (c && typeof c === 'object') {
      return c.hy || Object.values(c)[0] || '';
    }
    return String(c || '');
  };

  const categoryLabel = (c) => {
    const key = CATEGORY_I18N_KEYS[categoryKey(c)];
    const localized = loc(c);
    return key ? t(`newsPage.categories.${key}`) : (typeof localized === 'string' ? localized : '');
  };

  const prepare = (item) => {
    const localizedItem = deep(item);
    return {
      ...localizedItem,
      category: categoryLabel(localizedItem.category),
      catKey: categoryKey(item.category),
    };
  };

  const labelOf = (c) => t(`newsPage.categories.${CATEGORY_I18N_KEYS[c]}`);
  const keyFromLabel = Object.fromEntries([...CATEGORIES, ALL].map((c) => [labelOf(c), c]));

  const handleCategory = (c) => {
    setActive(c);
    setPage(1);
  };

  const goToPage = (p) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const newsL = news.map(prepare);
  const featuredL = featuredList.map(prepare);
  const bottomL = bottomNews.map(prepare);

  const [featured, big, ...small] = newsL;
  const lom = featuredL[0];

  const allNews = [
    ...newsL.map((i) => ({ ...i, collection: 'news' })),
    ...featuredL.map((i) => ({ ...i, collection: 'newsFeatured' })),
    ...bottomL.map((i) => ({ ...i, collection: 'newsBottom' })),
  ];

  const list = allNews
    .filter((i) => {
      if (active === ALL) return true;
      if (active === OTHER) return !NAMED.includes(i.catKey);
      return i.catKey === active;
    })
    .sort((a, b) => toTime(b.date) - toTime(a.date));

  const top = list[0];
  const totalPages = Math.ceil(list.length / PAGE_SIZE);
  const pageItems = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

console.log(bottomL);
  return (
    <>
      <Header />
      
       <button onClick={migrateNewsPage} className="m-4 px-4 py-2 bg-red-600 text-white rounded">Migrate blog content</button>
      <main className="pt-24">
        <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-10">
          <h1 className="text-[30px] font-extrabold text-[#1a1a1a]">
            {t('newsPage.title')}
          </h1>
          <NewsFilter
            categories={CATEGORIES.map(labelOf)}
            allLabel={labelOf(ALL)}
            active={labelOf(active)}
            onChange={(label) => handleCategory(keyFromLabel[label] ?? label)}
          />
        </section>

        {loading ? (
          <div className="py-40 text-center text-gray-500">{t('newsPage.loading')}</div>
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

                {bottomL.length > 0 && (
                  <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-16 grid gap-x-[45px] gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {bottomL.map((item) => (
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
                <FeaturedNewsCard
                  id={top.id}
                  collection={top.collection}
                  category={top.category}
                  title={top.title}
                  description={top.description}
                  date={top.date}
                  image={top.image}
                  reverse={false}
                  accent={ACCENT_COLORS[top.catKey] || DEFAULT_ACCENT}
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
                {t('newsPage.empty')}
              </div>
            )}

            <div className="border-t border-gray-100">
              <div className="mx-auto max-w-[1200px] px-6 py-4 text-right text-[11px] text-gray-500">
                {t('newsPage.updated', { date: '02/10/2026 17:00' })}
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