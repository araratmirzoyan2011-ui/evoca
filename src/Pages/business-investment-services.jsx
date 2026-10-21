import React, { useState } from "react";
import { Link } from "react-router-dom";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import Navbar from "../Components/Menuall.jsx";

const Garant = () => {
  const menuItems = [
    { label: "Երաշխիկ", path: "/business-investment-services", order: 1 },
    { label: "Ֆակտորինգային ֆինանսավորում", path: "/factoring-finance", order: 2 },
    { label: "Ակրեդիտիվ", path: "/վ", order: 3 },
    { label: "Ինկասո", path: "/documentary-collection", order: 4 },
  ];

  // 1. Ներածական տեքստեր
  const introTexts = [
    "Բանկային երաշխիքը անկախ, անվերապահ և գրավոր պարտավորություն է, որը բանկը ստանձնում է իր հաճախորդի (Applicant) հանձնարարությամբ հօգուտ երրորդ կողմի (Beneficiary) վճարելու երաշխիքով սահմանված գումարը ներկայացված պահանջի դիմաց, եթե պահանջը համապատասխանում է երաշխիքի պայմաններին:",
    "Բանկային երաշխիքները, որպես կանոն, կարգավորում են Միջազգային առևտրի պալատի (ICC) կողմից ընդունված URDG 758 կանոններով, եթե երաշխիքում այլ բան նախատեսված չէ:"
  ];

  // 2. Երաշխիքների տեսակներ (վերնագիր + ենթավերնագիր + տեքստ)
  const guaranteeTypes = [
    {
      title: "Կանխավճարային երաշխիք",
      subtitle: "(Advance Payment Guarantee)",
      description: "Տրվում է այն դեպքերում, երբ գնորդը (Buyer) մատակարարին (Seller) տրամադրում է կանխավճար մինչև ապրանքի մատակարարումը կամ ծառայության մատուցումը:\nԵրաշխիքը ապահովում է կանխավճարի վերադարձը բենեֆիցիարին, եթե դիմողը չի կատարում հիմնական պայմանագրով նախատեսված իր պարտավորությունները:"
    },
    {
      title: "Պարտավորությունների կատարման երաշխիք",
      subtitle: "(Performance Guarantee / Performance Bond)",
      description: "Տրվում է պայմանագրով նախատեսված պարտավորությունների պատշաճ կատարումն ապահովելու նպատակով:\nԲանկը պարտավորվում է վճարել բենեֆիցիարին երաշխիքով սահմանված գումարը՝ պայմանագրային պարտավորությունների չկատարման կամ ոչ պատշաճ կատարման դեպքում:"
    },
    {
      title: "Մրցութային երաշխիք",
      subtitle: "(Tender / Bid Guarantee)",
      description: "Տրվում է մրցույթներին կամ տենդերներին մասնակցելու, ինչպես նաև պայմանագրի, որակավորման, կանխավճարի ապահովման նպատակներով:"
    },
    {
      title: "Վճարման երաշխիք",
      subtitle: "(Payment Guarantee)",
      description: "Կիրառվում է բաց հաշվով վճարման (open account) առևտրային գործարքներում:\nԵրաշխիքը ապահովում է բենեֆիցիարի վճարումը այն դեպքում, երբ դիմողը չի կատարում պայմանագրով սահմանված վճարային պարտավորությունները:"
    },
    {
      title: "Մաքսային երաշխիք",
      subtitle: "(Customs Guarantee)",
      description: "Տրվում է մաքսային մարմինների օգտին և ապահովում է մաքսային տուրքերի, հարկերի և այլ վճարների կատարումը մաքսային օրենսդրությամբ նախատեսված դեպքերում:\nՄաքսային երաշխիքները կարող են կարգավորվել ինչպես ազգային օրենսդրությամբ, այնպես էլ համապատասխան միջազգային կանոններով:"
    },
    {
      title: "Պահուստային ակրեդիտիվ",
      subtitle: "(Standby Letter of Credit – SBLC)",
      description: "Պահուստային ակրեդիտիվը անկախ վճարային գործիք է, որը իր տնտեսական էությամբ համարժեք է բանկային երաշխիքին:\nԱյն սովորաբար կարգավորվում է ICC ISP98 կամ UCP 600 կանոններով և կիրառվում է այն դեպքերում, երբ բանկային երաշխիքի թողարկումը իրավական կամ գործառնական տեսանկյունից սահմանափակ է:\nSBLC-ի հման վրա վճարումը կատարվում է միայն բենեֆիցիարի կողմից պայմաններին համապատասխան պահանջ ներկայացնելու դեպքում:"
    }
  ];

  // 3. Առավելություններ
  const advantages = [
    "նվազեցնում են առևտրային և ֆինանսական ռիսկերը,",
    "ապահովում են գործարքների վստահելի իրականացումը,",
    "հնարավորություն են տալիս կիրառել հետձգված վճարման պայմաններ,",
    "նպաստում են գործընկերների միջև երկարաժամկետ և վստահելի համագործակցությանը,",
    "հանդիսանում են վարկային միջոցներին համեմատ ավելի ճկուն և ծախսարդյունավետ գործիք:"
  ];

  return (
    <>
      <BusinessHeader />
      <Navbar items={menuItems} />

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-8 text-base leading-relaxed">
            
            {/* Վերնագիր */}
            <h1 className="text-3xl font-bold text-gray-900">Երաշխիք</h1>

            {/* Ներածական տեքստեր */}
            <div className="space-y-4 text-gray-700">
              {introTexts.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            {/* Բանկային երաշխիքների հիմնական տեսակները */}
            <div className="pt-4">
              <h2 className="text-xl font-bold text-purple-800 mb-6">
                Բանկային երաշխիքների հիմնական տեսակները
              </h2>

              <div className="space-y-6">
                {guaranteeTypes.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-700"></span>
                      {item.title}
                    </h3>

                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm space-y-2">
                      <p className="text-sm italic text-gray-500">{item.subtitle}</p>
                      <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Բանկային երաշխիքների առավելությունները */}
            <div className="pt-6">
              <h2 className="text-xl font-bold text-purple-800 mb-4">
                Բանկային երաշխիքների առավելությունները
              </h2>
              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                {advantages.map((adv, index) => (
                  <li key={index}>{adv}</li>
                ))}
              </ul>
            </div>

            {/* Բանկային երաշխիքի պայմաններ */}
            <div className="pt-2">
              <h2 className="text-xl font-bold text-purple-800 mb-2">
                Բանկային երաշխիքի պայմաններ
              </h2>
              {/* Այստեղ կարող եք ավելացնել պայմանների զանգվածը կամ տեքստը */}
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Garant;