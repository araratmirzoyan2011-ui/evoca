import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";

function Property() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "alienatedProperty"), orderBy("order"))
        );
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Property fetch error:", err);
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
          {/* Social icons */}
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          {/* Content */}
          <section className="min-w-0 flex-1 md:pl-[40px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333]">
              Օտարվող գույք
            </h1>

            <div className="overflow-x-auto rounded shadow-[0_0_20px_rgba(106,0,244,0.12)]">
              <table className="w-full min-w-[720px] border-collapse bg-white text-left">
                <thead>
                  <tr className="border-b border-[#e6d4ff]">
                    <th className="w-[30%] px-3 py-3 text-[13px] font-normal uppercase text-[#333]">
                      Հասցե
                    </th>
                    <th className="w-[30%] border-l border-[#e6d4ff] px-3 py-3 text-[13px] font-normal uppercase text-[#333]">
                      Նկարագրություն
                    </th>
                    <th className="w-[12%] border-l border-[#e6d4ff] px-3 py-3 text-[13px] font-normal uppercase text-[#333]">
                      Մակերես
                    </th>
                    <th className="w-[28%] border-l border-[#e6d4ff] px-3 py-3 text-[13px] font-normal uppercase text-[#333]">
                      Նկար
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-6 text-[13px] text-[#333]"
                      >
                        Բեռնվում է...
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item.id} className="border-b border-[#e6d4ff]">
                        <td className="px-3 py-3 text-[13px] leading-[22px] text-[#333]">
                          {item.address}
                        </td>
                        <td className="border-l border-[#e6d4ff] px-3 py-3 text-[13px] leading-[22px] text-[#333]">
                          {item.description}
                        </td>
                        <td className="border-l border-[#e6d4ff] px-3 py-3 text-[13px] text-[#333]">
                          {item.area}
                        </td>
                        <td className="border-l border-[#e6d4ff] p-2">
                          <img
                            src={item.image}
                            alt={item.address}
                            loading="lazy"
                            className="h-[167px] w-full object-cover"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Property;