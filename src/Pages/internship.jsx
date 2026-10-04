import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase.js';
import HiringSteps from '../Components/HiringSteps.jsx';
import JoinTeamForm from '../Components/JoinTeamForm.jsx';
import CultureBanner from '../Components/CultureBanner.jsx';
import EvocaCard from '../Components/PaymentCard.jsx';
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

const handleJoin = async ({ values, files }) => {
  await addDoc(collection(db, "teamApplications"), {
    ...values,
    resumeFiles: files.map((f) => f.name),
    createdAt: serverTimestamp(),
  });
};

function Intership() {
  const [sections6, setSections6] = useState({});
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsSnap, benefitsSnap] = await Promise.all([
          getDocs(collection(db, "CareerSections6")),
          getDocs(collection(db, "CareerBenefits3")),
        ]);

        // 1. CareerSections6 collection-ի փաստաթղթերի ներմուծում
        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections6(s);

        // 2. CareerBenefits3 collection-ի ներմուծում (ԲՈՒՀ-երի / առավելությունների ցանկ)
        const bList = benefitsSnap.docs.map((d) => ({
          docId: d.id,
          ...d.data(),
        }));
        bList.sort((a, b) => (a.id || 0) - (b.id || 0));
        setBenefits(bList);
      } catch (err) {
        console.error("Intership data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const hiringData = sections6.hiringSteps || sections6.intershipinfo;
  const joinFormData = sections6.joinData || sections6.join;

  return (
    <>
      <Header />
      <Navbar />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center text-[#6a0fd9] font-medium">
          Բեռնվում է...
        </div>
      ) : (
        <div className="pt-0 mb-[60px]">
          {sections6.culture && (
            <CultureBanner {...sections6.culture} className="mb-[60px]" />
          )}

          <div className="w-full mt-[80px]">
            <h1 className="text-xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4 text-[#2d124d]">
              Համալսարանական պրակտիկայի շրջանակներում մենք համագործակցում ենք հետևյալ Բուհերի հետ՝
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

export default Intership;