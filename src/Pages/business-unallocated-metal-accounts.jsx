import React, { useEffect, useState } from "react";
import BusinessHeader from "../Components/Busines-Header.jsx";
import Footer from "../Components/Footer";
import Navbar from "../Components/Menuall.jsx";
import SocialIcons from "../Components/SocialIcons.jsx";
import InfoCard from "../Components/AccountsCard.jsx";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const cardData = {
  title: "Առարկայազուրկ մետաղական հաշիվներ",
  description: "Առաջարկում ենք բացել առարկայազուրկ մետաղական հաշիվներ, որոնք նախատեսված են անկանխիկ ոսկու հաշվառման համար: Այս ցպահանջ հաշիվները հնարավորություն են ընձեռում խնայողություններ կատարել անկանխիկ ոսկով, ինչպես նաև ավելացնել դրանք՝ միջազգային շուկայում ոսկու գնի բարձրացման շնորհիվ:",
  imageUrl: "https://www.evoca.am/images-cache/menu/1/16154599304948/780x585.jpg",
  altText: "Հաշիվների բացում և սպասարկում"
};

const mainConditions = [
  "Հաշիվներ ենք բացում ռեզիդենտ և ոչ ռեզիդենտ հաճախորդների համար, միայն 999.9 հարգի ոսկով, առանց նվազագույն մնացորդի պահանջի։ Մեզ մոտ կարելի է գնել անկանխիկ ոսկի՝ սկսված 31 գրամից (ոսկու գնանշումը կատարվում է դրամով)։ Մեր կայքում հրապարակվում են ոսկու գնանշման օրական տվյալները, որոնք փոփոխվում են՝ կախված միջազգային շուկաներում ոսկու գնից։",
  "Հաշիվներում անկանխիկ ոսկին հաշվառում ենք դրամով՝ ՀՀ Կենտրոնական բանկի հայտարարած հաշվարկային գնով և կշռային (դրամային) արտահայտությամբ՝ 0.01 գրամ ճշտությամբ կամ տրոյական ուղիաներով՝ 0.001 տրոյական ուղիա ճշտությամբ (մեկ տրոյական ուղիան հավասար է 31.10348 գրամի)։",
  "Մետաղական հաշիվ/ներ բացելիս ղեկավարվում ենք ՀՀ օրենսդրությամբ, ՀՀ Կենտրոնական բանկի նորմատիվ ակտերով, որոշումներով, մեր ներքին իրավական ակտերով։",
  "Հաշիվներ բացելու համար կարող եք դիմել մեր Գլխամասային գրասենյակ և ցանկացած մասնաճյուղ։ Մետաղական հաշիվների սպասարկման, գործառնությունների կատարման սակագներին և պայմաններին կարող եք ծանոթանալ այստեղ։",
  {
    text: "Այս հաշիվներով կարող ենք իրականացնել հետևյալ գործառնությունները՝",
    sub: [
      "հաշվի համալրում՝ բանկից անկանխիկ ոսկի գնելու և այն հաշվին մուտքագրելու, ինչպես նաև ձեր կամ այլ անձի՝ նույն բանկում կամ այլ բանկում առկա մետաղական հաշվից անկանխիկ ոսկի փոխանցելու միջոցով,",
      "հաշվի ելքագրում՝ հաշվին առկա անկանխիկ ոսկին բանկին վաճառելու, ինչպես նաև ձեր կամ այլ անձի՝ նույն բանկում կամ այլ բանկում առկա մետաղական հաշվին անկանխիկ ոսկի փոխանցելու միջոցով։"
    ]
  },
  "Մետաղական հաշիվները կարող են գրավադրվել։",
  "Հաշիվ բացելու համար անհրաժեշտ փաստաթղթերը՝"
];

