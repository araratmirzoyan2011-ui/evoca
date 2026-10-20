import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import InfoCard from '../Components/AccountsCard.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import BondAccordion from '../Components/BondAccordion.jsx';
const Bond = () => {
  const [loading, setLoading] = useState(true);
  
  const [securitiesmenu, setSecuritiesmenu] = useState([]);
  const [securitiesitems, setSecuritiesitems] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "securitiesmenu"));
        if (!menuSnapshot.empty) {
          setSecuritiesmenu(menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
        
        const securitiesSnapshot = await getDocs(collection(db, "securitiesitems"));
        if (!securitiesSnapshot.empty) {
          setSecuritiesitems(securitiesSnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
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
        Բեռնվում է տվյալները Firebase-ից...
      </div>
    );
  }

  const cardData = {
    title: "Պարտատոմսեր",
    description: "Evocabank-ը հնարավորություն է տալիս ձեռք բերել պարտատոմսեր և ստանալ բարձր եկամուտներ։ Մենք ցանկանում ենք դառնալ Ձեր բարեկեցիկ ապագայի մի մասնիկը։",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/16783548543339/780x585.jpg",
    altText: ""
  };
const IMG = "https://www.evoca.am/file_manager/News-Bonds/";
const IMGS = {
  prospectus: IMG + "prospectous-bonds.png",
  filling: IMG + "prospectous-bonds-filling.png",
  amd: IMG + "prospectous-bonds-amd.png",
  usd: IMG + "prospectous-bonds-dollar.png",
};

const T_PROSPECTUS = "ԾՐԱԳՐԱՅԻՆ ԱԶԴԱԳԻՐ";
const T_FILLING = "ԱԶԴԱԳՐԻ ԼՐԱՑՈՒՄ";
const T_AMD = "ՊԱՅՄԱՆՆԵՐ ՀՀ ԴՐԱՄՈՎ";
const T_USD = "ՊԱՅՄԱՆՆԵՐ ԱՄՆ ԴՈԼԱՐՈՎ";
const T_EUR = "ՊԱՅՄԱՆՆԵՐ ԵՎՐՈՅՈՎ";

const TABLE_TITLE = "ԹՈՂԱՐԿՎՈՂ ՊԱՐՏԱՏՈՄՍԵՐԻ ՊԱՅՄԱՆՆԵՐ";

// Յուրաքանչյուր արժույթի համար՝ [անվանական արժեք, ծավալ, քանակ, ժամկետ, տոկոս]
const makeRows = (...cols) => {
  const labels = [
    "Անվանական արժեք",
    "Ընդհանուր ծավալ",
    "Թողարկվող պարտատոմսերի քանակ",
    "Շրջանառության ժամկետ",
    "Արժեկտրոնային տարեկան տոկոսադրույք",
  ];
  return [
    { label: "Դաս", values: ["Անվանական արժեկտրոնային"] },
    ...labels.map((label, i) => ({ label, values: cols.map((c) => c[i]) })),
    {
      label: "Արժեկտրոնների վճարման պարբերականություն",
      values: cols.map(() => "Եռամսյակային"),
    },
    { label: "Տեղաբաշխող", values: ["«Էվոկաբանկ» ԲԲԸ"] },
  ];
};

const bondAccordions = [
  {
    title: "Պարտատոմսերի թողարկում",
    tableTitle: "ԹՈՂԱՐԿՎԱԾ ՊԱՐՏԱՏՈՄՍԵՐԻ ՊԱՅՄԱՆՆԵՐ",
    rows: makeRows(
      ["10,000 ՀՀ դրամ", "3,000,000,000 ՀՀ դրամ", "300,000 հատ", "36 ամիս", "10%"],
      ["100 ԱՄՆ դոլար", "15,000,000 ԱՄՆ դոլար", "150,000 հատ", "36 ամիս", "5%"]
    ),
    description: "Պարտատոմսերի ծրագրային ազդագիրը գրանցվել է ՀՀ ԿԲ նախագահի 03.07.2024թ-ի թիվ 1/254Ա որոշմամբ:",
    docs: [
      { title: T_PROSPECTUS, image: IMGS.prospectus, href: "https://www.evoca.am/file_manager/bonds%202024/Ծրագրային%20ազդագիր.pdf" },
      { title: T_AMD, image: IMGS.amd, href: "https://www.evoca.am/file_manager/bonds%202024/AMD%20Թողարկման%20վերջնական%20պայմաններ.pdf" },
      { title: T_USD, image: IMGS.usd, href: "https://www.evoca.am/file_manager/bonds%202024/USD%20Թողարկման%20վերջնական%20պայմաններ.pdf" },
    ],
  },
  {
    title: "ՏԱՍՆԵՐԿՈՒԵՐՈՐԴ ԵՎ ՏԱՍՆԵՐԵՔԵՐՈՐԴ",
    tableTitle: TABLE_TITLE,
    rows: makeRows(
      ["10,000 ՀՀ դրամ", "3,000,000,000 ՀՀ դրամ", "300,000 հատ", "36 ամիս", "10․25%"],
      ["100 ԱՄՆ դոլար", "15,000,000 ԱՄՆ դոլար", "150,000 հատ", "36 ամիս", "5․25%"]
    ),
    description: "Պարտատոմսերի ծրագրային ազդագիրը գրանցվել է ՀՀ ԿԲ նախագահի 03.07.2024թ-ի թիվ 1/254Ա որոշմամբ:",
    docs: [
      { title: T_PROSPECTUS, image: IMGS.prospectus, href: "https://www.evoca.am/file_manager/bonds%202024/Ծրագրային-ազդագիր.pdf" },
      { title: T_AMD, image: IMGS.amd, href: "https://www.evoca.am/file_manager/bonds%202024/AMD-Թողարկման-վերջնական-պայմաններ.pdf" },
      { title: T_USD, image: IMGS.usd, href: "https://www.evoca.am/file_manager/bonds%202024/USD-Թողարկման-վերջնական-պայմաններ.pdf" },
    ],
  },
  {
    title: "ՏԱՍԵՐՈՐԴ ԵՎ ՏԱՍՆՄԵԿԵՐՈՐԴ",
    tableTitle: TABLE_TITLE,
    rows: makeRows(
      ["10,000 ՀՀ դրամ", "2,000,000,000 ՀՀ դրամ", "200,000 հատ", "30 ամիս", "11%"],
      ["100 ԱՄՆ դոլար", "10,000,000 ԱՄՆ դոլար", "100,000 հատ", "30 ամիս", "5%"]
    ),
    description: "Պարտատոմսերի ծրագրային ազդագիրը գրանցվել է ՀՀ ԿԲ նախագահի 07.03.2023թ-ի թիվ 1/87Ա որոշմամբ:",
    docs: [
      { title: T_PROSPECTUS, image: IMGS.prospectus, href: "https://www.evoca.am/file_manager/bonds-2023/ազդագիր-25-09-23.pdf" },
      { title: T_FILLING, image: IMGS.filling, href: "https://www.evoca.am/file_manager/bonds-2023/ազդագրի-լրացում-25-09-23.pdf" },
      { title: T_AMD, image: IMGS.amd, href: "https://www.evoca.am/file_manager/bonds-2023/AMD-թողարկման-վերջնական-պայմաններ-25-09-23.pdf" },
      { title: T_USD, image: IMGS.usd, href: "https://www.evoca.am/file_manager/bonds-2023/USD-թողարկման-վերջնական-պայմաններ-25-09-23.pdf" },
    ],
  },
  {
    title: "ՅՈԹԵՐՈՐԴ, ՈՒԹԵՐՈՐԴ ԵՎ ԻՆՆԵՐՈՐԴ ԹՈՂԱՐԿՈՒՄ",
    tableTitle: TABLE_TITLE,
    rows: makeRows(
      ["10,000 ՀՀ դրամ", "2,000,000,000 ՀՀ դրամ", "200,000 հատ", "30 ամիս", "11%"],
      ["100 ԱՄՆ դոլար", "10,000,000 ԱՄՆ դոլար", "100,000 հատ", "39 ամիս", "5.25%"],
      ["100 Եվրո", "7,000,000 Եվրո", "70,000 հատ", "39 ամիս", "4%"]
    ),
    description: "Պարտատոմսերի ծրագրային ազդագիրը գրանցվել է ՀՀ ԿԲ նախագահի 07.03.2023թ-ի թիվ 1/87Ա որոշմամբ:",
    docs: [
      { title: T_PROSPECTUS, image: IMGS.prospectus, href: IMG + "azdagir.pdf" },
      { title: T_AMD, image: IMGS.amd, href: IMG + "AMD-paymanner-2023.pdf" },
      { title: T_USD, image: IMGS.usd, href: IMG + "USD-paymanner-2023.pdf" },
      { title: T_EUR, symbol: "€", href: IMG + "EUR-paymanner-2023.pdf" },
    ],
  },
  {
    title: "ՀԻՆԳԵՐՈՐԴ ԵՎ ՎԵՑԵՐՈՐԴ ԹՈՂԱՐԿՈՒՄ",
    tableTitle: TABLE_TITLE,
    rows: makeRows(
      ["10,000 ՀՀ դրամ", "2,000,000,000 ՀՀ դրամ", "200,000 հատ", "30 ամիս", "11%"],
      ["100 ԱՄՆ դոլար", "10,000,000 ԱՄՆ դոլար", "100,000 հատ", "30 ամիս", "5%"]
    ),
    description: "Պարտատոմսերի ծրագրային ազդագիրը գրանցվել է ՀՀ ԿԲ նախագահի 11.03.2022թ. թիվ 1/106 Ա որոշմամբ:",
    docs: [
      { title: T_PROSPECTUS, image: IMGS.prospectus, href: IMG + "Cragrayin_azdagir_new.pdf" },
      { title: T_AMD, image: IMGS.amd, href: "https://www.evoca.am/file_manager/bonds2022/AMD%20Թողարկման%20վերջնական%20պայմաններ.pdf" },
      { title: T_USD, image: IMGS.usd, href: "https://www.evoca.am/file_manager/bonds2022/USD%20Թողարկման%20վերջնական%20պայմաններ.pdf" },
    ],
    note: {
      text: "Պարտատոմսերի թողարկման մանրամասներին կարող եք ծանոթանալ",
      href: "https://www.evoca.am/hy/news/banking/bonds-2022",
    },
  },
  {
    title: "ԵՐՐՈՐԴ ԵՎ ՉՈՐՐՈՐԴ ԹՈՂԱՐԿՈՒՄ",
    tableTitle: TABLE_TITLE,
    rows: makeRows(
      ["10,000 ՀՀ դրամ", "500,000,000 ՀՀ դրամ", "50,000 հատ", "30 ամիս", "10%"],
      ["100 ԱՄՆ դոլար", "5,000,000 ԱՄՆ դոլար", "50,000 հատ", "30 ամիս", "5.5%"]
    ),
    description:
      "Պարտատոմսերի ծրագրային ազդագիրը գրանցվել է ՀՀ ԿԲ նախագահի 07.10.2020թ. թիվ 1/562 Ա որոշմամբ:\n\nՀաշվի առնելով պարտատոմսերի նկատմամբ ներդրողների ցուցաբերած զգալի հետաքրքրությունը՝ Evocabank-ը մարտ ամսվա ընթացում իրականացրել է պարտատոմսերի հաջորդ թողարկումը։",
    docs: [
      { title: T_PROSPECTUS, image: IMGS.prospectus, href: IMG + "Evocabank-azdagir-2021.pdf" },
      { title: T_FILLING, image: IMGS.filling, href: IMG + "Cragrayin-azdagir-lracum.pdf" },
      { title: T_AMD, image: IMGS.amd, href: IMG + "Paymanner_AMD_2.pdf" },
      { title: T_USD, image: IMGS.usd, href: IMG + "Paymanner_USD_2.pdf" },
    ],
    note: {
      text: "Պարտատոմսերի թողարկման մանրամասներին կարող եք ծանոթանալ",
      href: "https://www.evoca.am/hy/news/products/evocabank-to-issue-bonds-2nd-tranche/",
    },
  },
  {
    title: "ԱՌԱՋԻՆ ԵՎ ԵՐԿՐՈՐԴ ԹՈՂԱՐԿՈՒՄ",
    tableTitle: TABLE_TITLE,
    rows: makeRows(
      ["10,000 ՀՀ դրամ", "500,000,000 ՀՀ դրամ", "50,000 հատ", "30 ամիս", "10%"],
      ["100 ԱՄՆ դոլար", "5,000,000 ԱՄՆ դոլար", "50,000 հատ", "30 ամիս", "5.5%"]
    ),
    description: "Պարտատոմսերի ծրագրային ազդագիրը գրանցվել է ՀՀ ԿԲ նախագահի 07.10.2020թ. թիվ 1/562 Ա որոշմամբ:",
    docs: [
      { title: T_PROSPECTUS, image: IMGS.prospectus, href: IMG + "Evocabank-azdagir-2021.pdf" },
      { title: T_FILLING, image: IMGS.filling, href: IMG + "Cragrayin-azdagir-lracum.pdf" },
      { title: T_AMD, image: IMGS.amd, href: IMG + "Paymanner-AMD.pdf" },
      { title: T_USD, image: IMGS.usd, href: IMG + "Paymanner-USD.pdf" },
    ],
    note: {
      text: "Պարտատոմսերի թողարկման մանրամասներին կարող եք ծանոթանալ",
      href: "https://www.evoca.am/hy/news/products/evocabank-to-issue-bonds/",
    },
  },
  {
    title: "Հաճախ տրվող հարցեր պարտատոմսերի մասին",
    faq: [
      {
        q: "Ի՞նչ է պարտատոմսը:",
        a: "Պարտատոմսը (լատիներեն՝ obligation - պարտավորություն) պարտքային արժեթուղթ է, որը հավաստում է դրա տիրապետողի իրավունքը՝ դրանում նշված ժամկետում պարտատոմս թողարկած անձից ստանալ պարտատոմսի անվանական արժեքը, ինչպես նաև տոկոս։",
      },
      {
        q: "Ի՞նչ կլինի, եթե պարտատոմսերում ներդրված գումարն ինձ անհրաժեշտ լինի մինչև մարման ժամկետը:",
        a: "Evocabank-ի կողմից թողարկված պարտատոմսերը ցուցակվելու են Հայաստանի ֆոնդային բորսայում, և Դուք ցանկացած պահի կարող եք գնել կամ վաճառել դրանք:",
      },
      {
        q: "Ինչու՞ պետք է գնեմ պարտատոմսեր՝ ավանդ ներդնելու փոխարեն:",
        a: "Պարտատոմսեր գնելն է՛լ ավելի շահավետ է և հարմար։ Պարտատոմսերն ունեն մի շարք առավելություններ:\nՊարտատոմսերից ստացված եկամուտները ազատված են եկամտային հարկից և ոչ ռեզիդենտի շահութահարկից:\nՊարտատոմսերը վաճառելու դեպքում Դուք պահպանում եք մինչ այդ պահը կուտակված տոկոսագումարները:",
      },
      {
        q: "Իմ ավանդները երաշխավորված են ավանդների հատուցումը երաշխավորող հիմնադրամի կողմից, իսկ պարտատոմսե՞րը:",
        a: "Պարտատոմսերը ևս երաշխավորված են։\n\n«Ֆիզիկական անձանց բանկային ավանդների հատուցումը երաշխավորելու մասին» ՀՀ օրենքի համաձայն՝ Բանկի կողմից թողարկված անվանական պարտատոմսերով ներգրավված դրամական միջոցները համարվում են երաշխավորված բանկային ավանդ և երաշխավորված են «Ավանդների հատուցումը երաշխավորող հիմնադրամի» կողմից:",
      },
      {
        q: "Ինչպե՞ս կարող եմ գնել Evocabank-ի պարտատոմսեր:",
        a: "Պարտատոմսեր գնելու համար անհրաժեշտ է՝\n\nՄոտենալ Բանկի ցանկացած գրասենյակ, լրացնել պարտատոմսերի ձեռքբերման հայտ-հանձնարարականը, մուտքագրել գումարը հատուկ հաշվին կամ online տարբերակով` աշխարհի ցանկացած վայրից, օրվա ցանկացած ժամին։",
      },
      {
        q: "Կարող եմ արդյո՞ք անհրաժեշտության դեպքում պարտատոմսերի գրավով վարկ վերցնել:",
        a: "Այո, կարող եք:\n\nԻնչպես և ավանդի դեպքում, պարտատոմսերի դեպքում ևս կարելի է պարտատոմսերի գրավով վերցնել կարճաժամկետ վարկ։\n\nՎարկը տրամադրվում է առավելագույնը պարտատոմսի մարման ժամկետով` պարտատոմսի արժեկտրոնային տոկոսադրույք +2%:",
      },
    ],
  },
];

const bondReports = [
  {
    order: 1,
    title: "Դոլարային պարտատոմսերիի գները 30.09.2024-29.11.2024 ժամանակահատվածի համար",
    url: "https://www.evoca.am/files/global_files/1/bonds-prices-usd-30-09-2024.pdf",
  },
  {
    order: 2,
    title: "Դրամային պարտատոմսերիի գները 30.09.2024-29.11.2024 ժամանակահատվածի համար",
    url: "https://www.evoca.am/files/global_files/1/bonds-prices-amd-30-09-2024.pdf",
  },
];

  const bondDescriptionBlocks = [
    {
      id: 1,
      type: 'paragraph',
      content: (
        <>
          Առաջին անգամ հայկական ֆինանսական համակարգում <span className="font-semibold text-purple-700">Evocabank</span>-ը, որպես նորարար և ժամանակակից Բանկ, իրականացրել է իր կողմից թողարկված պարտատոմսերի օնլայն տեղաբաշխում՝ <span className="font-semibold text-purple-700">EvocaTOUCH</span> հավելվածի միջոցով[cite: 1]։
        </>
      )
    },
    {
      id: 2,
      type: 'section',
      title: 'Պարտատոմսերը',
      subtitle: 'պահանջված և բարձր եկամտաբեր ֆինանսական գործիքներ են: Դրանք ապահով են և ունեն մի շարք առավելություններ[cite: 1]՝',
      listItems: [
        'Անվանական պարտատոմսերով ներգրավված դրամական միջոցները համարվում են երաշխավորված բանկային ավանդ և ՀՀ օրենսդրությամբ սահմանված չափերով երաշխավորված են «Ավանդների հատուցումը երաշխավորող հիմնադրամ»-ի կողմից[cite: 1]:',
        'ՀՀ Ֆոնդային Բորսայում ցուցակված պարտատոմսերից ստացված եկամուտները ազատվում են եկամտային հարկից և ոչ ռեզիդենտի շահութահարկից՝ ապահովելով ավելի բարձր եկամտաբերություն[cite: 1]:'
      ]
    }
  ];

  const Bonditems = [];
  const BondReport = [];

  return (
    <>
      <Header />
      <Navbar items={securitiesmenu} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
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
          
          {/* Սոցիալական կոճակներ */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          {/* Հիմնական բովանդակության ճիշտ կառուցվածք */}
          <div className="flex-1 max-w-4xl text-gray-800 space-y-8">
            
            {/* Զանգվածից տվյալների արտածում (նկարի տեքստ) */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm space-y-6 leading-relaxed border border-gray-100">
              {bondDescriptionBlocks.map((block) => {
                if (block.type === 'paragraph') {
                  return <p key={block.id}>{block.content}</p>;
                }
                if (block.type === 'section') {
                  return (
                    <div key={block.id}>
                      <h3 className="text-lg md:text-xl font-bold text-purple-700 mb-3">
                        {block.title}
                      </h3>
                      {block.subtitle && <p className="mb-4">{block.subtitle}</p>}
                      {block.listItems && (
                        <ul className="list-disc pl-5 space-y-3">
                          {block.listItems.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            <div className="pt-4">
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
              </h2>
              <div className="max-w-4xl space-y-4">
  {bondAccordions.map((item, i) => (
    <BondAccordion key={i} {...item} />
  ))}
</div>
            </div>

            {/* Փաստաթղթեր */}
            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {BondReport.map((r) => (
                  <DocumentCard key={r.docId || r.order} title={r.title} url={r.url} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Bond;