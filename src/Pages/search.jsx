import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';

import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ITEMS_PER_PAGE = 10;

const MODULES = [
  { key: 'all', label: 'Բոլորը' },
  { key: 'loans', label: 'Վարկեր', prefixes: ['/current-loan', '/loan', '/business-loans'] },
  { key: 'deposits', label: 'Ավանդներ', prefixes: ['/deposits', '/deposit', '/current-deposit'] },
  { key: 'cards', label: 'Քարտեր', prefixes: ['/cards', '/card'] },
  { key: 'news', label: 'Նորություններ', prefixes: ['/news'] },
  { key: 'blogs', label: 'Բլոգ', prefixes: ['/blog'] },
];

const detectModule = (item) => {
  const explicit = MODULES.find((m) => m.key === item.module);
  if (explicit) return explicit.key;
  const path = (item.path || '').toLowerCase();
  const byPath = MODULES.find((m) => m.prefixes?.some((p) => path.startsWith(p)));
  return byPath ? byPath.key : 'other';
};

const formatDate = (value) => {
  if (!value) return '';
  if (typeof value === 'string' && /^\d{2}\.\d{2}\.\d{4}$/.test(value)) return value;
  const d = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
};

const normalize = (s) => (s || '').toString().toLowerCase().trim();

const getPageList = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return pages;
};

const SOURCES = [
  { name: 'sitemap' },
  { name: 'loans', module: 'loans', basePath: '/current-loan' },
  { name: 'businessLoansCollection', module: 'loans', basePath: '/current-loan', isBusinessCollection: true },
  { name: 'CardmenuItems', module: 'cards', basePath: '/cards' },
];

const TITLE_KEYS = ['title', 'name', 'label', 'header'];
const DESC_KEYS = ['description', 'desc', 'subtitle', 'text'];
const PATH_KEYS = ['path', 'to', 'link', 'href'];
const CHILD_KEYS = ['subsections', 'items', 'children', 'loans'];

const firstValue = (obj, keys) => {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return '';
};

const pickText = (value, lang) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return (
      value[lang] ||
      value.hy ||
      value.en ||
      Object.values(value).find((v) => typeof v === 'string') ||
      ''
    );
  }
  return String(value);
};

const collect = (node, source, docId, out, isRoot = true) => {
  if (!node || typeof node !== 'object') return;

  let path = firstValue(node, PATH_KEYS);
  
  // Եթե ստացված path-ը սկսվում է /loans/-ով, փոխարինում ենք /current-loan/-ով
  if (path && path.startsWith('/loans/')) {
    path = path.replace('/loans/', '/current-loan/');
  }

  if (!path && isRoot && source.basePath) {
    const itemId = node.id || docId;
    path = source.isBusinessCollection 
      ? `${source.basePath}/${itemId}?type=business` 
      : `${source.basePath}/${itemId}`;
  }

  let title = firstValue(node, TITLE_KEYS);
  if (!title && isRoot) title = path;

  if (typeof path === 'string' && path && title) {
    out.push({
      title,
      path,
      description: firstValue(node, DESC_KEYS),
      date: node.date || '',
      module: node.module || source.module || '',
    });
  }

  const childSource = { ...source, module: node.module || source.module };
  CHILD_KEYS.forEach((key) => {
    if (Array.isArray(node[key])) {
      node[key].forEach((child) => collect(child, childSource, docId, out, false));
    }
  });
};

const Search = () => {
  const [searchItems, setSearchItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const moduleKey = searchParams.get('module') || 'all';
  const pageParam = Math.max(parseInt(searchParams.get('page'), 10) || 1, 1);
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || 'hy').slice(0, 2);

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          SOURCES.map(async (source) => {
            try {
              const snapshot = await getDocs(collection(db, source.name));
              const out = [];
              snapshot.docs.forEach((d) => collect(d.data(), source, d.id, out));
              return out;
            } catch (error) {
              console.error(`Սխալ «${source.name}» կոլեկցիան ստանալիս:`, error);
              return [];
            }
          })
        );

        const merged = new Map();
        results.flat().forEach((item) => {
          const prev = merged.get(item.path);
          merged.set(
            item.path,
            prev
              ? {
                  path: item.path,
                  title: prev.title || item.title,
                  description: prev.description || item.description,
                  date: prev.date || item.date,
                  module: prev.module || item.module,
                }
              : item
          );
        });

        setSearchItems(
          Array.from(merged.values()).map((item) => ({ ...item, module: detectModule(item) }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      const isDefault =
        !value || (key === 'page' && value === 1) || (key === 'module' && value === 'all');
      if (isDefault) next.delete(key);
      else next.set(key, String(value));
    });
    setSearchParams(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateParams({ q: inputValue.trim(), page: 1 });
  };

  const handleModuleChange = (key) => updateParams({ module: key, page: 1 });
  const goToPage = (n) => updateParams({ page: n });

  const filteredData = useMemo(() => {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return searchItems
      .map((item) => ({
        ...item,
        title: pickText(item.title, lang),
        description: pickText(item.description, lang),
      }))
      .filter((item) => {
        if (moduleKey !== 'all' && item.module !== moduleKey) return false;
        const haystack = normalize(`${item.title} ${item.description}`);
        return words.every((w) => haystack.includes(w));
      });
  }, [searchItems, query, moduleKey, lang]);

  const totalPages = Math.max(Math.ceil(filteredData.length / ITEMS_PER_PAGE), 1);
  const currentPage = Math.min(pageParam, totalPages);
  const currentItems = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
          Որոնման արդյունքներ
        </h1>

        <form onSubmit={handleSubmit} className="relative mb-6" role="search">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Որոնել..."
            className="w-full px-5 py-4 pr-14 text-gray-800 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
          />
          <button
            type="submit"
            aria-label="Որոնել"
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-purple-700 transition"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-10">
          {MODULES.map((m) => {
            const isActive = moduleKey === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => handleModuleChange(m.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:text-purple-700'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <p className="text-xl text-gray-500 animate-pulse text-center py-16">
            Բեռնվում են տվյալները...
          </p>
        ) : (
          <>
            <div className="space-y-4 mb-12">
              {currentItems.length > 0 ? (
                currentItems.map((item) => {
                  const date = formatDate(item.date);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="group block p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                            {item.title}
                          </h2>
                          {item.description && (
                            <p className="mt-1 text-sm text-gray-500 line-clamp-3">
                              {item.description}
                            </p>
                          )}
                          {date && <p className="mt-2 text-sm text-gray-400">{date}</p>}
                        </div>
                        <span className="mt-1 text-gray-300 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-all duration-200 shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400 text-lg">Ոչինչ չի գտնվել</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <nav className="flex items-center justify-center space-x-2 py-4" aria-label="Էջավորում">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Նախորդ էջ"
                  className={`p-2.5 rounded-full transition duration-200 ${
                    currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {getPageList(currentPage, totalPages).map((number, i) =>
                  number === '…' ? (
                    <span key={`gap-${i}`} className="w-6 text-center text-gray-400 select-none">
                      …
                    </span>
                  ) : (
                    <button
                      key={number}
                      onClick={() => goToPage(number)}
                      aria-current={currentPage === number ? 'page' : undefined}
                      className={`w-10 h-10 rounded-full font-medium text-sm flex items-center justify-center transition duration-200 ${
                        currentPage === number
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Հաջորդ էջ"
                  className={`p-2.5 rounded-full transition duration-200 ${
                    currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-purple-600 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Search;