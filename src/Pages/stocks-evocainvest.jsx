import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import VideoAccordion from '../Components/video-accordion.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
const cardData = {
  title: "Կատարիր ներդրումեր և ստացիր եկամուտ EvocaINVEST հավելվածով",
  description: "EvocaINVEST հավելվածի միջոցով կարող ես կատարել ներդրումներ մի շարք միջազգային ֆինանսական շուկաներում:",
  imageUrl: "https://www.evoca.am/images-cache/menu/1/17812682689927/780x585.png",
  altText: "",
};
const usefulMaterials = {
  heading: "ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ",
  accordionTitle: "EvocaINVEST օգտակար նյութեր",
  videos: [
    { id: "5kUF-3KueZ8" },
    { id: "wax5BjEOAGQ" },
    { id: "oxxOZXf2kPA" },
    { id: "XCz2N5eicHs" },
    { id: "8_C9YpvlZAE" },
    { id: "3mPDelJ-KcM" },
    { id: "OIfnnN40_DA" },
  ],
};
const introTexts = [
  "Apple, Tesla, Google, Amazon, թե՞ Nike։",
  "**EvocaINVEST**-ի միջոցով դու կարող ես ներդրումներ կատարել միջազգային և տեղական կապիտալի շուկաներում։ Իսկ բրոքերային հաշիվ կարող ես բացել ընդամենը մի քանի րոպեում՝ անմիջապես **EvocaTOUCH** հավելվածից։",
  "Գնիր բաժնետոմսեր, պարտատոմսեր, ETF-ներ և կառավարիր պորտֆոլիոդ մեկ հարթակից։",
];

const instrumentsSection = {
  title: "Քո ներդրումային գործիքները",
  text: "**EvocaINVEST**-ը հնարավորություն է տալիս ներդրումներ կատարել ամերիկյան, եվրոպական և ասիական ֆոնդային բորսաներում՝ ընտրելով քեզ հարմար ռազմավարությունը։",
  items: [
    "**Բաժնետոմսեր**՝ ներդրումներ համաշխարհային առաջատար ընկերություններում",
    "**Պարտատոմսեր և եվրապարտատոմսեր՝** ավելի կանխատեսելի ներդրումներ և կայուն եկամտի հնարավորություն",
    "**ETF-ներ՝** դիվերսիֆիկացված ներդրումներ մեկ գործիքի միջոցով",
  ],
  footer:
    "Անկախ նրանից՝ նո՞ր ես սկսում ներդրում կատարել, թե՞ արդեն ունես փորձ, կատարում ես երկարաժամկե՞տ, թե՞ կարճաժամկետ ներդրումներ, **EvocaINVEST**-ը տալիս է բոլոր անհրաժեշտ գործիքները քո ներդրումային ռազմավարության համար։",
};

