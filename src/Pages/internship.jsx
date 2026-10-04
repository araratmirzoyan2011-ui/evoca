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

function Intership() {
  const [sections6, setSections6] = useState({});
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  const intershipinfoDefault = {
    title: "Աշխատանքի ընդունվելու փուլեր",
    steps: [
      {
        id: 1,
        title: "Առաջին փուլ` Համագործակցություն",
        description: "Բարձրագույն ուսումնական հաստատության և Evocabank-ի միջև կնքվում է ուսումնական պրակտիկայի վերաբերյալ պայմանագիր` համաձայն ուսումնական պլանի"
      },
      {
        id: 2,
        title: "Երկրորդ փուլ` Հարցազրույցներ",
        description: `Ուսանողը, ով ցանկանում է անցնել պրակտիկա, պետք է լրացնի դիմում-հայտ՝ կցելով ինքնակենսագրականը:`
      },
      {
        id: 3,
        title: "Երրորդ փուլ` Թեստավորում",
        description: "Դիմորդներն անցնում են թեստավորում, որն իրականացվում է երկու փուլով: Առաջին փուլը գրավոր թեստ է ընդհանուր զարգացվածության վերաբերյալ` ստուգում է hard skills: Բավարար արդյունքներ ունենալու դեպքում թեկնածուն տեղափոխվում է երկրորդ փուլ, որը թիմային առաջադրանք է, ստուգում է soft skills: "
      },
      {
        id: 4,
        title: "Չորրորդ փուլ` Ուսումնական պրակտիկա",
        description: "Նախորդ փուլում լավագույն արդյունք ցուցաբերած դիմորդներն սկսում են պրակտիկան: Ուսանողները, ներածական դասընթաց անցնելուց և կազմակերպությանը ծանոթանալուց հետո, անմիջապես ներգրավվում են ամենօրյա աշխատանքներում` կիրառելով համալսարանական գիտելիքները և հմտությունները:Պրակտիկայի ավարտին ուսանողներն ստանում են մեծ փորձ, պրակտիկ գիտելիքներ և մոտիվացիա: Եվ իհարկե, պրակտիկայի մասնակցության հավաստագիր:"
      },
      {
        id: 5,
        title: "Հինգերորդ փուլ` Աշխատանքի առաջարկ",
        description: `Ստուգումների դրական արդյունքներ ստանալուց հետո մեր թիմը կապ կհաստատի Ձեզ հետ և կներկայացնի աշխատանքի առաջարկ: Ձեր կողմից այն ընդունվելուց հետո կիրականացվեն փաստաթղթային ձևակերպումները և կամփոփվեն այլ մանրամասներ: Բարի գալուստ Evocabank!`
      }
    ]
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsSnap, benefitsSnap] = await Promise.all([
          getDocs(collection(db, "CareerSections6")),
          getDocs(collection(db, "CareerBenefits3")),
        ]);

        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections6(s);

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

  const hiringData = sections6.hiringSteps || sections6.intershipinfo || intershipinfoDefault;
  const joinFormData = sections6.join || sections6.joinData || fallbackJoinData;

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
            <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4 text-[#2d124d]">
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

          <JoinTeamForm {...joinFormData} onSubmit={handleJoin} />
        </div>
      )}

      <Footer />
    </>
  );
}

export default Intership;