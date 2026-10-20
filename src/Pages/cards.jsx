import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import CardItem from "../Components/CardItem";

const BASE = "https://www.evoca.am";

const cardsData = [
  {
    id: "travel-card",
    title: "Evoca Travel Card",
    description:
      "Սիրո՞ւմ ես ճամփորդել․ ուրեմն ժամանակն է ձեռք բերելու Evoca Mastercard Travel Card, որը կդառնա քո ճամփորդական անբաժան ընկերը։",
    image: `${BASE}/images-cache/cards/1/17479817930565/415x261.jpg`,
    link: `${BASE}/hy/cards/master/travel-card`,
    category: "master",
    stats: [
      { label: "Մինչև", value: "1.5%", text: "Cashback արտասահմանում իրականացրած վճարումների համար" },
      { label: "Անվճար", value: "6 մուտք", text: "Lounge Key սրահներ քեզ և հյուրերիդ համար" },
      { label: "Անվճար", value: "6 անգամ", text: "Fast track-ից օգտվելու հնարավորություն քեզ և հյուրերիդ համար" },
      { label: "", value: "16․000֏", text: "Քարտի տարեկան սպասարկում" },
    ],
  },
  {
    id: "visa-platinum",
    title: "Evoca Visa Platinum",
    description: "Պրեմիում առավելություններ պրեմիում քարտով։",
    image: `${BASE}/images-cache/cards/1/17798007931247/415x261.png`,
    link: `${BASE}/hy/cards/visa/visa-platinum-card`,
    category: "visa",
    stats: [
      { label: "", value: "30.000 ֏", text: "Սպասարկման վճար" },
      { label: "Անվճար", value: "6 մուտք", text: "Օդանավակայանների բիզնես սրահներ" },
    ],
  },
  {
    id: "wilco-visa-infinite",
    title: "Wilco Visa Infinite",
    description:
      "Բացահայտեք պրեմիում բանկինգի և անհատականացված ֆինանսական փորձառությունը Wilco Visa Infinite քարտի հետ։",
    image: `${BASE}/images-cache/cards/1/17815131185095/415x261.png`,
    link: `${BASE}/hy/cards/premium/wilco-visa-infinite`,
    category: "premium",
    stats: [],
  },
  {
    id: "evoca-gift-card",
    title: "Evoca Gift Card",
    description: "Գնիր Evoca Gift Card, և լավագույն նվերը կլինի քոնը:",
    image: `${BASE}/images-cache/cards/1/17767720288483/415x261.png`,
    link: `${BASE}/hy/cards/gift-cards/evoca-gift-card`,
    category: "gift-cards",
    stats: [],
  },
  {
    id: "digital-gift-card",
    title: "Digital Gift Card",
    description:
      "Սիրելի մարդկանց համար նվեր ընտրելը պատասխանատու ու հաճելի գործ է, բայց նաև ժամանակատար ու նյարդայնացնող, հատկապես երբ չգիտես՝ կհավանի՞, թե՞ ոչ։ Մենք առաջարկում ենք իդեալական նվերի տարբերակ։",
    image: `${BASE}/images-cache/cards/1/17282986912132/415x261.png`,
    link: `${BASE}/hy/cards/gift-cards/digital-gift-card`,
    category: ["gift-cards", "digital"], // 👈 Ավելացվել է digital կատեգորիա
    stats: [],
  },
  {
    id: "visa-infinite",
    title: "Visa Infinite",
    description: "Visa Infinite-ը Visa վճարային համակարգի ամենաբարձր դասի քարտն է։",
    image: `${BASE}/images-cache/cards/1/1772717001933/415x261.png`,
    link: `${BASE}/hy/cards/premium/visa-infinite`,
    category: "premium",
    stats: [
      { label: "", value: "1%", text: "Կանխիկացում բանկի կանխիկացման կետերում" },
      { label: "", value: "1.2%", text: "Կանխիկացում ԱրՔա անդամ բանկերի կանխիկացման կետերում" },
      { label: "min 2,500 ֏", value: "1.5%", text: "Կանխիկացում ԱրՔա անդամ չհանդիսացող բանկերի կանխիկացման կետերում" },
      { label: "", value: "100,000 ֏", text: "Տարեկան սպասարկում" },
    ],
  },
  {
    id: "visa-vision",
    title: "Visa Vision",
    description:
      "Կյանքին նայիր մանուշակագույն ակնոցով ու տես Visa Vision քարտի բազմաթիվ առավելությունները:",
    image: `${BASE}/images-cache/cards/1/1714986482757/415x261.png`,
    link: `${BASE}/hy/cards/visa/visa-vision-card`,
    category: "visa",
    stats: [],
  },
  {
    id: "mastercard-world-digital",
    title: "Mastercard World Digital",
    description:
      "Mastercard World Digital քարտն արդեն հասանելի է EvocaTOUCH հավելվածում։ Պատվիրիր թվային քարտը հիմա և այն հասանելի կլինի քո հավելվածում հաշված րոպեների ընթացքում։",
    image: `${BASE}/images-cache/cards/1/17639683196125/415x261.png`,
    link: `${BASE}/hy/cards/master/mastercard-world-digital`,
    category: ["master", "digital"], // 👈 Ավելացվել է digital կատեգորիա
    stats: [
      { label: "", value: "2%", text: "Կանխիկացում բանկի բանկոմատներից" },
      { label: "", value: "2.5%", text: "Կանխիկացում ԱրՔա համակարգի անդամ հանդիսացող ՀՀ բանկերի բանկոմատներից և POS տերմինալների միջոցով" },
      { label: "", value: "1000 ֏", text: "Տարեկան սպասարկում" },
    ],
  },
  {
    id: "unionpay-business-platinum",
    title: "UnionPay Business Platinum",
    description: "Այս պրեմիում դասի քարտը կդառնա Ձեր գործընկերը հաջողության ճանապարհին:",
    image: `${BASE}/images-cache/cards/1/17249401821904/415x261.png`,
    link: `${BASE}/hy/cards/premium/unionpay-platinum`,
    category: ["premium", "unionpay"], // 👈 Ավելացվել է unionpay կատեգորիա
    stats: [
      { label: "", value: "0.5%", text: "Կանխիկացում" },
      { label: "", value: "5 տարի", text: "Քարտի ժամկետ" },
      { label: "", value: "15000 ֏", text: "Տարեկան սպասարկման վճար" },
      { label: "", value: "Ամենուր", text: "Կիրառություն" },
    ],
  },
  {
    id: "myler-gift-card",
    title: "MyLer Gift Card",
    description: "Մեկ քարտ, անսահմանափակ արկածներ:",
    image: `${BASE}/images-cache/cards/1/17655348192361/415x261.png`,
    link: `${BASE}/hy/cards/arca/myler-gift-card`,
    category: "arca",
    stats: [],
  },
  {
    id: "unionpay-gold",
    title: "UnionPay Gold",
    description: "Ամբողջ աշխարհում քո արագ և հարմար վճարումների ուղեկիցը:",
    image: `${BASE}/images-cache/cards/1/17262129422977/415x261.png`,
    link: `${BASE}/hy/cards/premium/unionpay-gold`,
    category: ["premium", "unionpay"], // 👈 Ավելացվել է unionpay կատեգորիա
    stats: [
      { label: "", value: "0.5%", text: "Կանխիկացում" },
      { label: "", value: "5 տարի", text: "Քարտի ժամկետ" },
      { label: "", value: "15000 ֏", text: "Տարեկան սպասարկման վճար" },
      { label: "", value: "Ամենուր", text: "Կիրառություն" },
    ],
  },
  {
    id: "4u-gift-card",
    title: "4U.am Gift card",
    description: "Երբ ժամանակակիցն ու կրեատիվը հանդիպում են, ստեղծվում է իդեալական նվեր։",
    image: `${BASE}/images-cache/cards/1/17485032554482/415x261.png`,
    link: `${BASE}/hy/cards/arca/4u.am-gift-cards`,
    category: "arca",
    stats: [],
  },
  {
    id: "mastercard-gold",
    title: "Mastercard Gold",
    description: "Ընդգծիր կարգավիճակդ քո Mastercard Gold քարտով։",
    image: `${BASE}/images-cache/cards/1/17149865321136/415x261.png`,
    link: `${BASE}/hy/cards/master/master-gold-card`,
    category: "master",
    stats: [
      { label: "", value: "0%", text: "Կանխիկացում բանկի կանխիկացման կետերում մինչև 2 մլն ֏" },
      { label: "", value: "0.8%", text: "Կանխիկացում ԱրՔա անդամ բանկերի կանխիկացման կետերում" },
      { label: "min 1,500 ֏", value: "1%", text: "Կանխիկացում ԱրՔա անդամ չհանդիսացող բանկերի կանխիկացման կետերում" },
      { label: "", value: "15․000 ֏", text: "Տարեկան սպասարկում" },
    ],
  },
  {
    id: "mastercard-standard",
    title: "Mastercard Standard",
    description:
      "Աշխարհի ցանկացած կետում, որտեղ էլ լինես, քո ֆինանսական միջոցները 24/7 սկզբունքով հասանելի կլինեն։",
    image: `${BASE}/images-cache/cards/1/17149866652788/415x261.png`,
    link: `${BASE}/hy/cards/master/master-card-standard`,
    category: "master",
    stats: [
      { label: "", value: "0%", text: "Կանխիկացում բանկի կանխիկացման կետերում մինչև 1 մլն ֏" },
      { label: "", value: "0.8%", text: "Կանխիկացում ԱրՔա անդամ բանկերի կանխիկացման կետերում" },
      { label: "min 1,500 ֏", value: "1%", text: "Կանխիկացում ԱրՔա անդամ չհանդիսացող բանկերի կանխիկացման կետերում" },
      { label: "", value: "5000 ֏", text: "Քարտի տարեկան սպասարկում" },
    ],
  },
  {
    id: "visa-digital",
    title: "Visa Digital",
    description:
      "Պատվիրիր Evoca Digital քարտը հիմա EvocaTOUCH հավելվածով, և քարտը կակտիվանա րոպեների ընթացքում:",
    image: `${BASE}/images-cache/cards/1/17485025148319/415x261.png`,
    link: `${BASE}/hy/cards/visa/visa-digital-card`,
    category: ["visa", "digital"], // 👈 Ավելացվել է digital կատեգորիա
    stats: [
      { label: "", value: "2%", text: "Կանխիկացում բանկի բանկոմատներից" },
      { label: "Մինչև", value: "4%", text: "Քարտային հաշվի դրական մնացորդի նկատմամբ հաշվարկվող տարեկան տոկոսադրույք" },
      { label: "", value: "1000 ֏", text: "Տարեկան սպասարկում" },
      { label: "Մինչև", value: "0.5%", text: "Քեշբեք" },
    ],
  },
  {
    id: "visa-classic",
    title: "Visa Classic",
    description:
      "Կատարիր մինչև 20,000 ՀՀ դրամի անհպում գործարքներ Visa Classic քարտով՝ առանց PIN կոդի մուտքագրման:",
    image: `${BASE}/images-cache/cards/1/1714986642953/415x261.png`,
    link: `${BASE}/hy/cards/visa/visa-classic-card`,
    category: "visa",
    stats: [
      { label: "", value: "0.2%", text: "Կանխիկացում բանկի կանխիկացման կետերում" },
      { label: "", value: "0.8%", text: "Կանխիկացում ԱրՔա անդամ բանկերի կանխիկացման կետերում" },
      { label: "min 1,500 ֏", value: "1%", text: "Կանխիկացում ԱրՔա անդամ չհանդիսացող բանկերի կանխիկացման կետերում" },
      { label: "", value: "5,000 ֏", text: "Տարեկան սպասարկում" },
    ],
  },
  {
    id: "arca-classic",
    title: "Arca Classic",
    description: "Evocabank-ի հետ ցանկացած գնում և վճարում ապահով է և հուսալի։",
    image: `${BASE}/images-cache/cards/1/17404717644263/415x261.png`,
    link: `${BASE}/hy/cards/arca/arca-classic`,
    category: "arca",
    stats: [
      { label: "Արտարժույթ", value: "0.5%", text: "Քարտերով կանխիկի տրամադրում Բանկի ATM-ով" },
      { label: "Մինչև 300,000 ֏՝ անվճար", value: "0.2%", text: "Քարտերով կանխիկի տրամադրում Բանկի ATM-ով" },
      { label: "", value: "1%", text: "Քարտերով կանխիկի տրամադրում «ԱրՔա» համակարգի այլ բանկերի ATM-ով և POS-ով" },
      { label: "", value: "1500 ֏", text: "Տարեկան սպասարկում" },
    ],
  },
  {
    id: "arca-unionpay",
    title: "Arca-UnionPay",
    description:
      "Մեկ քարտ, բազմաթիվ հնարավորություններ. Arca՝ ամենօրյա գնումների և UnionPay՝ ճամփորդությունների և միջազգային գնումների համար։",
    image: `${BASE}/images-cache/cards/1/17881574661708/415x261.png`,
    link: `${BASE}/hy/cards/arca/arca-union-pay`,
    category: ["arca", "unionpay"],
    stats: [
      { label: "Սակագին", value: "2,500֏", text: "տարեկան (ամսական՝ 250֏)" },
      { label: "Cashback", value: "2%", text: "տեղական գործարքներից" },
      { label: "Մինչև", value: "1,000,000֏", text: "անվճար կանխիկացում Բանկի ATM-ով" },
      { label: "Ավելի քան", value: "189", text: "երկրում քարտով գործարքներ կատարելու հնարավորություն" },
    ],
  },
  {
    id: "visa-business",
    title: "Visa Business",
    description:
      "Գործուղման մեկնելիս Ձեր ներկայացուցչական ծախսերը կարող եք հոգալ Visa Business քարտով։",
    image: `${BASE}/images-cache/cards/1/17149865475676/415x261.png`,
    link: `${BASE}/hy/cards/visa/visa-business-card`,
    category: "visa",
    stats: [
      { label: "", value: "0.2%", text: "Կանխիկացում բանկի կանխիկացման կետերում" },
      { label: "", value: "0.8%", text: "Կանխիկացում ԱրՔա անդամ բանկերի կանխիկացման կետերում" },
      { label: "min 1,500 ֏", value: "1%", text: "Կանխիկացում ԱրՔա անդամ չհանդիսացող բանկերի կանխիկացման կետերում" },
      { label: "", value: "0.2%", text: "Բանկի տարածքում քարտային հաշվից կանխիկի տրամադրում" },
    ],
  },
  {
    id: "dalma-gift-card",
    title: "Dalma Gift Card",
    description: "Նվեր ընտրելն այլևս դժվար չէ:",
    image: `${BASE}/images-cache/cards/1/17404717113297/415x261.png`,
    link: `${BASE}/hy/cards/arca/dalma-gift-card`,
    category: "arca",
    stats: [],
  },
  {
    id: "visa-gold",
    title: "Visa Gold",
    description: "Նոր քարտերի թողարկումը դադարեցված է 25.11.2024 թվականից",
    image: `${BASE}/images-cache/cards/1/17149865646885/415x261.png`,
    link: `${BASE}/hy/cards/visa/visa-gold`,
    category: "visa",
    stats: [
      { label: "", value: "0.2%", text: "Կանխիկացում բանկի կանխիկացման կետերում" },
      { label: "", value: "0.8%", text: "Կանխիկացում ԱրՔա անդամ բանկերի կանխիկացման կետերում" },
      { label: "min 1,500 ֏", value: "1%", text: "Կանխիկացում ԱրՔա անդամ չհանդիսացող բանկերի կանխիկացման կետերում" },
      { label: "", value: "15,000 ֏", text: "Տարեկան սպասարկում" },
    ],
  },
];

