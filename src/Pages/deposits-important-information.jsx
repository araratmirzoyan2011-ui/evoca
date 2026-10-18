import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import { db } from "../firebase.js";
import { DocumentCard } from '../Components/DocumentCard';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import SocialIcons from '../Components/SocialIcons.jsx';

// type: h2 | numlist   (numlist-ի item-ը՝ { text, sub? })
const depositBlocks = [
  { type: "h2", text: "Ընդհանուր դրույթներ" },
  {
    type: "numlist",
    items: [
      {
        text: "«ԷՎՈԿԱԲԱՆԿ» ԲԲԸ-ն (այսուհետ՝ Բանկ) իրականացնում է իրավաբանական և ֆիզիկական անձանցից (ռեզիդենտ, ոչ ռեզիդենտ) ժամկետային ավանդների (այսուհետ՝ Ավանդ) ներգրավում։",
      },
      {
        text: "Ավանդները ներգրավվում են՝ ՀՀ դրամով, ԱՄՆ դոլարով, Եվրոյով և ՌԴ ռուբլով։",
      },
      {
        text: "Ավանդներն ընդունվում են ինչպես կանխիկ, այնպես էլ անկանխիկ եղանակով։\nԱվանդների դիմաց հաշվեգրվող տոկոսագումարների վճարումն իրականացվում է ինչպես կանխիկ, այնպես էլ անկանխիկ եղանակով։",
      },
      {
        text: "Ֆիզիկական անձ հաճախորդի կողմից Ավանդի ներդրումը ձևակերպվում է Բանկի կողմից սահմանված ձևի Հայտ-պայմանագիրը ստորագրելով և/կամ էլեկտրոնային հայտ ներկայացնելով։\nՀայտ-պայմանագրում/էլ. հայտում նշվում է Ավանդի տեսակը, գումարը, արժույթը, ժամկետը, տոկոսադրույքը և ըստ անհրաժեշտության այլ պայմաններ։",
      },
      {
        text: "Ավանդների ներդրման համար գործառնական օր է համարվում՝",
        sub: [
          "Գլխամասում և մասնաճյուղերում ներդրվող ավանդների գծով՝ տվյալ ստորաբաժանման Հաճախորդների սպասարկման համար սահմանված ժամերը,",
          "Հեռակառավարման համակարգերի միջոցով ներդրվող ավանդների համար՝ տվյալ օրացուցային օրվա 24-ժամյա ժամանակահատվածը",
        ],
      },
      {
        text: "Ավանդների ներդրման և համալրման համար տվյալ գործառնական օրվա ընթացքում ներկայացված հայտերը կատարվում են միևնույն գործառնական օրվա ընթացքում։",
      },
      {
        text: "Ֆիզիկական անձ հանդիսացող Ավանդատուների ավանդները երաշխավորվում են համաձայն «Ֆիզիկական անձանց բանկային ավանդների հատուցումը երաշխավորելու մասին» ՀՀ օրենքի։ Երաշխավորված ավանդների չափերին Հաճախորդները կարող են ծանոթանալ Բանկի ինտերնետային կայքում, Ավանդների տեղեկատվական ամփոփագրում, ինչպես նաև Ավանդ ներդնելու դեպքում վերջինիս տրամադրվող ծանուցման միջոցով։",
      },
      {
        text: "Ավանդի գումարի վերադարձը կատարվում է Ավանդի պայմանագրի վերջին օրը, իսկ եթե տվյալ օրը ոչ աշխատանքային է, ապա հաջորդ աշխատանքային օրը։",
      },
      {
        text: "Հաշվեգրված տոկոսների վճարումը իրականացվում է համաձայն Հաճախորդի կողմից Հայտ-պայմանագրում/Պայմանագրում նշված տոկոսների վճարման պարբերականության։",
      },
      {
        text: "Ավանդների հետ կապված կանխիկ գործառնությունների միջնորդավճարները սահմանվում են Բանկի «Սակագներով և դրույքներով» (TRM14-0002-02/1)-ով սահմանված դրամարկղային գործառնությունների սակագներով, բացառությամբ ՌԴ ռուբլով ավանդների։",
        sub: [
          "Կանխիկ ՌԴ ռուբլով ներդրված Ավանդը վերադարձվում է կանխիկ ՌԴ ռուբլով, իսկ անկանխիկ ՌԴ ռուբլով ներդրված Ավանդը վերադարձվում է անկանխիկ ՌԴ ռուբլով առանց միջնորդավճարների գանձման։",
          "Անկանխիկ ՌԴ ռուբլով ներդրված Ավանդը կանխիկ ՌԴ ռուբլով վերադարձնելու դեպքում գանձվում է վերադարձման օրը ՌԴ ռուբլու կանխիկացման համար սահմանված միջնորդավճարը։",
          "Կանխիկ ՌԴ ռուբլով ներդրված Ավանդը անկանխիկ ՌԴ ռուբլով վերադարձնելու դեպքում գանձվում է վերադարձման օրը կանխիկ ՌԴ ռուբլու մուտքագրման համար սահմանված միջնորդավճարը։",
        ],
      },
      {
        text: "Արտարժույթով ներդրված ավանդների դիմաց հաշվեգրված տոկոսագումարները ավանդատուի ցանկությամբ կարող են վճարվել այն արտարժույթով, որով ներգրավվել է ավանդը, ինչպես նաև ՀՀ դրամով՝ հիմք ընդունելով վճարման օրը տվյալ արտարժույթի համար Բանկի կողմից սահմանված անկանխիկ առքի փոխարժեքը։",
      },
    ],
  },
];

