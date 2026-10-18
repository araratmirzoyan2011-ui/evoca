import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const fetchCollection = async (name) => {
  const snap = await getDocs(query(collection(db, name), orderBy("order")));
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
};

// Մեկ միասնական տվյալների օբյեկտ էջի ամբողջ բովանդակության համար
const pageData = {
  cardInfo: {
    title: "Առարկայազուրկ մետաղական հաշիվներ",
    description: "Առաջարկում ենք բացել առարկայազուրկ մետաղական հաշիվներ, որոնք նախատեսված են անկանխիկ ոսկու հաշվառման համար: Այս ցպահանջ հաշիվները հնարավորություն են ընձեռում խնայողություններ կատարել անկանխիկ ոսկով, ինչպես նաև ավելացնել դրանք՝ միջազգային շուկայում ոսկու գնի բարձրացման շնորհիվ:",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/17092121924185/780x585.png",
    altText: "Առարկայազուրկ մետաղական հաշիվներ"
  },
  termsIntro: {
    text: "Մեր և Ձեր պայմանագրային փոխհարաբերությունները կարգավորվում են ՀԱՄԱԼԻՐ ԲԱՆԿԱՅԻՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐԻ ՄԱՏՈՒՑՄԱՆ ՊԱՅՄԱՆՆԵՐՈՎ, որը հրապարակային առաջարկ (օֆերտա) է և Ձեր կողմից համարվում է ընդունված այն պահից, երբ առձեռն կամ հեռակառավարման համակարգերի միջոցով մեզ եք ներկայացնում պատշաճ լրացված և վավերացված բանկային ծառայություններից օգտվելու հայտ/դիմում: Համալիր բանկային ծառայությունների մատուցման պայմաններին կարող եք ծանոթանալ",
    linkText: "այստեղ",
    linkUrl: "https://www.evoca.am/files/global_files/1/provision-terms-for-general-banking-services-arm.pdf"
  },
  mainConditionsTitle: "Հիմնական պայմաններ",
  mainConditionsList: [
    {
      type: "text_with_highlights",
      content: "Հաշիվներ ենք բացում ռեզիդենտ և ոչ ռեզիդենտ հաճախորդների համար, միայն <strong class='text-purple-900'>999.9 հարգի ոսկով</strong>, առանց նվազագույն մնացորդի պահանջի: Մեզ մոտ կարելի է գնել անկանխիկ ոսկի՝ սկսված <strong class='text-purple-900'>31 գրամից</strong> (ոսկու գնանշումը կատարվում է գրամով): Մեր կայքում հրապարակվում են ոսկու գնանշման օրական տվյալները, որոնք փոփոխվում են՝ կախված միջազգային շուկաներում ոսկու գնից:"
    },
    {
      type: "simple_text",
      content: "Հաշիվներում անկանխիկ ոսկին հաշվառում ենք դրամով` ՀՀ Կենտրոնական բանկի հայտարարած հաշվարկային գնով և կշռային (գրամային) արտահայտությամբ` 0.01 գրամ ճշտությամբ կամ տրոյական ուինցիաներով` 0.001 տրոյական ուինցիա ճշտությամբ (մեկ տրոյական ուինցիան հավասար է 31.10348 գրամ):"
    },
    {
      type: "simple_text",
      content: "Մետաղական հաշիվ/ներ բացելիս ղեկավարվում ենք ՀՀ օրենսդրությամբ, ՀՀ Կենտրոնական բանկի նորմատիվ ակտերով, որոշումներով, մեր ներքին իրավական ակտերով:"
    },
    {
      type: "nested_list",
      title: "Այս հաշիվներով կարող ենք իրականացնել հետևյալ գործառնությունները՝",
      subItems: [
        "<strong>հաշվի համալրում`</strong> բանկից անկանխիկ ոսկի գնելու և այն հաշվին մուտքագրելու, ինչպես նաև Ձեր կամ այլ անձի` նույն բանկում կամ այլ բանկում առկա մետաղական հաշվից անկանխիկ ոսկի փոխանցելու միջոցով,",
        "<strong>հաշվի ելքագրում`</strong> հաշվին առկա անկանխիկ ոսկին բանկին վաճառելու, ինչպես նաև Ձեր կամ այլ անձի` նույն բանկում կամ այլ բանկում առկա մետաղական հաշվին անկանխիկ ոսկի փոխանցելու միջոցով:"
      ]
    },
    {
      type: "simple_text",
      content: "Մետաղական հաշիվները կարող են գրավադրվել:"
    },
    {
      type: "nested_list",
      title: "Հաշիվ բացելու համար անհրաժեշտ փաստաթղթերը՝",
      subItems: [
        "Դիմում` մեր ձևանմուշի համաձայն:",
        "Անձնագիր և սոցիալական քարտ կամ այն չունենալու մասին տեղեկանք, կամ միայն նույնականացման քարտ:",
        "Մեր պահանջով` այլ փաստաթղթեր:"
      ]
    },
    {
      type: "link_text",
      content: "Հաշիվներ բացելու համար կարող եք դիմել մեր Գլխամասային գրասենյակ և ցանկացած մասնաճյուղ: Մետաղական հաշիվների սպասարկման, գործառնությունների կատարման սակագներին և պայմաններին կարող եք ծանոթանալ ",
      linkText: "այստեղ",
      linkUrl: "#"
    }
  ],
  loansInfo: {
    text: "Evocabank-ում նաև կարող եք ձեռք բերել ոսկու գրավով վարկեր ամենահարմար պայմաններով:",
    linkText: " Ոսկու գրավով վարկը ",
    linkUrl: "#",
    suffixText: "տրամադրվում է ոսկյա իրերի գրավադրմամբ անձնական, ընտանեկան, տնային կամ այլ օգտագործման համար նախատեսված, ձեռնարկատիրական գործունեության հետ չկապված, ապրանքների (աշխատանքների, ծառայությունների) պատվիրման կամ ձեռքբերման նպատակով:"
  },
  warningText: "Ուշադրություն. Ավանդների հատուցումը երաշխավորող հիմնադրամը չի հատուցում մետաղական հաշիվները:",
  documents: [
    { title: "Տեղեկատվական ամփոփագիր (Բանկային հաշիվներ) 08.06.26", url: "#" },
    { title: "Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025թ.", url: "#" }
  ]
};