const legalEntityDocuments = [
  "Դիմում՝ մեր ձևանմուշի համաձայն։",
  "Կանոնադրություն (ոչ ռեզիդենտների դեպքում՝ կանոնադրություն կամ փոխարինող այլ փաստաթուղթ)։",
  "Պետական ռեգիստրի գրանցման վկայական (ոչ ռեզիդենտների դեպքում՝ տվյալ երկրի գրանցող պետական մարմնի կողմից տրված վկայական և գրանցման երկրի համապատասխան մարմնի կողմից տրված հարկային մարմիններում հաշվառված փաստաթուղթ)։",
  "Հարկ վճարողի հաշվառման համարը (ՀՎՀՀ), եթե առկա չէ պետական ռեգիստրի վկայականում։",
  "Գործադիր մարմնի ղեկավար/ների, գլխավոր հաշվապահի անձնագրերը կամ նույնականացման քարտերը, ինչպես նաև քաղվածքներ պաշտոնների նշանակման հրամաններից, եթե պետական ռեգիստրի գրանցման վկայականում ղեկավարի վերաբերյալ տվյալները բացակայում են (ոչ ռեզիդենտների դեպքում՝ գործադիր մարմնի ղեկավար/ների, անձնագիր/ները և իրավասու մարմնի կողմից պաշտոնների նշանակման վերաբերյալ որոշումները)։",
  "Հաշվի կարգադրիչների անձնագրերը կամ նույնականացման քարտերը։ Կանոնադրական կապիտալում 10% և ավելի բաժնեմաս ունեցող անձանց/իրական շահառուների նույնականացման համար անհրաժեշտ է՝ Եթե իրական շահառուն ֆիզիկական անձ է, ապա անձնագրի կամ նույնականացման քարտի պատճենները։ Եթե իրական շահառուն իրավաբանական անձ է, ապա տվյալ իրավաբանական անձի այս տեղեկատվության 2-րդ, 3-րդ և 4-րդ կետերով պահանջվող փաստաթղթերի (ոչ ռեզիդենտների դեպքում՝ միայն 2-րդ և 3-րդ կետերով պահանջվող փաստաթղթերի) պատճենները։",
  "Մեր պահանջով այլ փաստաթղթեր։"
];

const individualEntrepreneurDocuments = [
  "Դիմում՝ մեր ձևանմուշի համաձայն։",
  "Անձնագիր կամ նույնականացման քարտ։",
  "Պետական ռեգիստրի գրանցման վկայական (բացակայության դեպքում՝ քաղվածք պետական ռեգիստրից)։",
  "Հարկ վճարողի հաշվառման համարը (ՀՎՀՀ), եթե առկա չէ պետական ռեգիստրի վկայականում։",
  "Ստորագրության նմուշի քարտ։ Առանց կնիքի գործող անհատ ձեռնարկատերի դեպքում, ստորագրության և նմուշի քարտում կատարվում է համապատասխան գրառում՝ կնիքի բացակայության վերաբերյալ։",
  "Մեր պահանջով այլ փաստաթղթեր։"
];

const BUMA = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenuItemsFromFirebase = async () => {
    setLoading(true);
    try {
      const menuSnap = await getDocs(collection(db, "baosMenuItems"));
      const menuList = menuSnap.docs.map((d) => ({ docId: d.id, ...d.data() }));
      menuList.sort((a, b) => a.docId.localeCompare(b.docId));
      setMenuItems(menuList);
    } catch (err) {
      console.error("Firebase fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItemsFromFirebase();
  }, []);

  return (
    <>
      <BusinessHeader />
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
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 md:gap-24">
            <div className="hidden md:block shrink-0">
              <div className="sticky top-24">
                <SocialIcons />
              </div>
            </div>

            <div className="flex-1 max-w-4xl text-gray-700 leading-relaxed">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Հիմնական պայմաններ
              </h2>

              <ul className="list-disc pl-5 space-y-4 mb-8">
                {mainConditions.map((cond, index) => (
                  <li key={index}>
                    {typeof cond === "string" ? (
                      cond
                    ) : (
                      <>
                        {cond.text}
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                          {cond.sub.map((subItem, subIndex) => (
                            <li key={subIndex}>{subItem}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Իրավաբանական անձանց դեպքում՝
              </h3>

              <ul className="list-disc pl-5 space-y-4 mb-8">
                {legalEntityDocuments.map((docItem, index) => (
                  <li key={index}>{docItem}</li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Անհատ ձեռնարկատերերի դեպքում՝
              </h3>

              <ul className="list-disc pl-5 space-y-4">
                {individualEntrepreneurDocuments.map((docItem, index) => (
                  <li key={index}>{docItem}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BUMA;