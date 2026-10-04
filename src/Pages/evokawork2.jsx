import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase.js';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import EvocaCard from '../Components/PaymentCard.jsx';
import JobCard from '../Components/JobCard.jsx';

// Lista por defecto con los empleos extraídos de las capturas de pantalla
const defaultJobs = [
  {
    id: 1,
    title: "Քարտային պրոդուկտների թվայնացման մասնագետ",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ, Սեբաստիա 108/3"
  },
  {
    id: 2,
    title: "ՓՄՁ վարկավորման ավագ վարկային մասնագետ",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 3,
    title: "Վարկերի հաստատման մասնագետ (Իրավաբանական անձանց)",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 4,
    title: "Համապատասխանության ապահովման մասնագետ",
    deadline: "28.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 5,
    title: "Ավագ Հաշվապահ",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 6,
    title: "ԱԲ ռիսկերի կառավարման մասնագետ",
    deadline: "30.09.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 7,
    title: "Թվային զարգացման մասնագետ (արժեթղթային և ներդրումային պրոդուկտներ)",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ, Սեբաստիա 108/3"
  },
  {
    id: 8,
    title: "Արժեթղթերով գործառնությունների մասնագետ",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 9,
    title: "Թվային ինտեգրացիաների զարգացման մասնագետ",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ, Սեբաստիա 108/3"
  },
  {
    id: 10,
    title: "Համակարգերի ադմինիստրատոր",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ, Սեբաստիա 108/3"
  },
  {
    id: 11,
    title: "Պայմանագրային ապահովման ավագ մասնագետ",
    deadline: "28.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 12,
    title: "Հիփոթեքային վարկավորման և փաստաթղթաշրջանառության մասնագետ",
    deadline: "08.10.2026",
    location: "Արմավիրի մարզ, Մեծամոր"
  },
  {
    id: 13,
    title: "Վարկերի մոնիթորինգի մասնագետ",
    deadline: "09.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 14,
    title: "Նոտարական ձևակերպումների մասնագետ",
    deadline: "23.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 15,
    title: "Կառավարչի տեղակալ - ավագ վարկային մասնագետ «Դիլիջան» մասնաճյուղում",
    deadline: "28.10.2026",
    location: "ք. Դիլիջան"
  },
  {
    id: 16,
    title: "Պրոդուկտ մարքեթինգ մենեջեր",
    deadline: "20.10.2026",
    location: "Երևան, EvocaHUB"
  },
  {
    id: 17,
    title: "Հաճախորդների վերլուծությունների բաժնի վերլուծաբան (բիզնես վարկավորման ուղղություն)",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 18,
    title: "Վարկային մասնագետ",
    deadline: "28.09.2026",
    location: "Երևան"
  },
  {
    id: 19,
    title: "Կոնտակտային կենտրոնի մասնագետ (Ցերեկային հերթափոխ)",
    deadline: "14.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ"
  },
  {
    id: 20,
    title: "Ցանցային ադմինիստրատոր",
    deadline: "02.10.2026",
    location: "Երևան, Գլխամասային գրասենյակ, Սեբաստիա 108/3"
  }
];

function Work2() {
  const [sections2, setSections2] = useState({});
  const [benefits, setBenefits] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectionsSnap, benefitsSnap, jobsSnap] = await Promise.all([
          getDocs(collection(db, "CareerSections5")),
          getDocs(collection(db, "CareerBenefits2")),
          getDocs(collection(db, "CareerJobs")).catch(() => ({ docs: [] }))
        ]);

        const s = {};
        sectionsSnap.forEach((d) => (s[d.id] = d.data()));
        setSections2(s);

        const bList = benefitsSnap.docs.map((d) => ({
          docId: d.id,
          ...d.data(),
        }));
        bList.sort((a, b) => (a.id || 0) - (b.id || 0));
        setBenefits(bList);

        // Si existen ofertas en Firebase las usa, de lo contrario carga predeterminadas
        if (jobsSnap.docs && jobsSnap.docs.length > 0) {
          const jList = jobsSnap.docs.map((d) => ({
            docId: d.id,
            ...d.data(),
          }));
          setJobs(jList);
        } else {
          setJobs(defaultJobs);
        }

      } catch (err) {
        console.error("Career data load error:", err);
        setJobs(defaultJobs);
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
      <Navbar />

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center text-[#6a0fd9]">
          Բեռնվում է...
        </div>
      ) : (
        <div className="pt-0 mb-[60px]">
          {sections2.culture && (
            <CultureBanner {...sections2.culture} className="mb-[60px]" />
          )}

          {/* Sección 1: Beneficios y perfil de equipo */}
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

          {/* Sección 2: Vacantes de empleo (Job Cards) */}
          <section className="w-full max-w-6xl mx-auto px-4 my-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2d124d] mb-3">
                Բաց մի թող քո նոր հնարավորությունը
              </h2>
              <p className="text-gray-500 text-sm md:text-base font-medium">
                {jobs.length} աշխատատեղ
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              {jobs.map((job, index) => (
                <JobCard
                  key={job.docId || job.id || index}
                  title={job.title}
                  deadline={job.deadline}
                  location={job.location}
                  onApply={() => handleApply(job.title)}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Work2;