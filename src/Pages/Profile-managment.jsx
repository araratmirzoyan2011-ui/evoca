import Header from '../Components/About-us-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTIONS = {
  board: 'boardMembers',
  management: 'managementMembers',
  audit: 'internalAudit',
};

function ProfileManagment() {
  const { group, id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      setLoading(true);
      try {
        const col = COLLECTIONS[group];
        if (col) {
          const snap = await getDoc(doc(db, col, id));
          setPerson(snap.exists() ? { id: snap.id, ...snap.data() } : null);
        } else {
          setPerson(null);
        }
      } catch (err) {
        console.error('Error fetching profile from Firebase:', err);
        setPerson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [group, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Բեռնվում է...
      </div>
    );
  }

  const [baseName, ...rest] = (person?.name || '').split(',');
  const degrees = person?.degrees || rest.join(',').trim();

  return (
    <>
      <Header />
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-10 min-h-[60vh]">
        <Link to="/management" className="text-sm text-gray-600 hover:text-[#6b3fa0]">
          ← Ղեկավարություն
        </Link>

        {!person ? (
          <p className="mt-8 text-gray-700">Անձը չի գտնվել։</p>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="relative aspect-square w-full max-w-[260px] shrink-0">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <polygon
                  points="9,9 91,9 50,90"
                  strokeWidth="14"
                  strokeLinejoin="round"
                  className="fill-[#6b3fa0] stroke-[#6b3fa0]"
                />
              </svg>
              <img
                src={person.photo}
                alt={person.name}
                className="absolute inset-0 h-full w-full object-contain object-bottom"
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-2xl font-semibold uppercase text-gray-900">
                {baseName.trim()}
                {degrees && `, ${degrees}`}
              </h1>
              <p className="mt-3 text-gray-700">{person.role}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProfileManagment;