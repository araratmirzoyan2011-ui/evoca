import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase.js';

const HAS_ARM = /[\u0531-\u0587]/;

/* ---------- tariffs: label-ներ ըստ ինդեքսի (0..27) ---------- */
const tariffLabels = [
  ['Card issuance', 'Выпуск карты'],
  ['Card currency', 'Валюта карты'],
  ['Card validity period', 'Срок действия карты'],
  ['Card servicing one-time/annual fee', 'Единовременная/годовая плата за обслуживание карты'],
  ['Supplementary card issuance', 'Выпуск дополнительной карты'],
  ['One-time fee for a supplementary card for the validity period', 'Единовременная плата за дополнительную карту на срок действия'],
  ['Minimum account balance', 'Неснижаемый остаток на счёте'],
  ['Annual interest on positive card account balance (up to 5 million AMD)', 'Годовой процент на положительный остаток на карточном счёте (до 5 млн драмов РА)'],
  ['Annual interest on positive card account balance (5 million AMD and above)', 'Годовой процент на положительный остаток на карточном счёте (5 млн драмов РА и выше)'],
  ['Annual interest on positive card account balance (foreign currency)', 'Годовой процент на положительный остаток на карточном счёте (иностранная валюта)'],
  ['Cash withdrawal at Bank ATMs, from card account and via POS terminal', 'Снятие наличных в банкоматах Банка, с карточного счёта и через POS-терминал'],
  ['Cash withdrawal at ATMs and POS terminals of ArCa member banks in Armenia', 'Снятие наличных в банкоматах и POS-терминалах банков РА — членов системы ArCa'],
  ['Cash withdrawal at Bank branches via POS terminal in USD or EURO', 'Снятие наличных в филиалах Банка через POS-терминал в USD или EURO'],
  ['Cash withdrawal at Bank branches from card account (AMD, USD, EURO)', 'Снятие наличных в филиалах Банка с карточного счёта (AMD, USD, EURO)'],
  ["Cash withdrawal at foreign banks' ATMs and POS terminals", 'Снятие наличных в банкоматах и POS-терминалах иностранных банков'],
  ['Cashless transactions at merchants via POS terminals of the Bank and other banks', 'Безналичные операции в торговых точках через POS-терминалы Банка и других банков'],
  ['Card blocking', 'Блокировка карты'],
  ['Card unblocking (in case of incorrect PIN or CVV entry)', 'Разблокировка карты (при неверном вводе PIN-кода или CVV)'],
  ['Card reissue upon expiry', 'Перевыпуск карты по истечении срока действия'],
  ['Card reissue in case of loss, damage or PIN loss', 'Перевыпуск карты при утере, повреждении или утере PIN-кода'],
  ['PIN generation via ArCa member banks\' ATMs or Evoca Touch/Evoca Online', 'Генерация PIN-кода через банкоматы банков — членов ArCa или Evoca Touch/Evoca Online'],
  ['Submitting a PIN generation request at Bank branches', 'Подача заявки на генерацию PIN-кода в филиалах Банка'],
  ['Card account statement for a period over 1 month', 'Выписка по карточному счёту за период более 1 месяца'],
  ['Cash deposit at ATMs of ArCa member banks (ATM CASH-IN)', 'Внесение наличных в банкоматах банков — членов ArCa (ATM CASH-IN)'],
  ['Receiving SMS notifications about transactions to Armenian phone numbers', 'Получение SMS-уведомлений об операциях на армянские номера телефонов'],
  ['Penalty on overdraft', 'Пеня по перерасходу'],
  ['Card delivery within Armenia', 'Доставка карт по территории РА'],
  ['Maximum cash withdrawal limit', 'Максимальный лимит снятия наличных'],
];

