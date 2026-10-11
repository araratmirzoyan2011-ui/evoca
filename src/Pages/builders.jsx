import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  setDoc,
} from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import ConstructionAccordion from "../Components/ConstructionAccordion.jsx";

// ---------- DATA ----------
const P = (path) => encodeURI(`https://www.evoca.am/file_manager/${path}`);
const d = (label, value, href) => (href ? { label, value, href } : { label, value });

const PROJECT = "Նախագիծ՝";
const DEV = "Կառուցապատող՝";
const BUILDER = "Շինարար՝";
const PHONE = "Հեռ․՝";
const ADDR = "Հասցե՝";
const NEW_ADDR = "Նորակառույցի հասցե՝";
const OFFICE_ADDR = "Գրասենյակի հասցե՝";
const SALES = "Վաճառքի պատասխանատու՝";
const LOAN = "Վարկը տրամադրվում է՝";
const LOAN_URL =
  "https://www.evoca.am/hy/loans/mortgage-loans/residential-mortgage-loans";

const co = (id, name, details, images) => ({
  id: String(id),
  name,
  details,
  images,
  order: id,
});

const companiesData = [
  co(1, "«ՀԱԷԿ-ի Շինարարություն» ՓԲԸ", [
    d(PROJECT, "Մեծամոր Ռեզիդենս"),
    d(DEV, "«ՀԱԷԿ-ի Շինարարություն» ՓԲԸ"),
    d(ADDR, "ՀՀ, Արմավիրի մարզ, ք․ Մեծամոր, 2-րդ թաղամաս 1/2 հողամաս"),
    d(PHONE, "+374 95 506506"),
  ], [
    P("constractors/hipotek [Recovered]shin web.png"),
    P("constractors/hipotek [Recovered]shin2 web.png"),
  ]),
  co(2, "Dilijan Eye", [
    d(DEV, "«ԴԻ ՍԻ ԴԻ» ՍՊԸ"),
    d(PHONE, "+37443100550"),
    d(ADDR, "ՀՀ, Տավուշի մարզ, ք․ Դիլիջան, Առողջարանային փողոց 12/4"),
  ], [P("Constractors/web 1.jpg"), P("Constractors/web 2.jpg")]),
  co(3, "«ՄԱՆ ԻՆՎԵՍՏ ԳՐՈՒՊ» ՍՊԸ", [
    d(DEV, "«ՄԱՆ ԻՆՎԵՍՏ ԳՐՈՒՊ» ՍՊԸ"),
    d(PHONE, "+374 55-200-707 | +374 41-200-700"),
    d(ADDR, "Կոտայքի մարզ, Նոր Հաճն, գյուղ Քանաքեռավան, Երևանյան խճ. 8 և 8/3"),
  ], [
    P("Constractors/man-invest-web.png"),
    P("Constractors/man-invest-2-web (1).png"),
  ]),
  co(4, "«ԱՍՍՏՐՈՅ» ՍՊԸ", [
    d(DEV, "«ԱՍՍՏՐՈՅ» ՍՊԸ"),
    d(PHONE, "+374 95 444466"),
    d(ADDR, "ՀՀ, Արարատի մարզ, ք․ Վեդի, Արցախի փողոց 1"),
  ], [P("Constractors/asatroy web.png"), P("Constractors/asatroy-web2.png")]),
  co(5, "«White island» ՍՊԸ", [
    d(DEV, "«White island» ՍՊԸ"),
    d(PHONE, "+37491767606, +37491473874"),
    d(ADDR, "ՀՀ, ք. Աշտարակ"),
  ], [
    P("Constractors/hipotekwhite-island-web.png"),
    P("Constractors/hipotekwhite-island_1-web.png"),
  ]),
  co(6, "PARK VIEW", [
    d(DEV, "«ՋԻ ԷՄ ԴԻՎԵԼԸՓՄԵՆԹ» ՍՊԸ"),
    d(PHONE, "+374 55 094949."),
    d(ADDR, "ք. Երևան, Արաբկիր, Գ. Ղափանցյան փողոց 4/9"),
  ], [
    P("Constractors/hipotekpark view2 - web (2).png"),
    P("Constractors/hipotekpark view2 - web (1).png"),
  ]),
  co(7, "«ՕՊՏԻՄԱ 25» ՍՊԸ", [
    d(DEV, "«Օպտիմա 25» ՍՊԸ"),
    d(PHONE, "+374 93 77 93 84, +374 91 19 67 67, +374 91 49 07 00"),
    d(ADDR, "ՀՀ Կոտայքի մարզ, համայնք Նաիրի գյուղ Զովունի 41-րդ փողոց 1-ին նրբանցք 5/2"),
  ], [P("Constractors/optimaweb.png"), P("Constractors/optima2web.png")]),
  co(8, "«Midis Park»", [
    d(DEV, "«Միդիս Քնսթրաքշն» ՍՊԸ"),
    d(PHONE, "+374 55 386 500"),
    d(ADDR, "ՀՀ Կոտայքի մարզ, գյուղ Ձորաղբյուր, 2-րդ թաղամաս, 10"),
    d(SALES, "Silver Rea"),
  ], [P("Constractors/midis-web.png"), P("Constractors/midis2-web.png")]),
  co(9, "«Ավենյու Գրուպ» ՍՊԸ", [
    d(DEV, "Ավենյու Գրուպ ՍՊԸ"),
    d(NEW_ADDR, "ՀՀ, Մարզ Կոտայք, գյուղ Նաիրի, Զովունի 30-րդ փողոց 33/1"),
    d(PHONE, "+374 98 778 177, +374 98 748177"),
  ], [
    P("Constractors/hipotekavenue-web.png"),
    P("Constractors/hipotekavenue2-web.png"),
  ]),
  co(10, "«ԴԻ ՋԻ ԷՅ ՔԸՆՍԹՐԱՔՇՆ» ՍՊԸ", [
    d(DEV, "«ԴԻ ՋԻ ԷՅ ՔԸՆՍԹՐԱՔՇՆ» ՍՊԸ"),
    d(ADDR, "Մարզ Կոտայք, համայնք Աբովյան Աբովյան ք. Հատիսի փողոց 1/85"),
    d(PHONE, "+374 33 015509"),
  ], [
    P("Constractors/karucapatox-web.png"),
    P("Constractors/karucapatox-web2.png"),
  ]),
  co(11, "«1ԷՍՔՅՈՒ-ԱՐԳՈ» ՍՊԸ", [
    d(DEV, "«1ԷՍՔՅՈՒ-ԱՐԳՈ» ՍՊԸ"),
    d(ADDR, "ՀՀ, ք. Աշտարակ, փ․ Երևանյան 2/10"),
    d(SALES, "«Արգո Ռեալթի»"),
    d(PHONE, "+374 55 200 707| 80 85"),
  ], [P("constractors/1sq-web.png"), P("constractors/1sq-web-2.png")]),
  co(12, "«ԱՏԱՐԱԴ» ՍՊԸ", [
    d(DEV, "ԱՏԱՐԱԴ ՍՊԸ"),
    d(NEW_ADDR, "ՀՀ, ք. Երևան, Գ. Հովսեփյան 26/15"),
    d(PHONE, "+374 44 58 06 06 | +374 55 21 83 32"),
  ], [P("constractors/atarad-web.png"), P("constractors/atarad-web-2.png")]),
  co(13, "«Majestic Residence»", [
    d(DEV, "«ՍԱՏՈՒՐՆԱՎԱՆ» ՍՊԸ"),
    d(ADDR, "Մարզ Կոտայք, Աբովյան, ք. Ծաղկաձոր, փ․ Պահլավունյաց 73"),
    d(PHONE, "+374 95 200 600"),
  ], [P("constractors/saturn-web.png"), P("constractors/saturn-web-2.png")]),
  co(14, "ԱՄՈՒՐ 21 ՍՊԸ", [
    d(BUILDER, "ԱՄՈՒՐ 21 ՍՊԸ"),
    d(NEW_ADDR, "ՀՀ, Կոտայքի մարզ, գ. Առինջ, Խ. Աբովյան, 18 փ., 8"),
    d(PHONE, "+374 95 06 44 08"),
  ], [P("constractors/amur1[1][1].jpg")]),
  co(15, "«Փիրումյան Շին» ՍՊԸ", [
    d(DEV, "«Փիրումյան Շին» ՍՊԸ"),
    d(ADDR, "ք.Երևան, Դավթաշեն համայնք, Փիրումյանների փ., 7/6"),
    d(PHONE, "+374 96 91 41 41"),
  ], [
    P("Constractors/karucapatox-pirumyan-400x400.png"),
    P("Constractors/karucapatox-pirumyan-400x400-2.png"),
  ]),
  co(16, "In Town", [
    d(DEV, "In Town"),
    d(ADDR, "Կոտայքի մարզ, Ջրվեժ համայնք, Ձորաղբյուր, Լճափի փ., 1/3"),
    d(SALES, "«ՊՐԵՄԻՈՒՄ ՌԻԵԼԹԻ»"),
    d(PHONE, "+374 96 03 23 03"),
  ], [
    P("constractors/karlenashen1-web.png"),
    P("Constractors/karlenashen2-web[1].jpg"),
  ]),
  co(17, "«ՄԱՆ ԻՆՎԵՍՏ ԳՐՈՒՊ» ՍՊԸ", [
    d(BUILDER, "«ՄԱՆ ԻՆՎԵՍՏ ԳՐՈՒՊ» ՍՊԸ"),
    d(ADDR, "Կոտայքի մարզ, Նոր Հաճն, գյուղ Քանաքեռավան, Երևանյան խճ. 6, 6/1, 6/3, 6/4, 6/5"),
    d(PHONE, "055-200-707 | 041-200-700"),
  ], [P("Constractors/maninvest.png")]),
  co(18, "Շինարտ Գրուպ ՍՊԸ", [
    d(ADDR, "ՀՀ, ք․ Երևան, Նազարբեկյան փողոց, 41/1"),
    d(PHONE, "+374 33 400410"),
  ], [P("Shinart2.png"), P("Shinart4.png")]),
  co(19, "Ս.Կ. ԳՐՈՒՊ ՍՊԸ", [
    d(BUILDER, "Ս.Կ. ԳՐՈՒՊ ՍՊԸ"),
    d(OFFICE_ADDR, "ք.Երևան, Մալաթիա, Լենինգադյան 27/6"),
    d(PHONE, "+374 33 400410"),
  ], [P("Constractors/s.k.group1.jpg"), P("Constractors/s.k.group2.jpg")]),
  co(20, "ԹՈՓ ԲԻԼԴԻՆԳՍ ՍՊԸ", [
    d(ADDR, "ք.Երևան Ավան Աշխաբադի փողոց 9/2"),
    d(PHONE, "033-583333 | 011-253333"),
    d("Կայք՝", "topbuildings.am", "https://topbuildings.am/"),
  ], [P("constractors/topbuildings1.jpg"), P("constractors/topbuildings.jpg")]),
  co(21, "«Pullman Living and Residences»", [
    d(BUILDER, "«Տեխնոտուն» ՍՊԸ"),
    d(ADDR, "ք.Երևան, Նորքի այգիներ, փ. 180"),
    d(PHONE, "+374 55 065 055"),
  ], [
    P("Constractors/karucapatox1[1].jpg"),
    P("Constractors/texnotun2[1].jpg"),
  ]),
  co(22, "«Միթսթարթ» ՍՊԸ", [
    d(BUILDER, "«Միթսթարթ» ՍՊԸ"),
    d(NEW_ADDR, "Կոտայքի մարզ, Նաիրի համայնք, Զովունի 1-ին փողոց"),
    d(PHONE, "+374 55200707 | +374 41200707 | 8085"),
  ], [P("constractors/Untitled[1].png")]),
  co(23, "«ԲՈՒԼԴՈԶԵՐ ԳՐՈՒՊ» ՍՊԸ", [
    d(PROJECT, "High Park"),
    d(DEV, "«ԲՈՒԼԴՈԶԵՐ ԳՐՈՒՊ» ՍՊԸ"),
    d(PHONE, "374 91 898 811"),
    d(ADDR, "ք.Երևան, Գ.Հովսեփյան 58/15"),
  ], [
    P("constractors/bulduzer-group-1-web[1].jpg"),
    P("constractors/bulduzer-group-2-web[1].jpg"),
  ]),
  co(24, "«Նորթերն Գեյթս» ԲԲԸ", [
    d(DEV, "«Նորթերն Գեյթս» ԲԲԸ"),
    d(PHONE, "374 98 844 771"),
    d(ADDR, "ՀՀ, ք. Երևան, Ավան, Զ.Սարկավագի փողոց 128"),
  ], [
    P("constractors/karucapatox-«Նորթերն-Գեյթս»-ՍՊԸ-web.png"),
    P("constractors/karucapatox-«Նորթերն-Գեյթս»-ՍՊԸ-2-web[1].jpg"),
  ]),
  co(25, "«Կոնստրո» ՍՊԸ", [
    d(DEV, "«Կոնստրո» ՍՊԸ"),
    d(PHONE, "093 309 111"),
    d(ADDR, "Մարզ Կոտայք, համայնք Նոր Հաճն, գյուղ Մրգաշեն 1-ին փողոց 2-րդ նրբանցք 3"),
    d(LOAN, "Բանկի սեփական ռեսուրսներով", LOAN_URL),
  ], [
    P("Constractors/kastro-1[1].jpg"),
    P("Constractors/kastro-2-web[1].jpg"),
  ]),
  co(26, "«ՐԻՎԵՐ ՍԱՅԴ» ՍՊԸ", [
    d(DEV, "«ՐԻՎԵՐ ՍԱՅԴ» ՍՊԸ"),
    d(PHONE, "374 55 433330"),
    d(ADDR, "ք.Դիլիջան, Սայաթ-Նովայի փ. 67/1 և 69"),
  ], [
    P("constractors/karucapatox-Riverside-400x400[1].jpg"),
    P("constractors/karucapatox-Riverside2-400x400[1].jpg"),
  ]),
  co(27, "«Կամ Դեվելոփմենթս» ՍՊԸ", [
    d(DEV, "«Կամ Դեվելոփմենթս» ՍՊԸ"),
    d(PHONE, "033 363 322 | 099 363 322"),
    d(ADDR, "ք. Երևան, Դավթաշեն Գ. Աղաբաբյան փ. 7/7, 7/8, 7/9, 7/10, 7/11, 7/12, 7/13, 7/16, 7/17, 7/18"),
    d(LOAN, "Բանկի սեփական ռեսուրսներով", LOAN_URL),
    d(
      "Հասցեներ՝",
      "ք. Երևան Աջափնյակ Գ-1 թաղամաս 8/43, 8/44, 8/45, 8/46 8/47, 8/48,\nք. Երևան Աջափնյակ Գ-1 թաղամաս 4/78, 4/136, 4/137, 4/138, 4/139, 4/140, 4/141, 4/142:"
    ),
  ], [
    P("constractors/Դիվելոփենթ-ՍՊԸ-Դավթաշեն[1].jpg"),
    P("constractors/Դիվելոփենթ-ՍՊԸ-Դավթաշեն2[1].jpg"),
    P("constractors/Դիվելոփենթ-ՍՊԸ-web3[1].jpg"),
    P("constractors/Դիվելոփենթ-ՍՊԸ-web4[1].jpg"),
    P("constractors/Դիվելոփենթ-ՍՊԸ-web5[1].jpg"),
    P("constractors/Դիվելոփենթ-ՍՊԸ-web6[1].jpg"),
  ]),
  co(28, "ՄԵՏՏԱ ԳՐՈՒՊ ՍՊԸ", [
    d(DEV, "«ՄԵՏՏԱ ԳՐՈՒՊ» ՍՊԸ"),
    d(ADDR, "ՀՀ, ք. Երևան, Արաբկիր, Հ. Արղության փողոց 15/8, 15/10"),
    d(PHONE, "374 44 471 010"),
  ], [
    P("constractors/metta1-web[1].jpg"),
    P("constractors/metta2-web[1].jpg"),
  ]),
  co(29, "Վի Էմ Բիլդինգ", [
    d(BUILDER, "Վի Էմ Բիլդինգ"),
    d(NEW_ADDR, "ՀՀ, ք. Երևան, Արաբկիր, Մալխասյանց 9/4"),
    d(PHONE, "+374 41 10 14 15"),
  ], [
    P("Constractors/viembuilding1 (008).png"),
    P("Constractors/viembuilding2.png"),
  ]),
  co(30, "ՍՎ ԵՎ ԳԱ ՍՊԸ", [
    d(ADDR, "ՀՀ, ք. Երևան, Արաբկիր, Գ. Ղափանցյան փողոց, 3"),
    d(PHONE, "+374 44777909"),
    d("Website՝", "https://art-group.am/hy/home", "https://art-group.am/hy/home"),
  ], [P("SV&GA2.jpg"), P("SV&GA4.jpg")]),
  co(31, "Վաղարշ և Որդիներ Կոնցեռն ՍՊԸ (ԷԱ 19/5)", [
    d(ADDR, "ՀՀ, ք.Երևան, Նորք-Մարաշ, Նորք թաղամաս 19/3, 19/4, 19/5, 19/6, 19/7"),
    d(PHONE, "+374 10583006"),
  ], [P("Constractors/vagharsh1.jpg"), P("Constractors/vagharsh 2.jpg")]),
  co(32, "ՍԱՖ ԿԱՊԻՏԱԼ ՍՊԸ (ԷԱ)", [
    d(BUILDER, "ՍԱՖ ԿԱՊԻՏԱԼ ՍՊԸ"),
    d(ADDR, "ք.Երևան, Մալաթիա, Լենինգրադյան 29/9"),
    d(PHONE, "+37477 541215 | +37496 541212 | +37410 224345"),
  ], [P("Constractors/saf.jpg")]),
  co(33, "Հորիզոն Ինվեստ ՓԲԸ", [
    d(BUILDER, "Հորիզոն-95 ՍՊԸ"),
    d(OFFICE_ADDR, "ՀՀ, ք. Երևան, Բուզանդի 99 շենք, բն. 28"),
    d(NEW_ADDR, "Ֆ. Վերֆելի 40/2"),
    d(PHONE, "+374 77541215 | +374 96541212 | +374 99206080 | +374 10224345"),
  ], [
    P("Constractors/Horizon-Invest-1.jpg"),
    P("constractors/Horizon-Invest-2[1].jpg"),
  ]),
  co(34, "Իմպերիալ Քոնսթրաքշն ՍՊԸ", [
    d(ADDR, "ՀՀ, ք․ Երևան, Ն․Գոգոլի փողոց, 24/23"),
  ], [
    P("constractors/Imperial_2[1][1].jpg"),
    P("constractors/Imperial_6[1][1].jpg"),
  ]),
  co(35, "«ՇԻՆ ՍԵՐՎԻՍ ԳՐՈՒՊ» ՍՊԸ", [
    d(DEV, "«ՇԻՆ ՍԵՐՎԻՍ ԳՐՈՒՊ» ՍՊԸ"),
    d(ADDR, "Մարզ Կոտայք, Աբովյան, գ. Առինջ, Բ թաղամասի 4-րդ փողոց, 2-րդ նրբանցք 6/1 հասցե"),
    d(PHONE, "+374 33 940000 | +374 60 535353"),
  ], [P("constractors/shin service-min.jpg")]),
  co(36, "Ջեթ Սեթ ՍՊԸ", [
    d(ADDR, "ՀՀ, ք․ Երևան, Հ․ Աբելյան փողոց, 2/1"),
  ], [
    P("constractors/JetSet2[1][1].jpg"),
    P("constractors/JetSet3[1][1].jpg"),
  ]),
  co(37, "Մագաս ՍՊԸ (ԷԱ)", [
    d(ADDR, "ՀՀ, ք․ Երևան, Գյուրջյան փողոց, 11/5"),
    d(PHONE, "+37477 541215, +37496 541212, +37410 224345"),
  ], [P("Magas2.png"), P("Magas6.png")]),
  co(38, "ՏԵՍԱՐԱՆ ՓՐՈՋԵՔԹ ՍՊԸ", [
    d(ADDR, "Մարզ Կոտայք, համայնք Նոր Հաճն, գյուղ Քանաքեռավան"),
    d(PHONE, "+374 93 44 97 44"),
  ], [P("tes.png"), P("constractors/tesaran2[1]-min[1].jpg")]),
  co(39, "«ՇԻՆ ՍԵՐՎԻՍ ԳՐՈՒՊ» ՍՊԸ", [
    d(DEV, "«ՇԻՆ ՍԵՐՎԻՍ ԳՐՈՒՊ» ՍՊԸ"),
    d(ADDR, "Մարզ Կոտայք, համայնք Աբովյան, գյուղ Առինջ, Բ թաղամասի 5-րդ փողոց, 17 հասցե"),
    d(PHONE, "+374 33 940000 | +374 60 535353"),
  ], [
    P("Constractors/shin-1-web (1).png"),
    P("Constractors/shin-2-web (1).png"),
  ]),
];

