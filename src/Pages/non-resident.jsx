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

const initialAccordionsData = [
  {
    docId: '1',
    title: "Առավելություններ",
    blocks: [
      {
        items: [
          {
            parts: [
              { bold: "Prime կարգավիճակ Բանկում" },
              { text: "Բացառիկ արտոնություններ, առաջնահերթ սպասարկում և ժամանակի խնայում" }
            ]
          },
          {
            parts: [
              { bold: "Անհատական մենեջեր/Անձնական օգնական" },
              { text: "24/7 Աջակցություն ֆինանսական ցանկացած հարցում անմիջապես անձնական օգնականի կողմից" }
            ]
          },
          {
            parts: [
              { bold: "Հեռավար սպասարկում" },
              { text: "Ծառայությունների հասանելիություն առցանց՝ աշխարհի ցանկացած կետից" }
            ]
          }
        ]
      },
      {
        parts: [
          { bold: "Փաստաթղթերի անվճար առաքում" },
          { text: "Առաքում անմիջապես Ձեր գտնվելու վայր, Ձեզ հարմար պահին՝ արագ և անվճար:" }
        ]
      }
    ]
  },
  {
    docId: '2',
    title: "Ֆիզիկական անձանց հաշվի բացման պայմաններ",
    blocks: [
      {
        items: [
          "Հանդիսանում են ՀՀ-ում գտնվող անշարժ գույքի սեփականատեր և ունեն անշարժ գույքի նկատմամբ սեփականության իրավունքի գրանցման վկայական",
          "Պատրաստ են ներդնել նվազագույնը 6 ամիս ժամկետով և առնվազն 20 000 ԱՄՆ դոլար, 20 000 եվրո, 1 500 000 ՌԴ ռուբլի և 10 000 000 ՀՀ դրամ գումարի չափով համարդեք ավանդ «ԷՎՈԿԱԲԱՆԿ» ՓԲԸ-ում",
          "ՀՀ-ում գրանցված են որպես անհատ ձեռնարկատեր և ունեն ՀՀ Արդարադատության նախարարության իրավաբանական անձանց պետական ռեգիստրի կողմից տրամադրված գրանցման վկայական",
          "Հանդիսանում են ՀՀ-ում գրանցված իրավաբանական անձի մասնակից (բաժնետեր) հիմնավորված համապատասխան փաստաթղթերով"
        ]
      }
    ]
  },
  {
    docId: '3',
    title: "Ֆիզիկական անձանց հաշվի բացման անհրաժեշտ փաստաթղթեր",
    blocks: [
      {
        items: [
          "Անձնագիր",
          "Միջազգային անձնագիր",
          "Եկամուտների ծագման աղբյուրը (ֆիզիկական անձի նախորդ տարվա հարկային հայտարարագիր, անշարժ գույքի, բաժնետոմսերի կամ արժեթղթերի վաճառքի կամ վարձակալության պայմանագիր)"
        ]
      }
    ]
  },
  {
    docId: '4',
    title: "Իրավաբանական անձանց փաստաթղթերի ցանկ",
    blocks: [
      {
        items: [
          "Կանոնադրություն (ոչ ռեզիդենտների դեպքում՝ կանոնադրություն կամ դրան փոխարինող այլ փաստաթուղթ)",
          "Պետական ռեգիստրի գրանցման վկայական (ոչ ռեզիդենտների դեպքում՝ տվյալ երկրի պետական գրանցման մարմնի կողմից տրված վկայական և հարկային մարմիններում գրանցված փաստաթուղթ՝ տրված գրանցման երկրի համապատասխան մարմնի կողմից)",
          "Հարկ վճարողի հաշվառման համարը (ՀՎՀՀ), եթե այն բացակայում է պետական ռեգիստրի վկայականում",
          "Գործադիր մարմնի ղեկավարի, գլխավոր հաշվապահի անձնագրերը կամ անձը հաստատող փաստաթղթերը, ինչպես նաև քաղվածքներ պաշտոններում նշանակվելու հրամաններից, եթե ղեկավարի մասին տեղեկությունը բացակայում է պետական գրանցամատյանում գրանցման վկայականում (ոչ ռեզիդենտների դեպքում՝ գործադիր մարմնի ղեկավարի անձնագիր(ները) և իրավասու մարմնի նշանակման մասին որոշումներով տրված պաշտոնները)",
          "Շահառուների անձնագրեր կամ նույնականացման քարտեր"
        ]
      },
      "Շահառուների համար անհրաժեշտ է՝",
      {
        items: [
          "Եթե շահառուն ֆիզիկական անձ է, անձնագրի կամ նույնականացման քարտի պատճենները",
          "Եթե շահառուն իրավաբանական անձ է, տվյալ փաստաթղթերի ցանկի 2-րդ, 3-րդ և 4-րդ կետերով նախատեսված փաստաթղթերի (ոչ ռեզիդենտների դեպքում՝ միայն 2-րդ և 3-րդ կետերով նախատեսված փաստաթղթերի) պատճենները տվյալ իրավաբանական անձի կողմից",
          "Ընկերության ֆինանսական հաշվետվություններ՝ վերջին մեկ տարվա կտրվածքով, աուդիտորական եզրակացություն",
          "Լիցենզիա, եթե ընկերության գործունեությունը պահանջում է:"
        ]
      }
    ]
  },
  {
    docId: '5',
    title: "Սակագներ",
    blocks: [
      {
        parts: [{ bold: "Ֆիզիկական անձանց համար" }]
      },
      {
        items: [
          "Հաշվի բացում՝ 50,000 դրամ",
          "Տարեկան սպասարկում՝ 250,000 դրամ",
          "Փակման վճար՝ 0 դրամ",
          "Դրամական միջոցների անկանխիկ մուտքագրում հաճախորդի հաշվին՝ 0.5%",
          "Հաճախորդների փոխանցումներ՝ 0.5%",
          "Հաշվի տեսակներ՝ USD, EUR, RUB, AED, GBP, CHF, CNY, CAD"
        ]
      },
      {
        parts: [{ bold: "Իրավաբանական անձանց համար" }]
      },
      {
        items: [
          "Հաշվի բացում՝ 100,000 դրամ",
          "Տարեկան սպասարկում՝ 500,000 ՀՀ դրամ",
          "Փակման վճար՝ 0 դրամ",
          "Դրամական միջոցների անկանխիկ մուտքագրում հաճախորդի հաշվին՝ 0.5%",
          "Հաճախորդների փոխանցումներ՝ 0.5%",
          "Հաշվի տեսակներ՝ USD, EUR, RUB, AED, GBP, CHF, CNY, CAD"
        ]
      }
    ]
  },
  {
    docId: '6',
    title: "Հաշվի բացման փուլեր",
    blocks: [
      {
        items: [
          {
            parts: [
              { bold: "Փաստաթղթերի ուղարկում" },
              { text: "Ուղարկեք անհրաժեշտ փաստաթղթերը հետևյալ էլ. հասցեին՝ " },
              { href: "mailto:primeonline@evoca.am", text: "primeonline@evoca.am" }
            ]
          },
          {
            parts: [
              { bold: "Առցանց նույնականացում տեսազանգով" },
              { text: "Փաստաթղթերի ամբողջական փաթեթը ստանալու հետո մենք կտեղեկացնենք՝ երբ և ինչպես է տեղի ունենալու անձը նույնականացնելու տեսազանգը: Տեսազանգից առաջ կարող են պահանջվել նաև այլ փաստաթղթեր: Բանկի դրական դիրքորոշումից հետո անհրաժեշտ է այլ բանկում գործող հաշվից առնվազն 50 ԱՄՆ դոլար փոխանցում կատարել Evocabank-ում Ձեր անունով բացված հաշվին:\nԳումարը ստանալու հետո նոր հաշիվը կակտիվանա, իսկ փոխանցված գումարը հասանելի կդառնա այդ հաշվի վրա: Փոխանցման մուտքագրման մասին Դուք տեղեկություն կստանաք էլեկտրոնային եղանակով:" }
            ]
          },
          {
            parts: [
              { bold: "Կապ մեզ հետ" },
              { text: "Ցանկացած հարցի դեպքում կարող եք գրել օնլայն " },
              { href: "mailto:primeonline@evoca.am", text: "primeonline@evoca.am" },
              { text: " հասցեին կամ զանգահարել +374 33 625555 հեռախոսահամարին:" }
            ]
          }
        ]
      }
    ]
  }
];
const NonResidentReport = [{title:"Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025թ."}];
const cardData = {
  title: "Ոչ ռեզիդենտ հաճախորդների հեռավար սպասարկում",
  description: "Բանկ այցելելն այլևս պարտադիր չէ։ Անգամ եթե չեք բնակվում ՀՀ-ում, Evocabank-ի հետ Դուք կարող եք բացել հաշիվներ օնլայն եղանակով աշխարհի ցանկացած կետից և ցանկացած պահի։",
  imageUrl: "https://www.evoca.am/images-cache/menu/1/17510033256067/780x585.png",
  altText: "Հաշիվների բացում և սպասարկում"
};

