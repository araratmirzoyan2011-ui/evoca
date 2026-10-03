import React from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import NewsCard from '../Components/NewsCard.jsx';
import FeaturedNewsCard from '../Components/FeaturedNewsCard.jsx';
import LargeNewsCard from '../Components/LargeNewsCard.jsx';
const lom={
    id: 2,
    category: 'Բանկային',
    title: 'Գործարքների արգելափակում 1 կոճակով',
    description:
      'Հուլիսի 1-ից EvocaTOUCH հավելվածում ու EvocaONLINE համակարգում հասանելի կլինի նոր՝ «Գործարքների արգելափակում» ֆունկցիոնալը։',
    date: '01.06.2026',
    image: 'https://www.evoca.am/images-cache/news/1/17852444643548/780x585.png',
  }
const news = [
  {
    id: 1,
    category: 'Կենսակերպ',
    title: 'Evocabank-ը՝ Armenia-UK Business Forum-ի գլխավոր գործընկեր',
    description:
      'Հոկտեմբերի 5-ին և 6-ին Երևանում կանցկացվի Armenia-UK Business Forum-ը՝ միավորելով երկու երկրի գործարար, ֆինանսական և պետական կառույցների ներկայացուցիչներին։',
    date: '02.10.2026',
    image: 'https://www.evoca.am/images-cache/news/1/17909432776466/780x585.png',
  },
  {
    id: 2,
    category: 'Մրցանակներ',
    title: 'Evocabank-ը՝ AMX AWARDS 2026-ի մրցանակակիր',
    description:
      'Evocabank-ը AMX AWARDS 2026-ի ընթացքում արժանացել է «Դեպոզիտարիայի ավտոմատացված համակարգերի կիրառման լավագույն գործընկեր» մրցանակին։',
    date: '16.06.2026',
    image: 'https://www.evoca.am/images-cache/news/1/17815943976247/616x462.png',
  },
  {
    id: 3,
    category: 'Մրցանակներ',
    title: 'Evocabank. Լավագույն ՓՄՁ բանկը Հայաստանում',
    date: '08.05.2026',
    image: 'https://www.evoca.am/images-cache/news/1/17784860353078/450x295.png',
  },
  {
    id: 4,
    category: 'Պրոդուկտներ',
    title: 'Քո Crypto հաշիվը՝ արդեն EvocaTOUCH-ում',
    date: '27.02.2026',
    image: 'https://www.evoca.am/images-cache/news/1/17722002491716/450x295.png',
  },
  {
    id: 5,
    category: 'Հարցազրույցներ',
    title: 'Կարեն Եղիազարյանի հարցազրույցը Los Angeles Times-ին',
    date: '25.02.2026',
    image: 'https://www.evoca.am/images-cache/news/1/17720089281517/450x295.png',
  },
  {
    id: 6,
    category: 'Բանկային',
    title: 'Evocabank-ի «Աջափնյակ» մասնաճյուղն արդեն բաց է',
    date: '12.01.2026',
    image: 'https://www.evoca.am/images-cache/news/1/17683825017248/450x295.jpg',
  },
];
function News() {
  const [featured, big, ...small] = news;

  return (
    <>
      <Header />

      <main className="pt-24">
        {featured && (
          <FeaturedNewsCard
            category={featured.category}
            title={featured.title}
            description={featured.description}
            date={featured.date}
            image={featured.image}
            reverse={false}
          />
        )}

        {big && (
          <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-20 grid gap-y-16 lg:grid-cols-[512px_1fr] lg:gap-x-[100px]">
            <LargeNewsCard item={big} />

            <div className="grid gap-x-[34px] gap-y-10 sm:grid-cols-2 content-start">
              {small.slice(0, 4).map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {lom && (
          <FeaturedNewsCard
            category={lom.category}
            title={lom.title}
            description={lom.description}
            date={lom.date}
            image={lom.image}
            reverse={true}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
export default News;