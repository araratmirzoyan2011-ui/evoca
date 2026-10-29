import React, { useEffect, useState } from 'react';
import Header from '../Components/Carrer-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menuall.jsx';
import { db } from '../firebase.js';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import JoinTeamForm from '../Components/JoinTeamForm.jsx';
import HiringSteps from '../Components/HiringSteps.jsx';

const handleJoin = async ({ values, files }) => {
  await addDoc(collection(db, "teamApplications"), {
    ...values,
    resumeFiles: files.map((f) => f.name),
    createdAt: serverTimestamp(),
  });
};

function EvocaWork() {
  const [sections, setSections] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsSnap, menuSnap] = await Promise.all([
          getDocs(collection(db, "CareerSections3")),
          getDocs(query(collection(db, "CultureMenuItems1"), orderBy("order"))),
        ]);

        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections(s);
        setMenuItems(menuSnap.docs.map((d) => d.data()));
      } catch (err) {
        console.error("Career data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const hiringData = sections.hiringSteps || sections.hiring;
  const joinFormData = sections.joinData;

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center text-[#6a0fd9] font-medium">
          Բեռնվում է...
        </div>
      ) : (
        <div className="mt-0 mb-[40px]">
          {sections.culture && (
            <CultureBanner {...sections.culture} className="mb-[60px]" />
          )}

          {hiringData && (
            <HiringSteps
              title={hiringData.title}
              steps={hiringData.steps || hiringData.items}
            />
          )}

          {joinFormData && (
            <JoinTeamForm {...joinFormData} onSubmit={handleJoin} />
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default EvocaWork;