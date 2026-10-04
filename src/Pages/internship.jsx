import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase.js';
import HiringSteps from '../Components/HiringSteps.jsx';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import EvocaCard from '../Components/PaymentCard.jsx';
import JobCard from '../Components/JobCard.jsx';

function Intership() {
    const intershipinfo = {
  title: "Աշխատանքի ընդունվելու փուլեր",
  steps: [
    {
      id: 1,
      title: "Առաջին փուլ` Դիմում",
      description: "Evocabank-ում աշխատանքի դիմելիս թեկնածուի ճանապարհը սկսվում է հայտի ներկայացումից, որն իրականացվում է կամ ներքոնշյալ հայտը լրացնելով կամ cv@evocabank.am էլ. հասցեին Ձեր ինքնակենսագրականն ուղարկելով:"
    },
    {
      id: 2,
      title: "Երկրորդ փուլ` Հարցազրույցներ",
      description: `Եթե ինքնակենսագրականում նշված Ձեր փորձը համապատասխանել է պահանջներին, ապա Evocabank-ի հարցազրուցավարը կապ կհաստատի Ձեզ հետ: Սովորաբար, Evoca-ում հարցազրույցների գործընթացն անցնում է երեք փուլով:
Առաջին փուլը հեռախոսային հարցազրույց է: Այս փուլում Դուք կստանաք ավելի մանրամասն ինֆորմացիա այն աշխատանքի մասին, որի համար դիմել եք: Կներկայացնենք Ձեզ Evocabank-ը, և, թե ինչպիսին է աշխատանքը մեր թիմում: Նաև մի քանի հարցեր կլինեն Ձեր մասնագիտական փորձի վերաբերյալ:
Երկրորդ փուլը առերես հարցազրույց է հարցազրուցավարի և հավաքագրման ղեկավարի հետ: Այս փուլի նպատակն է գնահատել Ձեր հետաքրքրվածությունը և կարողությունները իրականացնելու ամենօրյա աշխատանքն ու պարտականությունները:
Երրորդ փուլը հարցազրույց է թիմի անդամների, ղեկավարների և բոլոր այն մարդկանց հետ, ում հետ Դուք հնարավոր է հետագայում աշխատեք:`
    },
    {
      id: 3,
      title: "Երրորդ փուլ` Թեստավորում և ամփոփում",
      description: `Թեստավորումից և հարցազրույցների ավարտից հետո այն մարդիկ, ում հետ զրուցել եք, իրենց կարծիքն են հայտնում Ձեր հետ ունեցած հարցազրույցի արդյունքների վերաբերյալ, և մենք գնահատում ենք, թե արդյոք հաջողակ կլինեք տվյալ դերում:`
    },
    {
      id: 4,
      title: "Չորրորդ փուլ` Ստուգումներ",
      description: "Աշխատանքի պայմանական առաջարկ կատարելուց հետո, Evoca-ն իրականացում է դիմորդի վերաբերյալ պարտադիր ստուգումներ: Կատարվում են 4 հիմնական տեսակների ստուգումներ` քրեական պատմության, կրթության, աշխատանքային պատմության և referral ստուգումներ:"
    },
    {
      id: 5,
      title: "Հինգերորդ փուլ` Աշխատանքի առաջարկ",
      description: `Ստուգումների դրական արդյունքներ ստանալուց հետո մեր թիմը կապ կհաստատի Ձեզ հետ և կներկայացնի աշխատանքի առաջարկ: Ձեր կողմից այն ընդունվելուց հետո կիրականացվենի փաստաթղթային ձևակերպումները և կամփոփվեն այլ մանրամասներ: Բարի գալուստ Evocabank!`
    }
  ]
};
  return (
    <>
      <Header />
      <Navbar />
        {sections2.culture && (
            <CultureBanner {...sections6.culture} className="mb-[60px]" />
          )}
        <div className="w-full mt-[80px]">
            <h1 className="text-3xl max-[400px]:text-2xl font-bold text-center mb-8 max-[400px]:mb-4 text-[#2d124d]">
              Համալսարանական պրակտիկայի շրջանակներում մենք համագործակցում ենք հետևյալ Բուհերի հետ՝
            </h1>
          </div>
          <div className="bg-gray-50 p-8 flex justify-center items-center mb-16">
                      {benefits.length === 0 ? (
                        <div className="text-center text-gray-500">Տվյալներ առայժմ առկա չեն</div>
                      ) : (
                        <div 
                          className="grid gap-8 justify-center w-full max-w-7xl"
                          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 320px))' }}
                        >
                          {benefits.map((card) => (
                            <EvocaCard 
                              key={card.docId}
                              title={card.title}
                              imageSrc={card.src}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                      {hiringData && (
                                  <HiringSteps
                                    title={intershipinfo.title}
                                    steps={intershipinfo.steps || hiringData.items}
                                  />
                        )}
      <Footer />
    </>
  );
}

export default Intership;