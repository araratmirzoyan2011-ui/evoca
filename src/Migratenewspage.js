import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase.js';

const ARM = /[\u0531-\u0587]/;
const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();

// content-ը կտրատվում է նոր տողերի շարքերով՝ «հատվածների» (վերնագիր, պարբերություն...)։
// Թարգմանությունը հատվածների զանգված է նույն հերթականությամբ և հավաքվում է բնօրինակի ՆՈՒՅՆ
// բաժանարարներով, ուստի դասավորությունը (դատարկ տողերը) չի փոխվում։
// Եթե քանակը չհամընկնի, գրառումը չի փոխվում և ցուցակվում է «բաց թողնված»։
const rebuild = (original, parts) => {
  const tokens = original.split(/(\n+)/);
  const textIdx = [];
  tokens.forEach((t, i) => {
    if (t.trim() && !/^\n+$/.test(t)) textIdx.push(i);
  });
  if (textIdx.length !== parts.length) return null;
  const out = [...tokens];
  textIdx.forEach((tokIdx, k) => {
    out[tokIdx] = parts[k];
  });
  return out.join('');
};

// Բանալին՝ գրառման hy վերնագիրը (string կամ {hy,...})
const ITEMS = {
  'Evocabank-ը նոր գույներ է տալիս մեր քաղաքին': {
    title: { en: 'Evocabank gives our city new colors', ru: 'Evocabank дарит нашему городу новые краски' },
    // 8 հատված
    content: {
      en: [
        'Yerevan has many beautiful but sometimes overlooked corners that will soon get a completely new breath of life.',
        'Evocabank and the Kentron administrative district signed a memorandum of cooperation, joining forces to transform and develop Yerevan’s public spaces.',
        'It all began with Evocabank’s 2026 calendar. Back in 2025, four talented artists — Adam Adamyan, Gandz Graffiti, Gareggin and Harut — inspired by different places in Armenia and the seasons of the year, created unique street art concepts, which found their place in the Evoca 2026 calendar.',
        'Thus, each page of the calendar presents special art concepts, which are today being moved onto the streets of Yerevan.',
        'The memorandum was signed by Evocabank’s Deputy Chairman of the Management Board Tatevik Khachatryan and the Head of the Kentron administrative district Petros Petoyan.',
        '“This year our calendar was not just a series of months, but a vision of seeing Yerevan in a new way and reimagining public spaces. We want Yerevan to be a more inspiring city, full of art and uniting people,” — Tatevik Khachatryan, Deputy Chairman of the Management Board, Evocabank',
        '“Yerevan is a city of colors, and new colors suit it especially well. The experience of many leading cities around the world shows that street art has long since become an important component of modern urban architecture and cultural life. Yerevan is no exception. The goal of this initiative is to give Yerevan a new breath of life, to make it even more colorful, modern and attractive, turning the city’s streets and buildings into a unique open-air art platform,” — Petros Petoyan, Head of the Kentron administrative district',
        'Soon you will also hear about a new joint project of the Bank and the Kentron district.',
      ],
      ru: [
        'В Ереване много красивых, но порой незаметных уголков, которые скоро обретут совершенно новое дыхание.',
        'Evocabank и административный район Кентрон подписали меморандум о сотрудничестве, объединившись для преобразования и развития общественных пространств Еревана.',
        'Всё началось с календаря Evocabank на 2026 год. Ещё в 2025 году четыре талантливых художника — Адам Адамян, Gandz Graffiti, Gareggin и Арут — вдохновлённые разными уголками Армении и временами года, создали уникальные концепции стрит-арта, которые и вошли в календарь Evoca на 2026 год.',
        'Таким образом, каждая страница календаря представляет особые художественные концепции, которые сегодня переносятся на улицы Еревана.',
        'Меморандум подписали заместитель председателя правления Evocabank Татевик Хачатрян и глава административного района Кентрон Петрос Петоян.',
        '«В этом году наш календарь был не просто чередой месяцев, а видением нового взгляда на Ереван и переосмысления общественных пространств. Мы хотим, чтобы Ереван стал более вдохновляющим городом, полным искусства и объединяющим людей», — Татевик Хачатрян, заместитель председателя правления Evocabank',
        '«Ереван — город красок, и новые краски ему особенно к лицу. Опыт многих ведущих городов мира показывает, что стрит-арт давно стал важной составляющей современной городской архитектуры и культурной жизни. Ереван не исключение. Цель этой инициативы — придать Еревану новое дыхание, сделать его ещё более ярким, современным и привлекательным, превратив улицы и здания города в уникальную площадку искусства под открытым небом», — Петрос Петоян, глава административного района Кентрон',
        'Скоро вы также услышите о новом совместном проекте Банка и района Кентрон.',
      ],
    },
  },

  'ESG կառավարման համակարգը Evocabank-ում': {
    title: { en: 'ESG management system at Evocabank', ru: 'Система управления ESG в Evocabank' },
    // 7 հատված
    content: {
      en: [
        'Evocabank attaches great importance to the introduction of environmental and social principles, viewing them as an important factor of responsible and sustainable banking.',
        'To this end, the Bank’s Supervisory Board has adopted a number of important decisions aimed at introducing ESG (Environmental, Social, Governance) principles and strengthening environmental and social risk management processes.',
        'Tatevik Janoyan, a member of the Bank’s Supervisory Board, has been appointed ESG Coordinator in order to ensure the implementation of ESG principles at the Bank, as well as to effectively coordinate environmental and social risk management processes.',
        'The Bank’s Management Board has reaffirmed and published the Environmental and Social Management System (ESMS), which defines the basic principles and mechanisms of environmental and social risk management.',
        'You can familiarize yourself with the ESMS established by the Bank here.',
        'These initiatives are another step by Evocabank toward strengthening the principles of responsible banking and sustainable development.',
        'Other news',
      ],
      ru: [
        'Evocabank придаёт большое значение внедрению экологических и социальных принципов, рассматривая их как важный фактор ответственной и устойчивой банковской деятельности.',
        'С этой целью Наблюдательным советом Банка принят ряд важных решений, направленных на внедрение принципов ESG (Environmental, Social, Governance) и укрепление процессов управления экологическими и социальными рисками.',
        'Член Наблюдательного совета Банка Татевик Джаноян назначена ESG-координатором с целью обеспечения внедрения принципов ESG в Банке, а также эффективной координации процессов управления экологическими и социальными рисками.',
        'Правлением Банка повторно утверждена и опубликована Система экологического и социального управления (СЭСУ), определяющая основные принципы и механизмы управления экологическими и социальными рисками.',
        'С установленной Банком СЭСУ можно ознакомиться здесь.',
        'Эти инициативы — ещё один шаг Evocabank в направлении укрепления принципов ответственной банковской деятельности и устойчивого развития.',
        'Другие новости',
      ],
    },
  },

  'Evocabank-ը միացել է AmCham Armenia-ին': {
    title: { en: 'Evocabank has joined AmCham Armenia', ru: 'Evocabank вступил в AmCham Armenia' },
    // 4 հատված
    content: {
      en: [
        'AmCham Armenia, the country’s leading business association, has for 25 years brought together leading companies representing various sectors of the economy. Since its founding (in 2000), AmCham Armenia now has more than 170 member companies.',
        'Contributing to the development of the business and investment environment, as well as to strengthening ties between the American and Armenian business communities, AmCham Armenia connects the public and private sectors, representing the interests of its members and promoting the creation of a more effective business environment in Armenia.',
        'In his speech, Evocabank’s Chairman of the Management Board Karen Yeghiazaryan noted: “Within the framework of cooperation with AmCham Armenia, we hope to create opportunities that will contribute to the development of Armenia’s business ecosystem and support the growth of innovative companies. At Evocabank we believe in the power of cooperation, and we plan to make our contribution by promoting deeper partnership between financial institutions and businesses.”',
        'Membership in AmCham Armenia will create new opportunities for Evocabank by promoting the exchange of international experience, the expansion of business ties, effective cooperation with local and international partners, and the formation of a competitive and modern financial environment in Armenia.',
      ],
      ru: [
        'AmCham Armenia, будучи ведущей бизнес-ассоциацией страны, на протяжении 25 лет объединяет ведущие компании, представляющие разные отрасли экономики. С момента основания (2000 г.) в AmCham Armenia сейчас входят более 170 компаний-членов.',
        'Способствуя развитию бизнес- и инвестиционной среды, а также укреплению связей между американским и армянским деловыми сообществами, AmCham Armenia связывает государственное и частное звенья, представляя интересы своих членов и содействуя созданию более эффективной бизнес-среды в Армении.',
        'Председатель правления Evocabank Карен Егиазарян в своём выступлении отметил: «В рамках сотрудничества с AmCham Armenia мы надеемся создать возможности, которые будут способствовать развитию бизнес-экосистемы Армении и поддержат рост инновационных компаний. В Evocabank мы верим в силу сотрудничества и планируем внести свой вклад, содействуя более глубокому партнёрству между финансовыми учреждениями и бизнесом».',
        'Членство в AmCham Armenia откроет для Evocabank новые возможности, содействуя обмену международным опытом, расширению деловых связей, эффективному сотрудничеству с местными и международными партнёрами и формированию конкурентоспособной и современной финансовой среды в Армении.',
      ],
    },
  },

  'Evocabank-ը՝ Armenia-UK Business Forum-ի գլխավոր գործընկեր': {
    title: {
      en: 'Evocabank is the General Partner of the Armenia-UK Business Forum',
      ru: 'Evocabank — генеральный партнёр Armenia-UK Business Forum',
    },
    description: {
      en: 'On October 5 and 6, the Armenia-UK Business Forum will be held in Yerevan, bringing together representatives of business, financial and government institutions of the two countries.',
      ru: '5 и 6 октября в Ереване состоится Armenia-UK Business Forum, объединяющий представителей деловых, финансовых и государственных структур двух стран.',
    },
    // 12 հատված
    content: {
      en: [
        'The forum was held for the first time in Armenia and aimed to develop business, investment and institutional cooperation between Armenia and the United Kingdom, creating opportunities for new partnerships and joint initiatives.',
        'The forum brought together representatives of the business and financial sectors, government bodies, education and technology of the two countries.',
        'The following topics were discussed during the forum:',
        'Investment opportunities in Armenia,',
        'expansion of trade ties with the United Kingdom,',
        'development of financial services and infrastructure,',
        'artificial intelligence and innovative technologies,',
        'prospects for the development of education and human potential.',
        'Among the speakers at the event were the Chairman of the Central Bank of Armenia Martin Galstyan, the Minister of Finance of Armenia Vahe Hovhannisyan, the UK Ambassador to Armenia Alexandra Cole, as well as international representatives of the financial, technology and education sectors. Their participation made it possible to discuss the prospects of bilateral cooperation and international experience.',
        'The cultural opening evening of the forum took place on October 5 at the Aram Khachaturian Concert Hall, and the main business program on October 6 at Dvin Music Hall.',
        'On October 7 and 8, targeted meetings of representatives of Armenian and British businesspeople and organizations are also planned, for the development of new connections and possible partnerships.',
        'Evocabank’s participation as general partner reflected the Bank’s involvement in initiatives to develop the business environment in Armenia and expand international economic ties. Such platforms contribute to the exchange of professional experience and the formation of new opportunities for long-term cooperation.',
      ],
      ru: [
        'Форум проводился впервые в Армении и был направлен на развитие делового, инвестиционного и институционального сотрудничества между Арменией и Соединённым Королевством, создавая возможности для новых партнёрств и совместных инициатив.',
        'Форум объединил представителей бизнеса и финансового сектора, государственных структур, образования и технологий двух стран.',
        'В ходе форума обсуждались следующие темы:',
        'Инвестиционные возможности в Армении,',
        'расширение торговых связей с Соединённым Королевством,',
        'развитие финансовых услуг и инфраструктуры,',
        'искусственный интеллект и инновационные технологии,',
        'перспективы развития образования и человеческого потенциала.',
        'Среди спикеров мероприятия были председатель Центрального банка РА Мартин Галстян, министр финансов РА Ваге Ованнисян, посол Соединённого Королевства в Армении Александра Коул, а также международные представители финансовой, технологической и образовательной сфер. Их участие позволило обсудить перспективы двустороннего сотрудничества и международный опыт.',
        'Культурный вечер открытия форума состоялся 5 октября в концертном зале имени Арама Хачатуряна, а основная деловая программа — 6 октября в Dvin Music Hall.',
        '7 и 8 октября также запланированы целевые встречи представителей армянских и британских предпринимателей и структур для развития новых связей и возможных партнёрств.',
        'Участие Evocabank в качестве генерального партнёра выражало вовлечённость банка в инициативы по развитию делового климата в Армении и расширению международных экономических связей. Такие платформы способствуют обмену профессиональным опытом и формированию новых возможностей для долгосрочного сотрудничества.',
      ],
    },
  },
};

