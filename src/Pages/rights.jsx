import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const linkClass = "font-medium text-[#6200d6] underline";
const introTitle = "Հարգելի Հաճախորդներ՝";
const noticeTitle = "Ուշադրություն՝";

// Renders a string or a mixed array of strings and link objects
function RichText({ content }) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return content;

  return content.map((part, i) =>
    typeof part === "string" ? (
      <React.Fragment key={i}>{part}</React.Fragment>
    ) : (
      <a
        key={i}
        href={part.href}
        target={part.href?.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={linkClass}
      >
        {part.text}
      </a>
    )
  );
}

function Rights() {
  const [introParagraphs, setIntroParagraphs] = useState([]);
  const [noticeItems, setNoticeItems] = useState([]);
  const [rightsDocs, setRightsDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Տվյալների բեռնումը Firebase-ից էջը բեռնվելիս
  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        // 1. Բեռնել introParagraphs
        const introSnapshot = await getDocs(collection(db, "introParagraphs"));
        const introData = introSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Ցանկության դեպքում կարող եք կարգավորել ըստ originalId-ի կամ ուղղակի թողնել
        setIntroParagraphs(introData.sort((a, b) => (a.originalId || 0) - (b.originalId || 0)));

        // 2. Բեռնել noticeItems
        const noticeSnapshot = await getDocs(collection(db, "noticeItems"));
        const noticeData = noticeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoticeItems(noticeData.sort((a, b) => (a.originalId || 0) - (b.originalId || 0)));

        // 3. Բեռնել rightsDocs
        const docsSnapshot = await getDocs(collection(db, "rightsDocs"));
        const docsData = docsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRightsDocs(docsData.sort((a, b) => (a.originalId || 0) - (b.originalId || 0)));

      } catch (error) {
        console.error("Սխալ Firebase-ից տվյալները ստանալիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="relative flex min-h-[60vh] w-full items-center justify-center bg-white">
          <div className="text-gray-500 text-lg">Բեռնվում են տվյալները Firebase-ից...</div>
        </main>
        <Footer />
      </>
    );
  }

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
              Հաճախորդի իրավունքները (Բողոքի ներկայացման կանոններ)
            </h1>

            <p className="mb-8 font-bold max-[400px]:mb-5">{introTitle}</p>

            {introParagraphs.map((p) => (
              <p key={p.id} className="mb-8 max-[400px]:mb-5">
                <RichText content={p.content} />
              </p>
            ))}

            <h3 className="mb-5 font-bold text-[#6200d6] max-[400px]:mb-4">
              {noticeTitle}
            </h3>

            <ul className="mb-14 space-y-5 max-[400px]:mb-10 max-[400px]:space-y-4">
              {noticeItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-4 max-[400px]:gap-3"
                >
                  <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#6200d6] max-[400px]:mt-[7px] max-[400px]:h-2 max-[400px]:w-2" />
                  <span>
                    <RichText content={item.content} />
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="mb-6 text-xl font-bold text-gray-900 max-[400px]:mb-4 max-[400px]:text-lg">
              Փաստաթղթեր
            </h2>

            <div className="space-y-5 max-[400px]:space-y-3">
              {rightsDocs.map((doc) => (
                <DocumentCard key={doc.id} title={doc.title} url={doc.url} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Rights;