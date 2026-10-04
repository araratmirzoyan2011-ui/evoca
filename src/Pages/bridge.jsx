import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase.js';
import CultureBanner from '../Components/CultureBanner.jsx';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

const defaultBridgeData = {
  introTitle: "Չունե՞ս աշխատանքային փորձ, բայց փնտրո՞ւմ ես աշխատանք, ուրեմն EvocaBRIDGE ծրագիրը քեզ համար է!",
  benefits: [
    "երկամսյա խորացված ուսումնական ծրագիր,",
    "ծանոթացում նորարար բանկային միջավայրին ներսից,",
    "գործնական կապերի հաստատում,",
    "ամսական 180.000 ՀՀ դրամ վարձատրություն՝ ներառյալ հարկերը և այլ պարտադիր վճարումները,",
    "անմիջապես ծրագրի ավարտից հետո աշխատանքի անցնելու հնարավորություն:"
  ],
  requirementsTitle: "EvocaBRIDGE-ին կարող ես մասնակցել, եթե...",
  requirements: [
    "սովորում ես համալսարանի 4-րդ կուրսում, մագիստրատուրայում կամ մինչև 1 տարի է՝ ինչ ավարտել ես համալսարանը,",
    "ունես բարձր առաջադիմություն,",
    "հետաքրքրասեր ես, ակտիվ ու նպատակասլաց,",
    "սիրում ես բացահայտել նորը, սովորել և զարգանալ:"
  ],
  applyTitle: "EvocaBRIDGE-ին մասնակցելու համար evocabridge@evoca.am էլեկտրոնային հասցեին ուղարկիր.",
  applyEmail: "evocabridge@evoca.am",
  applyDocs: [
    "ինքնակենսագրական,",
    "ՄՈԳ-ի ցուցանիշը հաստատող տեղեկանք,",
    "«Նամակ ապագայից» այն մասին, թե ինչպես ես ամենամեծ 2 նպատակներդ դարձրել հաջողված նախագծեր:"
  ],
  interviewNote: "Նախնական ընտրությունն անցած թեկնածուների հետ կիրականացվեն անհատական հարցազրույցներ, որի արդյունքում կընտրվեն ծրագրի մասնակիցները:",
  detailsTitle: "Ծրագրի մանրամասներ.",
  detailsSubtitle: "EvocaBRIDGE-ն իրականացվում է 3 փուլերով:",
  stages: [
    {
      title: "Փուլ 1",
      description: "Տեսական ուսուցման ընթացքում մասնակիցներն ունենում են հանդիպումներ Բանկի մի շարք ստորաբաժանումների ղեկավարների հետ, ստանում խորացված գիտելիքներ բանկային պրոդուկտների, ծառայությունների և մի շարք գործընթացների վերաբերյալ:"
    },
    {
      title: "Փուլ 2",
      description: "Գործնական փուլի շրջանակում մասնակիցները հնարավորություն են ունենում տեսական և գործնական գիտելիքները կիրառել պրակտիկ միջավայրում: Այս փուլի ընթացքում մասնակիցները նաև ներգրավվում են նախագծերի մշակման և ներկայացման հետաքրքիր գործընթացում:"
    },
    {
      title: "Փուլ 3",
      description: "Տեսական և գործնական փուլերի ավարտից հետո իրականացվում է թեստավորում և ավարտական նախագծերի հանձնում: Լավագույն արդյունք ցուցաբերած մասնակիցները ստանում են աշխատանքի առաջարկ Evocabank-ից և սկսում իրենց մասնագիտական ուղին:"
    }
  ]
};