const MetalAccount = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const m = await fetchCollection("menuItems");
        setMenuItems(m);
      } catch (err) {
        console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      {/* Վերին քարտի բաժին */}
      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <InfoCard
            title={pageData.cardInfo.title}
            description={pageData.cardInfo.description}
            imageUrl={pageData.cardInfo.imageUrl}
            altText={pageData.cardInfo.altText}
          />
        </div>
      </main>

      {/* Հիմնական բովանդակություն */}
      <section className="w-full bg-white py-10 px-4 md:px-12">
        {loading && (
          <p className="text-center text-gray-500 py-10">Բեռնվում է...</p>
        )}

        {error && (
          <p className="text-center text-red-600 py-10">
            Չհաջողվեց բեռնել տվյալները։ Խնդրում ենք փորձել կրկին։
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
              <div className="hidden md:block">
                <div className="sticky top-24">
                  <SocialIcons />
                </div>
              </div>

              <div className="flex-1 max-w-4xl text-gray-800 leading-relaxed space-y-6">
                {/* Նախաբան */}
                <p>
                  {pageData.termsIntro.text}{" "}
                  <a
                    href={pageData.termsIntro.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-purple-800 underline"
                  >
                    {pageData.termsIntro.linkText}
                  </a>:
                </p>

                {/* Հիմնական պայմաններ */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {pageData.mainConditionsTitle}
                  </h2>
                  <ul className="list-disc pl-5 space-y-4 text-gray-700">
                    {pageData.mainConditionsList.map((item, index) => {
                      if (item.type === "simple_text" || item.type === "text_with_highlights") {
                        return (
                          <li
                            key={index}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        );
                      }
                      if (item.type === "nested_list") {
                        return (
                          <li key={index}>
                            <span>{item.title}</span>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                              {item.subItems.map((sub, sIdx) => (
                                <li
                                  key={sIdx}
                                  dangerouslySetInnerHTML={{ __html: sub }}
                                />
                              ))}
                            </ul>
                          </li>
                        );
                      }
                      if (item.type === "link_text") {
                        return (
                          <li key={index}>
                            {item.content}
                            <a
                              href={item.linkUrl}
                              className="text-purple-800 underline font-semibold"
                            >
                              {item.linkText}
                            </a>:
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>

                  {/* Վարկերի մասին տեղեկատվություն */}
                  <p className="mt-6 text-gray-700">
                    {pageData.loansInfo.text}
                    <a href={pageData.loansInfo.linkUrl} className="text-purple-800 underline font-semibold">
                      {pageData.loansInfo.linkText}
                    </a>
                    {pageData.loansInfo.suffixText}
                  </p>

                  {/* Զգուշացում */}
                  <p className="mt-4 text-sm text-gray-600 bg-gray-100 p-4 rounded-lg border-l-4 border-purple-800 font-medium">
                    {pageData.warningText}
                  </p>
                </div>
              </div>
            </div>

            {/* Փաստաթղթերի բաժին */}
            <div className="max-w-7xl mx-auto mt-12">
              <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
                <div className="max-w-4xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Փաստաթղթեր
                  </h2>
                  <div className="space-y-5">
                    {pageData.documents.map((doc, index) => (
                      <DocumentCard key={index} title={doc.title} url={doc.url} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <OnlineBanking />
      <Footer />
    </>
  );
};

export default MetalAccount;