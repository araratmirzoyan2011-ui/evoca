import React from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";

// content-ը միշտ զանգված է՝ string կամ { text, bold?, href? }
// italic: true՝ ամբողջ պարբերությունը շեղատառ է
const blocks = [
  {
    type: "paragraph",
    italic: true,
    content: [
      { text: "Ֆինանսական համակարգի հաշտարարի", bold: true },
      " գրասենյակն անկախ կառավարման համակարգով կառույց է, որի հիմնադիրն է ՀՀ կենտրոնական բանկը։ Հաշտարարի գրասենյակը կոչված է լուծելու ֆիզիկական անձ սպառողների և ֆինանսական կազմակերպությունների միջև ծագած գույքային վեճերը։",
    ],
  },
  {
    type: "paragraph",
    italic: true,
    content: ["Հաշտարարի ծառայություններն անվճար են։"],
  },
  {
    type: "heading",
    content: ["Ֆինանսական համակարգի հաշտարարի գործունեության նպատակներն են՝"],
  },
  {
    type: "bullets",
    items: [
      "ֆինանսական ոլորտում սպառողների իրավունքների ու շահերի պաշտպանությունը,",
      "Սպառողների պահանջների արագ, արդյունավետ և անվճար քննությունը,",
      "ֆինանսական համակարգի նկատմամբ հանրության վստահության բարձրացումը։",
    ],
  },
  {
    type: "heading",
    content: ["Ֆինանսական համակարգի հաշտարարի գրասենյակ՝"],
  },
  {
    type: "paragraph",
    content: ["Ֆինանսական համակարգի գլխավոր հաշտարար, Գրասենյակի կառավարիչ՝ Վազգեն Մնացականյան"],
  },
  { type: "paragraph", content: ["Հաշտարար՝ Փիրուզ Սարգսյան"] },
  {
    type: "paragraph",
    content: ["Հասցե՝ ՀՀ, 0010, ք. Երևան, Մ. Խորենացու փող., 15, «Էլիտ Պլազա» բիզնես կենտրոն 7-րդ հարկ"],
  },
  { type: "paragraph", content: ["Հեռ.՝ +374 60 70-11-11"] },
  { type: "paragraph", content: ["Ֆաքս՝ +374 10 58-24-21"] },
  {
    type: "paragraph",
    content: ["Էլ. հասցե՝ ", { text: "info@fsm.am", href: "mailto:info@fsm.am" }, ","],
  },
  {
    type: "paragraph",
    content: ["Պաշտոնական կայք՝ ", { text: "www.fsm.am", href: "https://www.fsm.am" }, "։"],
  },
  { type: "heading", content: ["Աշխատանքային ժամեր՝"] },
  {
    type: "paragraph",
    content: [
      "Ֆինանսական համակարգի հաշտարարի գրասենյակը աշխատում է ամեն օր ժամը 09:00 - 18:00 (ընդմիջման ժամ՝ 13:00-ից 14:00), բացի հանգստյան և տոն օրերից։",
    ],
  },
];

function Ombudsman() {
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
              Ֆին. հաշտարար
            </h1>

            {blocks.map((block, i) => (
              <React.Fragment key={i}>
                {block.type === "heading" && (
                  <p className="mb-6 font-bold text-[#222] max-[400px]:mb-4">
                    {block.content}
                  </p>
                )}

                {block.type === "paragraph" && (
                  <p
                    className={`mb-6 max-[400px]:mb-4 ${
                      block.italic ? "italic" : ""
                    }`}
                  >
                    {block.content.map((part, j) => {
                      if (typeof part === "string") return part;

                      if (part.href) {
                        return (
                          <a
                            key={j}
                            href={part.href}
                            target={part.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="font-medium text-[#6200d6] underline"
                          >
                            {part.text}
                          </a>
                        );
                      }

                      return (
                        <span key={j} className={part.bold ? "font-bold" : ""}>
                          {part.text}
                        </span>
                      );
                    })}
                  </p>
                )}

                {block.type === "bullets" && (
                  <ul className="mb-8 space-y-4 pl-4 max-[400px]:mb-5 max-[400px]:space-y-3 max-[400px]:pl-1">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-4 max-[400px]:gap-3">
                        <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#6200d6] max-[400px]:mt-[7px] max-[400px]:h-2 max-[400px]:w-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Ombudsman;