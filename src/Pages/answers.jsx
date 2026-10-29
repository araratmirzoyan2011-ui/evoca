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
import FaqAccordion from '../Components/FaqAccordion.jsx';
import HiringSteps from '../Components/HiringSteps.jsx';

const fallbackJoinData = {
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

function Answer() {
  const [sections, setSections] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCareerSections = async () => {
      try {
        const [sectionsSnap, menuSnap] = await Promise.all([
          getDocs(collection(db, "CareerSections4")),
          getDocs(query(collection(db, "CultureMenuItems1"), orderBy("order"))),
        ]);

        const data = {};
        sectionsSnap.forEach((doc) => {
          data[doc.id] = doc.data();
        });
        setSections(data);
        setMenuItems(menuSnap.docs.map((d) => d.data()));
      } catch (err) {
        console.error("Firebase data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCareerSections();
  }, []);

  const cultureData = sections.culture;
  const hiringStepsData = sections.hiringSteps || sections.hiring;
  const faqData = sections.faq || sections.questions;
  const joinFormData = sections.join || fallbackJoinData;

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
          {cultureData && (
            <CultureBanner {...cultureData} className="mb-[60px]" />
          )}

          {hiringStepsData && (
            <HiringSteps
              title={hiringStepsData.title}
              steps={hiringStepsData.steps || hiringStepsData.items}
            />
          )}

          {faqData && (
            <FaqAccordion
              title={faqData.title}
              description={faqData.description}
              items={faqData.items || faqData.questions}
            />
          )}

          <JoinTeamForm {...joinFormData} onSubmit={handleJoin} />
        </div>
      )}

      <Footer />
    </>
  );
}

export default Answer;