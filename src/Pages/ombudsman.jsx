import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Ombudsman() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "ombudsman_blocks"));
        let fetchedBlocks = [];

        querySnapshot.forEach((doc) => {
          fetchedBlocks.push({ id: doc.id, ...doc.data() });
        });

        fetchedBlocks.sort((a, b) => a.index - b.index);
        setBlocks(fetchedBlocks);
      } catch (error) {
        console.error("Սխալ Firebase-ից կարդալիս:", error);
        setErrorMsg("Տվյալները բեռնելիս սխալ տեղի ունեցավ։");
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg text-gray-600">
        Բեռնվում է...
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
              Ֆին. հաշտարար
            </h1>

            {errorMsg && <p className="mb-6 text-red-500">{errorMsg}</p>}

            {blocks.map((block, i) => (
              <React.Fragment key={block.id || i}>
                {block.type === "heading" && (
                  <p className="mb-6 font-bold text-[#222] max-[400px]:mb-4">
                    {block.content}
                  </p>
                )}

                {block.type === "paragraph" && (
                  <p
                    className={`mb-6 max-[400px]:mb-4 ${
                      block.italic ? "italic" : ""
                    }`}
                  >
                    {Array.isArray(block.content) &&
                      block.content.map((part, j) => {
                        if (typeof part === "string") return part;

                        if (part.href) {
                          return (
                            <a
                              key={j}
                              href={part.href}
                              target={part.href.startsWith("http") ? "_blank" : undefined}
                              rel="noopener noreferrer"
                              className="font-medium text-[#6200d6] underline"
                            >
                              {part.text}
                            </a>
                          );
                        }

                        return (
                          <span key={j} className={part.bold ? "font-bold" : ""}>
                            {part.text}
                          </span>
                        );
                      })}
                  </p>
                )}

                {block.type === "bullets" && (
                  <ul className="mb-8 space-y-4 pl-4 max-[400px]:mb-5 max-[400px]:space-y-3 max-[400px]:pl-1">
                    {block.items &&
                      block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-4 max-[400px]:gap-3">
                          <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#6200d6] max-[400px]:mt-[7px] max-[400px]:h-2 max-[400px]:w-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Ombudsman;