const NonResident = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [accountsReport, setAccountsReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [m] = await Promise.all([
          fetchCollection("menuItems"),
        ]);
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

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
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

          {/* Թարմացված տեքստային հատվածը */}
          <div className="flex-1 max-w-4xl text-gray-800 leading-relaxed space-y-4">
            <p>
              24/7 անձնական մենեջեր, ֆինանսական ծառայությունների հասանելիություն աշխարհի ցանկացած կետից, փաստաթղթերի անվճար առաքում Ձեր գտնվելու վայր. բոլոր մանրուքները մտածված են, որ Դուք խնայեք Ձեր ժամանակը, չշեղվեք կարևոր գործերից և, իհարկե, օգտվեք prime սպասարկումից:
            </p>
            <p>
              Ուղարկեք փաստաթղթերը, անցեք տեսազանգով նույնականացում և բացեք Ձեր հաշիվը՝ առանց Բանկ այցելելու:
            </p>
            <p>
              Մանրամասները և քայլ առ քայլ ուղեցույցը՝ ներքևում:
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10">
          <div className="md:pl-[calc(3rem+6rem)] max-w-4xl md:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase mb-6">
              ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
            </h2>
            <div className="max-w-4xl space-y-4">
              {initialAccordionsData.map((item) => (
                <InfoAccordion
                  key={item.docId}
                  title={item.title}
                  blocks={item.blocks}
                />
              ))}
            </div>

            <div className="mt-10 max-w-4xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Փաստաթղթեր
              </h2>
              <div className="space-y-5">
                {NonResidentReport.map((r) => (
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

export default NonResident;