const depositdata = [
  { id: 1, title: "Տեղեկատվական ամփոփագիր (Ավանդներ) 09․06․2026", url: "#" },
  { id: 2, title: "Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025թ.", url: "#" },
  { id: 3, title: "Դեբետային և կրեդիտային քարտեր (Տեղեկատվական ամփոփագիր) 17.03.2026", url: "#" },
];

const DepositImportant = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuSnap = await getDocs(
          query(collection(db, "DepositMenu"), orderBy("order"))
        );
        setMenuItems(menuSnap.docs.map((d) => d.data()));
      } catch (e) {
        console.error(e);
        setError("Չհաջողվեց բեռնել տվյալները");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Navbar items={menuItems} />

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-8 text-[32px] font-medium leading-[40px] text-[#333] max-[400px]:mb-6 max-[400px]:text-[24px] max-[400px]:leading-[30px]">
              Կարևոր տեղեկատվություն
            </h1>

            {loading && <p>Բեռնվում է...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {depositBlocks.map((b, idx) => {
              if (b.type === "h2") {
                return (
                  <h2
                    key={idx}
                    className="mb-6 mt-4 text-[28px] font-medium leading-[36px] text-[#333] max-[400px]:text-[22px] max-[400px]:leading-[28px]"
                  >
                    {b.text}
                  </h2>
                );
              }

              if (b.type === "numlist") {
                return (
                  <ol
                    key={idx}
                    className="mb-8 list-decimal space-y-5 pl-8 marker:font-bold marker:text-[#6d1fd1]"
                  >
                    {b.items.map((item, i) => (
                      <li key={i} className="pl-2">
                        <span className="whitespace-pre-line">{item.text}</span>

                        {item.sub && (
                          <ol className="mt-4 list-decimal space-y-4 pl-8 marker:font-bold marker:text-[#6d1fd1]">
                            {item.sub.map((s, j) => (
                              <li key={j} className="pl-2">
                                {s}
                              </li>
                            ))}
                          </ol>
                        )}
                      </li>
                    ))}
                  </ol>
                );
              }

              return null;
            })}

            <h2 className="mb-6 mt-10 text-xl font-bold text-gray-900">
              Փաստաթղթեր
            </h2>

            <div className="space-y-5">
              {depositdata.map((r) => (
                <DocumentCard key={r.id} title={r.title} url={r.url} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default DepositImportant;