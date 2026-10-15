import React from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";

const regulationTitle = "Բանկի կողմից ծառայությունների մատուցումը կարգավորվում է՝";

const regulationGroups = [
  {
    title: "ՀՀ Օրենքներով՝",
    items: [
      "«Հայաստանի Հանրապետության Քաղաքացիական օրենսգիրք»,",
      "«Բանկային գաղտնիքի մասին»,",
      "«Բանկային ավանդների ներգրավման մասին»,",
      "«Վճարման հանձնարարականով միջոցների փոխանցումների մասին»,",
      "«Արժութային կարգավորման և արժութային վերահսկողության մասին»,",
      "«Արժեթղթերի շուկայի մասին»,",
      "«Ֆիզիկական անձանց բանկային ավանդների հատուցումը երաշխավորելու մասին»,",
      "«Վճարահաշվարկային համակարգերի և վճարահաշվարկային կազմակերպությունների մասին»,",
      "«Փողերի լվացման և ահաբեկչության ֆինանսավորման դեմ պայքարի մասին»,",
      "«Սպառողական կրեդիտավորման մասին»,",
      "«Բնակարանային հիփոթեքային կրեդիտավորման մասին»,",
      "«Պետական կենսաթոշակների մասին»,",
      "«Ֆինանսական համակարգի հաշտարարի մասին»,",
      "«Պետական նպաստների մասին»,",
      "«Բանկերի և բանկային գործունեության մասին»։",
    ],
  },
  {
    title: "ՀՀ Կենտրոնական Բանկի նորմատիվ իրավական ակտերով՝",
    items: [
      "Կանոնակարգ 8/01 «Տարեկան փաստացի տոկոսադրույքի հաշվարկման բացատրություններ և օրինակներ»,",
      "Կանոնակարգ 8/02 «Բանկային ավանդների տարեկան տոկոսային եկամտաբերության հաշվարկումը»,",
      "Կանոնակարգ 8/03 «ֆինանսական կազմակերպությունների և ֆինանսական խմբերի կողմից տեղեկությունների հրապարակումը»,",
      "Կանոնակարգ 8/04 «Հաճախորդների բողոքների քննության գործընթացը կարգավորող ներքին իրավական ակտերին ներկայացվող նվազագույն պայմաններ և սկզբունքներ»,",
      "Կանոնակարգ 8/05 «ֆինանսական կազմակերպությունների գործարար վարվելակերպի կանոնները»,",
      "Կանոնակարգ 9 «ՀՀ տարածքում գործող բանկերում կանխիկ դրամով կատարվող գործառնությունները»։",
    ],
  },
  {
    title:
      "Բանկի Խորհրդի կողմից հաստատված ներքին իրավական ակտերով (կանոնակարգեր, կարգեր, ընթացակարգեր և այլն)։",
    items: [],
  },
];

const regulationpdf = [
  { title: "«Անցանկալի հաճախորդների հետ հարաբերությունների կառավարման» ընթացակարգ (Ուժի մեջ է 30.04.2026-ից)", url: "#" },
  { title: "Բնապահպանական և սոցիալական կառավարման համակարգ", url: "#" },
  { title: "Հաճախորդների սպասարկման գործելակարգ 01.09.2026թ.", url: "#" },
  { title: "Տեղեկատվական անվտանգության քաղաքականություն (Ուժի մեջ է 25.12.2025թ.-ից)", url: "#" },
];

function Regulation() {
  return (
    <>
      <Header />

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333] max-[400px]:mb-8 max-[400px]:text-[24px]">
              Կարգավորում
            </h1>

            <h2 className="mb-6 text-[32px] font-medium leading-[40px] text-[#333] max-[400px]:mb-4 max-[400px]:text-[24px] max-[400px]:leading-[30px]">
              {regulationTitle}
            </h2>

            <ul className="mb-14 space-y-6 pl-4 max-[400px]:mb-10 max-[400px]:space-y-4 max-[400px]:pl-1">
              {regulationGroups.map((group, i) => (
                <li key={i}>
                  <div className="flex items-start gap-4 max-[400px]:gap-3">
                    <span className="mt-[8px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#6200d6] max-[400px]:mt-[6px] max-[400px]:h-2 max-[400px]:w-2" />
                    <span className="font-bold text-[#222]">{group.title}</span>
                  </div>

                  {group.items.length > 0 && (
                    <ul className="mt-4 space-y-4 pl-10 max-[400px]:mt-3 max-[400px]:space-y-3 max-[400px]:pl-6">
                      {group.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-4 max-[400px]:gap-3">
                          <span className="mt-[13px] h-[2px] w-3 shrink-0 bg-[#6200d6] max-[400px]:mt-[11px] max-[400px]:w-2.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <h2 className="mb-6 text-xl font-bold text-gray-900 max-[400px]:mb-4 max-[400px]:text-lg">
              Փաստաթղթեր
            </h2>

            <div className="space-y-5 max-[400px]:space-y-3">
              {regulationpdf.map((r, index) => (
                <DocumentCard key={index} title={r.title} url={r.url} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Regulation;