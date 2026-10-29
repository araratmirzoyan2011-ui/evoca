import React, { useEffect, useState } from 'react';
import Header from '../Components/Carrer-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menuall.jsx';
import { db } from '../firebase.js';
import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import EvocaCard from '../Components/PaymentCard.jsx';
import JobCard from '../Components/JobCard.jsx';

function Work2() {
  const [sections2, setSections2] = useState({});
  const [benefits, setBenefits] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsSnap, benefitsSnap, jobsSnap, menuSnap] = await Promise.all([
          getDocs(collection(db, "CareerSections5")),
          getDocs(collection(db, "CareerBenefits2")),
          getDocs(collection(db, "CareerJobs")),
          getDocs(query(collection(db, "CultureMenuItems2"), orderBy("order"))),
        ]);

        // 1. Մշակույթի բաններների տվյալներ
        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections2(s);

        // 2. Առավելությունների տվյալներ
        const bList = benefitsSnap.docs.map((d) => ({
          docId: d.id,
          ...d.data(),
        }));
        bList.sort((a, b) => (a.id || 0) - (b.id || 0));
        setBenefits(bList);

        // 3. Աշխատատեղերի տվյալներ
        const jList = jobsSnap.docs.map((d) => ({
          docId: d.id,
          ...d.data(),
        }));
        jList.sort((a, b) => (a.id || 0) - (b.id || 0));
        setJobs(jList);

        // 4. Navbar մենյուի տարրեր
        setMenuItems(menuSnap.docs.map((d) => d.data()));

      } catch (err) {
        console.error("Career data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleApply = (jobTitle) => {
    console.log(`Դիմել է հետևյալ աշխատանքին՝ ${jobTitle}`);
  };

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center text-[#6a0fd9] font-medium">
          Բեռնվում է...
        </div>
      ) : (
        <div className="pt-0 mb-[60px]">
          {sections2.culture && (
            <CultureBanner {...sections2.culture} className="mb-[60px]" />
          )}

          <div className="w-full mt-[80px]">
            <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4 text-[#2d124d]">
              Ինչպիսի թիմակից ենք մենք փնտրում ?
            </h1>
          </div>

          <div className="bg-gray-50 p-8 flex justify-center items-center mb-16">
            {benefits.length === 0 ? (
              <div className="text-center text-gray-500">Տվյալներ առայժմ առկա չեն</div>
            ) : (
              <div 
                className="grid gap-8 justify-center w-full max-w-7xl"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 320px))' }}
              >
                {benefits.map((card) => (
                  <EvocaCard 
                    key={card.docId}
                    title={card.title}
                    imageSrc={card.src}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Բաժին 2․ Աշխատատեղերի ցանկ (Job Cards) */}
          <section className="w-full max-w-6xl mx-auto px-4 my-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2d124d] mb-3">
                Բաց մի թող քո նոր հնարավորությունը
              </h2>
              <p className="text-gray-500 text-sm md:text-base font-medium">
                {jobs.length} աշխատատեղ
              </p>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center text-gray-500">Աշխատատեղեր առայժմ առկա չեն</div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                {jobs.map((job) => (
                  <JobCard
                    key={job.docId}
                    title={job.title}
                    deadline={job.deadline}
                    location={job.location}
                    onApply={() => handleApply(job.title)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Work2;