import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase.js';

const ARM = /[\u0531-\u0587]/;

const categories = {
  'Բիզնես': { en: 'Business', ru: 'Бизнес' },
  'Կենսակերպ': { en: 'Lifestyle', ru: 'Образ жизни' },
  'Ներդրումներ': { en: 'Investments', ru: 'Инвестиции' },
};

// բանալի՝ հայերեն վերնագիր (Monthly Recap-ի վերնագիրը հայերեն տառ չունի, բայց նկարագրությունը ունի)
const items = {
  'Monthly Recap': {
    description: {
      en: 'Monthly Recap helps you sum up the month, understand your achievements and what you missed, and make big, effective changes through small steps.',
      ru: 'Monthly Recap помогает подвести итоги месяца, осознать достижения и упущенное и небольшими шагами внести большие и эффективные изменения.',
    },
  },
  'EvocaINVEST. ինչպե՞ս կատարել գործարքներ': {
    title: { en: 'EvocaINVEST: how to make transactions?', ru: 'EvocaINVEST: как совершать сделки?' },
    description: {
      en: 'In this blog we will present EvocaINVEST, as well as the steps for using the primary tools needed for making transactions.',
      ru: 'В этом блоге мы представим EvocaINVEST, а также шаги по использованию основных инструментов, необходимых для совершения сделок.',
    },
  },
  'Ներդրումների կարելիներն ու չի կարելիները': {
    title: { en: 'Investment dos and don’ts', ru: 'Что можно и нельзя при инвестировании' },
  },
  'Փոքր քայլերով դեպի մեծ եկամուտներ': {
    title: { en: 'Small steps toward big income', ru: 'Маленькими шагами к большому доходу' },
  },
  'Ինչպե՞ս սկսել բիզնես։ Guide from A to Z': {
    title: { en: 'How to start a business? Guide from A to Z', ru: 'Как начать бизнес? Guide from A to Z' },
  },
  'Նայիր շուրջդ և տես, թե որքան ավելորդ իրեր կան': {
    title: { en: 'Look around and see how many unnecessary things there are', ru: 'Оглянись вокруг и посмотри, сколько вокруг лишних вещей' },
  },
  'Ամանորի քո Evocaգույն երազանքը': {
    title: { en: 'Your Evoca-colored New Year dream', ru: 'Твоя новогодняя мечта цвета Evoca' },
    description: {
      en: 'Is it nicer to give a gift or to receive one? How to make a wish on New Year’s Eve? What is the trendiest gift option? You will find all the answers in the blog.',
      ru: 'Что приятнее — дарить подарок или получать? Как загадать желание в новогоднюю ночь? Какой подарок самый трендовый? Все ответы вы найдёте в блоге.',
    },
  },
};

export async function migrateBlog() {
  const missing = [];
  let done = 0;

  for (const name of ['news1', 'newsFeautured2', 'newsBottom2']) {
    const snap = await getDocs(collection(db, name));
    for (const d of snap.docs) {
      const data = d.data();
      const titleKey = String(typeof data.title === 'string' ? data.title : data.title?.hy ?? '').trim();
      const tr = items[titleKey];
      const patch = {};

      if (typeof data.category === 'string' && ARM.test(data.category)) {
        const c = data.category.trim();
        if (categories[c]) patch.category = { hy: c, ...categories[c] };
        else missing.push(`${name}/${d.id} category "${c}"`);
      }

      if (typeof data.title === 'string' && ARM.test(data.title)) {
        if (tr?.title) patch.title = { hy: data.title.trim(), ...tr.title };
        else missing.push(`${name}/${d.id} title "${titleKey}"`);
      }

      if (typeof data.description === 'string' && ARM.test(data.description)) {
        if (tr?.description) patch.description = { hy: data.description.trim(), ...tr.description };
        else missing.push(`${name}/${d.id} description`);
      }

      if (Object.keys(patch).length) {
        await updateDoc(doc(db, name, d.id), patch);
        done++;
      }
    }
  }

  console.log('Առանց թարգմանության:', missing);
  alert(`Թարգմանվեց ${done} փաստաթուղթ ✅` + (missing.length ? `\nԲաց թողնված՝ ${missing.length} (տես console)` : ''));
}