function Bridge() {
  const [sections7, setSections7] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadData = async () => {
    try {
      const sectionsSnap = await getDocs(collection(db, "CareerSections7"));
      const s = {};
      sectionsSnap.forEach((d) => (s[d.id] = d.data()));
      setSections7(s);
    } catch (err) {
      console.error("Bridge data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Ֆունկցիա՝ տվյալները Firebase-ում (CareerSections7) պահպանելու համար
  const handleUploadData = async () => {
    setUploading(true);
    try {
      await setDoc(doc(db, "CareerSections7", "bridgeInfo"), defaultBridgeData);
      alert("Տվյալները հաջողությամբ ավելացվեցին Firebase-ում (CareerSections7 collection)!");
      await loadData();
    } catch (err) {
      console.error("Firebase upload error:", err);
      alert("Սխալ տեղի ունեցավ տվյալները ուղարկելիս:");
    } finally {
      setUploading(false);
    }
  };

  const bridgeData = sections7.bridgeInfo || defaultBridgeData;

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
          {/* Կոճակ՝ տվյալները Firebase (CareerSections7) ուղարկելու համար */}
          <div className="flex justify-center my-6">
            <button
              onClick={handleUploadData}
              disabled={uploading}
              className="bg-[#6a0fd9] hover:bg-[#550ab2] text-white font-medium py-2.5 px-6 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {uploading ? "Ուղարկվում է..." : "Ավելացնել տվյալները Firebase-ում (CareerSections7)"}
            </button>
          </div>

          {sections7.culture && (
            <CultureBanner {...sections7.culture} className="mb-[60px]" />
          )}

          <div className="max-w-5xl mx-auto px-4 py-6 text-[#2d124d]">
            {/* 1. Intro Header */}
            {bridgeData.introTitle && (
              <h2 className="text-xl md:text-2xl font-bold text-[#6a0fd9] mb-6 leading-relaxed">
                {bridgeData.introTitle}
              </h2>
            )}

            {/* 2. Benefits list */}
            {bridgeData.benefits && (
              <ul className="space-y-4 mb-8">
                {bridgeData.benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#6a0fd9] mt-1 font-bold text-lg">✓</span>
                    <span className="text-gray-800 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* 3. Requirements section */}
            {bridgeData.requirementsTitle && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#6a0fd9] flex items-center gap-2 mb-4">
                  <span>💼</span> {bridgeData.requirementsTitle}
                </h3>
                <ul className="space-y-4">
                  {bridgeData.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#6a0fd9] mt-1 font-bold text-lg">✓</span>
                      <span className="text-gray-800 text-base leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Application info */}
            {bridgeData.applyTitle && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#6a0fd9] flex items-center gap-2 mb-4 flex-wrap">
                  <span>💼</span>
                  <span>
                    EvocaBRIDGE-ին մասնակցելու համար{" "}
                    <a
                      href={`mailto:${bridgeData.applyEmail || "evocabridge@evoca.am"}`}
                      className="underline hover:text-[#550ab2] transition-colors"
                    >
                      {bridgeData.applyEmail || "evocabridge@evoca.am"}
                    </a>{" "}
                    էլեկտրոնային հասցեին ուղարկիր.
                  </span>
                </h3>
                <ul className="space-y-4 mb-6">
                  {bridgeData.applyDocs?.map((docItem, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#6a0fd9] mt-1 font-bold text-lg">✓</span>
                      <span className="text-gray-800 text-base leading-relaxed">{docItem}</span>
                    </li>
                  ))}
                </ul>
                {bridgeData.interviewNote && (
                  <p className="text-gray-700 leading-relaxed font-medium mt-4">
                    {bridgeData.interviewNote}
                  </p>
                )}
              </div>
            )}

            {/* 5. Program details & 3 stages */}
            {bridgeData.detailsTitle && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-[#6a0fd9] mb-2">
                  {bridgeData.detailsTitle}
                </h3>
                <p className="text-gray-800 font-medium mb-6">
                  {bridgeData.detailsSubtitle}
                </p>

                <div className="space-y-4">
                  {bridgeData.stages?.map((stage, index) => (
                    <div key={index} className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                      <p className="text-gray-800 leading-relaxed">
                        <span className="font-bold text-[#6a0fd9]">{stage.title}: </span>
                        {stage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Bridge;