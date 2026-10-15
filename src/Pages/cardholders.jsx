import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";

function Cardholders() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "cardholders"));
        
        const docsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocuments(docsArray);
      } catch (error) {
        console.error("Սխալ տվյալները Firebase-ից բեռնելիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <>
      <Header />

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333] max-[400px]:mb-8 max-[400px]:text-[24px]">
              Արխիվ
            </h1>

            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Փաստաթղթեր
            </h2>

            {loading ? (
              <div className="py-8 text-center text-gray-500">
                Բեռնվում են փաստաթղթերը...
              </div>
            ) : documents.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                Փաստաթղթեր չեն գտնվել:
              </div>
            ) : (
              <div className="space-y-5">
                {documents.map((doc) => (
                  <DocumentCard key={doc.id} title={doc.title} url={doc.url} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Cardholders;