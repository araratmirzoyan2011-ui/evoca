import React from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";

const linkClass = "font-medium text-[#6200d6] underline";

const introTitle = "Հարգելի Հաճախորդներ՝";

const introParagraphs = [
  {
    id: 1,
    content:
      "Մեր կողմից հաճախորդների բողոք-պահանջների ընդունման, քննարկման և որոշումների կայացման (արձագանքման) գործընթացը կարգավորվում է «Էվոկաբանկ» ԲԲԸ կողմից հաստատված՝ Բողոքների քննության կանոններով։",
  },
  {
    id: 2,
    content:
      "Ձեր իրավունքները կարող են պաշտպանվել ինչպես դատական կարգով, այնպես էլ Ֆինանսական համակարգի հաշտարարի միջոցով։ Ֆինանսական համակարգի հաշտարարի քննությանը ենթակա պահանջներ են համարվում այն բողոք պահանջները, որոնք ներկայացվում են ֆիզիկական անձ հաճախորդի կողմից մեր դեմ, կապված են մեր ծառայությունների հետ և պարունակում են 10 մլն դրամը կամ դրան համարժեք արտարժույթով գումարը չգերազանցող գույքային պահանջ։",
  },
  {
    id: 3,
    content:
      "Եթե Ձեր և Մեր միջև կնքվել է արբիտրաժային համաձայնություն, ապա մեր միջև ծագող վեճերը ենթակա են լուծման արբիտրաժային դատարանի կողմից («Առևտրային արբիտրաժի մասին» ՀՀ օրենքին, Արբիտրաժային դատարանի կանոնադրությանը և արբիտրաժի կանոնակարգին համապատասխան)։",
  },
  {
    id: 4,
    content: [
      "Ֆինանսական համակարգի հաշտարարի գործունեությանը մանրամասն կարող եք ծանոթանալ ",
      { text: "www.fsm.am", href: "https://www.fsm.am" },
      " պաշտոնական կայքում։ Ֆինանսական համակարգի հաշտարարի քննությանը ենթակա պահանջներին առնչվող հարցերով կարող եք դիմել մեր Իրավաբանական բաժին՝ այցելելով Գլխամասային գրասենյակ կամ զանգահարելով (010) 60-55-55 հեռախոսահամարով։",
    ],
  },
];

const noticeTitle = "Ուշադրություն՝";

const noticeItems = [
  {
    id: 1,
    content: [
      "Ցանկացած անձ իրավունք ունի ստանալ «Էվոկաբանկ» ԲԲԸ-ի վերաբերյալ «Բանկերի և բանկային գործունեության մասին» ՀՀ օրենքի 20-րդ հոդվածի 3-րդ մասով, 43-րդ հոդվածի 2-րդ մասով սահմանված տեղեկատվության պատճենները (օրենքը կարող եք գտնել ՀՀ Կենտրոնական բանկի ",
      { text: "www.cba.am", href: "https://www.cba.am" },
      " ինտերնետային հասցեում)։ Տեղեկատվության թղթային մեկ տպագիր էջի արժեքը 50 դրամ է, իսկ Էլեկտրոնային առաքման դեպքում անվճար է։",
    ],
  },
  {
    id: 2,
    content: [
      "Վերոնշյալ տեղեկությունները Բանկը տրամադրում է գրավոր դիմում ստանալուց 3 (երեք) աշխատանքային օրվա ընթացքում։ Գրավոր դիմումը կարող է ներկայացվել հետևյալ ձևերով. առձեռն՝ Բանկի գլխամասային գրասենյակում, ցանկացած մասնաճյուղում, էլեկտրոնային հասցեով՝ ",
      { text: "hello@evoca.am", href: "mailto:hello@evoca.am" },
      " կամ փոստով՝ «Էվոկաբանկ» ԲԲԸ, ՀՀ, 0010, ք. Երևան, Հանրապետության 44/2 հասցեով։",
    ],
  },
];

const rightsDocs = [
  { id: 1, title: "«Անցանկալի հաճախորդների հետ հարաբերությունների կառավարման» ընթացակարգ (Ուժի մեջ է 30.04.20", url: "#" },
  { id: 2, title: "Բողոքների քննության կանոններ (01.09.2026թ.)", url: "#" },
  { id: 3, title: "Ինչ անել, եթե բողոք ունեք (01.09.2026թ.)", url: "#" },
  { id: 4, title: "Բողոքի ներկայացման հայտ (01.09.2026թ.)", url: "#" },
  { id: 5, title: "Անձնական տվյալների մշակման և երրորդ անձանց փոխանցման Համաձայնություն", url: "#" },
  { id: 6, title: "Հաճախորդներին ծառայությունների մատուցման նպատակով Բանկի կողմից «ԷԿԵՆԳ» ՓԲԸ և «ՆՈՐՔ» կենտրոնից ստացվող տեղեկու", url: "#" },
];

// Renders a string or a mixed array of strings and link objects
function RichText({ content }) {
  if (typeof content === "string") return content;

  return content.map((part, i) =>
    typeof part === "string" ? (
      <React.Fragment key={i}>{part}</React.Fragment>
    ) : (
      <a
        key={i}
        href={part.href}
        target={part.href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={linkClass}
      >
        {part.text}
      </a>
    )
  );
}

function Rights() {
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
              Հաճախորդի իրավունքները (Բողոքի ներկայացման կանոններ)
            </h1>

            <p className="mb-8 font-bold max-[400px]:mb-5">{introTitle}</p>

            {introParagraphs.map((p) => (
              <p key={p.id} className="mb-8 max-[400px]:mb-5">
                <RichText content={p.content} />
              </p>
            ))}

            <h3 className="mb-5 font-bold text-[#6200d6] max-[400px]:mb-4">
              {noticeTitle}
            </h3>

            <ul className="mb-14 space-y-5 max-[400px]:mb-10 max-[400px]:space-y-4">
              {noticeItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-4 max-[400px]:gap-3"
                >
                  <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#6200d6] max-[400px]:mt-[7px] max-[400px]:h-2 max-[400px]:w-2" />
                  <span>
                    <RichText content={item.content} />
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="mb-6 text-xl font-bold text-gray-900 max-[400px]:mb-4 max-[400px]:text-lg">
              Փաստաթղթեր
            </h2>

            <div className="space-y-5 max-[400px]:space-y-3">
              {rightsDocs.map((doc) => (
                <DocumentCard key={doc.id} title={doc.title} url={doc.url} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Rights;