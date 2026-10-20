import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import FaqAccordion from "../Components/FaqAccordion2";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Faq = () => {
  const [loading, setLoading] = useState(true);
  const [faqCategories, setFaqCategories] = useState([]);

  useEffect(() => {
    const fetchFaqCategories = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "faqCategories"));
        if (!snapshot.empty) {
          const categories = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFaqCategories(categories);
        }
      } catch (error) {
        console.error("Firestore-ից FAQ տվյալների բեռնման սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-medium text-lg">
        Բեռնվում են տվյալները Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <Header />

      <section className="mx-auto max-w-[1440px] px-6 py-10 md:px-9">
        <h1 className="mb-12 text-4xl font-bold text-[#1a1a1a]">
          Հաճախ տրվող հարցեր
        </h1>

        {faqCategories.length > 0 ? (
          <FaqAccordion categories={faqCategories} />
        ) : (
          <p className="text-gray-500">Տվյալներ չեն գտնվել:</p>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Faq;