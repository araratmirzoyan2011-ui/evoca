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
  submitText: "Ես ուզում աշխատել Evoca-ում :)",
  successText: "Շնորհակալություն, Ձեր դիմումը ուղարկվել է։",
};

const evocaCardsData = [
  {
    id: 1,
    title: "Առողջության ապահովագրություն",
    src: "https://www.evoca.am/images-cache/benefits/1/17431437867453/120x120.png", 
  },
  {
    id: 2,
    title: "Ճամփորդական ապահովագրություն",
    src: "https://www.evoca.am/images-cache/benefits/1/1743143856123/120x120.png",
  },
  {
    id: 3,
    title: "Evocabank-ի ծառայությունների արտոնյալ պայմաններ, ապահովագրական ծառայությունների զեղչեր",
    src: "https://www.evoca.am/images-cache/benefits/1/17431582596354/120x120.png",
  },
  {
    id: 4,
    title: "Կորպորատիվ զեղչեր",
    src: "https://www.evoca.am/images-cache/benefits/1/17431582659146/120x120.png",
  },
  {
    id: 5,
    title: "Տոնական և տարեվերջյան բոնուսներ",
    src: "https://www.evoca.am/images-cache/benefits/1/17431581917652/120x120.png",
  },
  {
    id: 6,
    title: "Պարգևատրումներ ծննդյան օրերին, ամուսնանալիս և երեխա ունենալիս",
    src: "https://www.evoca.am/images-cache/benefits/1/174314403471/120x120.png",
  },
  {
    id: 7,
    title: "Days-off",
    src: "https://www.evoca.am/images-cache/benefits/1/17431442426277/120x120.png",
  },
  {
    id: 8,
    title: "Սպորտային փաթեթ",
    src: "https://www.evoca.am/images-cache/benefits/1/17431443089347/120x120.png",
  },
  {
    id: 9,
    title: "Շարունակական կրթության և մասնագիտական զարգացման լայն հնարավորություն",
    src: "https://www.evoca.am/images-cache/benefits/1/17431453776119/120x120.png",
  },
];

const handleJoin = async ({ values, files }) => {
  await addDoc(collection(db, "teamApplications"), {
    ...values,
    resumeFiles: files.map((f) => f.name),
    createdAt: serverTimestamp(),
  });
};

function Plus() {
  const [sections2, setSections2] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const sectionsSnap = await getDocs(collection(db, "CareerSections2"));
        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections2(s);
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
        <div className="pt-10 mb-[40px]">
          {sections2.culture && (
            <CultureBanner {...sections2.culture} className="mb-[60px]" />
          )}

          <div className="w-full mt-[80px]">
            <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4">
             Մեր առավելությունները

            </h1>
          </div>

          <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
            {evocaCardsData.length === 0 ? (
              <div className="text-center text-gray-500">Տվյալներ առայժմ առկա չեն</div>
            ) : (
              <div 
                className="grid gap-8 justify-center w-full max-w-7xl"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 320px))' }}
              >
                {evocaCardsData.map((card) => (
                  <EvocaCard 
                    key={card.id}
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