/* ---------- tariffs: տեքստային value-ներ ---------- */
const tariffValues = {
  'Չի նախատեսվում': ['Not provided', 'Не предусмотрено'],
  'Չի վերաթողարկվում': ['Not reissued', 'Не перевыпускается'],
  '6 ամիս': ['6 months', '6 месяцев'],
  '12 ամիս': ['12 months', '12 месяцев'],
  '2 տարի': ['2 years', '2 года'],
  '3 տարի': ['3 years', '3 года'],
  '5 տարի': ['5 years', '5 лет'],
  '20% Տարեկան': ['20% per annum', '20% годовых'],
  '2,500 AMD (250 AMD/ամսական)': ['2,500 AMD (250 AMD/month)', '2,500 AMD (250 AMD/месяц)'],
  '0% (մինչև 300,000 AMD), 0.2% (300,000-ից ավել)': ['0% (up to 300,000 AMD), 0.2% (over 300,000)', '0% (до 300,000 AMD), 0.2% (свыше 300,000)'],
  '0% (մինչև 1,000,000 AMD)': ['0% (up to 1,000,000 AMD)', '0% (до 1,000,000 AMD)'],
  '0% (մինչև 2,000,000 AMD)': ['0% (up to 2,000,000 AMD)', '0% (до 2,000,000 AMD)'],
  'գործարքներ մինչև 5,000 AMD՝ 20 AMD, 5,000 AMD-ից ավել՝ 0 AMD': [
    'transactions up to 5,000 AMD: 20 AMD, over 5,000 AMD: 0 AMD',
    'операции до 5,000 AMD: 20 AMD, свыше 5,000 AMD: 0 AMD',
  ],
};

/* ---------- stats ---------- */
const statsText = {
  'Արտարժույթ': ['Foreign currency', 'Иностранная валюта'],
  'Քարտերով կանխիկի տրամադրում Բանկի ATM-ով': ['Cash withdrawal at Bank ATMs', 'Снятие наличных в банкоматах Банка'],
  'մինչև 300,000 ֏` անվճար': ['free up to 300,000 ֏', 'бесплатно до 300,000 ֏'],
  'Քարտերով կանխիկի տրամադրում «ԱրՔա» համակարգի այլ բանկերի ATM-ով և POS-ով': ['Cash withdrawal at ATMs and POS terminals of other ArCa system banks', 'Снятие наличных в банкоматах и POS-терминалах других банков системы ArCa'],
  'Տարեկան սպասարկում': ['Annual service', 'Годовое обслуживание'],
  'տարեկան (ամսական՝ 250֏)': ['per year (250֏ per month)', 'в год (250֏ в месяц)'],
  'տեղական գործարքներից': ['from local transactions', 'от локальных операций'],
  'Սակագին': ['Tariff', 'Тариф'],
  'Մինչև': ['Up to', 'До'],
  'մինչև': ['up to', 'до'],
  'անվճար կանխիկացում Բանկի ATM-ով': ['free cash withdrawal at Bank ATMs', 'бесплатное снятие наличных в банкоматах Банка'],
  'Ավելի քան': ['More than', 'Более'],
  'երկրում քարտով գործարքներ կատարելու հնարավորություն': ['countries where you can use the card', 'стран, где можно совершать операции по карте'],
  'Կանխիկացում բանկի կանխիկացման կետերում մինչև 2 մլն ֏': ['Cash withdrawal at Bank cash points up to 2 million ֏', 'Снятие наличных в пунктах выдачи Банка до 2 млн ֏'],
  'Կանխիկացում բանկի կանխիկացման կետերում մինչև 1 մլն ֏': ['Cash withdrawal at Bank cash points up to 1 million ֏', 'Снятие наличных в пунктах выдачи Банка до 1 млн ֏'],
  'Կանխիկացում ԱրՔա անդամ բանկերի կանխիկացման կետերում': ['Cash withdrawal at cash points of ArCa member banks', 'Снятие наличных в пунктах выдачи банков — членов ArCa'],
  'Կանխիկացում ԱրՔա անդամ չհանդիսացող բանկերի կանխիկացման կետերում': ['Cash withdrawal at cash points of banks that are not ArCa members', 'Снятие наличных в пунктах выдачи банков, не являющихся членами ArCa'],
  'Քարտի տարեկան սպասարկում': ['Annual card service', 'Годовое обслуживание карты'],
  'Կանխիկացում բանկի բանկոմատներից': ['Cash withdrawal at Bank ATMs', 'Снятие наличных в банкоматах Банка'],
  'Կանխիկացում ԱրՔա համակարգի անդամ հանդիսացող ՀՀ բանկերի բանկոմատներից և POS տերմինալների միջոցով': ['Cash withdrawal at ATMs and POS terminals of ArCa member banks in Armenia', 'Снятие наличных в банкоматах и POS-терминалах банков РА — членов системы ArCa'],
  'Cashback արտասահմանում իրականացրած վճարումների համար': ['Cashback on payments made abroad', 'Cashback на платежи за рубежом'],
  'Lounge Key սրահներ քեզ և հյուրերիդ համար': ['Lounge Key lounges for you and your guests', 'Залы Lounge Key для тебя и твоих гостей'],
  'Fast track-ից օգտվելու հնարավորություն քեզ և հյուրերիդ համար': ['Fast track access for you and your guests', 'Возможность пользоваться Fast track для тебя и твоих гостей'],
  'Անվճար': ['Free', 'Бесплатно'],
  '6 Մուտք': ['6 entries', '6 входов'],
  '6 անգամ': ['6 times', '6 раз'],
  'Կանխիկացում': ['Cash withdrawal', 'Снятие наличных'],
  'Քարտի ժամկետ': ['Card validity', 'Срок действия карты'],
  'Տարեկան սպասարկման վճար': ['Annual service fee', 'Годовая плата за обслуживание'],
  'Կիրառություն': ['Acceptance', 'Использование'],
  'Ամենուր': ['Everywhere', 'Везде'],
  '5 տարի': ['5 years', '5 лет'],
  'Կանխիկացում բանկի կանխիկացման կետերում': ['Cash withdrawal at Bank cash points', 'Снятие наличных в пунктах выдачи Банка'],
  'Բանկի տարածքում քարտային հաշվից կանխիկի տրամադրում': ['Cash withdrawal from the card account on Bank premises', 'Снятие наличных с карточного счёта в помещениях Банка'],
  'Քարտային հաշվի դրական մնացորդի նկատմամբ հաշվարկվող տարեկան տոկոսադրույք': ['Annual interest rate on positive card account balance', 'Годовая процентная ставка на положительный остаток на карточном счёте'],
  'Քեշբեք': ['Cashback', 'Кэшбэк'],
  'Cashback': ['Cashback', 'Кэшбэк'],
  'Սպասարկման վճար': ['Service fee', 'Плата за обслуживание'],
  'Օդանավակայանների բիզնես սրահներ': ['Airport business lounges', 'Бизнес-залы аэропортов'],
};

