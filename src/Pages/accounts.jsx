import React from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';

const cardData = {
  title: "Evoca խնայողական հաշիվ",
  description: "Ստացիր եկամուտ՝ պարզապես գումարդ պահելով խնայողական հաշվիդ վրա:",
  imageUrl: "https://www.evoca.am/images-cache/menu/1/17906902726456/780x585.png",
  altText: "Evoca խնայողական հաշիվ"
};

const menuItems = [
  { path: "/accounts", label: "Evoca խնայողական հաշիվ" },
  { path: "/savings", label: "Հաշիվների բացում և սպասարկում" },
  { path: "/metal-accounts", label: "Առարկայազուրկ մետաղական հաշիվներ" },
  { path: "/non-resident", label: "Ոչ ռեզիդենտ հաճախորդների հեռավար սպասարկում" }
];

const features = [
  { title: "Գումարի աճ", text: "Հաշվիդ դրական մնացորդի նկատմամբ տոկոսները հաշվարկվում են ամեն օր:" },
  { title: "Միշտ հասանելիություն", text: "Այս պահին հարկավոր է գումարդ: Փոխանցիր այն Evocabank-ում գործող քո այլ հաշվին և օգտագործիր:" },
  { title: "Ոչ մի սահմանափակում", text: "Այսօր՝ մի փոքր քիչ, հաջորդ ամիս՝ ավելի շատ: Չկա պարտադիր ժամկետ կամ համալրման նվազագույն գումար:" },
  { title: "Նախընտրելի արժույթ", text: "Բացիր խնայողական հաշիվ ՀՀ դրամով, ԱՄՆ դոլարով կամ եվրոյով:" },
];

const benefits = [
  "Հաշվի բացումն ու սպասարկումն անվճար են,",
  "Բացման և համալրման նվազագույն գումար չկա,",
  "Գործարքի նվազագույն չափ չկա.",
  "Խնայելու պարտադիր ժամկետ չկա,",
  "Հաշիվը կարող ես համալրել ցանկացած պահի՝ Evocabank-ում գործող քո այլ հաշվից:",
];

const yieldPoints = [
  { text: "Եկամտաբերությունը կախված է հաշվի մնացորդից և ընտրված արժույթից:" },
  {
    text: "Եթե օրվա վերջում հաշվի մնացորդը համապատասխանում է տվյալ արժույթի համար սահմանված նվազագույն շեմին, այդ օրվա համար հաշվարկվում է տոկոսագումար: Նվազագույն շեմերին և այլ պայմաններին կարող ես ծանոթանալ ",
    link: { label: "այստեղ", href: "#" },
    after: ":",
  },
  {
    text: "Տոկոսները հաշվարկվում են ամեն օր, իսկ կուտակված տոկոսագումարը փոխանցվում է հաշվիդ յուրաքանչյուր եռամսյակի ավարտից հետո՝ հաջորդ ամսվա 1-ին օրը:",
  },
];

const BulletList = ({ children }) => (
  <ul className="space-y-3 my-4">{children}</ul>
);

const Bullet = ({ children }) => (
  <li className="flex items-start gap-4 text-gray-800">
    <span className="mt-2 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
    <span>{children}</span>
  </li>
);

const Accounts = () => {
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

          <div className="flex-1 max-w-4xl text-gray-800 leading-relaxed">
            <p>
              Գումարդ ավելանա՛մ, թէ՛ միշտ հասանելի մնա: Այլևս պետք չէ ընտրել:{" "}
              <span className="font-bold text-purple-800">Evoca խնայողական հաշվի</span>{" "}
              միջոցով կարող ես միաժամանակ և՛ խնայել, և՛ ավելացնել գումարդ, և՛ անհրաժեշտ պահին ունենալ դրա հասանելիությունը:
            </p>
            <p className="mt-2">
              Պահիր գումարդ Evoca խնայողական հաշվին և ստացիր մինչև{" "}
              <span className="font-bold text-purple-800">5.09% տարեկան տոկոսային եկամտաբերություն</span>:
              Իսկ երբ գումարդ անհրաժեշտ լինի, պարզապես փոխանցիր այն Evocabank-ում գործող քո մեկ այլ հաշվին:
            </p>

            <h3 className="mt-10 font-bold text-purple-800">Ինչո՞ւ Evoca խնայողական հաշիվ</h3>

            {features.map((f) => (
              <div key={f.title} className="mt-8">
                <h4 className="font-bold text-purple-800">{f.title}</h4>
                <p>{f.text}</p>
              </div>
            ))}

            <h3 className="mt-10 font-bold text-purple-800">
              Ինչո՞ւ սկսել գումար կուտակել հենց այսօր:
            </h3>

            <p className="mt-8">Քանի որ</p>
            <BulletList>
              {benefits.map((b) => (
                <Bullet key={b}>{b}</Bullet>
              ))}
            </BulletList>

            <h3 className="mt-10 font-bold text-purple-800">
              Ստացիր մինչև 5.09% տարեկան տոկոսային եկամտաբերություն
            </h3>
            <BulletList>
              {yieldPoints.map((p, i) => (
                <Bullet key={i}>
                  {p.text}
                  {p.link && (
                    <a href={p.link.href} className="font-bold text-purple-800 underline">
                      {p.link.label}
                    </a>
                  )}
                  {p.after}
                </Bullet>
              ))}
            </BulletList>

            <p className="mt-10">
              Մեր և Ձեր պայմանագրային փոխհարաբերությունները կարգավորվում են ՀԱՄԱԼԻՐ ԲԱՆԿԱՅԻՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐԻ ՄԱՏՈՒՑՄԱՆ ՊԱՅՄԱՆՆԵՐՈՎ, որը հրապարակային առաջարկ (օֆերտա) է և Ձեր կողմից համարվում է ընդունված այն պահից, երբ առձեռն կամ հեռակառավարման համակարգերի միջոցով մեզ եք ներկայացնում պատշաճ լրացված և վավերացված բանկային ծառայություններից օգտվելու հայտ/դիմում: Համալիր բանկային ծառայությունների մատուցման պայմաններին կարող եք ծանոթանալ{" "}
              <a href="#" className="font-bold text-purple-800 underline">այստեղ</a>:
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Accounts;