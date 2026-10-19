import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import BookletBanner from '../Components/BookletBanner.jsx';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

const Bulletins = () => {
  const [booklets, setBooklets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const loadBooklets = async () => {
    try {
      const snap = await getDocs(
        query(collection(db, 'booklets'), orderBy('order'))
      );
      setBooklets(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Booklets load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooklets();
  }, []);

  // Ժամանակավոր՝ seed անելուց հետո կարող ես հանել
  const seedBooklets = async () => {
    setSeeding(true);
    try {
      for (const b of bookletsData) {
        // ֆիքսված id՝ կրկնակի սեղմելը կրկնություն չի ստեղծի
        await setDoc(doc(db, 'booklets', `booklet-${b.order}`), {
          ...b,
          createdAt: serverTimestamp(),
        });
      }
      await loadBooklets();
    } catch (err) {
      console.error('Seed error:', err);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <>
      <Header />

      <section className="w-full bg-white py-8 px-4 md:px-12">
        <div className="max-w-5xl mx-auto flex gap-6 md:gap-12">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 mb-[80px]">
              Բուկլետներ
            </h2>

            {loading ? (
              <div className="py-12 text-center text-[#6a0fd9]">Բեռնվում է...</div>
            ) : (
              <div className="flex flex-col gap-6 md:gap-10">
                {booklets.map((b) => (
                  <BookletBanner
                    key={b.id}
                    image={b.image}
                    alt={b.title}
                    href={b.pdf}
                  />
                ))}
              </div>
            )}

            {!loading && booklets.length === 0 && (
              <button
                onClick={seedBooklets}
                disabled={seeding}
                className="mt-4 px-4 py-2 text-sm rounded bg-[#6a0fd9] text-white disabled:opacity-50"
              >
                {seeding ? 'Ավելացվում է...' : 'Seed booklets'}
              </button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Bulletins;