import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import EvocaCard from '../Components/PaymentCard.jsx';

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
  const [root, setRoot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'instantPaymentsCollection', 'tree'));
        if (snap.exists() && snap.data().root) {
          setRoot(snap.data().root);
        } else {
          setRoot(paymentTree);
        }
      } catch (e) {
        console.error(e);
        setRoot(paymentTree);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center mt-24">Բեռնվում է...</div>;
  if (!root) return <div className="text-center mt-24">Տվյալներ չկան</div>;

  const slugs = (params['*'] || '').split('/').filter(Boolean);
  const trail = resolvePath(root, slugs);
  if (!trail) return <div className="text-center mt-24">Էջը չի գտնվել</div>;

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
                  <Link to={item.path} className="hover:underline">{item.title}</Link>
                ) : (
                  <span className="text-gray-500">{item.title}</span>
                )}
                {i < trail.length - 1 && <span className="mx-3">/</span>}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-10">{node.title}</h1>

        {node.type === 'form' ? (
          <PaymentForm node={node} />
        ) : node.children?.length ? (
          <div className="flex flex-wrap justify-center gap-8 max-w-[1300px] mx-auto pb-12">
            {node.children.map((child) => (
              <div key={child.slug} className="w-[280px] sm:w-[300px]">
                <EvocaCard
                  title={child.title}
                  imageSrc={child.src}
                  onClick={() => navigate(`${node.path}/${child.slug}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">Շուտով</div>
        )}
      </div>
      <Footer />
    </>
  );
}

function PaymentForm({ node }) {
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
          <label className="block mb-2 font-medium text-gray-700">{field.label}</label>
          <input
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            className="w-full border rounded px-4 py-3 bg-white focus:outline-none focus:border-violet-700"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleContinue}
        className="w-full bg-violet-700 text-white py-3 rounded mt-4 font-semibold hover:bg-violet-800 transition"
      >
        Շարունակել
      </button>
    </div>
  );
}