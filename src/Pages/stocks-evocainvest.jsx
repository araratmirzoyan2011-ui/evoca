import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import VideoAccordion from '../Components/video-accordion.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
const cardData = {
  title: "Կատարիր ներդրումեր և ստացիր եկամուտ EvocaINVEST հավելվածով",
  description: "EvocaINVEST հավելվածի միջոցով կարող ես կատարել ներդրումներ մի շարք միջազգային ֆինանսական շուկաներում:",
  imageUrl: "https://www.evoca.am/images-cache/menu/1/17812682689927/780x585.png",
  altText: "",
};
const usefulMaterials = {
  heading: "ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ",
  accordionTitle: "EvocaINVEST օգտակար նյութեր",
  videos: [
    { id: "5kUF-3KueZ8" },
    { id: "wax5BjEOAGQ" },
    { id: "oxxOZXf2kPA" },
    { id: "XCz2N5eicHs" },
    { id: "8_C9YpvlZAE" },
    { id: "3mPDelJ-KcM" },
    { id: "OIfnnN40_DA" },
  ],
};
const EvocaInvestAccordionsData = [
  {
    docId: "what-is-stock",
    title: "Ի՞նչ է բաժնետոմսը։",
    blocks: [
      "Բաժնետոմսը ընկերության սեփականության մասնաբաժին ներկայացնող արժեթուղթ է։ Բաժնետոմս գնելիս՝ ներդրողը դառնում է տվյալ ընկերության մասնակի սեփականատեր և կարող է շահույթ ստանալ բաժնետոմսի գնի աճից կամ ընկերության կողմից վճարվող դիվիդենտներից։ Բաժնետոմսերի արժեքը կարող է փոփոխվել՝ շուկայական պահանջարկից, ընկերության արդյունքներից և տնտեսական պայմաններից կախված։",
    ],
  },
  {
    docId: "what-is-bond",
    title: "Ի՞նչ է պարտատոմսը։",
    blocks: [
      "Պարտատոմսը պարտքային արժեթուղթ է։ Այն գնելիս` փաստացի գումար ես տրամադրում ընկերությանը կամ պետությանը որոշակի ժամկետով և դրա դիմաց ստանում ես կանխատեսելի տոկոսային եկամուտ։",
    ],
  },
  {
    docId: "what-is-etf",
    title: "Ի՞նչ է ETF-ը։",
    blocks: [
      "ETF-ը (Exchange Traded Fund) ներդրումային ֆոնդ է, որը վաճառվում և գնվում է բորսայում սովորական բաժնետոմսի նման։ Այն սովորաբար միավորում է բազմաթիվ ակտիվներ մեկ գործիքի մեջ, օրինակ՝ բաժնետոմսեր, պարտատոմսեր կամ ամբողջ ինդեքս։",
    ],
  },
  {
    docId: "stock-bond-etf-difference",
    title: "Ո՞րն է տարբերությունը բաժնետոմսերի, պարտատոմսերի և ETF-ների միջև։",
    blocks: [
      {
        parts: [
          { bold: "Բաժնետոմսը" },
          " կապվում է մեկ ընկերության հետ և սովորաբար ունի ավելի բարձր եկամտաբերության, բայց նաև ավելի բարձր ռիսկի պոտենցիալ։",
        ],
      },
      {
        parts: [
          { bold: "Պարտատոմսը" },
          " սովորաբար ավելի կայուն գործիք է և կարող է ապահովել կանխատեսելի տոկոսային եկամուտ։",
        ],
      },
      {
        parts: [
          { bold: "ETF-ը" },
          " թույլ է տալիս մեկ գործիքի միջոցով ներդրում կատարել միանգամից բազմաթիվ ակտիվներում, ինչը հաճախ օգնում է դիվերսիֆիկացնել ռիսկը։",
        ],
      },
    ],
  },
  {
    docId: "open-account-online",
    title: "Կարո՞ղ եմ բրոքերային հաշիվ բացել առանց մասնաճյուղ այցելելու։",
    blocks: [
      "Այո, իհարկե։",
      "Հարկավոր է մուտք գործել EvocaTOUCH հավելված, «Հաշիվներ» բաժնում ընտրել «Բրոքերային հաշիվ» և գրանցվել ամբողջությամբ օնլայն՝ ընդամենը մի քանի քայլով։",
    ],
  },
  {
    docId: "markets-and-instruments",
    title: "Ո՞ր շուկաներին և գործիքներին է EvocaINVEST-ը ապահովում հասանելիություն։",
    blocks: [
      "Ամերիկյան, եվրոպական և ասիական ֆոնդային բորսաներին, որտեղ հասանելի են բաժնետոմսեր, պարտատոմսեր, եվրապարտատոմսեր և ETF-ներ։",
    ],
  },
  {
    docId: "different-securities",
    title: "Կարո՞ղ եմ միաժամանակ ունենալ տարբեր տեսակի արժեթղթեր։",
    blocks: [
      "Այո։ Շատ ներդրողներ հենց այդպես էլ անում են․ իրենց պորտֆելում համատեղում են բաժնետոմսեր, պարտատոմսեր և ETF-ներ՝ ռիսկն ու հնարավոր եկամտաբերությունը հավասարակշռելու համար։",
    ],
  },
  {
    docId: "find-and-buy",
    title: "Ինչպե՞ս գտնել և գնել կոնկրետ արժեթուղթ։",
    blocks: [
      "EvocaINVEST-ի Trade բաժնի որոնման դաշտում մուտքագրիր ընկերության անունը կամ կարճ հապավումը (ticker), ընտրիր արժեթուղթն ու նույն էկրանից տեղադրիր գնման պատվեր։",
    ],
  },
  {
    docId: "limit-vs-market",
    title: "Ո՞րն է տարբերությունը լիմիտային և շուկայական պատվերների միջև։",
    blocks: [
      {
        parts: [
          { bold: "Լիմիտային պատվերը" },
          " կատարվում է միայն քո նշած գնով կամ ավելի լավ գնով։ Սա օգնում է վերահսկել գործարքի գինը, բայց պատվերը կարող է չկատարվել, եթե շուկայում այդ գինը հասանելի չլինի։",
        ],
      },
      {
        parts: [
          { bold: "Շուկայական պատվերը" },
          " կատարվում է տվյալ պահին շուկայում առկա լավագույն հասանելի գնով։ Այն սովորաբար կատարվում է ավելի արագ, բայց վերջնական գինը կարող է տարբերվել քո ակնկալածից՝ հատկապես շուկայի բարձր տատանողականության դեպքում։",
        ],
      },
    ],
  },
  {
    docId: "what-is-ticker",
    title: "Ի՞նչ է ticker-ը։",
    blocks: [
      "Արժեթղթի կարճ, մի քանի տառանի անվանումն է բորսայում։ Օրինակ՝ Apple-ի ticker-ն է AAPL, իսկ Google-ինը՝ GOOGL։",
    ],
  },
  {
    docId: "what-is-dividend",
    title: "Ի՞նչ է դիվիդենտը։",
    blocks: [
      "Դիվիդենտը ընկերության կողմից բաժնետերերին վճարվող շահույթի մասն է։ Ոչ բոլոր բաժնետոմսերն են դիվիդենտ վճարում, և վճարումը կախված է ընկերության քաղաքականությունից։",
    ],
  },
  {
    docId: "orders-outside-hours",
    title: "Կարո՞ղ եմ պատվերներ տեղադրել բորսայի աշխատանքային ժամերից դուրս։",
    blocks: [
      "Այո։ EvocaINVEST-ը ընդունում է պատվերներ 24/7 ռեժիմով։ Բորսայի ժամերից դուրս տեղադրված պատվերները հերթագրվում և ավտոմատ կատարվում են, երբ բորսան բացվում է։",
    ],
  },
  {
    docId: "why-diversification",
    title: "Ինչո՞ւ է կարևոր դիվերսիֆիկացիան։",
    blocks: [
      "Դիվերսիֆիկացիան նշանակում է ներդրումներդ բաշխել տարբեր գործիքների, ոլորտների կամ շուկաների միջև, որպեսզի մեկ ակտիվի գնի անկումը հնարավորինս քիչ ազդի ընդհանուր պորտֆելի վրա։",
    ],
  },
  {
    docId: "sell-anytime",
    title: "Կարո՞ղ եմ վաճառել արժեթուղթը ցանկացած պահի։",
    blocks: [
      "Դու կարող ես վաճառքի պատվեր տեղադրել ցանկացած պահի։ Եթե շուկան բաց է, և կա համապատասխան առաջարկ, պատվերը կարող է կատարվել նույն պահին կամ ըստ քո պատվերի պայմանների։",
    ],
  },
  {
    docId: "currencies",
    title: "Ի՞նչ արժույթներով կարող եմ ներդրումներ կատարել։",
    blocks: [
      "Դա կախված է ընտրված շուկայից և գործիքից։ Տարբեր արժեթղթեր կարող են վաճառվել տարբեր արժույթներով, օրինակ՝ ՀՀ դրամ, ԱՄՆ դոլար կամ եվրո։",
    ],
  },
  {
    docId: "investment-risks",
    title: "Ի՞նչ ռիսկեր ունի ներդրումը։",
    blocks: [
      "Արժեթղթերի գները կարող են աճել կամ նվազել՝ կախված շուկայական պայմաններից։ Ներդրումից առաջ կարևոր է հասկանալ, որ հնարավոր է ոչ միայն շահույթ ստանալ, այլ երբեմն նաև կորուստ ունենալ։",
    ],
  },
];
const introTexts = [
  "Apple, Tesla, Google, Amazon, թե՞ Nike։",
  "**EvocaINVEST**-ի միջոցով դու կարող ես ներդրումներ կատարել միջազգային և տեղական կապիտալի շուկաներում։ Իսկ բրոքերային հաշիվ կարող ես բացել ընդամենը մի քանի րոպեում՝ անմիջապես **EvocaTOUCH** հավելվածից։",
  "Գնիր բաժնետոմսեր, պարտատոմսեր, ETF-ներ և կառավարիր պորտֆոլիոդ մեկ հարթակից։",
];

