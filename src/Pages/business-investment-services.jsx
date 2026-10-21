import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import LeasingAccordion from "../Components/LeasingAccordion.jsx";
import { EvocaNewsCard } from "../Components/EVocaCard1.jsx";

const Garant = () => {
  const [loading, setLoading] = useState(true);
  const [salaryitems, setSalaryitems] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);
        const newsSnapshot = await getDocs(collection(db, "salaryNewsCollection"));
        const newsDocs = newsSnapshot.docs.map(doc => doc.data());
        if (newsDocs.length > 0 && newsDocs[0].items) {
          setSalaryitems(newsDocs[0].items);
        }
      } catch (error) {
        console.error("Firestore-ից տվյալների բեռնման սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  const menuItems = [
    { label: "Երաշխիք", path: "/business-investment-services", order: 1 },
    { label: "Ֆակտորինգային ֆինանսավորում", path: "/factoring-finance", order: 2 },
    { label: "Ակրեդիտիվ", path: "/վ", order: 3 },
    { label: "Ինկասո", path: "/documentary-collection", order: 4 },
  ];

  // 1. Ներածական տեքստեր
  const introTexts = [
    "Բանկային երաշխիքը անկախ, անվերապահ և գրավոր պարտավորություն է, որը բանկը ստանձնում է իր հաճախորդի (Applicant) հանձնարարությամբ հօգուտ երրորդ կողմի (Beneficiary) վճարելու երաշխիքով սահմանված գումարը ներկայացված պահանջի դիմաց, եթե պահանջը համապատասխանում է երաշխիքի պայմաններին:",
    "Բանկային երաշխիքները, որպես կանոն, կարգավորում են Միջազգային առևտրի պալատի (ICC) կողմից ընդունված URDG 758 կանոններով, եթե երաշխիքում այլ բան նախատեսված չէ:"
  ];

  // 2. Երաշխիքների տեսակներ
  const guaranteeTypes = [
    {
      title: "Կանխավճարային երաշխիք",
      subtitle: "(Advance Payment Guarantee)",
      description: "Տրվում է այն դեպքերում, երբ գնորդը (Buyer) մատակարարին (Seller) տրամադրում է կանխավճար մինչև ապրանքի մատակարարումը կամ ծառայության մատուցումը:\nԵրաշխիքը ապահովում է կանխավճարի վերադարձը բենեֆիցիարին, եթե դիմողը չի կատարում հիմնական պայմանագրով նախատեսված իր պարտավորությունները:"
    },
    {
      title: "Պարտավորությունների կատարման երաշխիք",
      subtitle: "(Performance Guarantee / Performance Bond)",
      description: "Տրվում է պայմանագրով նախատեսված պարտավորությունների պատշաճ կատարումն ապահովելու նպատակով:\nԲանկը պարտավորվում է վճարել բենեֆիցիարին երաշխիքով սահմանված գումարը՝ պայմանագրային պարտավորությունների չկատարման կամ ոչ պատշաճ կատարման դեպքում:"
    },
    {
      title: "Մրցութային երաշխիք",
      subtitle: "(Tender / Bid Guarantee)",
      description: "Տրվում է մրցույթներին կամ տենդերներին մասնակցելու, ինչպես նաև պայմանագրի, որակավորման, կանխավճարի ապահովման նպատակներով:"
    },
    {
      title: "Վճարման երաշխիք",
      subtitle: "(Payment Guarantee)",
      description: "Կիրառվում է բաց հաշվով վճարման (open account) առևտրային գործարքներում:\nԵրաշխիքը ապահովում է բենեֆիցիարի վճարումը այն դեպքում, երբ դիմողը չի կատարում պայմանագրով սահմանված վճարային պարտավորությունները:"
    },
    {
      title: "Մաքսային երաշխիք",
      subtitle: "(Customs Guarantee)",
      description: "Տրվում է մաքսային մարմինների օգտին և ապահովում է մաքսային տուրքերի, հարկերի և այլ վճարների կատարումը մաքսային օրենսդրությամբ նախատեսված դեպքերում:\nՄաքսային երաշխիքները կարող են կարգավորվել ինչպես ազգային օրենսդրությամբ, այնպես էլ համապատասխան միջազգային կանոններով:"
    },
    {
      title: "Պահուստային ակրեդիտիվ",
      subtitle: "(Standby Letter of Credit – SBLC)",
      description: "Պահուստային ակրեդիտիվը անկախ վճարային գործիք է, որը իր տնտեսական էությամբ համարժեք է բանկային երաշխիքին:\nԱյն սովորաբար կարգավորվում է ICC ISP98 կամ UCP 600 կանոններով և կիրառվում է այն դեպքերում, երբ բանկային երաշխիքի թողարկումը իրավական կամ գործառնական տեսանկյունից սահմանափակ է:\nSBLC-ի հման վրա վճարումը կատարվում է միայն բենեֆիցիարի կողմից պայմաններին համապատասխան պահանջ ներկայացնելու դեպքում:"
    }
  ];

  // 3. Առավելություններ
  const advantages = [
    "նվազեցնում են առևտրային և ֆինանսական ռիսկերը,",
    "ապահովում են գործարքների վստահելի իրականացումը,",
    "հնարավորություն են տալիս կիրառել հետձգված վճարման պայմաններ,",
    "նպաստում են գործընկերների միջև երկարաժամկետ և վստահելի համագործակցությանը,",
    "հանդիսանում են վարկային միջոցներին համեմատ ավելի ճկուն և ծախսարդյունավետ գործիք:"
  ];

  const FEE_20K =
    "Իրավաբանական անձանց և անհատ ձեռնարկատերերին տրամադրված երաշխիքների դեպքում, եթե գանձման ենթակա տոկոսագումարը տրամադրվող երաշխիքի գործողության փաստացի կամ ամբողջ ժամանակահատվածի համար չի գերազանցում 20,000 ՀՀ դրամը, ապա Պրինցիպալից գանձվում է միանվագ վճար 20,000 ՀՀ դրամ գումարի չափով:";

  const DOUBLE_CBA =
    "Ոչ ավել քան ՀՀ կենտրոնական բանկի սահմանված բանկային տոկոսի հաշվարկային տոկոսադրույքի կրկնապատիկ";

  const GarantAccordionsData = [
    {
      docId: "international-guarantees",
      title: "Միջազգային Բանկային Երաշխիքներ",
      blocks: [
        {
          type: "table",
          numbered: true,
          rows: [
            { label: "Արժույթ", value: "ԱՄՆ դոլար, Եվրո, ՌԴ ռուբլի կամ Բանկի համար ընդունելի այլ արտարժույթ" },
            { label: "Գումարային սահմանաչափ", value: "Պայմանագրային" },
            { label: "Ժամկետներ", value: "Պայմանագրային" },
            { label: "Երաշխիքի թողարկում և/կամ հաստատում (տարեկան)", value: "Պայմանագրային" },
            { label: "Երաշխիքի պայմանների փոփոխում (ա.թ. երկարաձգում)", value: "0.15%, նվազ. 50,000 ՀՀ դրամ" },
            { label: "Երաշխիքի ծանուցում", value: "0.15%, նվազ. 50,000 ՀՀ դրամ" },
            { label: "Բանկի կողմից թողարկված և/կամ հաստատված երաշխիքով վճարում", value: "0.5%, նվազ. 50,000 ՀՀ դրամ" },
            { label: "Երաշխիքի հետ կանչում", value: "50,000 ՀՀ դրամ" },
          ],
        },
      ],
    },
    {
      docId: "local-guarantees",
      title: "Տեղական Բանկային Երաշխիքներ",
      blocks: [
        {
          type: "table",
          numbered: true,
          rows: [
            { label: "Արժույթ", value: "ՀՀ դրամ կամ արտարժույթ" },
            { label: "Գումարային սահմանաչափ", value: "Պայմանագրային" },
            { label: "Ժամկետներ", value: "Մինչև 60 ամիս մարման ժամկետով" },
            { label: "Գանձվող վճարներ", value: FEE_20K },
            { label: "Փոփոխություն", value: "15 000 ՀՀ դրամ" },
            { label: "Տարեկան տոկոսադրույք` դրամական ապահովվածության դեպքում", value: "1-3%" },
            { label: "Տարեկան տոկոսադրույք Այլ ապահովվածության դեպքում՝", value: "2-6%" },
            { label: "Չեղյալ համարում", value: "25 000 ՀՀ դրամ" },
            { label: "Վճարում պահանջի դիմաց", value: "0.5%, նվազ. 50,000 ՀՀ դրամ" },
            { label: "Վարկ դառնալու դեպքում", value: DOUBLE_CBA },
          ],
        },
      ],
    },
    {
      docId: "first-class-secured-guarantees",
      title: "Առաջնակարգ ապահովվածությամբ առանց վարկունակության գնահատման Բանկային երաշխիքներ",
      blocks: [
        {
          type: "table",
          numbered: true,
          rows: [
            { label: "Արժույթ", value: "ՀՀ դրամ կամ արտարժույթ" },
            { label: "Գումարային սահմանաչափ", value: "Պայմանագրային" },
            { label: "Ժամկետներ", value: "Մինչև 60 ամիս մարման ժամկետով" },
            {
              label: "Ապահովվածություն",
              value:
                "Դրամական միջոցների (ավանդային հաշվի կամ ընթացիկ հաշվի մնացորդ) մնացորդ, ինչպես նաև Բանկի կողմից թողարկված պարտատոմսեր, պետական պարտատոմսեր",
            },
            { label: "Գանձվող վճարներ", value: FEE_20K },
            { label: "Փոփոխություն", value: "15 000 ՀՀ դրամ" },
            { label: "Տարեկան տոկոսադրույք", value: "1-3%" },
            { label: "Չեղյալ համարում", value: "25 000 ՀՀ դրամ" },
            { label: "Վճարում պահանջի դիմաց", value: "0.5%, նվազ. 50,000 ՀՀ դրամ" },
            { label: "Վարկ դառնալու դեպքում", value: DOUBLE_CBA },
          ],
        },
      ],
    },
    {
      docId: "cash-flow-secured-guarantees",
      title: "Դրամական հոսքերով ապահովված առանց վարկունակության գնահատման Բանկային երաշխիքներ",
      blocks: [
        {
          type: "table",
          numbered: true,
          rows: [
            { label: "Արժույթ", value: "ՀՀ դրամ կամ արտարժույթ" },
            {
              label: "Գումարային սահմանաչափ",
              value:
                "Երաշխիքային գումարը չպետք է գերազանցի ԷՎՈԿԱԲԱՆԿ ԲԲԸ-ում նախորդ 12 ամիսների բոլոր արժույթներով հաշիվների զուտ շրջանառության 50%-ը: Ընդ որում հաշիվների շրջանառության նույն ժամանակահատվածի համար իրականցվում է հարկային հաշվետվությունների համադրում և հիմք է հանդիսանում նվազագույնը:",
            },
            { label: "Ժամկետներ", value: "Մինչև 24 ամիս ժամկետով" },
            {
              label: "Պահանջներ վարկառուի և երաշխավոր անձանց նկատմամբ",
              value: {
                text: "ՀՀ ռեզիդենտ իրավաբանական անձ, անհատ ձեռնարկատեր",
                items: [
                  "Ժամկետանց պարտավորությունների բացակայություն (ներառյալ տրամադրված երաշխավորությունների գծով): Դիմումի պահին դասակարգումների բացակայություն",
                  "Նախորդ 12 ամիսների ընթացքում վարկային պարտավորությունների գծով դասակարգումների բացակայություն, իսկ մարումների գծով ուշացման օրերի հանրագումարը չպետք է գերազանցի 30 օրը, միանվագ՝ 15 օրը:",
                  "Չունի Հարկային ժամկետանց պարտավորություններ և տույժեր,",
                  "Հիմնադրի և/կամ իրական շահառուի անձնական երաշխավորությունը",
                ],
              },
            },
            { label: "Ապահովվածություն", value: "ԷՎՈԿԱԲԱՆԿ ԲԲԸ-ում Հաճախորդի հաշիվների շրջանառություն" },
            { label: "Տարեկան տոկոսադրույք", value: "3-6%" },
            { label: "Չեղյալ համարում", value: "25 000 ՀՀ դրամ" },
            { label: "Վճարում պահանջի դիմաց", value: "0.5%, նվազ. 50,000 ՀՀ դրամ" },
            {
              label: "Վարկ դառնալու դեպքում",
              value: "ՀՀ կենտրոնական բանկի սահմանված բանկային տոկոսի հաշվարկային տոկոսադրույքի կրկնապատիկ",
            },
          ],
        },
      ],
    },
    {
      docId: "real-estate-secured-guarantees",
      title: "Անշարժ գույքով ապահովված Բանկային երաշխիքներ",
      blocks: [
        {
          type: "table",
          numbered: true,
          rows: [
            { label: "Արժույթ", value: "ՀՀ դրամ կամ արտարժույթ" },
            {
              label: "Գումարային սահմանաչափ",
              value: "Առավելագույնը անշարժ գույքի գնահատված լիկվիդային արժեքի կրկնապատիկի չափով",
            },
            { label: "Ժամկետներ", value: "Մինչև 60 ամիս ժամկետով" },
            {
              label: "Պահանջներ վարկառուի և երաշխավոր անձանց նկատմամբ",
              value: {
                text: "ՀՀ ռեզիդենտ իրավաբանական անձ, անհատ ձեռնարկատեր",
                items: [
                  "Հաճախորդը ունի 2 և ավել տարի ունի Պետական մարմինների հետ Երաշխիքային համագործակցության փորձ (յուրաքանչյուր տարվա համար առնվազն մեկ պայմանագիր),",
                  "Դիմումի պահին ժ/ց կամ դասակարգված լինելու բացակայություն",
                  "Վերջին 12 ամսում գումարային ժամկետանց օրերը չեն գերազանցում 30 օրը, միանվագ՝ 15 օրը։",
                  "Չունի Հարկային ժամկետանց պարտավորություններ և տույժեր,",
                  "Վերջին 24 ամսում չի գրանցվել հասույթի ավել քան 20% նվազում /հարկային հաշվետվությունների համաձայն/,",
                  "Վերջին 24 ամսում չի ունեցել դասակարգված վարկային պարտավորություններ",
                  "Հիմնադրի և/կամ իրական շահառուի անձնական երաշխավորությունը:",
                ],
              },
            },
            { label: "Ապահովվածություն", value: "Բանկի համար ընդունելի անշարժ գույք" },
            { label: "Տարեկան տոկոսադրույք", value: "3-6%" },
            { label: "Չեղյալ համարում", value: "25 000 ՀՀ դրամ" },
            { label: "Վճարում պահանջի դիմաց", value: "0.5%, նվազ. 50,000 ՀՀ դրամ" },
            {
              label: "Վարկ դառնալու դեպքում",
              value: "ՀՀ կենտրոնական բանկի սահմանված բանկային տոկոսի հաշվարկային տոկոսադրույքի կրկնապատիկի չափով",
            },
          ],
        },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-medium text-lg">
        Բեռնվում է տվյալները Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-8 text-base leading-relaxed">
            
            <h1 className="text-3xl font-bold text-gray-900">Երաշխիք</h1>

            <div className="space-y-4 text-gray-700">
              {introTexts.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            <div className="pt-4">
              <h2 className="text-xl font-bold text-purple-800 mb-6">
                Բանկային երաշխիքների հիմնական տեսակները
              </h2>

              <div className="space-y-6">
                {guaranteeTypes.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-700"></span>
                      {item.title}
                    </h3>

                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm space-y-2">
                      <p className="text-sm italic text-gray-500">{item.subtitle}</p>
                      <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <h2 className="text-xl font-bold text-purple-800 mb-4">
                Բանկային երաշխիքների առավելությունները
              </h2>
              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                {advantages.map((adv, index) => (
                  <li key={index}>{adv}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <h2 className="text-xl font-bold text-purple-800 mb-2">
                Բանկային երաշխիքի պայմաններ
              </h2>
            </div>
            
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
              ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
            </h2>
            
            <div className="space-y-4">
              {GarantAccordionsData.map((item) => (
                <LeasingAccordion
                  key={item.docId}
                  title={item.title}
                  blocks={item.blocks}
                />
              ))}
            </div>

            <div className="pt-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <Link to="/news" className="hover:opacity-80 transition-opacity">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight cursor-pointer">
                    Վերջին նորությունները
                  </h2>
                </Link>
                
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {salaryitems.map((item) => (
                  <EvocaNewsCard key={item.id || item.title} item={item} />
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

export default Garant;