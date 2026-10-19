import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ResourceLogos from '../Components/ResourceLogos.jsx';
const Dibrary = () => {
  const cardData = {
    title: "Dibrary - Digital Library",
    description: "Evocabank-ի նոր և գերժամանակակից «Թումանյան» մասնաճյուղում` Թումանյան 15 հասցեով, բացի ստանդարտ բանկային ծառայություններից, կգործի նաև Dibrary – digital library:",
    imageUrl: "https://www.evoca.am/images-cache/menu/1/16117479662777/780x585.jpg",
    altText: "."
  };

const BASE = "https://www.evoca.am/file_manager/Dibrary";
const logos = [
  // Տող 1
  { name: "EBSCO", src: `${BASE}/1_Ebso.jpg`, href: "https://search.ebscohost.com/" },
  { name: "OpenStax", src: `${BASE}/Openstax.jpg`, href: null },
  { name: "OAPEN", src: `${BASE}/5_Logo_OAPEN.png`, href: "https://www.oapen.org/home" },
  { name: "Նորավանք", src: `${BASE}/N.jpg`, href: "http://www.noravank.am/arm/jurnals/index.php" },
  { name: "Springer", src: `${BASE}/2_Sp%5B1%5D.jpg`, href: null },

  // Տող 2
  { name: "Polpred", src: `${BASE}/3_POlP.jpg`, href: "https://polpred.com/news" },
  { name: "Search", src: `${BASE}/431ea875.jpg`, href: "https://cse.google.com/cse?cx=004286394939895931631:yqpm8pjcllz" },
  { name: "The Royal Society", src: `${BASE}/RS.jpg`, href: "https://royalsociety.org/" },
  { name: "eLibrary.ru", src: `${BASE}/Library.ru.jpg`, href: null },
  { name: "Open Textbook Library", src: `${BASE}/4_71691ad9.jpg`, href: "https://open.umn.edu/opentextbooks/textbooks/web-literacy-for-student-fact-checkers" },

  // Տող 3
  { name: "DOAJ", src: `${BASE}/e6797964.jpg`, href: "https://doaj.org/" },
  { name: "NLA", src: `${BASE}/NLA.jpg`, href: "http://etd.asj-oa.am/" },
  { name: "DOAB", src: `${BASE}/4_Doab.jpg`, href: "https://www.doabooks.org/doab?uiLanguage=en" },
  { name: "OER Commons", src: `${BASE}/1_c55c00d4.jpg`, href: "https://www.oercommons.org/advanced-search" },
  { name: "OpenDOAR", src: `${BASE}/OpD.jpg`, href: "https://v2.sherpa.ac.uk/opendoar/" },

  // Տող 4
  { name: "Duke University Press", src: `${BASE}/Duke.jpg`, href: "https://read.dukeupress.edu/" },
  { name: "JSTOR", src: `${BASE}/5_JS%5B1%5D.jpg`, href: null },
  { name: "OpenBook Publishers", src: `${BASE}/2_OBP.jpg`, href: "https://openresearchlibrary.org/curation/3ea805a2-7b74-4396-beac-325fc0b1b726" },
  { name: "SAGE Journals", src: `${BASE}/Sage.jpg`, href: "https://journals.sagepub.com/" },
  { name: "Bookboon", src: `${BASE}/3e144dee.jpg`, href: "https://bookboon.com/" },

  // Տող 5
  { name: "Questia", src: `${BASE}/6_Quest.jpg`, href: "https://www.gale.com/databases/questia" },
  { name: "Journals for Free", src: `${BASE}/Logo_Journals4free.png`, href: "http://www.journals4free.com/" },
  { name: "ScienceDirect", src: `${BASE}/SD.jpg`, href: "https://www.sciencedirect.com/" },
  { name: "Open Knowledge Maps", src: `${BASE}/OKM.jpg`, href: "https://openknowledgemaps.org/" },
  { name: "B-OK", src: `${BASE}/dibrary-2.jpg`, href: null },

  // Տող 6
  { name: "Open Knowledge Repository", src: `${BASE}/4_Logo_OpenKnowledgeRepository.png`, href: "https://openknowledge.worldbank.org/" },
  { name: "Elgar Online", src: `${BASE}/Elg.jpg`, href: "https://www.elgaronline.com/" },
  { name: "Search", src: `${BASE}/Search.jpg`, href: "https://cse.google.com/cse?cx=004286394939895931631:gt4aweqr270" },
  { name: "Bookboon Free E-textbooks", src: `${BASE}/Logo_BookBoon.png`, href: "https://bookboon.com/" },
  { name: "IDEAS", src: `${BASE}/ideas.png`, href: "https://www.thesaurus.com/browse/ideas" },
];
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
      <div className="mx-auto max-w-6xl px-4 py-8">
      <ResourceLogos logos={logos} />
    </div>

      <Footer />
    </>
  );
};

export default Dibrary;