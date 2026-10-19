import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import InfoBanner from '../Components/infoBanner.jsx';

const EvocaTouch = () => {
  // 1. Նկար 1-ի հիմնական տեքստերի զանգվածը
  const introParagraphs = [
    "Շատերին թվում է` դժվար ու անիրական է ֆինանսական ոլորտում լինել կրեատիվ, սակայն Evocabank-ին տարիներ շարունակ հաջողվում է գտնել out of box լուծումներ և շուկային ներկայանալ նոր և ժամանակակից պրոդուկտներով:",
    "Այդ գաղափարների շարքից է նոր EvocaTOUCH հավելվածը, որն առանձնանում է ժամանակակից թվային լուծումներով և հնարավորություններով:",
    "EvocaTOUCH հավելվածն անվտանգ է, հարմար և նախատեսված է անմիջապես smartphone-ից մի շարք բանկային ծառայություններից օգտվելու համար: Կարևորելով հավելվածի անվտանգ օգտագործումը` Բանկնապահովում է օգտատերերի մասին ինֆորմացիայի և կատարած գործարքների պաշտպանությունը` օգտագործելով գաղտնագրման վերջին տեխնոլոգիաները:",
    "EvocaTOUCH հավելվածը կառուցված է այս պահին հայտնի ամենավերջին մոբայլ տեխնոլոգիաներով:",
    "Հավելվածը գրվել է User Interface և User Experience նորագույն սկզբունքներով, ունի գունային 2 appearance` Dark և Light: Այն ավելի նման է facebook-ի կամ instagram-ի feed-ի` ամենակարևոր ու շատ օգտագործվող ֆունկցիաներն անմիջապես առաջին էջին են` Քարտեր, Հաշիվներ, Վարկեր, Ավանդներ: Օգտատերերը հնարավորություն ունեն ստեղծել Template-ներ, որի շնորհիվ բանկային փոխանցումները կատարվում են ավելի արագ ու հեշտ: Հնարավոր է ծանոթանալ Բանկի նորություններին ու ամենաակտուալ պրոդուկտներին` թերթվող story-ների միջոցով:",
    "EvocaTOUCH հավելվածը 24/7 հասանելի է իր բոլոր օգտատերերին աշխարհի ցանկացած կետից, ցանկացած ժամի:"
  ];

  // 2. Նկար 2-ի ցանկի (bullet points) տվյալների զանգվածը
  const featuresList = [
    "Բացել բանկային հաշիվներ,",
    "Պատվիրել քարտ կամ բացել թվային քարտ վայրկյանների ընթացքում,",
    "Ստանալ վարկ,",
    "Ներդնել ավանդ,",
    "Կատարել փոխանցումներ հաշիվներին և քարտերին, ինչպես հայաստանյան, այնպես էլ արտերկրյա բանկերին,",
    "Կատարել բանկային փոխանցումներ և վճարումներ,",
    "Կատարել կոմունալ վճարումներ,",
    "Առցանց ստանալ ավտոմեքենաների տուգանքները և իրականացնել վճարումներ մեկ հպումով,",
    "Կատարել փոխանցումներ կոնտակտային տվյալներով,",
    "24/7 ուղղել հարցեր նամակի միջոցով:"
  ];

  // 3. Նկար 2-ի վերջնական պարբերությունների զանգվածը
  const bottomParagraphs = [
    "Հավելվածի հիմնական ուժեղ կողմերից մեկն անհատականացված բանկային ծառայության տրամադրումն է: Հաճախորդակենտրոն մոտեցման շնորհիվ Բանկը հնարավորություն է տալիս օգտատերերին հավելվածը հարմարեցնել իրենց նախասիրություններին և կարիքներին:",
    "Հավելվածից օգտվելու հարմարավետությունն ու անվտանգությունը բարձրացնելու համար օգտատերը կարող է ակտիվացնել կենսաչափական նույնականացումը` օգտագործելով մատնահետքի կամ դեմքի ճանաչման համակարգերը: Բացի այդ, նոր հավելվածն առաջարկում է արագ և հեշտ ինտեգրում այլ ֆինանսական գործիքների հետ, ինչը թույլ է տալիս օգտատերերին կառավարել իրենց ֆինանսները մեկ հավելվածի միջոցով:",
    "EvocaTOUCH-ի միջոցով օգտատերերը կարող են 24/7 հասանելիություն ունենալ իրենց ֆինանսներին, վերահսկել իրենց դրամական միջոցները, արագ ու անվտանգ գործարքներ կատարել աշխարհի ցանկացած կետից, ցանկացած ժամի:"
  ];

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl">
            {/* Վերնագիր */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">EvocaTOUCH</h1>

            {/* Սկզբնական տեքստեր զանգվածից */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {introParagraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            {/* Ցանկի նախաբան */}
            <p className="mt-6 font-medium text-gray-800">
              Նոր հավելվածն առաջարկում է գործառույթների լայն շրջանակ, որը ներառում է ամենօրյա բանկային գործընթացները՝ վերացնելով ֆիզիկական մասնաճյուղ այցելելու անհրաժեշտությունը։ Առանց գրանցման և սպասարկման վճարի՝ օգտատերերը կարող են․
            </p>

            {/* Ցանկը (Bullet points) զանգվածից */}
            <ul className="mt-4 space-y-3 pl-2">
              {featuresList.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Վերջին պարբերությունները զանգվածից */}
            <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
              {bottomParagraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Փաստաթղթերի բաժին */}
        <div className="max-w-7xl mx-auto mt-10">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {accountsReport.map((r) => (
                  <DocumentCard key={r.docId || r.order} title={r.title} url={r.url} />
                ))}
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

export default EvocaTouch;