const ITEMS_PER_PAGE = 20;

const Cards = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const filterCategories = [
    { id: "all", label: "Բոլորը" },
    { id: "premium", label: "Պրեմիում" },
    { id: "gift-cards", label: "Նվեր քարտեր" },
    { id: "digital", label: "Թվային քարտեր" },
    { id: "arca", label: "arca" },
    { id: "visa", label: "VISA" },
    { id: "master", label: "mastercard" },
    { id: "unionpay", label: "UnionPay" },
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "CardmenuItems"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(items);
      } catch (error) {
        console.error("Սխալ տվյալների բեռնման ժամանակ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  // Ֆիլտրում՝ աջակցելով թե՛ տեքստային, թե՛ զանգվածային (array) կատեգորիաներին
  const filteredCards =
    activeCategory === "all"
      ? cardsData
      : cardsData.filter((card) => {
          if (Array.isArray(card.category)) {
            return card.category.includes(activeCategory);
          }
          return card.category === activeCategory;
        });

  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = filteredCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-[1310px] w-full mx-auto px-4 py-8">
        <h1 className="text-[36px] font-bold text-black mb-8">Քարտեր</h1>

        {/* Ֆիլտրման կոճակներ */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {filterCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#6a00d8] text-white shadow-md"
                    : "bg-[#f3f3f5] text-gray-800 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Քարտերի ցուցադրում */}
        {loading ? (
          <div className="text-center py-20 text-[#6a00d8] font-medium">Բեռնվում է...</div>
        ) : (
          <div>
            {currentCards.length > 0 ? (
              currentCards.map((card) => <CardItem key={card.id} card={card} />)
            ) : (
              <div className="text-center py-20 text-gray-500">
                Այս կատեգորիայում քարտեր չեն գտնվել:
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12 mb-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full transition ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:text-[#6a00d8]"
                  }`}
                  aria-label="Previous Page"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-full text-base font-semibold flex items-center justify-center transition ${
                      currentPage === page
                        ? "bg-[#6a00d8] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full transition ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-[#6a00d8] hover:opacity-80"
                  }`}
                  aria-label="Next Page"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cards;