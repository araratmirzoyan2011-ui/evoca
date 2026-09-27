import React from 'react';
import LoanCard from "../Components/LoanCard";
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
const BusinessLoans = () => {
  
  // Բոլոր վարկերի տվյալների զանգվածը
  const loansData = [
    {
      id: 1,
      title: "Արագ բիզնես վարկ/վարկային գիծ",
      description: "Արագ ֆինանսավորում Ձեր բիզնեսի զարգացման համար միայն երաշխավորությամբ և ցածր տոկոսադրույքով:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/17721008940374/415x261.png", 
      stats: [
        { topText: "Մինչև", value: "60 ամիս", label: "Ժամկետ" },
        { topText: "Մինչև", value: "30 մլն ֏", label: "Սահմանաչափ կամ համարժեք արտարժույթ" },
        { value: "9.22%-17.89%", label: "Տարեկան տոկոսադրույք" }
      ]
    },
    {
      id: 2,
      title: "Տեքստիլ ոլորտում հումքի ներմուծմանն ուղղված վարկ",
      description: "Evocabank-ը տրամադրում է բիզնես վարկ՝ տեքստիլ հումքի ներմուծման համար: Շտապեք դիմել, զարգացնել Ձեր բիզնեսը և դառնալ ոլորտում մրցունակ:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/17749381045652/415x261.png",
      stats: [
        { topText: "Մինչև", value: "36 ամիս", label: "Ժամկետ" },
        { topText: "Մինչև", value: "500 մլն ֏", label: "Սահմանաչափ կամ համարժեք արտարժույթ" },
        { value: "8%", label: "Տոկոսադրույքի սուբսիդավորման չափ" }
      ]
    },
    {
      id: 3,
      title: "Բիզնես վարկերի վերաֆինանսավորում",
      description: "Տեղափոխեք Ձեր բիզնես վարկը Evocabank, ստացեք վարկի վերաֆինանսավորում և լրացուցիչ ֆինանսավորում ավելի հարմար պայմաններով:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/17822121684763/415x261.png",
      stats: [
        { topText: "Վերաֆինանսավորում", value: "36-120 ամիս", label: "Ժամկետ" },
        { topText: "Գումար", value: "15մլն-500մլն", label: "ՀՀ դրամ կամ համարժեք արտարժույթ" },
        { topText: "Սկսած", value: "12%", label: "ՀՀ դրամ` Տարեկան անվանական տոկոսադրույք" },
        { topText: "Սկսած", value: "9%", label: "ԱՄՆ դոլար` Տարեկան անվանական տոկոսադրույք" }
      ]
    },
    {
      id: 4,
      title: "Պարտատոմսերով ապահովված վարկ",
      description: "Ստացեք վարկ՝ Բանկի պարտատոմսերի գրավով և շարունակեք զարգացնել Ձեր բիզնեսը:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/17848707149538/415x261.png",
      stats: [
        { value: "Մանրամասն", label: "Պայմաններ" }
      ]
    },
    {
      id: 5,
      title: "Խոշոր և ՓՄՁ բիզնես վարկ",
      description: "Զարգացրե'ք Ձեր բիզնեսը Evocabank-ի հետ փոխշահավետ պայմաններով:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/16148637167789/415x261.jpg",
      stats: [
        { topText: "Մինչև", value: "4 մլրդ ֏", label: "կամ համարժեք արտարժույթ" },
        { topText: "Մինչև", value: "180", label: "ամիս" },
        { topText: "սկսած", value: "8.2%-ից", label: "տոկոսադրույք" }
      ]
    },
    {
      id: 6,
      title: "Evoca GO",
      description: "Օգտվեք Եվրոպական Ներդրումային Բանկի (ԵՆԲ) կողմից ֆինանսավորվող ծրագրի շրջանակներում վարկավորման փոխշահավետ հնարավորությունից:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/1614870243661/415x261.jpg",
      stats: [
        { topText: "Մինչև", value: "500 մլն. ֏", label: "Սահմանաչափ" },
        { topText: "Մինչև", value: "90 ամիս", label: "Մարման ժամկետ" },
        { value: "10.5 % ֏", label: "Տոկոսադրույք" },
        { topText: "Մինչև", value: "30 ամիս", label: "Մայր գումարի արտոնյալ ժամկետ (ոչ պարտադիր)" }
      ]
    },
    {
      id: 7,
      title: "Վարկեր ԳՀՀ - Էներգաարդյունավետություն ՓՄՁ-ների համար ծրագիր",
      description: "Եթե Դուք ցանկանում եք ձեռք բերել ԵԱ սարքավորումներ և մեքենաներ կամ իրականացնել այլ էներգաարդյունավետ ներդրումներ, այս վարկատեսակը Ձեզ համար է:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/16148681592638/415x261.jpg",
      stats: [
        { topText: "Մինչև", value: "500 մլն. ֏", label: "Սահմանաչափ" },
        { topText: "Մինչև", value: "5 տարի", label: "Մարման ժամկետ" },
        { topText: "սկսած", value: "9%-ից", label: "Տոկոսադրույք" }
      ]
    },
    {
      id: 8,
      title: "Ավանդի գրավով ապահովված վարկ / վարկային սահմանաչափ",
      description: "Մի' օգտագործեք կուտակված խնայողությունները: Ձեր ֆինանսական խնդիրները կարգավորելու համար մենք ավելի շահավետ տարբերակ ունենք:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/16142658362638/415x261.jpg",
      stats: [
        { topText: "ավանդի գումարի մինչև", value: "95%", label: "Սահմանաչափ" },
        { topText: "պարտատոմսի գումարի մինչև", value: "80%", label: "Սահմանաչափ" }
      ]
    },
    {
      id: 9,
      title: "KFW ծրագիր՝ Բիզնեսի կանաչ ֆինանսավորում",
      description: "Եթե ցանկանում եք իրականացնել էներգաարդյունավետ և էներգախնայող ներդրումներ բիզնեսի ծախսերը կրճատելու և արդյունավետությունը բարձրացնելու նպատակով, այս ֆինանսավորումը Ձեզ համար է:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/16148706367372/415x261.jpg",
      stats: [
        { topText: "առանց գրավի մինչև", value: "10 մլն. ֏", label: "Սահմանաչափ (ներառյալ)" },
        { value: "9.5%", label: "Տարեկան անվանական տոկոսադրույքը ՎԷԷԿ դեպքում (փաստացի տոկոսադրույքը մինչև 10%)" },
        { value: "10.25%", label: "Տարեկան անվանական տոկոսադրույքը ԷԱՆ դեպքում (փաստացի տոկոսադրույքը մինչև 10.75%ය)" },
        { topText: "Մինչև", value: "120 ամիս", label: "Մարման ժամկետ ՎԷԷԿ դեպքում" }
      ]
    },
    {
      id: 10,
      title: "Պարզ բիզնես վարկ",
      description: "Ստացեք Պարզ բիզնես վարկ՝ անշարժ գույքի ապահովմամբ և ցածր տարեկան տոկոսադրույքով: Վարկի տրամադրման վերաբերյալ որոշումը կայացվում է ընդամենը 2-4 աշխատանքային օրվա ընթացքում:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/1614869229831/415x261.jpg",
      stats: [
        { topText: "Մինչև", value: "50 մլն. ֏", label: "Սահմանաչափ (կամ համարժեք արտարժույթ)" },
        { topText: "Մինչև", value: "60 ամիս", label: "Մարման ժամկետ" },
        { topText: "սկսած", value: "7.5%-ից", label: "Տոկոսադրույք" }
      ]
    },
    {
      id: 11,
      title: "Հաշվի վարկավորում",
      description: "Հանդիսա՞նում եք Evocabank-ի հաշվետեր հաճախորդ առնվազն 1 տարի, ուրեմն Evocabank-ը կօգնի հոգալ Ձեր բիզնեսի ընթացիկ ծախսերը:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/16148678149192/415x261.jpg",
      stats: [
        { topText: "առավելագույնը", value: "500 մլն ֏", label: "Կամ համարժեք արտարժույթ" },
        { topText: "առավելագույնը", value: "12 ամիս", label: "Մարման ժամկետ" },
        { topText: "սկսած", value: "7%-ից", label: "Տոկոսադրույք" }
      ]
    },
    {
      id: 12,
      title: "Վարկային գիծ",
      description: "Եթե Դուք ունեք կազմակերպություն կամ անհատ ձեռնարկատեր եք և ցանկանում եք մշտապես ունենալ հասանելի վարկային միջոցներ, ապա կարող եք օգտվել Evocabank-ի վերականգնվող և չվերականգնվող վարկային գծերից:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/16148665659945/415x261.jpg",
      stats: [
        { topText: "Մինչև", value: "1.5 մլրդ. ֏", label: "Սահմանաչափ" },
        { topText: "Մինչև", value: "5 տարի", label: "Մարման ժամկետ" },
        { topText: "սկսած", value: "6%-ից", label: "Տոկոսադրույք" }
      ]
    },
    {
      id: 13,
      title: "Արտադրողականության խթանման ծրագրի ներքո վարկ (գործում է մինչև 31.12.2026թ.)",
      description: "Մատչելի ֆինանսավորում Ձեր բիզնեսը արդիականացնել և արտադրողականությունը խթանելու նպատակով:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/16148696068365/415x261.jpg",
      stats: [
        { topText: "Մինչև", value: "1 մլրդ ֏", label: "Կամ համարժեք արտարժույթ սահմանաչափ" },
        { topText: "Մինչև", value: "120 ամիս", label: "Մարման ժամկետ" },
        { topText: "սկսած", value: "6%", label: "Տոկոսադրույք" },
        { topText: "Մինչև", value: "6%", label: "Սուբսիդավորում" }
      ]
    },
    {
      id: 14,
      title: "KFW բանկի կողմից ՄՓՄՁ-ների ֆինանսավորում",
      description: "Կատարե'ք Ձեր կապիտալ ներդրումները և իրականացրե'ք բիզնես գործունեության նպատակները Evocabank-ի հետ:",
      imageSrc: "https://www.evoca.am/images-cache/loans/1/16394873850552/415x261.png",
      stats: [
        { topText: "Մինչև", value: "160 մլն. ֏", label: "Սահմանաչափ" },
        { topText: "Մինչև", value: "60 ամիս", label: "Մարման ժամկետ" },
        { topText: "սկսած", value: "9,5%-ից", label: "Տոկոսադրույք" }
      ]
    }
  ];

  const handleDetailsClick = (title) => {
    console.log(`Սեղմվել է "${title}" վարկի մանրամասների կոճակը`);
  };

  return (
    <>
    <Header />
    
      <div className="container mx-auto px-4 ml-[-18%] mt-[80px]">
        <h1 className="text-3xl font-bold text-center mb-8">Բիզնես Վարկեր</h1>
      </div>
      <div className="container mx-auto px-4">
        
        
        {/* Պտտվում ենք զանգվածի վրայով և ռենդեր անում քարտերը */}
        {loansData.map((loan) => (
          <LoanCard 
            key={loan.id}
            title={loan.title}
            description={loan.description}
            imageSrc={loan.imageSrc}
            stats={loan.stats}
            onDetailsClick={() => handleDetailsClick(loan.title)}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BusinessLoans;