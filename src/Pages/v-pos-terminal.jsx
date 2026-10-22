import React from "react";
import { Link } from "react-router-dom";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
import { OnlineBanking } from "../Components/OnlineBanking.jsx";
const VPos = () => {
  // 1. Մենյուի տվյալներ
  const menuItems = [
    { label: "V-POS Տերմինալ", path: "/v-pos-terminal", order: 1 },
    { label: "POS Տերմինալ", path: "/pos-terminal", order: 2 },
    { label: "Սակագներ", path: "/terminals-tariffs", order: 3 },
    { label: "Տերմինալի տեղադրման հայտ", path: "/terminal-installation-application", order: 4 },
    { label: "Evoca Mobile POS' mPOS", path: "/evoca-mobile-pos-mpos", order: 5 }
  ];

  // 2. Գլխավոր քարտի տվյալներ
  const cardData = {
    title: "V-POS Տերմինալ",
    description: "V-POS-ը (virtual point of sale) վիրտուալ վճարային համակարգը է, որը հարմարավետ, ապահով և հեշտ լուծում է օնլայն առևտրով զբաղվող բիզնեսների համար։ Արագ և տեղում օնլայն վճարումներ կատարելն այսօր կարևոր նախապայման է Ձեր գնորդների համար։",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/16158111599306/780x585.jpg",
    altText: "V-POS Տերմինալ"
  };

  // 3. Ներածական տեքստեր
  const introParagraphs = [
    <span>
      Evocabank-ը կապահովի Ձեր կայքում V-POS տերմինալի տեղադրումը: Այն հնարավորություն կտա Ձեզ{" "}
      <Link to="#" className="text-purple-700 underline">խուսափել լրացուցիչ ծրագրային ծախսերից</Link>
      , սերտիֆիկացումից և հետագա ծրագրային ապահովումից:
    </span>,
    "Ձեր գնորդները կկարողանան գնումներ կատարել Ձեր կայքից ու վճարել դրանց համար իրենց միջազգային VISA, Mastercard և տեղական ArCa վճարային քարտերով:",
    <span>
      V-POS-ը հասանելի կլինի ինչպես <Link to="#" className="text-purple-700 underline">Ձեր կայքում</Link>
      , այնպես էլ <Link to="#" className="text-purple-700 underline">մոբայլ հավելվածում</Link>:
    </span>
  ];

  // 4. Առավելությունների ցանկ
  const benefits = [
    <span>
      Օնլայն վաճառքների շնորհիվ <Link to="#" className="text-purple-700 underline">կաճեն Ձեր եկամուտները</Link>,
    </span>,
    <span>
      Evocabank-ը V-POS-ով կատարված վաճառքներից կգանձի{" "}
      <span className="font-semibold">նվազագույն միջնորդավճարներ</span>՝ հատուկ Ձեր բիզնեսի համար:
    </span>
  ];

  // 5. Սակագների աղյուսակ
  const tariffTable = {
    headers: [
      "Գործարքի տեսակ",
      "Արքա /ArCa/ վճարային համակարգի քարտերով կատարված գործարքների դեպքում",
      "ՀՀ տարածքում գործող բանկերի կողմից թողարկված MasterCard, Visa քարտերի դեպքում",
      "Արտասահմանյան բանկերի կողմից թողարկված MasterCard, Visa քարտերի դեպքում",
      "QR կոդով վճարման դեպքում"
    ],
    rows: [
      {
        type: "Վճարվող գումարի չափ",
        values: ["1.50%", "1.90%", "3.00%", "1%"]
      },
      {
        type: "200,000 (երկու հարյուր հազար) ՀՀ դրամը չգերազանցող շրջանառության պարագայում",
        values: ["", "", "3000", ""]
      },
      {
        type: "Վճարային էջի ստանդարտից դուրս դիզայնի պատվիրման պարագայում",
        values: ["", "", "20000", ""]
      }
    ],
    footnotes: [
      "[1] կախված ոլորտի առանձնահատկություններից և շրջանառությունից՝ սակագները կարող են փոխվել",
      "[2] Ներառյալ կիրառելի բոլոր հարկերը",
      "[3] Ներառյալ կիրառելի բոլոր հարկերը"
    ]
  };

  // 6. Հատկանիշներ
  const securityFeatures = [
    <span>
      Վճարումներն անվտանգ են, գործում են{" "}
      <Link to="#" className="text-purple-700 font-semibold underline">3D Secure Code</Link>{" "}
      անվտանգության համակարգերը,
    </span>,
    "Վճարման պարզ գործընթաց, Ձեր գնորդները վճարում կկատարեն 1 քայլով,",
    <span>
      <span className="text-purple-700 font-semibold">Անվճար տեխնիկական խորհրդատվություն և տեխնիկական սպասարկում</span>{" "}
      Բանկի մասնագետների կողմից,
    </span>,
    "Անհատական մոտեցում Ձեր բիզնեսին ու կայքին:"
  ];

  // 7. Քայլերի հաջորդականություն
  const steps = [
    "Մեր մասնագետը 3 աշխատանքային օրում կապ կհաստատի Ձեզ հետ, կներկայացնի պայմանները, կպատասխանի Ձեր բոլոր հարցերին և կպատրաստի գործընթացի համար անհրաժեշտ բոլոր փաստաթղթերը։",
    "Պայմանագրի ստորագրումից հետո V-POS-ը կտեղադրվի Ձեր բիզնեսի կայքում:"
  ];

  // 8. Բիզնես վարկի տվյալներ
  const businessLoanData = {
    title: "Բիզնես վարկ POS տերմինալի շրջանառության հիման վրա",
    description: "Եթե ունեք փոքր և միջին բիզնես ու իրականացնում եք անկանխիկ գործարքներ,ապա այս բիզնես վարկը Ձեզ համար է: Մեզ մոտ փոքր և միջին բիզնեսներն ունեն հնարավորություն ձևակերպել արագ բիզնես վարկեր իրենց կարճաժամկետ ֆինանսական խնդիրները լուծելու համար:",
    applicantsTitle: "Վարկի համար կարող են դիմել՝",
    applicants: [
      "ՀՀ ռեզիդենտ անհատ ձեռնարկատեր և իրավաբանական անձինք, ովքեր գրանցված գործունեություն են ծավալում առնվազն 12 ամիս",
      "Այն հաճախորդները, ովքեր Evocabank-ի հետ ունեն կնքված POS տերմինալի համագործակցության պայմանագիր"
    ],
    collateralTitle: "Որպես վարկի ապահովման միջոց կարող են հանդիսանալ՝",
    collateral: [
      "POS տերմինալի շրջանառություն",
      "Անհրաժեշտության դեպքում ֆիզիկական և/կամ իրավաբանական անձի երաշխավորություն"
    ],
    linkText: "Վարկի պայմաններին կարող եք ծանոթանալ այստեղ:"
  };

  // 9. Բիզնես օվերդրաֆտի տվյալներ
  const overdraftData = {
    title: "Բիզնես օվերդրաֆտ POS տերմինալի շրջանառության հիման վրա",
    description: "Evocabank-ում կարող եք ձեռք բերել բիզնես օվերդրաֆտ՝ առանց ավելորդ թղթաբանության և ժամանակի կորստի: Եթե կան կարճաժամկետ ֆինանսական խնդիրներ կամ պարզապես ցանկանում եք ավելի զարգացնել բիզնեսը, ապա մեզ մոտ շատ արագ և պարզ տարբերակով կարող եք ձևակերպել բիզնես օվերդրաֆտ:",
    applicantsTitle: "Վարկի համար կարող են դիմել՝",
    applicants: [
      "ՀՀ ռեզիդենտ իրավաբանական և անհատ ձեռնարկատեր անձինք, ովքեր գրանցված գործունեություն են ծավալում առնվազն 12 ամիս",
      "Այն հաճախորդները, ովքեր Evocabank-ի հետ ունեն կնքված POS տերմինալի համագործակցության առնվազն 6 ամսվա պայմանագիր"
    ],
    overdraftLinkText: "Օվերդրաֆտի պայմաններին կարող եք ծանոթանալ այստեղ:",
    otherLoansLinkText: "Մեր մյուս բիզնես վարկերին կարող եք ծանոթանալ այստեղ:",
    contactText: "Հարցերի դեպքում մեր թիմի հետ կարող եք կապ հաստատել հետևյալ հղումով:"
  };

  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />

      {/* Main container with safe padding for ultra-small screens */}
      <main className="w-full py-6 px-2 xs:px-4 md:px-12 bg-gray-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <InfoCard
            title={cardData.title}
            description={cardData.description}
            imageUrl={cardData.imageUrl}
            altText={cardData.altText}
          />
        </div>
      </main>

      <section className="w-full bg-white py-8 px-2 xs:px-4 md:px-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          {/* Desktop Social Icons */}
          <div className="hidden md:block shrink-0">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          {/* Main Content Area optimized for max-w and text-wrapping on small widths */}
          <div className="flex-1 w-full min-w-0 max-w-4xl text-gray-800 space-y-6 text-sm xs:text-base leading-relaxed break-words">
            
            {introParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <h3 className="text-lg xs:text-xl font-bold text-gray-900 pt-4">
              Իսկ ինչո՞ւ տեղադրել Evocabank-ի V-POS տերմինալ
            </h3>

            <ul className="list-disc pl-4 xs:pl-5 space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>

            <p className="pt-2">
              Սպասարկման կետի գրանցման համար անհրաժեշտ <span className="font-semibold text-purple-700">V-POS</span> տերմինալների տեղադրման ստանդարտ սակագներն են՝
            </p>

            {/* Responsive Table Wrapper for <=400px screens */}
            <div className="w-full overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-sm">
              <table className="w-full text-left border-collapse text-xs xs:text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-purple-50 text-gray-800 border-b border-gray-200">
                    {tariffTable.headers.map((header, idx) => (
                      <th key={idx} className="p-2.5 xs:p-3 border-r last:border-r-0 font-semibold align-top">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tariffTable.rows.map((row, idx) => (
                    <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                      <td className="p-2.5 xs:p-3 border-r font-medium bg-gray-50/50">{row.type}</td>
                      {row.values.map((val, vIdx) => (
                        <td key={vIdx} className="p-2.5 xs:p-3 border-r last:border-r-0 text-center">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              {tariffTable.footnotes.map((note, idx) => (
                <p key={idx}>{note}</p>
              ))}
            </div>

            <ul className="list-disc pl-4 xs:pl-5 space-y-3 pt-4">
              {securityFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <p className="pt-4 font-medium">
              V-POS տերմինալ տեղադրելու համար լրացրեք{" "}
              <Link to="/terminal-installation-application" className="text-purple-700 underline font-bold inline-block">
                Տերմինալի տեղադրման հայտ
              </Link>{" "}
              հիմա:
            </p>

            <ol className="list-decimal pl-4 xs:pl-5 space-y-4 pt-2">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="pt-8 border-t border-gray-200 space-y-8">
              
              <div>
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2">
                  Կառուցեք Ձեր բիզնեսի թվային ապագան:
                </h2>
                <p className="text-gray-700 mb-6">
                  Evocabank-ում այսուհետ գործում են բիզնես վարկ և բիզնես օվերդրաֆտ POS տերմինալի շրջանառության հիման վրա:
                </p>

                <div className="my-6">
                  <img
                    src="https://www.evoca.am/file_manager/pos2-600x315.jpg"
                    alt="Բիզնես վարկ և օվերդրաֆտ POS տերմինալի շրջանառության հիման վրա"
                    className="rounded-xl shadow-lg w-full max-w-2xl h-auto object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg xs:text-xl font-bold text-purple-800">
                  {businessLoanData.title}
                </h3>
                <p>{businessLoanData.description}</p>

                <p className="font-semibold text-gray-900 pt-2">
                  {businessLoanData.applicantsTitle}
                </p>
                <ul className="list-disc pl-4 xs:pl-5 space-y-2">
                  {businessLoanData.applicants.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <p className="font-semibold text-gray-900 pt-2">
                  {businessLoanData.collateralTitle}
                </p>
                <ul className="list-disc pl-4 xs:pl-5 space-y-2">
                  {businessLoanData.collateral.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <p className="pt-2">
                  Օգտվեք մեր կողմից տրվող հնարավորությունից և գրանցեք Ձեր նոր բիզնես հաջողությունները:
                </p>
                <p>
                  Վարկի պայմաններին կարող եք ծանոթանալ{" "}
                  <Link to="#" className="text-purple-700 underline font-bold">այստեղ</Link>:
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-lg xs:text-xl font-bold text-purple-800">
                  {overdraftData.title}
                </h3>
                <p>{overdraftData.description}</p>

                <p className="font-semibold text-gray-900 pt-2">
                  {overdraftData.applicantsTitle}
                </p>
                <ul className="list-disc pl-4 xs:pl-5 space-y-2">
                  {overdraftData.applicants.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <p className="pt-2">
                  Օվերդրաֆտի պայմաններին կարող եք ծանոթանալ{" "}
                  <Link to="#" className="text-purple-700 underline font-bold">այստեղ</Link>:
                </p>
                <p>
                  Մեր մյուս բիզնես վարկերին կարող եք ծանոթանալ{" "}
                  <Link to="#" className="text-purple-700 underline font-bold">այստեղ</Link>:
                </p>
                <p className="pt-2 font-medium">
                  Հարցերի դեպքում մեր թիմի հետ կարող եք կապ հաստատել հետևյալ{" "}
                  <Link to="#" className="text-purple-700 underline font-bold">հղումով</Link>:
                </p>
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

export default VPos;