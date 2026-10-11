import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { db } from "../firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import SocialIcons from "../Components/SocialIcons.jsx";
import CarDealerAccordion from "../Components/Components/CarDealerAccordion2.jsx";

function Dealers() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "partnerDealers"), orderBy("order"))
        );
        setDealers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Dealers fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <section className="min-w-0 flex-1 text-[16px] leading-[26px] text-[#333] md:pl-[40px] max-[400px]:text-[14px] max-[400px]:leading-[22px]">
            <h1 className="mb-14 text-[32px] font-medium text-[#333] max-[400px]:mb-8 max-[400px]:text-[24px]">
              Գործընկեր ավտոսրահներ
            </h1>

            <p className="mb-8">
              Պետք է ավտովարկ և որոշել ես դիմել{" "}
              <b className="text-[#6a00f4]">Evoca</b>-ին, իմացիր՝ արդեն ունես
              արտոնյալ պայմաններ։
            </p>

            <p className="mb-8 font-bold text-[#6a00f4]">
              Նոր մեքենա, ցածր տոկոսադրույք
            </p>

            <p className="mb-8">
              Դու գիտես, որ Evoca-ում ավտոմեքենա կարող ես ձեռք բերել ինչպես
              առաջնային, այնպես էլ երկրորդային շուկայից։ Առաջնային շուկայի
              դեպքում՝ Evoca-ն համագործակցում է մի շարք ավտոսրահների հետ և
              առաջարկում վարկավորման արտոնյալ պայմաններ։
            </p>

            <p className="mb-8">
              Վարկավորման արտոնյալ պայմանները հերիք չի, դու նաև ունես տեղում
              վարկային հայտ ներկայացնելու հնարավորություն։ Հայտը ներկայացնելուց
              հետո հարցման պատասխանը ստանում ես րոպեների ընթացքում։ Կարող ես
              տեղում կնքել վարկային պայմանագիրը և դու ունես նոր ավտոմեքենա՝
              հատուկ պայմաններով։ Օնլայն վարկավորման դեպքում՝ ավտովարկը
              տրամադրվում է առանց սպասարկման վճարների, իսկ ԿԱՍԿՈ
              ապահովագրությունը վարկի մայր գումարի մնացորդի չափով յուրաքանչյուր
              տարի մինչև վարկի մարման վերջնաժամկետը կնքվում է Բանկի կողմից և
              Բանկի հաշվին:
            </p>

            <p className="mb-12">
              <b className="text-[#6a00f4]">Evoca</b>-ի գործընկեր ավտոսրահների
              կողմից առաջարկվող պայմաններին մանրամասն կարող ես ծանոթանալ
              ստորև․
            </p>

            <h2 className="mb-6 text-[24px] font-bold uppercase text-black max-[400px]:text-[18px]">
              Անհրաժեշտ տեղեկատվություն
            </h2>

            {loading ? (
              <p>Բեռնվում է...</p>
            ) : (
              dealers.map((item) => (
                <CarDealerAccordion
                  key={item.id}
                  name={item.name}
                  details={item.details}
                  images={item.images}
                  footer={item.footer}
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

export default Dealers;