const stepsSection = {
  title: "Բացիր բրոքերային հաշիվ 3 պարզ քայլով",
  steps: [
    {
      title: "1. Ներբեռնիր EvocaTOUCH հավելվածը",
      text: "Բանկային և ներդրումային գործառույթները՝ մեկ հավելվածում։ Հասանելի է iOS և Android համակարգերում։",
      linksPrefix: "Ներբեռնելու համար անցիր",
      links: [
        { label: "App Store", href: "https://apps.apple.com/us/app/evocatouch/id970309076" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=am.prometeybank.mobilebank" },
      ],
    },
    {
      title: "2. Բացիր Բրոքերային հաշիվ",
      text: "Մուտք գործիր հավելվածի «Հաշիվներ» բաժին, ընտրիր «Բրոքերային հաշիվ» և ավարտիր գրանցումը մի քանի րոպեում՝ առանց Բանկ այցելելու անհրաժեշտության։",
    },
    {
      title: "3. Սկսիր ներդրումներ կատարել",
      text: "Փնտրիր ընկերությունն ըստ անվան կամ ticker-ի EvocaINVEST հավելվածում, տեղադրիր լիմիտային կամ շուկայական պատվեր և հետևիր պորտֆոլիոդ:",
    },
  ],
  imageUrl: "https://www.evoca.am/file_manager/other/invest%20steps%20(1).png",
};

const benefitsSection = {
  title: "Ինչո՞ւ ընտրել EvocaINVEST ներդրումային հարթակը",
  items: [
    {
      title: "24/7 պատվերներ",
      text: "Տեղադրիր պատվերդ ցանկացած ժամի, այն կհերթագրվի և կկատարվի ավտոմատ՝ բորսայի բացվելուն պես։",
    },
    {
      title: "Մրցակցային սակագներ",
      text: "Մրցակցային և թափանցիկ միջնորդավճարներ։ Ամբողջական սակագներին ծանոթանում ես նախքան գործարքը հաստատելը։",
    },
    {
      title: "Լիմիտային և շուկայական պատվերներ",
      text: "Պատվերներն ավտոմատ կիրառվում են որպես լիմիտային՝ գնի ճշգրտության համար։ Անհրաժեշտության դեպքում կարող ես ակնթարթորեն անցնել շուկայական պատվերի, եթե արագությունն ավելի կարևոր է։",
    },
  ],
};

const telegramSection = {
  title: "Զարգացրու ոչ միայն պորտֆոլիոդ, այլ նաև գիտելիքդ",
  text: "Միանալով **EvocaINVEST** տելեգրամյան ալիքին՝ դու կգտնես․",
  items: [
    "Ներդրումների մասին պարզ և հասկանալի նյութեր,",
    "Շուկայական հետազոտություններ և վերլուծություններ,",
    "Փորձագետների կարծիքներ միջազգային ներդրումային մասնագետների կողմից,",
    "Համաշխարհային ներդրումային շուկաների մասին կարևոր թարմացումներ:",
  ],
  linkPrefix: "Միացիր մեր տելեգրամյան ալիքին",
  linkLabel: "այս հղումով",
  linkHref: "https://t.me/evocabankinvest",
};

const contactSection = {
  title: "Դեռ չե՞ս օգտվում EvocaINVEST-ից",
  texts: [
    "Պատրա՞ստ ես բացահայտել ներդրումների աշխարհը։",
    "Լրացրու տվյալներդ, և մենք կապ կհաստատենք քեզ հետ.",
    "Կամ կարող ես անմիջապես կապ հաստատել մեր ներդրումային բաժնի հետ.",
  ],
  email: "investsecurities@evoca.am",
  phone: "+37433777453",
};

const importantSection = {
  title: "Կարևոր",
  text: "**EvocaINVEST**-ը հնարավորություն է տալիս բացահայտել ներդրումային հնարավորությունները․ այս հարթակում և մյուս սոց․ հարթակներում ներկայացված նյութերը բացառապես տեղեկատվական նպատակի համար են։ Յուրաքանչյուր ներդրումային որոշում կայացվում է օգտատիրոջ կողմից՝ սեփական գնահատման հիման վրա։ Ներդրումները կապված են ռիսկերի հետ, հետևաբար նախորդ ցուցանիշները չեն կարող դիտվել որպես ապագա արդյունքների երաշխիք։",
  formUrl:
    "https://forms.zohopublic.com/evocabankcjsc/form/EvocaINVEST/formperma/s4kYtkgYZyRva-7IAZTt8omAwPE0ugU3rYjr_SsVeJM",
};

const PURPLE = "text-[#6a00d4]";

// "**տեքստ**" -> մանուշակագույն թավ տեքստ
const renderRich = (text) =>
  text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={PURPLE}>{part}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const SectionTitle = ({ children }) => (
  <h3 className={`font-bold text-lg ${PURPLE}`}>{children}</h3>
);

const BulletList = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-2 w-2 h-2 shrink-0 rounded-full bg-[#6a00d4]" />
        <span>{renderRich(item)}</span>
      </li>
    ))}
  </ul>
);

