import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase';
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import JoinTeamForm from '../Components/JoinTeamForm.jsx';
import EvocaCard from '../Components/PaymentCard.jsx';

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

function Plus() {
  const [sections2, setSections2] = useState({});
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Բեռնում ենք և՛ CareerSections2-ը, և՛ CareerBenefits-ը միաժամանակ
        const [sectionsSnap, benefitsSnap] = await Promise.all([
          getDocs(collection(db, "CareerSections2")),
          getDocs(collection(db, "CareerBenefits"))
        ]);

        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections2(s);

        const bList = benefitsSnap.docs.map((d) => ({
          docId: d.id,
          ...d.data(),
        }));
        // Եթե ուզում ես պահպանել ID-ների հերթականությունը, կարողես սորտավորել ըստ `id` դաշտի
        bList.sort((a, b) => (a.id || 0) - (b.id || 0));
        
        setBenefits(bList);
      } catch (err) {
        console.error("Career data load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
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
        <div className="pt-0 mb-[40px]">
          {sections2.culture && (
            <CultureBanner {...sections2.culture} className="mb-[60px]" />
          )}

          <div className="w-full mt-[80px]">
            <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">
              Մեր առավելությունները
            </h1>
          </div>

          <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
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

          <JoinTeamForm {...joinData} onSubmit={handleJoin} />
        </div>
      )}

      <Footer />
    </>
  );
}

export default Plus;