const instrumentsSection = {
  title: "Քո ներդրումային գործիքները",
  text: "**EvocaINVEST**-ը հնարավորություն է տալիս ներդրումներ կատարել ամերիկյան, եվրոպական և ասիական ֆոնդային բորսաներում՝ ընտրելով քեզ հարմար ռազմավարությունը։",
  items: [
    "**Բաժնետոմսեր**՝ ներդրումներ համաշխարհային առաջատար ընկերություններում",
    "**Պարտատոմսեր և եվրապարտատոմսեր՝** ավելի կանխատեսելի ներդրումներ և կայուն եկամտի հնարավորություն",
    "**ETF-ներ՝** դիվերսիֆիկացված ներդրումներ մեկ գործիքի միջոցով",
  ],
  footer:
    "Անկախ նրանից՝ նո՞ր ես սկսում ներդրում կատարել, թե՞ արդեն ունես փորձ, կատարում ես երկարաժամկե՞տ, թե՞ կարճաժամկետ ներդրումներ, **EvocaINVEST**-ը տալիս է բոլոր անհրաժեշտ գործիքները քո ներդրումային ռազմավարության համար։",
};

const stepsSection = {
  title: "Բացիր բրոքերային հաշիվ 3 պարզ քայլով",
  steps: [
    {
      title: "1. Ներբեռնիր EvocaTOUCH հավելվածը",
      text: "Բանկային և ներդրումային գործառույթները՝ մեկ հավելվածում։ Հասանելի է iOS և Android համակարգերում։",
      linksPrefix: "Ներբեռնելու համար անցիր",
      links: [
        { label: "App Store", href: "https://apps.apple.com/us/app/evocatouch/id970309076" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=am.prometeybank.mobilebank" },
      ],
    },
    {
      title: "2. Բացիր Բրոքերային հաշիվ",
      text: "Մուտք գործիր հավելվածի «Հաշիվներ» բաժին, ընտրիր «Բրոքերային հաշիվ» և ավարտիր գրանցումը մի քանի րոպեում՝ առանց Բանկ այցելելու անհրաժեշտության։",
    },
    {
      title: "3. Սկսիր ներդրումներ կատարել",
      text: "Փնտրիր ընկերությունն ըստ անվան կամ ticker-ի EvocaINVEST հավելվածում, տեղադրիր լիմիտային կամ շուկայական պատվեր և հետևիր պորտֆոլիոդ:",
    },
  ],
  imageUrl: "https://www.evoca.am/file_manager/other/invest%20steps%20(1).png",
};

const benefitsSection = {
  title: "Ինչո՞ւ ընտրել EvocaINVEST ներդրումային հարթակը",
  items: [
    {
      title: "24/7 պատվերներ",
      text: "Տեղադրիր պատվերդ ցանկացած ժամի, այն կհերթագրվի և կկատարվի ավտոմատ՝ բորսայի բացվելուն պես։",
    },
    {
      title: "Մրցակցային սակագներ",
      text: "Մրցակցային և թափանցիկ միջնորդավճարներ։ Ամբողջական սակագներին ծանոթանում ես նախքան գործարքը հաստատելը։",
    },
    {
      title: "Լիմիտային և շուկայական պատվերներ",
      text: "Պատվերներն ավտոմատ կիրառվում են որպես լիմիտային՝ գնի ճշգրտության համար։ Անհրաժեշտության դեպքում կարող ես ակնթարթորեն անցնել շուկայական պատվերի, եթե արագությունն ավելի կարևոր է։",
    },
  ],
};

const telegramSection = {
  title: "Զարգացրու ոչ միայն պորտֆոլիոդ, այլ նաև գիտելիքդ",
  text: "Միանալով **EvocaINVEST** տելեգրամյան ալիքին՝ դու կգտնես․",
  items: [
    "Ներդրումների մասին պարզ և հասկանալի նյութեր,",
    "Շուկայական հետազոտություններ և վերլուծություններ,",
    "Փորձագետների կարծիքներ միջազգային ներդրումային մասնագետների կողմից,",
    "Համաշխարհային ներդրումային շուկաների մասին կարևոր թարմացումներ:",
  ],
  linkPrefix: "Միացիր մեր տելեգրամյան ալիքին",
  linkLabel: "այս հղումով",
  linkHref: "https://t.me/evocabankinvest",
};

const contactSection = {
  title: "Դեռ չե՞ս օգտվում EvocaINVEST-ից",
  texts: [
    "Պատրա՞ստ ես բացահայտել ներդրումների աշխարհը։",
    "Լրացրու տվյալներդ, և մենք կապ կհաստատենք քեզ հետ.",
    "Կամ կարող ես անմիջապես կապ հաստատել մեր ներդրումային բաժնի հետ.",
  ],
  email: "investsecurities@evoca.am",
  phone: "+37433777453",
};

const importantSection = {
  title: "Կարևոր",
  text: "**EvocaINVEST**-ը հնարավորություն է տալիս բացահայտել ներդրումային հնարավորությունները․ այս հարթակում և մյուս սոց․ հարթակներում ներկայացված նյութերը բացառապես տեղեկատվական նպատակի համար են։ Յուրաքանչյուր ներդրումային որոշում կայացվում է օգտատիրոջ կողմից՝ սեփական գնահատման հիման վրա։ Ներդրումները կապված են ռիսկերի հետ, հետևաբար նախորդ ցուցանիշները չեն կարող դիտվել որպես ապագա արդյունքների երաշխիք։",
  formUrl:
    "https://forms.zohopublic.com/evocabankcjsc/form/EvocaINVEST/formperma/s4kYtkgYZyRva-7IAZTt8omAwPE0ugU3rYjr_SsVeJM",
};

const PURPLE = "text-[#6a00d4]";

// "**տեքստ**" -> մանուշակագույն թավ տեքստ
const renderRich = (text) =>
  text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={PURPLE}>{part}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const SectionTitle = ({ children }) => (
  <h3 className={`font-bold text-lg ${PURPLE}`}>{children}</h3>
);

const BulletList = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-2 w-2 h-2 shrink-0 rounded-full bg-[#6a00d4]" />
        <span>{renderRich(item)}</span>
      </li>
    ))}
  </ul>
);

