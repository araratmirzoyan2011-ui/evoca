import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase.js';

const ARM = /[\u0531-\u0587]/;
const norm = (s) => s.trim().replace(/\s+/g, ' ').toLowerCase();
const missing = new Set();

const raw = {
  // վերնագրեր
  'Գլխավոր': ['Main', 'Главная'],
  'Վարկի մարում': ['Loan repayment', 'Погашение кредита'],
  'Վարկի մայր գումարի վաղաժամկետ մարում': ['Early repayment of loan principal', 'Досрочное погашение основной суммы кредита'],
  'Վարկի մայր գումարի մարում': ['Loan principal repayment', 'Погашение основной суммы кредита'],
  'Հերթական մարում': ['Regular repayment', 'Очередное погашение'],
  'Հաշվի համալրում': ['Account top-up', 'Пополнение счёта'],
  'Քարտի համալրում': ['Card top-up', 'Пополнение карты'],
  'Yota (ՌԴ)': ['Yota (Russia)', 'Yota (РФ)'],
  'Ջեոսել': ['Geocell', 'Geocell'],
  'Մագթի Բանի': ['Magti Bani', 'Magti Bani'],
  'Մագթի': ['Magti', 'Magti'],
  'Վրացական': ['Georgian', 'Грузинские'],
  'Բիլայն Ռուսաստան': ['Beeline Russia', 'Билайн Россия'],
  'Ռուսական': ['Russian', 'Российские'],
  'Միջազգային բջջային օպերատորներ': ['International mobile operators', 'Международные мобильные операторы'],
  'Ֆիքսված հեռախոսակապ': ['Fixed-line telephony', 'Фиксированная телефонная связь'],
  'Ղարաբաղ Տելեկոմ ֆիքսված հեռախոսակապ': ['Karabakh Telecom fixed-line telephony', 'Фиксированная связь Карабах Телеком'],
  'Հեռախոս': ['Phone', 'Телефон'],
  'Լույս': ['Electricity', 'Электричество'],
  'Ջուր': ['Water', 'Вода'],
  'Գազի սպառում': ['Gas consumption', 'Потребление газа'],
  'Գազի սպասարկում': ['Gas service', 'Обслуживание газа'],
  'Կոմունալ վճարումներ': ['Utility payments', 'Коммунальные платежи'],
  'Team ինտերնետ': ['Team Internet', 'Team Интернет'],
  'ՎիվաՍել ՄՏՍ-ի ինտերնետ': ['VivaCell-MTS Internet', 'Интернет ВиваСелл-МТС'],
  'Ռոստելեկոմ': ['Rostelecom', 'Ростелеком'],
  'Ինտերակտիվ հեռուստատեսություն': ['Interactive television', 'Интерактивное телевидение'],
  'Արփինեթ': ['Arpinet', 'Арпинет'],
  'KT ինտերնետ': ['KT Internet', 'KT Интернет'],
  'Արմքոմ': ['Armcom', 'Армком'],
  'Ինտերլինկ': ['Interlink', 'Интерлинк'],
  'Ինտերնետ և TV': ['Internet and TV', 'Интернет и ТВ'],
  'Արագաչափեր և տեսախցիկներ': ['Speed cameras and surveillance cameras', 'Радары и камеры'],
  'ՃՈ վճարներ': ['Traffic police fines', 'Штрафы дорожной полиции'],
  'ԲԼԵՍՍ ՈՒՎԿ': ['BLESS UCO', 'БЛЕСС УКО'],
  'Պրեմիում Կրեդիտ ՈՒՎԿ': ['Premium Credit UCO', 'Премиум Кредит УКО'],
  'ՖԻՆՔԱ ՈՒՎԿ': ['FINCA UCO', 'ФИНКА УКО'],
  'Միկրո Կապիտալ ՈՒՎԿ': ['Micro Capital UCO', 'Микро Капитал УКО'],
  'Վարկային կազմակերպություններ': ['Credit organizations', 'Кредитные организации'],
  'Միջոցառումներ': ['Events', 'Мероприятия'],

  // դաշտերի պիտակներ
  'Վարկային պայմանագրի համար': ['Loan agreement number', 'Номер кредитного договора'],
  'Հաշվի համար': ['Account number', 'Номер счёта'],
  'Քարտի համար': ['Card number', 'Номер карты'],
  'Հեռախոսահամար': ['Phone number', 'Номер телефона'],
  'Հեռախոս ֆիքս./բջջ.': ['Phone (fixed/mobile)', 'Телефон (фикс./моб.)'],
  'Բաժանորդի համար': ['Subscriber number', 'Номер абонента'],
  'Բաժանորդի Id': ['Subscriber ID', 'ID абонента'],
  'Բաժանորդի Id համար': ['Subscriber ID number', 'Номер ID абонента'],
  'Բաժանորդի ID / Հեռ.': ['Subscriber ID / Phone', 'ID абонента / Тел.'],
  'Որոշման համար': ['Resolution number', 'Номер постановления'],
};
const dict = Object.fromEntries(Object.entries(raw).map(([k, v]) => [norm(k), v]));

// null = թարգմանելու բան չկա, undefined = չգտնվեց
const tr = (str) => {
  if (typeof str !== 'string' || !ARM.test(str)) return null;
  const found = dict[norm(str)];
  if (!found) {
    missing.add(str.trim());
    return undefined;
  }
  return { hy: str, en: found[0], ru: found[1] };
};
const loc = (v) => {
  if (typeof v !== 'string') return v; // արդեն օբյեկտ
  const r = tr(v);
  return r || v;
};

const localizeNode = (node) => {
  const out = { ...node };
  if ('title' in node) out.title = loc(node.title);
  if (Array.isArray(node.fields)) {
    out.fields = node.fields.map((f) => {
      const o = { ...f };
      if ('label' in f) o.label = loc(f.label);
      if ('placeholder' in f) o.placeholder = loc(f.placeholder);
      return o;
    });
  }
  if (Array.isArray(node.children)) out.children = node.children.map(localizeNode);
  return out;
};

const report = () => {
  const list = [...missing];
  console.log('Չթարգմանված տողեր:', list);
  return list;
};

// 1. Ծառը (PaymentPage)
export async function migratePaymentTree() {
  const ref = doc(db, 'instantPaymentsCollection', 'tree');
  const snap = await getDoc(ref);
  if (!snap.exists()) return alert('tree փաստաթուղթը չկա');
  await updateDoc(ref, { root: localizeNode(snap.data().root) });
  const list = report();
  alert(`Tree-ը թարգմանվեց ✅\nՉծածկված տողեր՝ ${list.length}`);
}

// 2. Գլխավոր քարտերը (main.cards): գործարկիր միայն այն էջը ուղղելուց հետո
export async function migratePaymentCards() {
  const ref = doc(db, 'instantPaymentsCollection', 'main');
  const snap = await getDoc(ref);
  if (!snap.exists()) return alert('main փաստաթուղթը չկա');
  const cards = (snap.data().cards || []).map((c) => ({ ...c, title: loc(c.title) }));
  await updateDoc(ref, { cards });
  const list = report();
  alert(`Cards-ը թարգմանվեց ✅\nՉծածկված տողեր՝ ${list.length}`);
}