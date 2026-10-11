import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import ConstructionAccordion from "../Components/ConstructionAccordion.jsx";

function Bulders() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "constructionCompanies"), orderBy("order"))
        );
        setCompanies(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Bulders fetch error:", err);
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
              Կառուցապատողներ
            </h1>

            <p className="mb-6 text-[16px] text-[#333]">
              Ձեռք բերեք Ձեր նորաոճ և հարմարավետ բնակարանը{" "}
              <span className="text-[#6a00f4]">Evocabank</span>-ի հետ:
            </p>
            <p className="mb-12 text-[16px] text-[#333]">
              Ծանոթացեք մեզ հետ համագործակցող կառուցապատող կազմակերպությունների
              ցանկին և անհրաժեշտ տեղեկատվությանը ստորև.
            </p>

            <h2 className="mb-6 text-[24px] font-bold uppercase text-black">
              Անհրաժեշտ տեղեկատվություն
            </h2>

            {loading ? (
              <p className="text-[15px] text-[#333]">Բեռնվում է...</p>
            ) : (
              companies.map((c) => (
                <ConstructionAccordion
                  key={c.id}
                  name={c.name}
                  details={c.details}
                  images={c.images}
                />
              ))
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Bulders;