const missing = new Set();

// string -> {hy,en,ru} (միայն եթե հայերեն տառ կա)
const toLocalized = (str, map) => {
  if (typeof str !== 'string' || !HAS_ARM.test(str)) return str;
  const tr = map[str.trim()];
  if (!tr) {
    missing.add(str.trim());
    return str;
  }
  return { hy: str, en: tr[0], ru: tr[1] };
};

export async function migrateCards() {
  const snap = await getDocs(collection(db, 'CardmenuItems'));
  let done = 0;

  for (const d of snap.docs) {
    const data = d.data();
    const patch = {};

    // tariffs
    if (Array.isArray(data.tariffs) && data.tariffs.length === tariffLabels.length) {
      patch.tariffs = data.tariffs.map((t, i) => ({
        ...t,
        label: typeof t.label === 'string'
          ? { hy: t.label, en: tariffLabels[i][0], ru: tariffLabels[i][1] }
          : t.label,
        value: toLocalized(t.value, tariffValues),
      }));
    } else if (Array.isArray(data.tariffs) && data.tariffs.length) {
      console.warn(d.id, 'tariffs-ի երկարությունը', data.tariffs.length, '≠ 28, բաց թողնվեց');
    }

    // stats
    if (Array.isArray(data.stats) && data.stats.length) {
      patch.stats = data.stats.map((s) => {
        const { ['title ']: typoTitle, ...rest } = s; // "title " (բացատով) դաշտի ուղղում
        const title = rest.title ?? typoTitle;
        const out = { ...rest };
        if (title !== undefined) out.title = toLocalized(title, statsText);
        if (rest.text !== undefined) out.text = toLocalized(rest.text, statsText);
        if (rest.value !== undefined) out.value = toLocalized(rest.value, statsText);
        return out;
      });
    }

    if (Object.keys(patch).length) {
      await updateDoc(doc(db, 'CardmenuItems', d.id), patch);
      done++;
    }
  }

  console.log('Չթարգմանված տողեր (map-ում չկան):', [...missing]);
  alert(`Թարգմանվեց ${done} քարտ ✅` + (missing.size ? `\nՉգտնված տողեր՝ ${missing.size} (տես console)` : ''));
}