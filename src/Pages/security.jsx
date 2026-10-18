import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query, doc, getDoc } from 'firebase/firestore';

const fetchCollection = async (name) => {
  const snap = await getDocs(query(collection(db, name), orderBy("order")));
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
};
const cardInfo = {
  title: "Ֆինանսական հանցագործությունների կանխարգելում",
  description: "",
  imageUrl: "https://www.evoca.am/images-cache/menu/1/17387447069114/780x585.png",
  altText: "Հաշիվների բացում և սպասարկում"
};

const Security = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [termsIntro, setTermsIntro] = useState({});
  const [loansInfo, setLoansInfo] = useState({});
  const [general, setGeneral] = useState({});
  const [mainConditionsList, setMainConditionsList] = useState([]);
  const [documents, setDocuments] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const menu = await fetchCollection("menuItems");
      const conditions = await fetchCollection("metalMainConditions");
      const docsList = await fetchCollection("metalDocuments");

      const termsIntroSnap = await getDoc(doc(db, "metalPageInfo", "termsIntro"));
      const loansInfoSnap = await getDoc(doc(db, "metalPageInfo", "loansInfo"));
      const generalSnap = await getDoc(doc(db, "metalPageInfo", "general"));

      setMenuItems(menu);
      setMainConditionsList(conditions);
      setDocuments(docsList);

      if (termsIntroSnap.exists()) setTermsIntro(termsIntroSnap.data());
      if (loansInfoSnap.exists()) setLoansInfo(loansInfoSnap.data());
      if (generalSnap.exists()) setGeneral(generalSnap.data());

    } catch (err) {
      console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <InfoCard
            title={cardInfo.title}
            description={cardInfo.description}
            imageUrl={cardInfo.imageUrl}
            altText={cardInfo.altText}
          />
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        {loading && (
          <p className="text-center text-gray-500 py-10">Բեռնվում են տվյալները Firebase-ից...</p>
        )}

        {error && (
          <p className="text-center text-red-600 py-10">
            Չհաջողվեց բեռնել տվյալները։ Խնդրում ենք փորձել կրկին։
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
              <div className="hidden md:block">
                <div className="sticky top-24">
                  <SocialIcons />
                </div>
              </div>

              <div className="flex-1 max-w-4xl text-gray-800 leading-relaxed space-y-6">
                {termsIntro.text && (
                  <p>
                    {termsIntro.text}{" "}
                    <a
                      href={termsIntro.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-purple-800 underline"
                    >
                      {termsIntro.linkText}
                    </a>:
                  </p>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {general.mainConditionsTitle}
                  </h2>
                  <ul className="list-disc pl-5 space-y-4 text-gray-700">
                    {mainConditionsList.map((item, index) => {
                      if (item.type === "simple_text" || item.type === "text_with_highlights") {
                        return (
                          <li
                            key={item.docId || index}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        );
                      }
                      if (item.type === "nested_list") {
                        return (
                          <li key={item.docId || index}>
                            <span>{item.title}</span>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                              {item.subItems?.map((sub, sIdx) => (
                                <li
                                  key={sIdx}
                                  dangerouslySetInnerHTML={{ __html: sub }}
                                />
                              ))}
                            </ul>
                          </li>
                        );
                      }
                      if (item.type === "link_text") {
                        return (
                          <li key={item.docId || index}>
                            {item.content}
                            <a
                              href={item.linkUrl}
                              className="text-purple-800 underline font-semibold"
                            >
                              {item.linkText}
                            </a>:
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>

                  {loansInfo.text && (
                    <p className="mt-6 text-gray-700">
                      {loansInfo.text}
                      <a href={loansInfo.linkUrl} className="text-purple-800 underline font-semibold">
                        {loansInfo.linkText}
                      </a>
                      {loansInfo.suffixText}
                    </p>
                  )}

                  {general.warningText && (
                    <p className="mt-4 text-sm text-gray-600 bg-gray-100 p-4 rounded-lg border-l-4 border-purple-800 font-medium">
                      {general.warningText}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12">
              <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
                <div className="max-w-4xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Փաստաթղթեր
                  </h2>
                  <div className="space-y-5">
                    {documents.map((docItem, index) => (
                      <DocumentCard key={docItem.docId || index} title={docItem.title} url={docItem.url} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <OnlineBanking />
      <Footer />
    </>
  );
};

export default Security;