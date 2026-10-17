import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { db } from "../firebase.js";
import { collection, doc, setDoc, getDocs, query, orderBy } from "firebase/firestore";


function renderText(block) {
  let parts = [block.text];

  if (block.link) {
    parts = block.text.split(block.link.label).flatMap((chunk, i, arr) =>
      i < arr.length - 1
        ? [
            chunk,
            <a
              key={`l${i}`}
              href={block.link.href}
              target="_blank"
              rel="noreferrer"
              className="text-[#6f00d6] underline"
            >
              {block.link.label}
            </a>,
          ]
        : [chunk]
    );
  }

  if (block.bold) {
    parts = parts.flatMap((part) =>
      typeof part === "string" && part.includes(block.bold)
        ? part.split(block.bold).flatMap((chunk, i, arr) =>
            i < arr.length - 1
              ? [chunk, <strong key={`b${i}`}>{block.bold}</strong>]
              : [chunk]
          )
        : [part]
    );
  }

  return parts;
}

function Privacy() {
  const [privacyBlocks, setPrivacyBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  // Բեռնել տվյալները Firebase-ից բաղադրիչը բացվելիս
  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        const q = query(collection(db, "privacy"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        
        // Եթե բազայում տվյալներ կան, վերցնում ենք դրանք, հակառակ դեպքում՝ ֆոլբեք զանգվածը
        if (data.length > 0) {
          setPrivacyBlocks(data);
        } else {
          setPrivacyBlocks(initialPrivacyBlocks);
        }
      } catch (e) {
        console.error("Սխալ բեռնելիս:", e);
        setPrivacyBlocks(initialPrivacyBlocks);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyData();
  }, []);

  // Կոճակը՝ տվյալները բազա լցնելու (Seed) համար
  const seedFirestore = async () => {
    try {
      setSeeding(true);
      for (let i = 0; i < initialPrivacyBlocks.length; i++) {
        const id = String(i + 1).padStart(3, "0");
        await setDoc(doc(collection(db, "privacy"), id), {
          order: i + 1,
          ...initialPrivacyBlocks[i],
        });
      }
      setPrivacyBlocks(initialPrivacyBlocks);
      alert("Տվյալները հաջողությամբ ավելացվեցին Firestore-ում");
    } catch (e) {
      console.error(e);
      alert("Սխալ՝ տես console-ը");
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-[#6f00d6]">Բեռնվում է...</p>
      </div>
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
              Գաղտնիության քաղաքականություն
            </h1>

            {privacyBlocks.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="mb-6 mt-8 text-[18px] font-semibold text-[#6f00d6] max-[400px]:text-[16px]"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "subheading") {
                return (
                  <p key={index} className="mb-6 font-semibold">
                    {block.text}
                  </p>
                );
              }

              if (block.type === "list") {
                return (
                  <ul
                    key={index}
                    className="mb-6 list-disc space-y-3 pl-8 marker:text-[#6f00d6]"
                  >
                    {block.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={index} className="mb-6">
                  {renderText(block)}
                </p>
              );
            })}

            
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Privacy;