// ---------- COMPONENT ----------
function Bulders() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchData = async () => {
    try {
      const snap = await getDocs(
        query(collection(db, "constructionCompanies"), orderBy("order"))
      );
      setCompanies(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Bulders fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const seedData = async () => {
    setSeeding(true);
    try {
      for (const item of companiesData) {
        await setDoc(doc(db, "constructionCompanies", item.id), {
          name: item.name,
          details: item.details,
          images: item.images,
          order: item.order,
        });
      }
      await fetchData();
      alert("Տվյալները հաջողությամբ ավելացվեցին Firestore");
    } catch (err) {
      console.error("Seed error:", err);
      alert("Սխալ seed անելիս");
    }
    setSeeding(false);
  };

  return (
    <>
      <Header />

      <main className="relative w-full bg-white">
        <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-10">
          {/* Social icons */}
          <aside className="hidden shrink-0 pt-[70px] md:block">
            <SocialIcons />
          </aside>

          {/* Content */}
          <section className="min-w-0 flex-1 md:pl-[40px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333]">
              Կառուցապատողներ
            </h1>

            <p className="mb-6 text-[16px] text-[#333]">
              Ձեռք բերեք Ձեր նորաոճ և հարմարավետ բնակարանը{" "}
              <span className="text-[#6a00f4]">Evocabank</span>-ի հետ:
            </p>
            <p className="mb-12 text-[16px] text-[#333]">
              Ծանոթացեք մեզ հետ համագործակցող կառուցապատող կազմակերպությունների
              ցանկին և անհրաժեշտ տեղեկատվությանը ստորև.
            </p>

            {/* Seed button — օգտագործիր մեկ անգամ, հետո հանիր */}
            <button
              onClick={seedData}
              disabled={seeding}
              className="mb-6 rounded bg-[#6a00f4] px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {seeding ? "Ավելացվում է..." : "Seed Firestore"}
            </button>

            <h2 className="mb-6 text-[24px] font-bold uppercase text-black">
              Անհրաժեշտ տեղեկատվություն
            </h2>

            {loading ? (
              <p className="text-[15px] text-[#333]">Բեռնվում է...</p>
            ) : (
              companies.map((c) => (
                <ConstructionAccordion
                  key={c.id}
                  name={c.name}
                  details={c.details}
                  images={c.images}
                />
              ))
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Bulders;