const EvocaInvest = () => {
  const [loading, setLoading] = useState(true);
  const [securitiesmenu, setSecuritiesmenu] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "securitiesmenu"));
        if (!menuSnapshot.empty) {
          setSecuritiesmenu(
            menuSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
          );
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
        Բեռնվում են տվյալները Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar items={securitiesmenu} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          <InfoCard
            title={cardData.title}
            description={cardData.description}
            imageUrl={cardData.imageUrl}
            altText={cardData.altText}
          />
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-6 text-base leading-relaxed">
            {introTexts.map((t, i) => (
              <p key={i}>{renderRich(t)}</p>
            ))}

            {/* Ներդրումային գործիքներ */}
            <SectionTitle>{instrumentsSection.title}</SectionTitle>
            <p>{renderRich(instrumentsSection.text)}</p>
            <BulletList items={instrumentsSection.items} />
            <p>{renderRich(instrumentsSection.footer)}</p>

            {/* 3 քայլ */}
            <SectionTitle>{stepsSection.title}</SectionTitle>
            {stepsSection.steps.map((step, i) => (
              <div key={i} className="space-y-3">
                <SectionTitle>{step.title}</SectionTitle>
                <p>{step.text}</p>
                {step.links && (
                  <p>
                    {step.linksPrefix} (
                    {step.links.map((l, j) => (
                      <React.Fragment key={l.label}>
                        {j > 0 && " և "}
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${PURPLE} underline font-semibold`}
                        >
                          {l.label}
                        </a>
                      </React.Fragment>
                    ))}
                    )։
                  </p>
                )}
              </div>
            ))}
            <img
              src={stepsSection.imageUrl}
              alt="EvocaINVEST քայլեր"
              className="w-full rounded-lg"
            />

            {/* Ինչու ընտրել */}
            <SectionTitle>{benefitsSection.title}</SectionTitle>
            {benefitsSection.items.map((b, i) => (
              <div key={i} className="space-y-2">
                <SectionTitle>{b.title}</SectionTitle>
                <p>{b.text}</p>
              </div>
            ))}

            {/* Տելեգրամ */}
            <SectionTitle>{telegramSection.title}</SectionTitle>
            <p>{renderRich(telegramSection.text)}</p>
            <BulletList items={telegramSection.items} />
            <p>
              {telegramSection.linkPrefix}{" "}
              <a
                href={telegramSection.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${PURPLE} underline font-semibold`}
              >
                {telegramSection.linkLabel}
              </a>
              ։
            </p>

            {/* Կապ */}
            <SectionTitle>{contactSection.title}</SectionTitle>
            {contactSection.texts.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            <div className={`flex flex-wrap gap-x-8 gap-y-2 font-bold ${PURPLE}`}>
              <a href={`mailto:${contactSection.email}`}>✉ {contactSection.email}</a>
              <a href={`tel:${contactSection.phone}`}>☎ {contactSection.phone}</a>
            </div>

            {/* Կարևոր */}
            <SectionTitle>{importantSection.title}</SectionTitle>
            <p>{renderRich(importantSection.text)}</p>

            <iframe
              src={importantSection.formUrl}
              title="EvocaINVEST հետադարձ կապ"
              className="w-full h-[600px] border-0 bg-gray-100"
            />
          </div>
          
        </div>
        <div className=' w-[60%] h-auto ml-[20%] mt-[40px]'>
             
            <h2 className="text-2xl font-bold uppercase pt-6 mb-[40px]">
              {usefulMaterials.heading}
            </h2>
            <VideoAccordion
              title={usefulMaterials.accordionTitle}
              videos={usefulMaterials.videos}
            />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
                  ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
                </h2>
                <div className="max-w-4xl space-y-4">
                  {EvocaInvestAccordionsData.map((item) => (
                    <InfoAccordion
                      key={item.docId}
                      title={item.title}
                      blocks={item.blocks}
                    />
                  ))}
                </div>
      </section>

      <Footer />
    </>
  );
};

export default EvocaInvest;