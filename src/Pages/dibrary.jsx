import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import { DocumentCard } from '../Components/DocumentCard.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';
import { OnlineBanking } from '../Components/OnlineBanking.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Dibrary = () => {
  const cardData = {
    title: "Dibrary - Digital Library",
    description: "Evocabank-ի նոր և գերժամանակակից «Թումանյան» մասնաճյուղում` Թումանյան 15 հասցեով, բացի ստանդարտ բանկային ծառայություններից, կգործի նաև Dibrary – digital library:",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/16117479662777/780x585.jpg",
    altText: "."
  };

  const contentSections = [
    {
      id: 1,
      textParts: [
        { type: 'hashtag', value: '#dibrary' },
        { type: 'text', value: '-ում կարելի է անվճար օգտվել էլեկտրոնային բիզնես ռեսուրսներից՝ ' },
        { 
          type: 'link', 
          value: 'e-Duke Journals Scholarly Collection, ASTM Compass, Edward Elgar Publishing Journals, Mathematical Sciences Publishers Journals, Royal Society Journals Collection, SAGE Premier', 
          href: '#' 
        },
        { type: 'text', value: ' և այլն...' }
      ]
    },
    {
      id: 2,
      textParts: [
        { type: 'hashtag', value: '#dibrary' },
        { type: 'text', value: '-ի գրքերը, հոդվածները և հրապարակումները շարունակաբար համալրվելու են՝ ներառելով նաև համաշխարհային լավագույն համալսարանների փակ վճարովի ռեսուրսները: Բացի էլեկտրոնային նյութերից, ' },
        { type: 'hashtag', value: '#dibrary' },
        { type: 'text', value: '-ում կարելի է գտնել նաև դասական գրքեր, ինչպես նաև ժամանակակից բիզնես գրականության բեսթսելերները, որոնք կարելի է կարդալ տեղում, իսկ ցանկության դեպքում՝ նաև տանել տուն:' }
      ]
    },
    {
      id: 3,
      textParts: [
        { type: 'hashtag', value: '#dibrary' },
        { type: 'text', value: '-ի բացման գործում մեզ աջակցել են՝ ' },
        { 
          type: 'link', 
          value: 'DLAA-ը՝ Հայաստանի թվային գրադարանների ասոցիացիան (Digital Library Association of Armenia)', 
          href: '#' 
        },
        { type: 'text', value: ', ' },
        { 
          type: 'link', 
          value: 'Ավետիք Իսահակյանի անվան գրադարանը', 
          href: '#' 
        },
        { type: 'text', value: ' և ' },
        { 
          type: 'link', 
          value: 'American Corner Yerevan-ը', 
          href: '#' 
        },
        { type: 'text', value: ': Նրանց աջակցության շնորհիվ ' },
        { type: 'hashtag', value: '#dibrary' },
        { type: 'text', value: '-ում կարելի է անվճար օգտվել այնպիսի հրատարակիչների նյութերից, որոնց անդամակցությունը բավականին թանկ է և շատերի համար՝ անհասանելի:' }
      ]
    }
  ];

  return (
    <>
      <Header />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {cardData && (
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
            />
          )}
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-12">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          {/* Զանգվածի արտածումը mapping-ի միջոցով */}
          <div className="flex-1 text-gray-800 leading-relaxed space-y-6">
            {contentSections.map((section) => (
              <p key={section.id}>
                {section.textParts.map((part, index) => {
                  if (part.type === 'hashtag') {
                    return (
                      <span key={index} className="text-purple-700 font-semibold">
                        {part.value}
                      </span>
                    );
                  }
                  if (part.type === 'link') {
                    return (
                      <a
                        key={index}
                        href={part.href}
                        className="text-purple-700 font-semibold hover:underline"
                      >
                        {part.value}
                      </a>
                    );
                  }
                  return <React.Fragment key={index}>{part.value}</React.Fragment>;
                })}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Dibrary;