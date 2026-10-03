import React from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';

function Departments() {
    const logo = (id, ext = 'png') =>
  `https://www.evoca.am/images-cache/awards/1/${id}/140x65.${ext}`;

const NEWS = 'https://www.evoca.am/hy/news';
   const awards = [
  // ───────────── Էջ 1 ─────────────
  { id: 1, year: '2026', title: 'Դեպոզիտարիայի ավտոմատացված համակարգերի կիրառման լավագույն գործընկեր', sourceName: 'AMX', logoUrl: logo('17823898849383'), link: `${NEWS}/prizes/new-award-from-amx` },
  { id: 2, year: '2026', title: 'Լավագույն ՓՄՁ բանկը Հայաստանում', sourceName: 'The Digital Banker', logoUrl: logo('17793449348871'), link: `${NEWS}/prizes/new-award-best-sme-bank-by-digital-banker-2026` },
  { id: 3, year: '2026', title: 'Excellence in Travel Segment Innovation', sourceName: 'Mastercard', logoUrl: logo('17793444931672'), link: `${NEWS}/prizes/new-award-by-mastercard-excellence-in-travel-segment-innovation` },
  { id: 4, year: '2025', title: 'Best AI-Powered Mobile App', sourceName: 'The Digital Banker', logoUrl: logo('17701876298505'), link: `${NEWS}/prizes/new-award-evocatouch-best-ai-powered-mobile-app` },
  { id: 5, year: '2025', title: 'Highest Cashless Achievement', sourceName: 'Visa International', logoUrl: logo('17696923392309'), link: `${NEWS}/prizes/new-award-evocabank-highest-cashless-achievement` },
  { id: 6, year: '2025', title: 'Լավագույն թվային բանկը Հայաստանում 2025', sourceName: 'Global Finance', logoUrl: logo('17635322442852'), link: `${NEWS}/prizes/best-digital-bank-2025-by-global-finance-magazine` },
  { id: 7, year: '2025', title: 'Ամենանորարար ՓՄՁ վարկավորման գործընկերը ՀՀ-ում', sourceName: 'International Finance Magazine', logoUrl: logo('17574258664115', 'jpg'), link: `${NEWS}/prizes/new-award-most-innovative-smes-lending-partner-banking-armenia-2025` },
  { id: 8, year: '2025', title: 'Լավագույն Բանկը Հայաստանում 2025', sourceName: 'International Investor Magazine', logoUrl: logo('1751877049822'), link: `${NEWS}/prizes/best-bank-in-armenia-2025-new-award-from-international-investor-magazine` },
  { id: 9, year: '2025', title: 'Best Mobile Banking in Armenia', sourceName: 'Global Business & Finance Magazine', logoUrl: logo('17383050368673'), link: `${NEWS}/prizes/2-new-awards-from-global-business-and-finance-magazine` },
  { id: 10, year: '2025', title: 'Լավագույն ՓՄՁ բանկը Հայաստանում', sourceName: 'The Digital Banker', logoUrl: logo('17435922177711'), link: `${NEWS}/prizes/new-award-best-sme-bank-in-armenia-by-digital-banker` },
  { id: 11, year: '2025', title: 'Most Innovative Digital Bank in Armenia', sourceName: 'Global Business & Finance Magazine', logoUrl: logo('17383046771156'), link: `${NEWS}/prizes/2-new-awards-from-global-business-and-finance-magazine` },
  { id: 12, year: '2025', title: 'Award for the Development of International Banking Cooperation', sourceName: 'BACEE', logoUrl: logo('17518766542368', 'jpg'), link: `${NEWS}/prizes/award-from-bacee` },
  { id: 13, year: '2025', title: 'Excellence in New Products Development', sourceName: 'Mastercard', logoUrl: logo('17375257427062'), link: `${NEWS}/prizes/new-award-by-mastercard-excellence-in-new-products-development` },
  { id: 14, year: '2024', title: 'Highest Cashless Ratio Achievement', sourceName: 'Visa International', logoUrl: logo('1737525618015'), link: `${NEWS}/prizes/new-award-from-visa-highest-cashless-ratio-achievement` },
  { id: 15, year: '2024', title: 'Լավագույն բջջային նորարարական բանկային հավելված՝ EvocaTOUCH', sourceName: 'Armenia Digital Awards', logoUrl: logo('17313099132025', 'jpg'), link: `${NEWS}/prizes/new-prizes-for-evocabank-by-armenia-digital-awards` },
  { id: 16, year: '2024', title: 'Լավագույն վեբ դիզայն՝ evoca.am', sourceName: 'Armenia Digital Awards', logoUrl: logo('17313098079024', 'jpg'), link: `${NEWS}/prizes/new-prizes-for-evocabank-by-armenia-digital-awards` },
  { id: 17, year: '2025', title: 'Լավագույն ՓՄՁ բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('17313900934253'), link: `${NEWS}/prizes/new-award-the-best-sme-bank-in-armenia` },
  { id: 18, year: '2024', title: 'Ամենաինովացիոն թվային բանկը Հայաստանում', sourceName: 'Global Business and Finance Magazine', logoUrl: logo('17072198344896'), link: `${NEWS}/prizes/evoca-new-award-global-business-and-finance/` },
  { id: 19, year: '2024', title: 'Լավագույն թվային բանկը Հայաստանում', sourceName: 'Global Banking & Finance Review', logoUrl: logo('17241397647186'), link: `${NEWS}/prizes/best-digital-bank-global-banking-and-finance-review` },
  { id: 20, year: '2024', title: 'Աջակցություն Project Management-ի զարգացմանը', sourceName: 'PMI Armenia', logoUrl: logo('17310464503321'), link: null },

  // ───────────── Էջ 2 ─────────────
  { id: 21, year: '2024', title: 'Հայաստանում ամենաարագ զարգացող բանկը', sourceName: 'Global Business and Finance Magazine', logoUrl: logo('17072195162357'), link: `${NEWS}/prizes/evoca-new-award-global-business-and-finance/` },
  { id: 22, year: '2023', title: 'Լավագույն սպառողական թվային բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('1731390031829'), link: `${NEWS}/prizes/evoca-new-awards` },
  { id: 23, year: '2023', title: 'Լավագույն սպառողական մոբայլ բանկային հավելվածը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('17313902089445'), link: `${NEWS}/prizes/evoca-new-awards` },
  { id: 24, year: '2023', title: 'Լավագույն ՓՄՁ բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('17313900844335'), link: `${NEWS}/prizes/evoca-new-awards` },
  { id: 25, year: '2023', title: 'Լավագույն կորպորատիվ թվային բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('173139007691'), link: `${NEWS}/prizes/evoca-new-awards` },
  { id: 26, year: '2023', title: 'Թվային վճարումների և փոխանցումների իրականացում', sourceName: 'Visa International', logoUrl: logo('17055135680732'), link: `${NEWS}/prizes/visa-award-evoca/` },
  { id: 27, year: '2023', title: '«Օրինապահ հարկ վճարող» հավաստագիր', sourceName: 'ՀՀ ՊԵԿ', logoUrl: logo('17055138877901'), link: `${NEWS}/prizes/orinapah` },
  { id: 28, year: '2023', title: 'Ամենանորարար թվային բանկը Հայաստանում', sourceName: 'Global Business & Finance Magazine', logoUrl: logo('17055134304923'), link: `${NEWS}/prizes/most-innovative-digital-bank-2023/` },
  { id: 29, year: '2023', title: 'Լավագույն ՓՄՁ բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('1731390000202'), link: `${NEWS}/prizes/GlobalFinanceSME2022` },
  { id: 30, year: '2023', title: 'Երիտասարդ սերնդի արժեքների զարգացում', sourceName: 'Mastercard', logoUrl: logo('17055141093721'), link: `${NEWS}/prizes/award-mastercard/` },
  { id: 31, year: '2023', title: 'Wallet վճարումների դինամիկ աճ', sourceName: 'Mastercard', logoUrl: logo('17055141832399'), link: `${NEWS}/prizes/award-mastercard/` },
  { id: 32, year: '2023', title: 'Լավագույն ՓՄՁ բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('17313900189761'), link: `${NEWS}/prizes/evoca-new-awards/` },
  { id: 33, year: '2022', title: 'Լավագույն ՓՄՁ բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('16354146742877'), link: `${NEWS}/prizes/GlobalFinanceSME/` },
  { id: 34, year: '2022', title: 'Վիզա պրեմիումի ակտիվ թողարկում', sourceName: 'Visa International', logoUrl: logo('16437157244908'), link: `${NEWS}/prizes/visa-award/` },
  { id: 35, year: '2021', title: 'Լավագույն մոբայլ բանկը ՀՀ՝ ըստ SME Banking Club-ի', sourceName: 'SME Banking Club', logoUrl: logo('16219504835691'), link: `${NEWS}/prizes/SME-best-mobile-banking` },
  { id: 36, year: '2021', title: 'Լավագույն թվային բանկը Հայաստանում', sourceName: 'Global Banking & Finance Review', logoUrl: logo('16226409536362'), link: `${NEWS}/prizes/global-finance-banking/` },
  { id: 37, year: '2021', title: 'Լավագույն սպառողական թվային բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('16462156649724'), link: `${NEWS}/prizes/global_finance_2021/` },
  { id: 38, year: '2021', title: 'Պատվավոր Մրցանակ Awwwards թիմի կողմից', sourceName: 'Awwwards', logoUrl: logo('16462160125686'), link: `${NEWS}/prizes/new-website-award/` },
  { id: 39, year: '2020', title: 'Լավագույն մոբայլ բանկը Հայաստանում՝ ըստ SME Banking club-ի', sourceName: 'Global Finance', logoUrl: logo('16462055394053'), link: `${NEWS}/prizes/sme-banking-club-names-the-best-mobile-bank-in-armenia` },
  { id: 40, year: '2020', title: 'Լավագույն թվային բանկը Հայաստանում', sourceName: 'Global Banking and Finance Review', logoUrl: logo('16462162960815'), link: `${NEWS}/prizes/best-digital-bank-in-armenia/` },

  // ───────────── Էջ 3 ─────────────
  { id: 41, year: '2020', title: 'Լավագույն սպառողական թվային բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('16106008072839', 'jpg'), link: `${NEWS}/prizes/best-consumer-digital-bank-of-armenia` },
  { id: 42, year: '2019', title: 'Որակի գերազանցություն', sourceName: 'Raiffeisen Bank International', logoUrl: logo('16098669809094', 'jpg'), link: `${NEWS}/prizes/stp-quality-award-2018-2019/` },
  { id: 43, year: '2019', title: 'Լավագույն սպառողական թվային բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('16098679623038', 'jpg'), link: `${NEWS}/prizes/best-consumer-digital-bank-of-armenia-2019/` },
  { id: 44, year: '2019', title: 'Տարվա նոր պրոդուկտի շնորհանդես', sourceName: 'KamoBlog', logoUrl: logo('16098682385728', 'jpg'), link: `${NEWS}/products/new-product-of-the-year-presentation` },
  { id: 45, year: '2018', title: 'Լավագույն սպառողական թվային բանկը Հայաստանում', sourceName: 'KamoBlog', logoUrl: logo('16098667212781', 'jpg'), link: `${NEWS}/banking/best-consumer-digital-bank` },
  { id: 46, year: '2017', title: 'Տարվա լավագույն միջոցառում', sourceName: 'KamoBlog', logoUrl: logo('16098665220476', 'jpg'), link: null },
  { id: 47, year: '2017', title: 'Լավագույն սպառողական թվային բանկը Հայաստանում', sourceName: 'Global Finance', logoUrl: logo('16098526693013', 'jpg'), link: `${NEWS}/prizes/best-consumer-digital-bank-december-2017/` },
];
  return (
    <>
      <Header />
      <Navbar />
      <Footer />
    </>
  );
}

export default Departments;