import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { EvocaReviewCard } from '../Components/EvocaReviewCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { EvocaNewsCard } from '../Components/EVocaCard1.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { Link } from 'react-router-dom';
const EvocaSalary = () => {
  const [loading, setLoading] = useState(false);

  const cardData = {
    title: "EVOCA ԱՇԽԱՏԱՎԱՐՁԱՅԻՆ ՆԱԽԱԳԻԾ",
    description: "Քո աշխատավարձը կարող է քեզ տալ շատ ավելին։ Պարզապես պետք է ընտրել Evocabank-ը։",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/17738355890361/780x585.png",
    altText: ""
  };

  // 1. Առավելությունների (Benefits) տվյալների զանգված
  const benefitsData = [
    {
      id: 1,
      title: "Բեր աշխատավարձդ Evoca, տար անվճար Mastercard Gold",
      items: [
        "Պրեմիում դասի քարտ",
        "Հասանելի ամբողջ աշխարհում",
        "Գումարի անվտանգության բարձր մակարդակ",
        <>Դրական մնացորդի նկատմամբ <strong className="text-purple-700">2% տարեկան տոկոսադրույք</strong></>
      ]
    },
    {
      id: 2,
      title: "Բեր աշխատավարձդ Evoca, տար 50% զեղչով Evoca Travel Card",
      items: [
        <>Մինչև <strong className="text-purple-700">1.5% cashback</strong> արտասահմանում իրականացրած վճարումների համար</>,
        <>Անվճար <strong className="text-purple-700">6 մուտք</strong> Lounge Key սրահներ քեզ և հյուրերիդ համար</>,
        <>Անվճար <strong className="text-purple-700">6 անգամ</strong> Fast track-ից օգտվելու հնարավորություն քեզ և հյուրերիդ համար</>,
        "Այլ ճամփորդական առավելություններ"
      ]
    },
    {
      id: 3,
      title: "Բեր աշխատավարձդ Evoca, տար մի շարք բենեֆիթներ",
      description: <>Դառնալով Evoca քարտապան՝ կունենաս հնարավորություն օգտվելու <span className="text-purple-700 font-semibold cursor-pointer hover:underline">Evoca Benefits</span> նախագծից և մեր 100-ից ավել գործընկերների մոտ կստանաս՝</>,
      items: [
        <>Մինչև <strong className="text-purple-700">25% զեղչ</strong></>,
        <>Մինչև <strong className="text-purple-700">25% cashback</strong></>,
        "Նվեր քարտեր"
      ]
    }
  ];

  // 2. Վարկատեսակների (Loans) տվյալների զանգված
  const loanTypesData = [
    {
      id: 1,
      title: "Օվերդրաֆտ կամ Մարման գրաֆիկով վարկ",
      items: [
        <>Մինչև աշխատավարձի <strong className="text-purple-700">15-ապատիկի չափով</strong></>,
        <>Մինչև <strong className="text-purple-700">10 մլն դրամ</strong> գումար</>,
        <>Մինչև <strong className="text-purple-700">60 ամիս</strong> մարման ժամկետ</>
      ]
    },
    {
      id: 2,
      title: "Ավտովարկ",
      items: [
        <><strong className="text-purple-700">0.5%-ով ցածր</strong> տոկոսադրույք</>,
        <>Մինչև <strong className="text-purple-700">50 մլն դրամ</strong> գումար</>,
        <>Մինչև <strong className="text-purple-700">84 ամիս</strong> մարման ժամկետ</>,
        "Նախընտրած մեքենայի ձեռքբերում՝ ինչպես առաջնային, այնպես էլ երկրորդային շուկայից"
      ]
    },
    {
      id: 3,
      title: "Անշարժ գույքի գրավով սպառողական վարկ",
      items: [
        <><strong className="text-purple-700">0.5%-ով ցածր</strong> տոկոսադրույք</>,
        <>Մինչև <strong className="text-purple-700">100 մլն դրամ</strong> գումար</>,
        <>Մինչև <strong className="text-purple-700">120 ամիս</strong> մարման ժամկետ</>
      ]
    }
  ];

  // 3. Ճշգրիտ salaryitems զանգվածը՝ ըստ ուղարկված նկարի
  const [salaryitems, setSalaryitems] = useState([
    {
      id: 1,
      category: 'Կենսակերպ',
      categoryColor: 'bg-lime-500',
      title: 'Evocabank-ը` FinComm Armenia 2026-ի գլխավոր գործընկեր',
      date: '08.10.2026',
      image: 'https://www.evoca.am/images-cache/news/1/17915391966329/439x320.png',
    },
    {
      id: 2,
      category: 'Կենսակերպ',
      categoryColor: 'bg-lime-500',
      title: 'Evocabank-ը` TRF 2026-ի ֆինանսական գործընկեր',
      date: '06.10.2026',
      image: 'https://www.evoca.am/images-cache/news/1/17912685600228/439x320.png',
    },
    {
      id: 3,
      category: 'Կենսակերպ',
      categoryColor: 'bg-lime-500',
      title: 'Evocabank-ը` Armenia-UK Business Forum-ի գլխավոր գործընկեր',
      date: '06.10.2026',
      image: 'https://www.evoca.am/images-cache/news/1/17913736819959/439x320.jpg',
    },
  ]);

  useEffect(() => {
    const fetchSalaryNews = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "salaryNewsCollection"));
        const newsDocs = querySnapshot.docs.map(doc => doc.data());
        if (newsDocs.length > 0 && newsDocs[0].items) {
          setSalaryitems(newsDocs[0].items);
        }
      } catch (error) {
        console.error("Firestore-ից նորությունների բեռնման սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryNews();
  }, []);

  return (
    <>
      <Header />
      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {cardData && (
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
            />
          )}
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          {/* Ձախ կողմի սոցիալական կոճակներ */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          {/* Աջ կողմի հիմնական բովանդակությունը */}
          <div className="flex-1 max-w-4xl text-gray-800 space-y-8">
            
            {/* Ներածական տեքստ */}
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              Evoca աշխատավարձային նախագիծը մեկնարկել է նրանց համար, ովքեր, իրենց աշխատավարձը քարտին ստանալուց բացի, ցանկանում են նաև ստանալ <span className="text-purple-700 font-semibold cursor-pointer hover:underline">նոր հնարավորություններ ու առավելություններ</span>։
            </p>

            {/* Առավելությունների ցուցադրումը map-ով */}
            {benefitsData.map((benefit) => (
              <div key={benefit.id} className="space-y-3 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-700 cursor-pointer hover:underline">
                  {benefit.title}
                </h2>
                {benefit.description && (
                  <p className="text-gray-700">{benefit.description}</p>
                )}
                <ul className="space-y-2 text-gray-700 pl-2">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-purple-600 mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Վարկերի բաժին */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-700">
                Բեր աշխատավարձդ Evoca, տար ավելի ցածր տոկոսադրույքով վարկեր
              </h2>

              {/* Վարկատեսակների ցուցադրումը map-ով */}
              {loanTypesData.map((loan) => (
                <div key={loan.id} className="space-y-3 pt-2">
                  <h3 className="text-lg font-bold text-purple-700 cursor-pointer hover:underline">
                    {loan.title}
                  </h3>
                  <ul className="space-y-2 text-gray-700 pl-2">
                    {loan.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="text-purple-600 mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Վերջին նորություններ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                
                {/* Վերնագիրը դարձրել ենք սեղմվող (Link) դեպի /news */}
                <Link to="/news" className="hover:opacity-80 transition-opacity">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight cursor-pointer">
                    Վերջին նորությունները
                  </h2>
                </Link>
                
                {/* Կոճակը փոխարինել ենք Link-ով դեպի /news */}
                <Link 
                  to="/news" 
                  className="flex items-center space-x-2 bg-purple-100/70 hover:bg-purple-200/80 text-purple-700 px-4 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 group cursor-pointer"
                >
                  <span>Բոլոր նորությունները</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-10 text-gray-500 font-medium">Բեռնվում է տվյալները...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {salaryitems.map((item) => (
                    <EvocaNewsCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default EvocaSalary;