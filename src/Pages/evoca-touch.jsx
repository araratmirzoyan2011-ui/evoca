import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { EvocaReviewCard } from '../Components/EvocaReviewCard.jsx';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

const EvocaTouch = () => {
  const [introParagraphs, setIntroParagraphs] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [EvocaTouchReport, setEvocaTouchReport] = useState([]);
  const [bottomParagraphs, setBottomParagraphs] = useState([]);

  const [reviewsData, setReviewsData] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsSnapshot = await getDocs(collection(db, "reviewsCollection"));
        const reviewsDocsData = reviewsSnapshot.docs.map((doc) => doc.data());
        if (reviewsDocsData.length > 0 && reviewsDocsData[0].reviews) {
          setReviewsData(reviewsDocsData[0].reviews);
        }

        const introDoc = await getDoc(doc(db, "introParagraphsCollection", "data"));
        if (introDoc.exists()) {
          setIntroParagraphs(introDoc.data().paragraphs || []);
        }

        const featuresDoc = await getDoc(doc(db, "featuresListCollection", "data"));
        if (featuresDoc.exists()) {
          setFeaturesList(featuresDoc.data().features || []);
        }

        const reportDoc = await getDoc(doc(db, "EvocaTouchReportCollection", "data"));
        if (reportDoc.exists()) {
          setEvocaTouchReport(reportDoc.data().reports || []);
        }

        const bottomDoc = await getDoc(doc(db, "bottomParagraphsCollection", "data"));
        if (bottomDoc.exists()) {
          setBottomParagraphs(bottomDoc.data().paragraphs || []);
        }

      } catch (error) {
        console.error("Տվյալները Firestore-ից բեռնելիս սխալ տեղի ունեցավ:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-3xl font-bold text-gray-900">EvocaTOUCH</h1>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              {introParagraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            {introParagraphs.length > 0 && (
              <p className="mt-6 font-medium text-gray-800">
                Նոր հավելվածն առաջարկում է գործառույթների լայն շրջանակ, որը ներառում է ամենօրյա բանկային գործընթացները՝ վերացնելով ֆիզիկական մասնաճյուղ այցելելու անհրաժեշտությունը։ Առանց գրանցման և սպասարկման վճարի՝ օգտատերերը կարող են․
              </p>
            )}

            <ul className="mt-4 space-y-3 pl-2">
              {featuresList.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
              {bottomParagraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {EvocaTouchReport.map((r, index) => (
                  <DocumentCard key={r.docId || r.order || index} title={r.title} url={r.url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnlineBanking />

      <div className="bg-[#fcfbfe] py-16 px-4 w-full overflow-hidden">
        {reviewsData.length > 0 && reviewsData[reviewIndex] && (
          <div className="w-full min-h-[220px] flex items-center justify-center">
            <EvocaReviewCard 
              quote={reviewsData[reviewIndex].quote}
              author={reviewsData[reviewIndex].author}
              title={reviewsData[reviewIndex].title}
            />
          </div>
        )}

        <div className="flex justify-center items-center space-x-3 mt-8">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setReviewIndex(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                reviewIndex === index
                  ? 'w-6 h-2.5 bg-purple-600'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EvocaTouch;