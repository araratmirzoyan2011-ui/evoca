import React, { useEffect, useState } from 'react';
import Header from '../Components/Carrer-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menuall.jsx';
import { db } from '../firebase';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import WhyWorkSection from '../Components/WhyWorkSection.jsx';
import CoverflowSlider from '../Components/CoverflowSlider.jsx';
import TeamWordsSlider from '../Components/TeamWordsSlider.jsx';
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

function Career() {
  const [sections, setSections] = useState({});
  const [slides, setSlides] = useState([]);
  const [members, setMembers] = useState([]);
  const [menuItems, setMenuItems] = useState([]); // Navbar-ի menuItems state-ը
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [sectionsSnap, slidesSnap, membersSnap, menuItemsSnap] = await Promise.all([
          getDocs(collection(db, "careerSections")),
          getDocs(query(collection(db, "careerSlides"), orderBy("order"))),
          getDocs(query(collection(db, "careerTeamMembers"), orderBy("order"))),
          // Firebase-ից բեռնում ենք CultureMenuItems1 collection-ը
          getDocs(query(collection(db, "CultureMenuItems1"), orderBy("order"))),
        ]);

        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));

        setSections(s);
        setSlides(slidesSnap.docs.map((d) => d.data()));
        setMembers(membersSnap.docs.map((d) => d.data()));
        // Ստանում ենք մենյուի տարրերը ({ label, path })
        setMenuItems(menuItemsSnap.docs.map((d) => d.data()));
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
      {/* Փոխանցում ենք բեռնված մենյուի ցանկը Navbar-ին */}
      <Navbar items={menuItems} />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center text-[#6a0fd9]">
          Բեռնվում է...
        </div>
      ) : (
        <>
          {sections.culture && (
            <CultureBanner {...sections.culture} className="mb-[60px]" />
          )}
          {sections.whyWork && <WhyWorkSection {...sections.whyWork} />}
          {slides.length > 0 && (
            <CoverflowSlider {...sections.sliderIntro} items={slides} />
          )}
          {members.length > 0 && (
            <TeamWordsSlider title={sections.team?.title} members={members} />
          )}
          <JoinTeamForm {...joinData} onSubmit={handleJoin} />
        </>
      )}

      <Footer />
    </>
  );
}

export default Career;