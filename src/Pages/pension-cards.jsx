import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import InfoCard from '../Components/AccountsCard.jsx';

const PensionCard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [m] = await Promise.all([
          // fetchCollection("Cardmenu"), 
        ]);
        
        setMenuItems(m || []);
      } catch (err) {
        console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const PensionCardReport = [
    { title: "Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025թ." },
    { title: 'Դեբետային և կրեդիտային քարտեր (Տեղեկատվական ամփոփագիր) 17.03.2026' }
  ];

  const cardData = {
    title: "Սոցիալական ապահովության վճարային քարտեր",
    description: "Կենսաթոշակառուներին առաջարկում ենք ARCA կենսաթոշակային վճարային քարտեր՝ միայն կենսաթոշակների գումարների սպասարկման նպատակով: Քարտերը տրամադրում ենք Սոցիալական ապահովության պետական ծառայության հետ 2011թ. հունվարի 21-ին կնքած պայմանագրի համաձայն:",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/17218011250749/780x585.jpg",
    altText: "Հաշիվների բացում և սպասարկում"
  };

  // Նկարներից ավելացված նոր բովանդակային զանգվածներ
  const additionalParagraphs = [
    "Քարտերը տրամադրում և սպասարկում ենք մեր կողմից հաստատված Կենսաթոշակային քարտերի տրամադրման և սպասարկման սակագների համաձայն:",
    "Քարտերի ստացման դիմում կարող եք ներկայացնել մեր Գլխամասային գրասենյակ կամ ցանկացած մասնաճյուղ:",
    "Վճարային քարտերի տրամադրմանը, սպասարկմանը և օգտագործմանը վերաբերող մանրամասն տեղեկատվությանը կարող եք ծանոթանալ այստեղ:",
    "Ծանոթագրություն - Կենսաթոշակառու՝ անձ, ում կենսաթոշակը վճարվում է անկանխիկ եղանակով, Բանկում բացված բանկային հաշվին փոխանցելու միջոցով: Կենսաթոշակ՝ կենսաթոշակի, պատվովճարի, դրամական օգնության և սոցիալական ապահովության այլ ծրագրերով նախատեսված դրամական վճարների գումարը:"
  ];

  const cardOperations = {
    title: "Վճարային քարտերով կատարվող գործառնություններ",
    subtitle: "Վճարային քարտերով կարող եք՝",
    items: [
      "Կանխիկացնել Ձեր քարտային հաշվին առկա միջոցները բանկոմատներից (ATM) և կանխիկացման կետերից (POS տերմինալներից):",
      "Կատարել անկանխիկ վճարումներ առևտրի և սպասարկման կետերում (ապրանքների կամ ծառայությունների դիմաց՝ խանութներում, ռсторанներում, հյուրանոցներում և սպասարկման այլ կետերում):",
      "Կատարել կոմունալ վճարումներ՝ բանկոմատների միջոցով կամ օնլայն (www.arca.am-ում գրանցվելով վիրտուալ քարտ):",
      "Օնլայն գործարքներ կատարել (վճարումներ, գնումներ):",
      "Քարտից քարտ գումար փոխանցել՝ բանկոմատների միջոցով կամ օնլայն:",
      "Մեր online բանկինգ ծառայությունից օգտվելու պարագայում դուք հնարավորություն կունենաք առանց մեզ այցելելու կատարել դրամական միջոցների համալրում (ընթացիկ հաշվից՝ քարտային հաշիվ) և անմիջապես տնօրինել այդ գումարները ձեր քարտի միջոցով:"
    ],
    note: "Նշում. Քարտային հաշվով կատարվող դրամական շարժը վերահսկելու նպատակով ակտիվացնում ենք SMS-տեղեկացում ծառայությունը (դուք կարող եք դիմում գրել և հրաժարվել SMS տեղեկացումների ծառայությունից): Օնլայն վճարումներ իրականացնելիս կարող եք օգտվել 3D Secure ծառայությունից:"
  };

  const usefulInfo = {
    title: "Օգտակար տեղեկատվություն",
    subtitle: "Քարտային վճարումներ կատարելիս անհրաժեշտ է հիշել՝",
    items: [
      "Քարտերով կարող եք վճարումներ կատարել այն առևտրի ու սպասարկման կետերում, որտեղ փակցված է տվյալ քարտային համակարգի լոգոտիպը:",
      "Քարտով վճարում կատարելիս՝ մինչև անդորրագիրը ստորագրելը, հավաստիացեք, որ անդորրագրում նշված գումարը համապատասխանում է ձեր գործարքի գումարին:",
      "Քարտով վճարելիս միշտ պահեք քարտը ձեր տեսադաշտում:",
      "Եթե հրաժարվում եք գնումից, ապա պահանջեք չեղյալ համարել (VOID) ձեր վճարումը և պահեք համապատասխան անդորրագիրը մինչև հերթական քաղվածքի ստացումը՝ համոզվելու, որ հաշվից գանձում չի կատարվել:"
    ]
  };

  const warnings = {
    title: "Զգուշացում",
    items: [
      "Ապահովեք ձեր PIN ծածկագրի գաղտնիությունը (այն պետք է պահպանել գաղտնի և հասանելի չդարձնել այլ անձանց): PIN ծածկագրով կատարված բոլոր գործառնությունների պատասխանատվությունը կրում եք դուք: Մենք պատասխանատվություն չենք կրում ձեր PIN ծածկագիրը երրորդ անձանց հասանելի դառնալու հետևանքով վճարային քարտի ոչ օրինական և ձեր կողմից չարտոնված օգտագործման համար:",
      "Քարտի կորստի կամ գողության դեպքում անհապաղ զանգահարեք մեզ (+374 10) 605555 հեռախոսահամարով կամ «Արմենիան Քարդ» վճարահաշվարկային համակարգի (+374 10) 592222 հեռախոսահամարով՝ հայտնելով քարտի ստացման դիմումի մեջ ձեր կողմից նշված գաղտնաբառը: Զանգից անմիջապես հետո քարտի գործողությունը կդադարեցվի:",
      "Քարտի կորստի կամ գողության մասին ՄԵԶ տեղեկացնելը հետաձգելը կարող է հանգեցնել ձեր քարտով այլ անձանց կողմից գործարքների կատարմանը:",
      "Մենք պատասխանատվություն չենք կրում ձեզ հասցրած այն վնասի համար, որը կատարվել է քարտը կորցնելու և մեզ հայտնելու միջև ընկած ժամանակահատվածում:",
      "Դուք պատասխանատվություն եք կրում քարտով կատարված բոլոր գործառնությունների համար մինչև այն պահը, երբ տեղեկացնում եք մեզ կորստի կամ գողության պատճառով քարտի գործողությունը դադարեցնելու անհրաժեշտության մասին:"
    ]
  };

  return (
    <>
      <Header />
      <Navbar items={menuItems} />
      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <InfoCard
            title={cardData.title}
            description={cardData.description}
            imageUrl={cardData.imageUrl}
            altText={cardData.altText}
          />
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        {!loading && !error && (
          <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
            <div className="hidden md:block shrink-0">
              <div className="sticky top-24">
                <SocialIcons />
              </div>
            </div>
            
            <div className="flex-1 max-w-4xl space-y-8">
              
              {/* Հավելյալ պարբերություններ */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {additionalParagraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>

              {/* Վճարային քարտերով կատարվող գործառնություններ */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {cardOperations.title}
                </h2>
                <h3 className="text-purple-700 font-semibold mb-4">
                  {cardOperations.subtitle}
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {cardOperations.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-gray-700 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  {cardOperations.note}
                </p>
              </div>

              {/* Օգտակար տեղեկատվություն */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {usefulInfo.title}
                </h2>
                <h3 className="text-purple-700 font-semibold mb-4">
                  {usefulInfo.subtitle}
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {usefulInfo.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Զգուշացում */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {warnings.title}
                </h2>
                <ul className="list-disc pl-5 space-y-3 text-gray-700">
                  {warnings.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Փաստաթղթեր */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Փաստաթղթեր
                </h2>
                <div className="space-y-5">
                  {PensionCardReport.map((r, index) => (
                    <DocumentCard key={r.docId || index} title={r.title} url={r.url} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </section>
      
      <OnlineBanking />
      <Footer />
    </>
  );
};

export default PensionCard;