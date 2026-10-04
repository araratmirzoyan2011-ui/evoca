import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase.js';
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import JoinTeamForm from '../Components/JoinTeamForm.jsx';

const joinData = {
  title: "Դառնալ թիմի անդամ",
  description: (
    <>
      Եթե ցանկանում ես միանալ{" "}
      <span className="font-semibold text-[#6a0fd9]">EvocaTEAM</span>-ին,
      <br />
      կարող ես ուղարկել դիմում՝ կցելով ինքնակենսագրականը:
    </>
  ),
  submitText: "Ես ուզում եմ աշխատել Evoca-ում :)",
  successText: "Շնորհակալություն, Ձեր դիմումը ուղարկվել է։",
};

const handleJoin = async ({ values, files }) => {
  await addDoc(collection(db, "teamApplications"), {
    ...values,
    resumeFiles: files.map((f) => f.name),
    createdAt: serverTimestamp(),
  });
};

function EvocaWork() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const sectionsSnap = await getDocs(collection(db, "CareerSections3"));
        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections(s);
      } catch (err) {
        console.error("Career data load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <Header />
      <Navbar />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center text-[#6a0fd9]">
          Բեռնվում է...
        </div>
      ) : (
        <div className="mt-0 mb-[40px]">
          {sections.culture && (
            <CultureBanner {...sections.culture} className="mb-[60px]" />
          )}
          <JoinTeamForm {...joinData} onSubmit={handleJoin} />
        </div>
      )}

      <Footer />
    </>
  );
}

export default EvocaWork;