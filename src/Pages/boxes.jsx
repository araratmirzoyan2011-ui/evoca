import React from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import InfoCard from '../Components/AccountsCard.jsx';

const boxesParagraphs = [
  "Պահատուփերի պարունակությունը միայն ձեր գաղտնիքն է: Դրանցում կարող եք պահել Ձեզ համար արժեք ներկայացնող ցանկացած իր (դրամ, արժեթղթեր, թանկարժեք մետաղներ և քարեր, ոսկերչական իրեր, արվեստի գործեր, ֆոտո և տեսաժապավեններ, մագնիսական կրիչներ և այլն):",
  "Պահատուփերը գտնվում են առանձնացված տարածքում՝ շուրջօրյա հսկողության ներքո: Դրանք զինված են միջազգային չափանիշներին համապատասխան անվտանգության միջոցներով և պաշտպանված են մեխանիկական ու քիմիական գործոնների ազդեցությունից: Յուրաքանչյուր գործարքի ժամանակ, պահատուփերի առանձնացված տարածքում կարող եք գտնվել մինչև 15 րոպե:",
  "Առաջարկում ենք 3 չափսի պահատուփեր՝ փոքր, միջին, մեծ:",
  "Պահատուփերը փակվում են 2 բանալիով, որոնցից մեկը տրամադրում ենք ձեզ, իսկ մյուսը պահվում է մեզ մոտ (պահատուփը հնարավոր է բացել միայն երկու բանալիների միաժամանակյա կիրառմամբ): Ձեզ տրամադրված բանալիի օրինակը պարտավոր եք վերադարձնել՝ պահատուփի վարձակալության պայմանագրի գործողության ժամկետի վերջում:",
  "Պահատուփերը վարձակալության ենք տրամադրում անհատական պայմանագրի հիման վրա, ձեր նախընտրած վարձակալության ժամկետով: Վարձակալման գինը կախված է պահարանի չափից և ժամկետից՝ ըստ մեր սակագների:",
  "12 ամսից երկար ժամկետով վարձակալելու դեպքում պահատուփերի սակագները սահմանվում են պայմանագրային կարգով:",
  "Անհատական պահատուփից կարելի է օգտվել միայն մեր սպասարկման օրերին և ժամերին:",
];

const boxSizes = ["փոքր", "միջին", "մեծ"];

