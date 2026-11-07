import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase.js';
import { useLocalized } from '../hooks/useLocalized.js';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import EvocaCard from '../Components/PaymentCard.jsx';
import { migratePaymentCards } from '../migratePayments.js';
/* ===================== i18n ===================== */
const paymentResources = {
  hy: { paymentPage: { loading: 'Բեռնվում է...', noData: 'Տվյալներ չկան', notFound: 'Էջը չի գտնվել', soon: 'Շուտով', continue: 'Շարունակել' } },
  en: { paymentPage: { loading: 'Loading...', noData: 'No data available', notFound: 'Page not found', soon: 'Coming soon', continue: 'Continue' } },
  ru: { paymentPage: { loading: 'Загрузка...', noData: 'Данных нет', notFound: 'Страница не найдена', soon: 'Скоро', continue: 'Продолжить' } },
};
Object.entries(paymentResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

function resolvePath(root, slugs) {
  const trail = [{ ...root, path: '/payments' }];
  let current = root;
  for (const slug of slugs) {
    const next = current.children?.find((c) => c.slug === slug);
    if (!next) return null;
    const parentPath = trail[trail.length - 1].path;
    trail.push({ ...next, path: `${parentPath}/${slug}` });
    current = next;
  }
  return trail;
}

export default function PaymentPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const l = useLocalized();
  const [root, setRoot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'instantPaymentsCollection', 'tree'));
        if (snap.exists() && snap.data().root) {
          setRoot(snap.data().root);
        } else {
          setRoot(null);
        }
      } catch (e) {
        console.error(e);
        setRoot(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center mt-24">{t('paymentPage.loading')}</div>;
  if (!root) return <div className="text-center mt-24">{t('paymentPage.noData')}</div>;

  const slugs = (params['*'] || '').split('/').filter(Boolean);
  const trail = resolvePath(root, slugs);
  if (!trail) return <div className="text-center mt-24">{t('paymentPage.notFound')}</div>;

  const node = trail[trail.length - 1];

  return (
    <>
      <Header />
      
      <div className="bg-violet-50 min-h-screen pt-[100px] px-8">
        {/* Breadcrumb - Երևում է միայն ենթաէջերում */}
        {trail.length > 1 && (
          <nav className="max-w-7xl mx-auto text-violet-700 mb-8">
            {trail.map((item, i) => (
              <span key={item.path}>
                {i < trail.length - 1 ? (
                  <Link to={item.path} className="hover:underline">{l(item.title)}</Link>
                ) : (
                  <span className="text-gray-500">{l(item.title)}</span>
                )}
                {i < trail.length - 1 && <span className="mx-3">/</span>}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-10">{l(node.title)}</h1>

        {node.type === 'form' ? (
          <PaymentForm node={node} />
        ) : node.children?.length ? (
          <div className="flex flex-wrap justify-center gap-8 max-w-[1300px] mx-auto pb-12">
            {node.children.map((child) => (
              <div key={child.slug} className="w-[280px] sm:w-[300px]">
                <EvocaCard
                  title={l(child.title)}
                  imageSrc={child.src}
                  onClick={() => navigate(`${node.path}/${child.slug}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">{t('paymentPage.soon')}</div>
        )}
      </div>
      <Footer />
    </>
  );
}

function PaymentForm({ node }) {
  const { t } = useTranslation();
  const l = useLocalized();

  const formFields = node.fields || (node.fieldLabel ? [{ name: 'single', label: node.fieldLabel, placeholder: node.placeholder }] : []);

  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (name, val) => {
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleContinue = () => {
    const isValid = Object.values(formData).every((v) => v.trim() !== '');
    if (!isValid) return;
    console.log(node.slug, formData);
  };

  return (
    <div className="max-w-[500px] mx-auto bg-white p-8 rounded-2xl shadow-md">
      {formFields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">{l(field.label).trim()}</label>
          <input
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={l(field.placeholder)}
            className="w-full border rounded px-4 py-3 bg-white focus:outline-none focus:border-violet-700"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleContinue}
        className="w-full bg-violet-700 text-white py-3 rounded mt-4 font-semibold hover:bg-violet-800 transition"
      >
        {t('paymentPage.continue')}
      </button>
    </div>
  );
}