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
import HiringSteps from '../Components/HiringSteps.jsx';

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

const defaultHiringSteps = {
  title: "Աշխատանքի ընդունվելու փուլեր",
  steps: [
    {
      id: 1,
      title: "Առաջին փուլ` Դիմում",
      description: "Evocabank-ում աշխատանքի դիմելիս թեկնածուի ճանապարհը սկսվում է հայտի ներկայացումից, որն իրականացվում է կամ ներքոնշյալ հայտը լրացնելով կամ cv@evocabank.am էլ. հասցեին Ձեր ինքնակենսագրականն ուղարկելով:"
    },
    {
      id: 2,
      title: "Երկրորդ փուլ` Հարցազրույցներ",
      description: `Եթե ինքնակենսագրականում նշված Ձեր փորձը համապատասխանել է պահանջներին, ապա Evocabank-ի հարցազրուցավարը կապ կհաստատի Ձեզ հետ: Սովորաբար, Evoca-ում հարցազրույցների գործընթացն անցնում է երեք փուլով:
Առաջին փուլը հեռախոսային հարցազրույց է: Այս փուլում Դուք կստանաք ավելի մանրամասն ինֆորմացիա այն աշխատանքի մասին, որի համար դիմել եք: Կներկայացնենք Ձեզ Evocabank-ը, և, թե ինչպիսին է աշխատանքը մեր թիմում: Նաև մի քանի հարցեր կլինեն Ձեր մասնագիտական փորձի վերաբերյալ:
Երկրորդ փուլը առերես հարցազրույց է հարցազրուցավարի և հավաքագրման ղեկավարի հետ: Այս փուլի նպատակն է գնահատել Ձեր հետաքրքրվածությունը և կարողությունները իրականացնելու ամենօրյա աշխատանքն ու պարտականությունները:
Երրորդ փուլը հարցազրույց է թիմի անդամների, ղեկավարների և բոլոր այն մարդկանց հետ, ում հետ Դուք հնարավոր է հետագայում աշխատեք:`
    },
    {
      id: 3,
      title: "Երրորդ փուլ` Թեստավորում և ամփոփում",
      description: `Թեստավորումից և հարցազրույցների ավարտից հետո այն մարդիկ, ում հետ զրուցել եք, իրենց կարծիքն են հայտնում Ձեր հետ ունեցած հարցազրույցի արդյունքների վերաբերյալ, և մենք գնահատում ենք, թե արդյոք հաջողակ կլինեք տվյալ դերում:`
    },
    {
      id: 4,
      title: "Չորրորդ փուլ` Ստուգումներ",
      description: "Աշխատանքի պայմանական առաջարկ կատարելուց հետո, Evoca-ն իրականացնում է դիմորդի վերաբերյալ պարտադիր ստուգումներ: Կատարվում են 4 հիմնական տեսակների ստուգումներ` քրեական պատմության, կրթության, աշխատանքային պատմության և referral ստուգումներ:"
    },
    {
      id: 5,
      title: "Հինգերորդ փուլ` Աշխատանքի առաջարկ",
      description: `Ստուգումների դրական արդյունքներ ստանալուց հետո մեր թիմը կապ կհաստատի Ձեզ հետ և կներկայացնի աշխատանքի առաջարկ: Ձեր կողմից այն ընդունվելուց հետո կիրականացվենի փաստաթղթային ձևակերպումները և կամփոփվեն այլ մանրամասներ: Բարի գալուստ Evocabank!`
    }
  ]
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

  const hiringData = sections.hiringSteps || sections.hiring || defaultHiringSteps;

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

          <HiringSteps
            title={hiringData.title}
            steps={hiringData.steps || hiringData.items}
          />

          <JoinTeamForm {...joinData} onSubmit={handleJoin} />
        </div>
      )}

      <Footer />
    </>
  );
}

export default EvocaWork;