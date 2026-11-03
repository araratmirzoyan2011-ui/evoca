import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import i18n from "i18next";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import CardHero from "../Components/CardHero";
import CardTariffs from "../Components/Components/CardTariffs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AdvantageCard } from "../Components/AdvantageCard";
import CardSlider from "../Components/CardSlider2";
import { OnlineBanking } from '../Components/OnlineBanking.jsx';

const ICONS = {
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  banknote: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  percent: '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  trending: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  card: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
};

const ICON_RULES = [
  [/vip|պրեմիում|կոնսիերժ|concierge|անհատական մոտեցում/i, "star"],
  [/cashback/i, "percent"],
  [/lounge|fast track/i, "plane"],
  [/ապահովագր/i, "shield"],
  [/տոկոսադրույք/i, "trending"],
  [/կանխիկ/i, "banknote"],
  [/սպասարկման վճար|տարեկան սպասարկում|սակագին/i, "wallet"],
  [/ժամկետ/i, "clock"],
  [/դիզայն/i, "palette"],
  [/լեռն|սպորտ/i, "mountain"],
  [/բիզնես|ծախսեր|ֆինանսների/i, "briefcase"],
  [/անվտանգ|3d/i, "lock"],
  [/evocatouch|թվային|ֆիզիկական քարտ|ակտիվացում|անհպում|paywave|apple pay/i, "phone"],
  [/ակնթարթ|արագ|պարզ/i, "zap"],
  [/շոփինգ|խանութ|ընտրություն/i, "bag"],
  [/նվեր/i, "gift"],
  [/միջազգային|արտասահման|երկր|ցանց|կիրառություն|ընդունելիություն/i, "globe"],
];

// Օգնական ֆունկցիա բազմալեզու օբյեկտները տեքստի վերածելու համար
const getLocalizedText = (field) => {
  if (!field) return "";
  if (typeof field === "object") {
    const currentLang = i18n.language || "hy";
    return field[currentLang] || field.hy || field.en || field.ru || "";
  }
  return field;
};

const getAdvantageIcon = ({ title = "", text = "" }) => {
  const resolvedTitle = getLocalizedText(title);
  const resolvedText = getLocalizedText(text);
  const source = `${resolvedTitle} ${resolvedText}`;
  const match = ICON_RULES.find(([regex]) => regex.test(source));
  const body = ICONS[match ? match[1] : "card"];

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<rect width="64" height="64" rx="16" fill="#f3e8ff"/>` +
    `<g transform="translate(14 14) scale(1.5)" fill="none" stroke="#6a00d8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${body}</g>` +
    `</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const renderHighlighted = (text) => {
  const resolved = getLocalizedText(text);
  if (typeof resolved !== "string") return resolved || "";

  return resolved.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <span key={i} className="text-[#6a00d8] font-semibold">
        {part.slice(2, -2)}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

const tabs = [
  { id: "about", label: "Քարտի մասին" },
  { id: "tariffs", label: "Սակագներ և դրույքներ" },
];

const CardDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const [currentCard, setCurrentCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (!id) return;
        const docRef = doc(db, "CardmenuItems", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentCard(docSnap.data());
        } else {
          console.log("Քարտը չի գտնվել բազայում:");
        }
      } catch (error) {
        console.error("Սխալ տվյալներ ստանալիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center">Բեռնվում է...</div>;
  }

  if (!currentCard) {
    return <div className="py-20 text-center">Քարտը չի գտնվել:</div>;
  }

  const {
    title,
    image,
    title2,
    details = [],
    stats = [],
    tariffs = [],
    advantages = [],
  } = currentCard;

  // Անվտանգ լոկալիզացնում ենք stats զանգվածը նախքան CardTariffs փոխանցելը
  const localizedStats = stats.map((item) => ({
    ...item,
    title: getLocalizedText(item.title),
    value: getLocalizedText(item.value),
    text: getLocalizedText(item.text),
  }));

  return (
    <>
      <Header />
      <CardHero
        title={getLocalizedText(title)}
        description={getLocalizedText(title2)}
        image={image}
      />

      <section className="mx-auto w-full max-w-[1310px] px-4 py-10">
        <div className="flex gap-10 border-b border-gray-200">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`-mb-px border-b-[3px] px-5 py-4 text-[15px] font-semibold transition ${
                  isActive
                    ? "border-[#6a00d8] text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "about" && (
          <div className="mt-12 space-y-12">
            <div
              className={`grid items-start gap-10 ${
                localizedStats.length > 0
                  ? "lg:grid-cols-[minmax(0,570px)_minmax(0,657px)] lg:justify-between"
                  : "flex justify-center"
              }`}
            >
              <div
                className={`space-y-6 text-[18px] leading-[26px] text-gray-950 ${
                  localizedStats.length === 0 ? "max-w-[700px] mx-auto w-full text-center" : ""
                }`}
              >
                {details.map((paragraph, index) => (
                  <p key={index}>{renderHighlighted(paragraph)}</p>
                ))}
              </div>

              {localizedStats.length > 0 && <CardTariffs stats={localizedStats} />}
            </div>

            {advantages.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Քարտի առավելությունները
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {advantages.map((adv, index) => (
                    <AdvantageCard
                      key={adv.id || index}
                      img={adv.img || getAdvantageIcon(adv)}
                      title={getLocalizedText(adv.title)}
                      text={getLocalizedText(adv.text)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "tariffs" && (
          <div className="mt-12 overflow-x-auto">
            {tariffs.length > 0 ? (
              <div className="min-w-[700px] border-t border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {tariffs.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b border-gray-100 ${
                          index % 2 === 0 ? "bg-white" : "bg-[#fcfaff]"
                        } hover:bg-[#f6f0fe] transition-colors`}
                      >
                        <td className="w-1/2 py-4 px-6 text-[15px] font-medium text-gray-800 leading-snug">
                          {getLocalizedText(item.label)}
                        </td>
                        <td className="w-1/2 py-4 px-6 text-[15px] text-gray-900 font-normal leading-snug">
                          {getLocalizedText(item.value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-6">Սակագներ առկա չեն:</div>
            )}
          </div>
        )}
        <CardSlider currentId={id} />
      </section>
      <OnlineBanking />
      <Footer />
    </>
  );
};

export default CardDetails;