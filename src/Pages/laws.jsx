import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";

function Laws() {
  const [laws, setLaws] = useState([]);
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lawsSnap, regSnap] = await Promise.all([
          getDocs(query(collection(db, "laws"), orderBy("order"))),
          getDocs(query(collection(db, "lawRegulations"), orderBy("order"))),
        ]);

        setLaws(lawsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setRegulations(regSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Laws fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
         
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 md:pl-[40px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333]">
              Իրավական ակտեր
            </h1>

            {loading ? (
              <p className="text-[15px] text-[#333]">Բեռնվում է...</p>
            ) : (
              <>
                <h2 className="mb-3 text-[32px] font-medium text-[#333]">
                  Օրենքներ
                </h2>
                <ul className="mb-10">
                  {laws.map((item) => (
                    <li key={item.id} className="leading-[23px]">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] text-[#6a00f4] underline hover:text-[#4a00b0]"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <h2 className="mb-5 text-[32px] font-medium text-[#333]">
                  Կանոնակարգեր և այլ իրավական ակտեր
                </h2>
                <ol className="list-decimal space-y-5 pl-10 marker:font-semibold marker:text-[#6a00f4]">
                  {regulations.map((item) => (
                    <li key={item.id} className="pl-1 leading-[23px]">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-semibold text-[#6a00f4] underline hover:text-[#4a00b0]"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Laws;