import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase.js';

const translatedCreditBlocks = [
  // 1
  {
    id: 1,
    type: 'p',
    text: {
      hy: 'Վարկային պարտավորությունները չկատարելը կամ ոչ պատշաճ կատարելը կազդի Ձեր **ՎԱՐԿԱՅԻՆ ՊԱՏՄՈՒԹՅԱՆ** վրա։',
      en: 'Non-performance or improper performance of credit obligations will affect your **CREDIT HISTORY**.',
      ru: 'Неисполнение или ненадлежащее исполнение кредитных обязательств повлияет на вашу **КРЕДИТНУЮ ИСТОРИЮ**.'
    }
  },
  // 2
  {
    id: 2,
    type: 'sub',
    text: {
      hy: 'Ինչ է վարկային պատմությունը',
      en: 'What is credit history',
      ru: 'Что такое кредитная история'
    }
  },
  // 3
  {
    id: 3,
    type: 'p',
    text: {
      hy: '«Վարկային տեղեկատվության շրջանառության և վարկային բյուրոների գործունեության մասին» ՀՀ օրենքի համաձայն՝ վարկային պատմությունը ֆինանսական պարտավորությունների, դրանց կատարման կամ դրանց կատարման վերաբերյալ տեղեկատվություններ։',
      en: 'According to the RA Law "On Circulation of Credit Information and Activities of Credit Bureaus", credit history is information regarding financial obligations, their fulfillment, or performance.',
      ru: 'Согласно Закону РА «Об обращении кредитной информации и деятельности кредитных бюро», кредитная история — это информация о финансовых обязательствах, их исполнении или выполнении.'
    }
  },
  // 4
  {
    id: 4,
    type: 'p',
    text: {
      hy: 'Այն, որպես կանոն, օգտագործվում է ֆինանսական կազմակերպությունների կողմից վարկերի տրամադրման կամ այլ ծառայությունների իրացման վերաբերյալ որոշում կայացնելու ընթացքում։',
      en: 'It is typically used by financial institutions when making decisions on granting loans or providing other services.',
      ru: 'Она обычно используется финансовыми организациями при принятии решений о предоставлении кредитов или оказании других услуг.'
    }
  },
  // 5
  {
    id: 5,
    type: 'sub',
    text: {
      hy: 'Որոնք են վարկային պատմության ձևավորման աղբյուրները',
      en: 'What are the sources of forming credit history',
      ru: 'Каковы источники формирования кредитной истории'
    }
  },
  // 6
  {
    id: 6,
    type: 'p',
    text: {
      hy: 'Վարկային պատմության ձևավորման աղբյուրներն են ԱՔՌԱ գործընկեր կազմակերպությունները, պետական մարմինները, ինչպես նաև վարկային տեղեկատվության սուբյեկտի վերաբերյալ տեղեկություններ (տվյալներ)։',
      en: 'The sources of forming credit history are ACRA partner organizations, state bodies, as well as data regarding the subject of credit information.',
      ru: 'Источниками формирования кредитной истории являются организации-партнеры АКРА, государственные органы, а также данные о субъекте кредитной информации.'
    }
  },
  // 7
  {
    id: 7,
    type: 'sub',
    text: {
      hy: 'Ինչ է վարկային բյուրոն',
      en: 'What is a credit bureau',
      ru: 'Что такое кредитное бюро'
    }
  },
  // 8
  {
    id: 8,
    type: 'p',
    text: {
      hy: 'Վարկային բյուրո իրականացնում է իրավաբանական և ֆիզիկական անձանց վերաբերյալ տվյալների հավաքագրում, մշակում և դրանց հիման վրա վարկային զեկույցի պատրաստման գործունեություն։',
      en: 'A credit bureau collects and processes data on legal entities and individuals and prepares credit reports based on them.',
      ru: 'Кредитное бюро осуществляет сбор, обработку данных о юридических и физических лицах и подготовку кредитных отчетов на их основе.'
    }
  },
  // 9
  {
    id: 9,
    type: 'p',
    text: {
      hy: 'Վարկային բյուրոյի ծառայությունների շնորհիվ յուրաքանչյուր իրավաբանական կամ ֆիզիկական անձ հնարավորություն է ստանում․',
      en: 'Thanks to the services of the credit bureau, every legal entity or individual gets the opportunity to:',
      ru: 'Благодаря услугам кредитного бюро каждое юридическое или физическое лицо получает возможность:'
    }
  },
  // 10
  {
    id: 10,
    type: 'list',
    items: [
      {
        hy: 'ժամանակին կատարելով իր ֆինանսական պարտավորությունները՝ ձևավորել դրական վարկային պատմություն և ֆինանսական ծառայություններից արտոնյալ պայմաններով օգտվելու համար,',
        en: 'by timely fulfilling financial obligations, build a positive credit history and benefit from financial services on favorable terms,',
        ru: 'своевременно исполняя свои финансовые обязательства, сформировать положительную кредитную историю и пользоваться финансовыми услугами на льготных условиях,'
      },
      {
        hy: 'ճիշտ կառավարել սեփական ֆինանսական պարտավորությունները՝ ստանալով ամբողջական տեղեկատվություն պարտավորությունների կատարման ընդհանուր պատկերի մասին։',
        en: 'properly manage financial obligations by receiving complete information about the overall status of obligation performance.',
        ru: 'правильно управлять своими финансовыми обязательствами, получая полную информацию об общей картине их исполнения.'
      }
    ]
  },
  // 11
  {
    id: 11,
    type: 'p',
    text: {
      hy: 'Վարկային բյուրոյի ծառայությունները թույլ են տալիս խուսափել ֆինանսական գերբեռնվածությունից և աջակցելու պարտավորությունների ժամանակին կատարմանը։',
      en: 'Credit bureau services allow avoiding financial overload and support the timely fulfillment of obligations.',
      ru: 'Услуги кредитного бюро позволяют избежать финансовой перегрузки и способствуют своевременному исполнению обязательств.'
    }
  },
  // 12
  {
    id: 12,
    type: 'sub',
    text: {
      hy: 'Ինչ է վարկային զեկույցը',
      en: 'What is a credit report',
      ru: 'Что такое кредитный отчет'
    }
  },
  // 13
  {
    id: 13,
    type: 'p',
    text: {
      hy: 'Վարկային զեկույցը գրավոր կամ էլեկտրոնային փաստաթուղթ է, որը պարունակում է վարկառուի ֆինանսական պարտավորությունների կատարման վերաբերյալ տեղեկատվություն։',
      en: 'A credit report is a written or electronic document containing information on the performance of borrower financial obligations.',
      ru: 'Кредитный отчет — это письменный или электронный документ, содержащий информацию об исполнении финансовых обязательств заемщика.'
    }
  },
  // 14
  {
    id: 14,
    type: 'p',
    text: {
      hy: 'Զեկույցը կազմված է ԱՔՌԱ գործընկեր կազմակերպությունների կողմից տրամադրված տվյալներից և ներառում է հարցման պահից վերջին 5 տարվա վարկային տվյալները։',
      en: 'The report consists of data provided by ACRA partner organizations and includes credit data for the last 5 years from the moment of request.',
      ru: 'Отчет состоит из данных, предоставленных организациями-партнерами АКРА, и включает кредитные данные за последние 5 лет на момент запроса.'
    }
  },
  // 15
  {
    id: 15,
    type: 'sub',
    text: {
      hy: 'Որքան ժամանակ է պահպանվում վարկային պատմությունը',
      en: 'How long is credit history retained',
      ru: 'Как долго сохраняется кредитная история'
    }
  },
  // 16
  {
    id: 16,
    type: 'p',
    text: {
      hy: 'Համաձայն «Վարկային տեղեկատվության շրջանառության և վարկային բյուրոների գործունեության մասին» ՀՀ օրենքի՝ վարկային բյուրոն իրավունք չունի հարցնողին տրամադրել տեղեկատվության ստացման պահին նախորդող հինգ տարուց ավելի վարկային տեղեկատվություն։',
      en: 'According to the RA Law "On Circulation of Credit Information and Activities of Credit Bureaus", the credit bureau has no right to provide credit information older than five years preceding the moment of request.',
      ru: 'Согласно Закону РА «Об обращении кредитной информации и деятельности кредитных бюро», кредитное бюро не имеет права предоставлять запрашивающему информацию старше пяти лет, предшествующих моменту запроса.'
    }
  },
  // 17
  {
    id: 17,
    type: 'sub',
    text: {
      hy: 'Ինչպես բարելավել վարկային պատմությունը',
      en: 'How to improve credit history',
      ru: 'Как улучшить кредитную историю'
    }
  },
  // 18
  {
    id: 18,
    type: 'p',
    text: {
      hy: 'Նախ, անհրաժեշտ է լիովին մարել նախկինում գոյացած ժամկետանց պարտավորությունները և բացառել անգամ մեկ օրվա կտրվածքով պարտավորությունների գոյացումը։',
      en: 'First, it is necessary to fully pay off previously accumulated overdue obligations and prevent overdue obligations even for a single day.',
      ru: 'Прежде всего, необходимо полностью погасить ранее образовавшиеся просроченные обязательства и исключить возникновение просрочек даже на один день.'
    }
  },
  // 19
  {
    id: 19,
    type: 'sub',
    text: {
      hy: 'Ուր դիմել եթե վարկային պատմությունը սխալ է',
      en: 'Where to apply if credit history contains errors',
      ru: 'Куда обращаться, если кредитная история содержит ошибки'
    }
  },
  // 20
  {
    id: 20,
    type: 'p',
    text: {
      hy: 'Եթե վարկառուի վարկային պատմության մեջ առկա են սխալներ կամ ոչ ճշգրիտ տվյալներ, ապա կարող եք դիմել «ԱՔՌԱ Քրեդիտ Ռեփորթինգ» ՓԲԸ-ի «Վեճերի լուծման ընթացակարգ»-ով։',
      en: 'If there are errors or inaccurate data in the borrower\'s credit history, you can apply through the "Dispute Resolution Procedure" of "ACRA Credit Reporting" CJSC.',
      ru: 'Если в кредитной истории заемщика содержатся ошибки или неточные данные, вы можете обратиться по «Процедуре разрешения споров» ЗАО «АКРА Кредит Репортинг».'
    }
  },
  // 21
  {
    id: 21,
    type: 'h2',
    text: {
      hy: 'Վարկի տրամադրման վերաբերյալ որոշման կայացման չափանիշները',
      en: 'Criteria for decision-making on loan granting',
      ru: 'Критерии принятия решения о предоставлении кредита'
    }
  },
  // 22
  {
    id: 22,
    type: 'boldline',
    text: {
      hy: 'Դրական որոշման կայացման չափանիշները՝',
      en: 'Criteria for making a positive decision:',
      ru: 'Критерии принятия положительного решения:'
    }
  },
  // 23
  {
    id: 23,
    type: 'list',
    items: [
      {
        hy: 'Մեր կողմից ընդունելի գրավադրվող գույքը և երաշխավորությունները,',
        en: 'Collateral and guarantees acceptable to us,',
        ru: 'Приемлемое для нас залоговое имущество и поручительства,'
      },
      {
        hy: 'Մշտական բնակության վայրը,',
        en: 'Permanent place of residence,',
        ru: 'Постоянное место жительства,'
      },
      {
        hy: 'Կայուն եկամտի աղբյուրը,',
        en: 'Stable source of income,',
        ru: 'Стабильный источник дохода,'
      },
      {
        hy: 'Դրական կամ չեզոք վարկային պատմությունը,',
        en: 'Positive or neutral credit history,',
        ru: 'Положительная или нейтральная кредитная история,'
      },
      {
        hy: 'Արժանահավատ և լիարժեք փաստաթղթերը։',
        en: 'Reliable and complete documents.',
        ru: 'Достоверные и полные документы.'
      }
    ]
  },
  // 24
  {
    id: 24,
    type: 'boldline',
    text: {
      hy: 'Բացասական որոշման կայացման չափանիշները՝',
      en: 'Criteria for making a negative decision:',
      ru: 'Критерии принятия отрицательного решения:'
    }
  },
  // 25
  {
    id: 25,
    type: 'list',
    items: [
      {
        hy: 'Ոչ արժանահավատ փաստաթղթերը ներկայացնելը,',
        en: 'Submitting unreliable documents,',
        ru: 'Предоставление недостоверных документов,'
      },
      {
        hy: 'Բացասական վարկային պատմությունը,',
        en: 'Negative credit history,',
        ru: 'Отрицательная кредитная история,'
      },
      {
        hy: 'Եկամտի աղբյուրի ռիսկայնությունը (անկայուն եկամուտներ, ոչ հստակ պարբերականությամբ եկամուտներ),',
        en: 'Riskiness of the income source (unstable income, irregular income),',
        ru: 'Рискованность источника дохода (нестабильный доход, нерегулярные поступления),'
      },
      {
        hy: 'Գրավի պայմանագրի կամ երաշխավորության համաձայնագրերի կնքման համար անհրաժեշտ փաստաթղթեր չներկայացնելը։',
        en: 'Failure to submit required documents for concluding collateral or guarantee agreements.',
        ru: 'Непредоставление необходимых документов для заключения договора залога или поручительства.'
      }
    ]
  },
  // 26
  {
    id: 26,
    type: 'h2',
    text: {
      hy: 'Վարկային սքոր',
      en: 'Credit score',
      ru: 'Кредитный скоринг'
    }
  },
  // 27
  {
    id: 27,
    type: 'p',
    text: {
      hy: 'Բանկը կիրառում է իր կողմից մշակված վարկային սքորը (օրինակ՝ կայուն եկամուտների առկայություն – դրական ազդեցություն)։',
      en: 'The Bank applies its proprietary credit scoring system (e.g., presence of stable income – positive impact).',
      ru: 'Банк использует разработанный им кредитный скоринг (например, наличие стабильного дохода — положительное влияние).'
    }
  },
  // 28
  {
    id: 28,
    type: 'p',
    text: {
      hy: 'Վարկային պատմությունը և/կամ սքոր գնահատականը հնարավորություն են տալիս խուսափել ռիսկային գործարքներից և չհանդիսանալ երաշխավոր անվստահելի անձանց համար։',
      en: 'Credit history and/or score evaluation enable avoiding risky transactions and not acting as a guarantor for unreliable individuals.',
      ru: 'Кредитная история и/или скоринговый балл позволяют избежать рискованных сделок и не выступать поручителем за ненадежных лиц.'
    }
  },
  // 29
  {
    id: 29,
    type: 'links',
    before: {
      hy: 'Վարկային պատմության և ՖԱՅԿՕ սքորի վերաբերյալ առավել մանրամասն տեղեկատվություն կարելի է ստանալ այցելելով ',
      en: 'More detailed information regarding credit history and FICO score can be obtained by visiting ',
      ru: 'Более подробную информацию о кредитной истории и скоринге FICO можно получить, посетив '
    },
    links: [
      { href: 'https://www.acra.am', label: { hy: 'acra.am', en: 'acra.am', ru: 'acra.am' } },
      { href: 'https://www.abcfinance.am', label: { hy: 'abcfinance.am', en: 'abcfinance.am', ru: 'abcfinance.am' } },
      { href: 'https://www.cba.am', label: { hy: 'cba.am', en: 'cba.am', ru: 'cba.am' } }
    ],
    after: {
      hy: ' կայքեր։',
      en: ' websites.',
      ru: ' сайты.'
    }
  }
];

export async function migrateCreditBlocks() {
  let done = 0;
  const snap = await getDocs(collection(db, 'creditBlocks'));
  
  for (const d of snap.docs) {
    const data = d.data();
    const item = translatedCreditBlocks.find((b) => Number(b.id) === Number(data.id));
    if (item) {
      const patch = { ...item };
      delete patch.id; // Firestore ID-ն պահպանում ենք
      await updateDoc(doc(db, 'creditBlocks', d.id), patch);
      done++;
    }
  }

  alert(`Հաջողությամբ թարմացվեցին creditBlocks-ի ${done} փաստաթղթերը ✅`);
}