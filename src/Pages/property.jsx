import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  setDoc,
} from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";

// ---------- DATA ----------
const IMG = "https://www.evoca.am/file_manager/Alienated-Property";

const propertyData = [
  {
    id: "1",
    address: "Կոտայքի մարզ, հ. Սոլակ 1-ին փող., 4-րդ նրբ., թիվ 2 հողամաս",
    description: "հողատարածք",
    area: "1340 քմ",
    image: `${IMG}/solak.png`,
    order: 1,
  },
  {
    id: "2",
    address: "ք. Երևան, Արաբկիր, Բաղրամյան պողոտա 53շ. 69",
    description: "ոչ բնակելի տարածք",
    area: "180 քմ",
    image: `${IMG}/baghramyan-53.jpg`,
    order: 2,
  },
  {
    id: "3",
    address: "Պռոշյան գյուղ, Մայիսյան 4-րդ նրբանցք, 21 տուն",
    description: "բնակելի տուն",
    area: "1,400 քմ",
    image: `${IMG}/proshyan.jpg`,
    order: 3,
  },
  {
    id: "4",
    address: "Կոտայքի մարզ, գ. Մարմարիկ",
    description: "հողամաս",
    area: "7600 քմ",
    image: `${IMG}/marmarik.jpg`,
    order: 4,
  },
  {
    id: "5",
    address: "Կոտայքի մարզ, Արտավազ համ., Կարմիր հովիտ",
    description: "հողամաս, (նպատակային նշ.՝ արոտավայր)",
    area: "10000 քմ",
    image: `${IMG}/karmir-hovit_0.jpg`,
    order: 5,
  },
  {
    id: "6",
    address: "ք. Գյումրի, Ղուկասյան փողոց 8 շարք, թիվ 33 բն.",
    description: "տուն",
    area: "115 քմ",
    image: `${IMG}/Gyumri.jpg`,
    order: 6,
  },
];

// ---------- COMPONENT ----------
function Property() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, []);

  const seedData = async () => {
    setSeeding(true);
    try {
      for (const item of propertyData) {
        await setDoc(doc(db, "alienatedProperty", item.id), {
          address: item.address,
          description: item.description,
          area: item.area,
          image: item.image,
          order: item.order,
        });
      }
      await fetchData();
      alert("Տվյալները հաջողությամբ ավելացվեցին Firestore");
    } catch (err) {
      console.error("Seed error:", err);
      alert("Սխալ seed անելիս");
    }
    setSeeding(false);
  };

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

            {/* Seed button — օգտագործիր մեկ անգամ, հետո հանիր */}
            <button
              onClick={seedData}
              disabled={seeding}
              className="mb-6 rounded bg-[#6a00f4] px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {seeding ? "Ավելացվում է..." : "Seed Firestore"}
            </button>

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
                      <td colSpan={4} className="px-3 py-6 text-[13px] text-[#333]">
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