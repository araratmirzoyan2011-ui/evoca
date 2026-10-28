import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";

const CurrentCard = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchCard = async () => {
  try {
    const snapshot = await getDocs(collection(db, "CardmenuItems"));
    const found = snapshot.docs.find((d) => d.id === id);
    if (found) {
      setCard({ id: found.id, ...found.data() });
    }
  } catch (error) {
    console.error("Սխալ քարտը բեռնելիս:", error);
  } finally {
    setLoading(false);
  }
};

    fetchCard();
    window.scrollTo({ top: 0 });
  }, [id]);

  if (loading) return <div className="py-20 text-center text-[#6a00d8]">Բեռնվում է...</div>;
  if (!card) return <div className="py-20 text-center text-gray-500">Քարտը չի գտնվել:</div>;

  const { title, description, image, stats = [] } = card;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-[1310px] w-full mx-auto px-4 py-8">
        <h1 className="text-[36px] font-bold text-black mb-6">{title}</h1>
        <div className="flex flex-col md:flex-row gap-10">
          <img src={image} alt={title} className="w-full md:w-[390px] rounded-xl object-cover" />

          <div className="flex-1">
            <p className="text-[15px] leading-6 text-gray-800">{description}</p>

            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((item, index) => (
                <div key={index}>
                  <p className="text-[13px] text-gray-800">{item.label}</p>
                  <p className="text-[32px] font-semibold text-[#6a00d8]">{item.value}</p>
                  <p className="mt-2 text-[13px] text-gray-800">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CurrentCard;