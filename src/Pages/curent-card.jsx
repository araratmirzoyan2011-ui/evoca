import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import CardHero from "../Components/CardHero";

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
      <CardHero title={title} description={description} image={image} />
      
      <Footer />
    </div>
  );
};

export default CurrentCard;