const tariffTables = [
  {
    id: "residents",
    title: "Չհրկիզվող անհատական պահարանների վարձակալման սակագներ",
    sizeLabel: "Պահարանի չափերը",
    align: "center",
    firstColClass: "w-[28%] sm:w-[24%]",
    otherColClass: "w-[24%] sm:w-[25.33%]",
    labelColClass: "w-1/2",
    periods: [
      { label: "14 օր", values: ["5,000 ՀՀ դրամ", "7,000 ՀՀ դրամ", "10,000 ՀՀ դրամ"] },
      { label: "1 ամիս", values: ["7,000 ՀՀ դրամ", "10,000 ՀՀ դրամ", "12,000 ՀՀ դրամ"] },
      { label: "3 ամիս", values: ["10,000 ՀՀ դրամ", "15,000 ՀՀ դրամ", "20,000 ՀՀ դրամ"] },
      { label: "6 ամիս", values: ["15,000 ՀՀ դրամ", "20,000 ՀՀ դրամ", "25,000 ՀՀ դրամ"] },
      { label: "12 ամիս", values: ["30,000 ՀՀ դրամ", "40,000 ՀՀ դրամ", "50,000 ՀՀ դրամ"] },
      { label: "Երկարաժամկետ", values: ["պայմանագրային", "պայմանագրային", "պայմանագրային"] },
    ],
    extras: [
      { label: "Պահարանի բանալու կորուստ կամ վնասում", value: "20,000 ՀՀ դրամ" },
      { label: "Պահարանի վնասում", value: "Հասցված վնասի եռապատիկը" },
      { label: "Պայմանագրի ժամկետի ավարտին բանալու չհանձնում", value: "Յուրաքանչյուր ուշացրած օրվա համար 1000 ՀՀ դրամ" },
      { label: "Իրերը Բանկի այլ տարածքում պահպանելու վճար", value: "Ի պահ ընդունված յուրաքանչյուր օրվա համար 1000 ՀՀ դրամ" },
    ],
  },
  {
    id: "foreigners",
    title: "Չհրկիզվող անհատական պահարանների վարձակալում օտարերկրյա քաղաքացիների համար",
    sizeLabel: "Պահարանի չափսերը",
    align: "left",
    firstColClass: "w-[28%] sm:w-[20%]",
    otherColClass: "w-[24%] sm:w-[26.67%]",
    labelColClass: "w-1/2 sm:w-3/5",
    periods: [
      { label: "14 օր", values: ["25,000 ՀՀ դրամ", "35,000 ՀՀ դրամ", "50,000 ՀՀ դրամ"] },
      { label: "1 ամիս", values: ["35,000 ՀՀ դրամ", "50,000 ՀՀ դրամ", "60,000 ՀՀ դրամ"] },
      { label: "3 ամիս", values: ["50,000 ՀՀ դրամ", "75,000 ՀՀ դրամ", "100,000 ՀՀ դրամ"] },
      { label: "6 ամիս", values: ["75,000 ՀՀ դրամ", "100,000 ՀՀ դրամ", "125,000 ՀՀ դրամ"] },
      { label: "12 ամիս", values: ["100,000 ՀՀ դրամ", "125,000 ՀՀ դրամ", "150,000 ՀՀ դրամ"] },
      { label: "Երկարաժամկետ", values: ["պայմանագրային", "պայմանագրային", "պայմանագրային"] },
    ],
    extras: [
      { label: "Պահարանի բանալու կորուստ կամ վնասում", value: "20,000 ՀՀ դրամ" },
      { label: "Պահարանի վնասում", value: "Հասցված վնասի եռապատիկը" },
      { label: "Պայմանագրի ժամկետի ավարտին բանալու չհանձնում", value: "Յուրաքանչյուր ուշացրած օրվա համար 1,000 ՀՀ դրամ" },
      { label: "Իրերը Բանկի այլ տարածքում պահպանելու վճար", value: "Ի պահ ընդունված յուրաքանչյուր օրվա համար 1000 ՀՀ դրամ" },
    ],
  },
];
const Boxes = () => {
  const boxesReports = [
    { title: "Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025թ." }
  ];

  const cardData = {
    title: "Անհատական պահատուփեր",
    description: "Հայաստանի ռեզիդենտ և ոչ ռեզիդենտ ֆիզիկական անձանց առաջարկում ենք արժեքավոր իրերը պահպանելու հուսալի և անվտանգ միջոց՝ չհրկիզվող անհատական պահատուփեր:",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/17738350520558/780x585.jpg",
    altText: ""
  };

const cellBase =
  "border border-gray-200 px-1.5 py-1.5 align-middle break-words sm:px-3 sm:py-2";
  return (
    <>
      <Header />
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
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-12">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="min-w-0 max-w-4xl flex-1 text-[14px] leading-6 text-gray-900 sm:text-[15px] sm:leading-7">
  <div className="space-y-6">
    {boxesParagraphs.map((text, i) => (
      <p key={i} className="break-words">{text}</p>
    ))}
  </div>

  <div className="mt-8 space-y-8">
    {tariffTables.map((t) => {
      const textAlign = t.align === "center" ? "text-center" : "text-left";
      const tableText = "text-[11px] leading-4 sm:text-[13px] sm:leading-5";

      return (
        <div key={t.id}>
          <h3 className="mb-4 text-[14px] font-bold leading-6 sm:text-[15px]">
            {t.title}
          </h3>

          <div className="overflow-x-auto rounded-lg bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
            <table className={`w-full table-fixed border-collapse ${tableText}`}>
              <colgroup>
                <col className={t.firstColClass} />
                <col className={t.otherColClass} />
                <col className={t.otherColClass} />
                <col className={t.otherColClass} />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className={`${cellBase} text-left font-normal`}>
                    ժամկետ
                  </th>
                  <th colSpan={3} className={`${cellBase} ${textAlign} font-normal`}>
                    {t.sizeLabel}
                  </th>
                </tr>
                <tr>
                  {boxSizes.map((size) => (
                    <th key={size} className={`${cellBase} ${textAlign} font-normal`}>
                      {size}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.periods.map((row) => {
                  const merged = row.values.every((v) => v === row.values[0]);
                  return (
                    <tr key={row.label}>
                      <td className={cellBase}>{row.label}</td>
                      {merged && (
                        <td colSpan={3} className={`${cellBase} ${textAlign} sm:hidden`}>
                          {row.values[0]}
                        </td>
                      )}
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={`${cellBase} ${textAlign} ${
                            merged ? "hidden sm:table-cell" : ""
                          }`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <table className={`-mt-px w-full table-fixed border-collapse ${tableText}`}>
              <colgroup>
                <col className={t.labelColClass} />
                <col />
              </colgroup>
              <tbody>
                {t.extras.map((row) => (
                  <tr key={row.label}>
                    <td className={cellBase}>{row.label}</td>
                    <td className={cellBase}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    })}
  </div>

  <p className="mt-6 text-[12px] sm:text-[13px]">
    <span className="font-bold">Նշում</span> - Միջնորդավճարները ներկայացված են ներառյալ ԱԱՀ:
  </p>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {boxesReports.map((r, index) => (
                  <DocumentCard key={index} title={r.title} url={r.url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnlineBanking />
      <Footer />
    </>
  );
};

export default Boxes;