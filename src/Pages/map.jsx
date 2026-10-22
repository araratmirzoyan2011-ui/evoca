import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';

const sitemapData = [
  {
    title: "Անհատ",
    path: "/loans",
    subsections: [
      {
        title: "Վարկեր",
        path: "/loans",
        items: [
          { label: "Վարկեր", path: "/loans" },
          { label: "Վարկային պատմություն և սքոր", path: "/credit-history" },
          { label: "Կարևոր տեղեկատվություն", path: "/mportant-info" }
        ]
      },
      {
        title: "Քարտեր",
        path: "/cards",
        items: [
          { label: "Քարտեր", path: "/cards" },
          { label: "Քարտերի տրամադրում և սպասարկում", path: "/cards-provision-and-service" },
          { label: "Սոցիալական ապահովության վճարային քարտեր", path: "/pension-cards" },
          { label: "Evoca Benefits", path: "/evoca-benefits" }
        ]
      },
      {
        title: "Ավանդներ",
        path: "/depositsmain",
        items: [
          { label: "Ավանդներ", path: "/depositsmain" },
          { label: "Կարևոր տեղեկատվություն", path: "/deposits-important-information" }
        ]
      },
      {
        title: "Հաշիվներ",
        path: "/accounts",
        items: [
          { label: "Evoca խնայողական հաշիվ", path: "/accounts" },
          { label: "Հաշիվների բացում և սպասարկում", path: "/savings" },
          { label: "Առարկայազուրկ մետաղական հաշիվներ", path: "/metal-accounts" },
          { label: "Ոչ ռեզիդենտ հաճախորդների հեռավար սպասարկում", path: "/non-resident" }
        ]
      },
      {
        title: "Փոխանցումներ",
        path: "/transfers",
        items: [
          { label: "Դրամական փոխանցումներ", path: "/transfers" },
          { label: "Վճարային համակարգեր", path: "/transfer-payment-systems" }
        ]
      },
      {
        title: "Արժեթղթեր",
        path: "/securities",
        items: [
          { label: "Ներդրումային ծառայություններ", path: "/securities" },
          { label: "Պարտատոմսեր", path: "/bonds" },
          { label: "ՀԿԴ ծառայություններ", path: "/stocks-cda-services" },
          { label: "Ռեպո/Հակադարձ ռեպո գործարքներ", path: "/stocks-repo-transactions" },
          { label: "EvocaINVEST", path: "/stocks-evocainvest" },
          { label: "EvocaSALARY", path: "/evoca-salary" },
          { label: "EvocaTOUCH", path: "/evoca-touch" }
        ]
      }
    ]
  },
  {
    title: "Բիզնես",
    path: "/business-loans",
    subsections: [
      {
        title: "Վարկեր",
        path: "/business-loans",
        items: [
          { label: "Բիզնես վարկեր", path: "/business-loans" }
        ]
      },
      {
        title: "Լիզինգ",
        path: "/leasing",
        items: [
          { label: "Evoca Leasing", path: "/leasing" },
          { label: "Հատուկ առաջարկ", path: "/special-offer" }
        ]
      },
      {
        title: "Հաշիվներ",
        path: "/business-account-opening-and-services",
        items: [
          { label: "Հաշիվների բացում և սպասարկում", path: "/business-account-opening-and-services" },
          { label: "Առարկայազուրկ մետաղական հաշիվներ", path: "/business-unallocated-metal-accounts" }
        ]
      },
      {
        title: "Ավանդներ",
        path: "/business-classical-deposit",
        items: [
          { label: "Դասական ավանդ", path: "/business-classical-deposit" }
        ]
      },
      {
        title: "Արժեթղթերի շուկա",
        path: "/guarantee",
        items: [
          { label: "Ներդրումային ծառայություններ", path: "/guarantee" },
          { label: "Պարտատոմսեր", path: "/busines-bonds" },
          { label: "ՀԿԴ ծառայություններ", path: "busines-stocks-cda-services" },
          { label: "Ռեպո/Հակադարձ ռեպո գործարքներ", path: "/busines-stocks-repo-transactions" },
          { label: "EvocaINVEST", path: "stocks-evocainvest" }
        ]
      },
      {
        title: "Առևտրի ֆինանսավորում",
        path: "/business-investment-services",
        items: [
          { label: "Երաշխիք", path: "/business-investment-services" },
          { label: "Ֆակտորինգային ֆինանսավորում", path: "/factoring-finance" },
          { label: "Ակրեդիտիվ", path: "/letter-of-credit" },
          { label: "Ինկասո", path: "/documentary-collection" }
        ]
      },
      {
        title: "Դիջիտալ",
        path: "/v-pos-terminal",
        items: [
          { label: "V-POS Տերմինալ", path: "/v-pos-terminal" },
          { label: "POS Տերմինալ", path: "/pos-terminal" },
          { label: "Սակագներ", path: "/terminal-tariffs" },
          { label: "Տերմինալի տեղադրման հայտ", path: "/terminal-installation-application" },
          { label: "Evoca Mobile POS` mPOS", path: "/evoca-mobile-pos-mpos" }
        ]
      },
      {
        title: "Այլ",
        path: "/boxes",
        items: [
          { label: "Պահատուփեր", path: "/boxes" },
          { label: "Փոխանցումներ", path: "/business-money-transfers" }
        ]
      }
    ]
  },
  {
    title: "Ակնթարթային վճարումներ",
    path: "/instant-payments",
    subsections: []
  },
  {
    title: "Մեր մասին",
    path: "/about",
    subsections: [
      {
        title: "evoca-ի մասին",
        path: "/about",
        items: [
          { label: "Կառուցվածք", path: "/structure" },
          { label: "Բաժնետերեր", path: "/shareholders" },
          { label: "Ղեկավարություն", path: "/management" },
          { label: "Գործընկերներ", path: "/partners" },
          { label: "Մրցանակներ", path: "/departments" },
          { label: "CSR", path: "/csr" },
          { label: "Evoca Ֆինանսական խումբ", path: "/evoca-group" }
        ]
      }
    ]
  },
  {
    title: "Սակագներ",
    path: "/tariffs",
    subsections: [
      {
        title: "Սակագներ",
        path: "/tariffs",
        items: [
          { label: "Վարկեր ֆիզիկական անձանց", path: "/իndividual-loans" },
          { label: "Վարկեր իրավաբանական անձանց", path: "/tariffs" },
          { label: "Միջնորդավճարների սակագներ", path: "/legal-loans" },
          { label: "Ավանդների սակագներ", path: "/deposits" },
          { label: "Արխիվ", path: "/archive" }
        ]
      }
    ]
  },
  {
    title: "Հաշվետվություններ",
    path: "/reports",
    subsections: [
      {
        title: "Հաշվետվություններ",
        path: "/reports",
        items: [
          { label: "Աուդիտորական եզրակացություն", path: "/reports" },
          { label: "Ֆինանսական հաշվետվություններ", path: "/financial-reports" },
          { label: "Ներդրողների համար", path: "/investors" },
          { label: "Կիսամյակային հաշվետվություն", path: "/semiannual-report" },
          { label: "Տարեկան հաշվետվություն", path: "/reports/annual" },
          { label: "Հայտարարություններ", path: "/annual-report" }
        ]
      }
    ]
  },
  {
    title: "Նորություններ",
    path: "/news",
    subsections: []
  },
  {
    title: "Բլոգ",
    path: "/blog",
    subsections: []
  },
  {
    title: "Կարիերա",
    path: "/career",
    subsections: [
      {
        title: "Կարիերա",
        path: "/career",
        items: [
          { label: "Evoca Լայֆ", path: "/career" },
          { label: "Մշակույթ", path: "/career" },
          { label: "Առավելություններ", path: "/plus" },
          { label: "Հաճախ տրվող հարցեր", path: "/answers" },
          { label: "Ինչպես ընդունվել աշխատանքի Evocabank-ում", path: "/evocawork" },
          { label: "Աշխատանք և պրակտիկա", path: "/evokawork2" },
          { label: "Ուսումնական պրակտիկա", path: "/internship" },
          { label: "EvocaBRIDGE", path: "/bridge" }
        ]
      }
    ]
  },
  {
    title: "Բանկի մասին",
    path: "/about",
    subsections: [
      {
        title: "Բանկի մասին",
        path: "/about",
        items: [
          { label: "Մեր մասին", path: "/about" },
          { label: "Ղեկավարություն", path: "/management" },
          { label: "Բաժնետերեր", path: "/shareholders" },
          { label: "Հաշվետվություններ", path: "/reports" },
          { label: "Իրավական ակտեր", path: "/laws" },
          { label: "Սակագներ", path: "/tariffs" },
          { label: "Օտարվող գույք", path: "/property" },
          { label: "Կառուցապատողներ", path: "/builders" },
          { label: "Գործընկեր ավտոսրահներ", path: "/dealers" },
          { label: "Սակագների արխիվ", path: "/archive" }
        ]
      }
    ]
  },
  {
    title: "Օգտակար հղումներ",
    path: "/rights",
    subsections: [
      {
        title: "Օգտակար հղումներ",
        path: "/rights",
        items: [
          { label: "Հաճախորդի իրավունքները (Բողոքի ներկայացման կանոններ)", path: "/rights" },
          { label: "Հաճախորդի ռեզիդենտության չափանիշներ", path: "/criteria" },
          { label: "Կարգավորում", path: "/regulation" },
          { label: "Գաղտնիության քաղաքականություն", path: "/privacy" },
          { label: "Ֆին. հաշտարար", path: "/ombudsman" },
          { label: "Ֆինանսական հանցագործությունների կանխարգելում", path: "/security" },
          { label: "Հղումներ Բանկի քարտապանների համար", path: "/cardholders" }
        ]
      }
    ]
  },
  {
    title: "Այլ հղումներ",
    path: "/online",
    subsections: [
      {
        title: "Այլ հղումներ",
        path: "/online",
        items: [
          { label: "EvocaONLINE", path: "/online" },
          { label: "Պահատուփեր", path: "/boxes" },
          { label: "Հաճախ տրվող հարցեր", path: "/faq" },
          { label: "Հայտարարություններ", path: "/announcements" },
          { label: "Dibrary", path: "/dibrary" },
          { label: "Բուկլետներ", path: "/bulletins" },
          { label: "Հետադարձ կապ", path: "/contact" },
          { label: "Կայքի քարտեզ", path: "/map" }
        ]
      }
    ]
  }
];

const Map = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-10 text-gray-900 border-b pb-4">Կայքի քարտեզ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start">
          {sitemapData.map((category, index) => (
            <div key={index} className="space-y-6 h-auto">
              <h2 className="text-xl font-bold border-b-2 border-purple-600 pb-2">
                <Link to={category.path} className="text-gray-900 hover:text-purple-700 transition-colors block">
                  {category.title}
                </Link>
              </h2>
              
              {category.subsections && category.subsections.map((sub, sIndex) => (
                <div key={sIndex} className="space-y-2">
                  <h3 className="font-bold text-sm">
                    <Link to={sub.path} className="text-gray-800 hover:text-purple-700 transition-colors block">
                      {sub.title}
                    </Link>
                  </h3>
                  <ul className="space-y-2 pl-1">
                    {sub.items.map((item, iIndex) => (
                      <li key={iIndex}>
                        <Link 
                          to={item.path} 
                          className="text-gray-600 hover:text-purple-700 hover:underline text-sm transition-colors block"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Map;