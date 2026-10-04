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
import FaqAccordion from '../Components/FaqAccordion.jsx';

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

const defaultFaqData = {
  title: "Հարցերի ցանկ",
  description:
    "Բացահայտիր, թե ինչն է Evoca-ն դարձնում այդքան յուրահատուկ: Աշխատակիցներն ուրախ են, մոտիվացված, իսկ առավելությունների մեծ փաթեթն օգնում է հոգ տանել իրենց և ընտանիքների մասին:",
  items: [
    {
      id: 1,
      question: "Կարո՞ղ եմ միաժամանակ դիմել տարբեր աշխատատեղերի համար:",
      answer:
        "Մեկ օգտատիրոջ կողմից ներկայացվող դիմումների քանակն անսահմանափակ է, սակայն խնդրում ենք դիմել միայն այն աշխատանքների համար, որում նշված պահանջներին և հմտություններին համապատասխանում եք:"
    },
    {
      id: 2,
      question: "Դիմումը ներկայացնելուց որքա՞ն ժամանակ հետո ինձ կհրավիրեն հարցազրույցի:",
      answer:
        "Եթե Դուք դիմել եք հայտարարված ազատ աշխատատեղի համար և հայտնվել եք նախնական ընտրված թեկնածուների շարքում, ապա մեր թիմը կապ կհաստատի Ձեզ հետ հայտարարության ժամկետի ավարտից հետո`մեկ ամսվա ընթացքում:"
    },
    {
      id: 3,
      question: "Հարցազրույցի ընթացքում լինելո՞ւ է թեստավորում:",
      answer:
        "Աշխատանքի ընդունման մեր գործընթացը մի քանի փուլից է կազմված: Առաջին փուլում թեստավորում չի իրականացվում: Հետագա փուլերի մասին ինֆորմացիան կարող եք գտնել «Ինչպես ընդունվել աշխատանքի Evocabank-ում» բաժնում:"
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

function Answer() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const sectionsSnap = await getDocs(collection(db, "CareerSections4"));
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

  const faqData = sections.faq || sections.questions || defaultFaqData;

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

          <FaqAccordion
            title={faqData.title}
            description={faqData.description}
            items={faqData.items || faqData.questions}
          />

          <JoinTeamForm {...joinData} onSubmit={handleJoin} />
        </div>
      )}

      <Footer />
    </>
  );
}

export default Answer;