const dict = Object.fromEntries(Object.entries(ITEMS).map(([k, v]) => [norm(k), v]));
const COLLECTIONS = ['news', 'newsFeatured', 'newsBottom'];
const FIELDS = ['title', 'description', 'content'];

// Ինդեքս՝ և՛ հայերեն, և՛ անգլերեն վերնագրով (Firestore-ում հիմա անգլերեն են)
const index = {};
for (const [hyKey, v] of Object.entries(ITEMS)) {
  const entry = { hyKey, ...v };
  index[norm(hyKey)] = entry;
  index[norm(v.title.en)] = entry;
}

const titleText = (t) => (typeof t === 'string' ? t : t?.hy ?? t?.en ?? '');

export async function migrateNewsPage() {
  const missing = [];
  let done = 0;

  for (const name of COLLECTIONS) {
    const snap = await getDocs(collection(db, name));

    for (const d of snap.docs) {
      const data = d.data();
      const title = norm(titleText(data.title));
      const tr = index[title];
      const patch = {};

      for (const f of FIELDS) {
        const v = data[f];
        if (typeof v !== 'string' || !v.trim()) continue; // արդեն օբյեկտ է կամ դատարկ

        if (!tr || !tr[f]) {
          missing.push(`${name}/${d.id} ${f}${tr ? '' : ' (գրառումը ցանկում չկա)'} "${title.slice(0, 40)}"`);
          continue;
        }

        const isArm = ARM.test(v);
        let hy, en, ru;

        if (f === 'content') {
          en = isArm ? rebuild(v, tr.content.en) : v;
          ru = rebuild(v, tr.content.ru);
          hy = isArm ? v : undefined;
        } else {
          en = isArm ? tr[f].en : v;
          ru = tr[f].ru;
          hy = isArm ? v : f === 'title' ? tr.hyKey : undefined;
        }

        if (!en || !ru) {
          missing.push(`${name}/${d.id} ${f} (հատվածների քանակը չի համընկնում)`);
          continue;
        }
        patch[f] = hy ? { hy, en, ru } : { en, ru }; // undefined-ը Firestore-ը չի ընդունում
      }

      if (Object.keys(patch).length) {
        await updateDoc(doc(db, name, d.id), patch);
        done++;
      }
    }
  }

  console.log('Թարգմանություն չկա՝', missing);
  alert(`Թարգմանվեց ${done} նորություն ✅` + (missing.length ? `\nԲաց թողնված՝ ${missing.length} (տես console)` : ''));
}