const EvocaInvest = () => {
  const [loading, setLoading] = useState(true);
  const [securitiesmenu, setSecuritiesmenu] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "securitiesmenu"));
        if (!menuSnapshot.empty) {
          setSecuritiesmenu(
            menuSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
          );
        }
      } catch (error) {
        console.error("Firestore-ից տվյալների բեռնման սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-medium text-lg">
        Բեռնվում են տվյալները Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar items={securitiesmenu} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          <InfoCard
            title={cardData.title}
            description={cardData.description}
            imageUrl={cardData.imageUrl}
            altText={cardData.altText}
          />
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-6 text-base leading-relaxed">
            {introTexts.map((t, i) => (
              <p key={i}>{renderRich(t)}</p>
            ))}

            {/* Ներդրումային գործիքներ */}
            <SectionTitle>{instrumentsSection.title}</SectionTitle>
            <p>{renderRich(instrumentsSection.text)}</p>
            <BulletList items={instrumentsSection.items} />
            <p>{renderRich(instrumentsSection.footer)}</p>

            {/* 3 քայլ */}
            <SectionTitle>{stepsSection.title}</SectionTitle>
            {stepsSection.steps.map((step, i) => (
              <div key={i} className="space-y-3">
                <SectionTitle>{step.title}</SectionTitle>
                <p>{step.text}</p>
                {step.links && (
                  <p>
                    {step.linksPrefix} (
                    {step.links.map((l, j) => (
                      <React.Fragment key={l.label}>
                        {j > 0 && " և "}
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${PURPLE} underline font-semibold`}
                        >
                          {l.label}
                        </a>
                      </React.Fragment>
                    ))}
                    )։
                  </p>
                )}
              </div>
            ))}
            <img
              src={stepsSection.imageUrl}
              alt="EvocaINVEST քայլեր"
              className="w-full rounded-lg"
            />

            {/* Ինչու ընտրել */}
            <SectionTitle>{benefitsSection.title}</SectionTitle>
            {benefitsSection.items.map((b, i) => (
              <div key={i} className="space-y-2">
                <SectionTitle>{b.title}</SectionTitle>
                <p>{b.text}</p>
              </div>
            ))}

            {/* Տելեգրամ */}
            <SectionTitle>{telegramSection.title}</SectionTitle>
            <p>{renderRich(telegramSection.text)}</p>
            <BulletList items={telegramSection.items} />
            <p>
              {telegramSection.linkPrefix}{" "}
              <a
                href={telegramSection.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${PURPLE} underline font-semibold`}
              >
                {telegramSection.linkLabel}
              </a>
              ։
            </p>

            {/* Կապ */}
            <SectionTitle>{contactSection.title}</SectionTitle>
            {contactSection.texts.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            <div className={`flex flex-wrap gap-x-8 gap-y-2 font-bold ${PURPLE}`}>
              <a href={`mailto:${contactSection.email}`}>✉ {contactSection.email}</a>
              <a href={`tel:${contactSection.phone}`}>☎ {contactSection.phone}</a>
            </div>

            {/* Կարևոր */}
            <SectionTitle>{importantSection.title}</SectionTitle>
            <p>{renderRich(importantSection.text)}</p>

            <iframe
              src={importantSection.formUrl}
              title="EvocaINVEST հետադարձ կապ"
              className="w-full h-[600px] border-0 bg-gray-100"
            />
          </div>
          
        </div>
        <div className="w-[60%] ml-[20%] mt-[40px] space-y-10">
  <div>
    <h2 className="text-2xl font-bold uppercase mb-[40px]">
      {usefulMaterials.heading}
    </h2>
    <VideoAccordion
      title={usefulMaterials.accordionTitle}
      videos={usefulMaterials.videos}
    />
  </div>

  <div>
    <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
      Հաճախ տրվող հարցեր
    </h2>
    <div className="space-y-4">
      {EvocaInvestAccordionsData.map((item) => (
        <InfoAccordion key={item.docId} title={item.title} blocks={item.blocks} />
      ))}
    </div>
  </div>
</div>
      </section>

      <Footer />
    </>
  );
};

export default EvocaInvest;