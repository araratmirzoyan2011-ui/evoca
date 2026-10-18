import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import { slidecard1 } from '../Components/slidecard1.jsx';
import { BiometricFace } from '../Components/BiometricFace.jsx';
import { EvocaCard } from '../Components/Card1.jsx';
import { CardSlider } from '../Components/CardSlider.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { HeroBackground } from '../Components/HeroBackground.jsx';
import { Calculators } from '../Components/Calculators.jsx';
import { db } from "../firebase.js";
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PartnersSection from '../Components/PartnerSection.jsx';
import { CurrencySection } from '../Components/CurrencySection.jsx';
import { EvocaNewsCard } from '../Components/EVocaCard1.jsx';
import { EvocaReviewCard } from '../Components/EvocaReviewCard.jsx';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer.jsx';
function Main() {
 const [slidesData, setSlidesData] = useState([]);
const [bestOffersData, setBestOffersData] = useState([]);
const [cardsSliderData, setCardsSliderData] = useState([]);
const [reviewsData, setReviewsData] = useState([]);
const [newsItems, setNewsItems] = useState([]);
const [arrimg, setArrimg] = useState([]);
const [reviewIndex, setReviewIndex] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const reviewsSnapshot = await getDocs(collection(db, "reviewsCollection"));
const reviewsDocsData = reviewsSnapshot.docs.map((doc) => doc.data());
if (reviewsDocsData.length > 0 && reviewsDocsData[0].reviews) {
  setReviewsData(reviewsDocsData[0].reviews);
}

const newsSnapshot = await getDocs(collection(db, "newsCollection"));
const newsDocsData = newsSnapshot.docs.map((doc) => doc.data());
if (newsDocsData.length > 0 && newsDocsData[0].news) {
  setNewsItems(newsDocsData[0].news);
}

const partnersSnapshot = await getDocs(collection(db, "partnersCollection"));
const partnersDocsData = partnersSnapshot.docs.map((doc) => doc.data());
if (partnersDocsData.length > 0 && partnersDocsData[0].partners) {
  setArrimg(partnersDocsData[0].partners);
}
      try {
        const slidesSnapshot = await getDocs(collection(db, "slidersCollection"));
        const slidesDocsData = slidesSnapshot.docs.map((doc) => doc.data());
        if (slidesDocsData.length > 0 && slidesDocsData[0].slides) {
          setSlidesData(slidesDocsData[0].slides);
        }

        const offersSnapshot = await getDocs(collection(db, "bestOffersCollection"));
        const offersDocsData = offersSnapshot.docs.map((doc) => doc.data());
        if (offersDocsData.length > 0 && offersDocsData[0].offers) {
          setBestOffersData(offersDocsData[0].offers);
        }

        const cardsSnapshot = await getDocs(collection(db, "cardsSliderCollection"));
        const cardsDocsData = cardsSnapshot.docs.map((doc) => doc.data());
        if (cardsDocsData.length > 0 && cardsDocsData[0].cards) {
          setCardsSliderData(cardsDocsData[0].cards);
        }
      } catch (error) {
        console.error("Տվյալները Firestore-ից բեռնելիս սխալ տեղի ունեցավ:", error);
      }
    };

    fetchData();
  }, []);
  const handleSeedFirestore = async () => {
  try {
    const plainReviews = reviewsData.map(({ id, author, title }, index) => {
      const plainQuoteTexts = [
        'Դեպի նոր իրականություն. ահա թե ուր ենք մենք շարժվում՝ ամեն մի նախագիծ Evocabank-ի հետ հաջողությամբ ավարտելիս: Ավելի քան 5 տարի համագործակցելով՝ կարելի է ասել, որ միասին անցել ենք մի մեծ ճանապարհ՝ լի...',
        'Բանկ, որ իր ռեբրենդինգի շքեղ միջոցառումով ու աշխատանքային ձևաչափով բանկային ոլորտում ամրապնդեց որակ և ճաշակ թելադրեց։ Evocabank-ն առաջին իսկ վայրկյանից ստիպեց նորովի և ժամանակակից հայացքով...',
        'Լավագույն նորարարական և թվային բանկ՝ լավագույն ծառայություններով և անձնակազմով:',
        'Գերազանց սպասարկում, ընտիր ու հավես անձնակազմ Ազատության մասնաճյուղում: Վարկային բաժնից շատ շնորհակալ եմ, վարկս ձևակերպվեց առանց ավելորդ քաշքշուկների՝ հեշտ, արագ, որակով: Սպասարկման',
        'Հայաստանի իրականության մեջ բացառիկ հրաչք բանկ: Միայն այս հնարավորությունը ընձեռելով երիտասարդ ընտանիքներին՝ նման ցածր տոկոսով բնակարան ձեռք բերել, արժանի է մեծ հարգանքի: Շնորհակալ ենք, որ Դուք կաք:',
      ];
      return { id, author, title, quote: plainQuoteTexts[index] };
    });

    await setDoc(doc(db, "reviewsCollection", "main"), { reviews: plainReviews });
    await setDoc(doc(db, "newsCollection", "main"), { news: newsItems });
    await setDoc(doc(db, "partnersCollection", "main"), { partners: arrimg });

    alert("Հաջողությամբ ստեղծվեցին collection-ները Firebase-ում ✅");
  } catch (error) {
    console.error("Seed error:", error);
    alert("Սխալ տեղի ունեցավ, տես console-ը");
  }
};
  return (
    <>
      <Header />
      <div className="w-full relative">
        <Swiper
  key={slidesData.length}
  modules={[Pagination, Navigation, Autoplay]}
  spaceBetween={0}
  slidesPerView={1}
  loop={false}   // ժամանակավոր անջատում ենք
  autoplay={{ delay: 4000, disableOnInteraction: false }}
  pagination={{ el: '.custom-pagination', clickable: true }}
  navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
>
          {slidesData.map((item) => (
            <SwiperSlide key={item.id}>
              {slidecard1(item.bgcol, item.h1, item.p, item.butp, item.butc, item.img)}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-4 sm:bottom-6 !left-1/2 !-translate-x-1/2 !w-auto flex items-center gap-4 sm:gap-8 z-20 pointer-events-auto">
          <button className="custom-prev text-white hover:opacity-70 transition-opacity cursor-pointer">
            <svg width="20" height="16" viewBox="0 0 26 20" fill="none" className="sm:w-[26px] sm:h-[20px]">
              <path d="M25 10H1M1 10L10 1M1 10L10 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="custom-pagination !static !w-auto flex items-center gap-2 sm:gap-3"></div>
          <button className="custom-next text-white hover:opacity-70 transition-opacity cursor-pointer">
            <svg width="20" height="16" viewBox="0 0 26 20" fill="none" className="sm:w-[26px] sm:h-[20px]">
              <path d="M1 10H25M25 10L16 1M25 10L16 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-16 py-10 sm:py-16 gap-6 sm:gap-10">
        <BiometricFace />

        <div className="max-w-lg space-y-4 sm:space-y-6 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight">
            Դարձիր Evocabank-ի հաճախորդ բիոմետրիկ նույնականացմամբ
          </h2>
          <p className="text-sm sm:text-base md:text-lg opacity-80">
            Սկանավորիր QR կոդը, ներբեռնիր EvocaTOUCH հարմարավետ հավելվածը, ստեղծիր քո հաշիվը և ստացիր քարտ
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <img src="https://www.evoca.am/img/biometric-section-QR-Code.png" alt="QR code" className="w-[130px] h-[130px] sm:w-[180px] sm:h-[180px]" />
            <button className="w-full sm:w-auto bg-[#6600cc] text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base rounded-full hover:bg-[#5500aa] transition-all cursor-pointer">
              Իմանալ ավելին
            </button>
          </div>
        </div>
      </div>

      <HeroBackground>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-left">
          <img src="/statue.png" alt="" className="w-[140px] sm:w-[280px] md:w-[380px]" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold">
            Լավագույնը Evocabank-ից
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {bestOffersData.map((card, index) => (
              <EvocaCard key={index} {...card} />
            ))}
          </div>
        </div>
      </HeroBackground>

      <CardSlider cards={cardsSliderData} />
      <Calculators />
      <OnlineBanking />
      <PartnersSection partners={arrimg} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Վերջին նորությունները
          </h2>
          
          <button className="flex items-center space-x-2 bg-purple-100/70 hover:bg-purple-200/80 text-purple-700 px-4 py-2.5 rounded-full font-semibold text-sm transition-colors duration-200 group cursor-pointer">
            <Link></Link>
            <Link to="/news" >Բոլոր նորությունները </Link>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <EvocaNewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <CurrencySection />
      <div className="bg-[#fcfbfe] py-16 px-4 w-full overflow-hidden">
        {reviewsData.length > 0 && (
  <div className="w-full min-h-[220px] flex items-center justify-center">
    <EvocaReviewCard 
      quote={reviewsData[reviewIndex].quote}
      author={reviewsData[reviewIndex].author}
      title={reviewsData[reviewIndex].title}
    />
  </div>
)}

        {/* Կետային նավարկություն (Dots) */}
        <div className="flex justify-center items-center space-x-3 mt-8">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setReviewIndex(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                reviewIndex === index
                  ? 'w-6 h-2.5 bg-purple-600'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <Footer />

    </>
  );
}

export default Main;