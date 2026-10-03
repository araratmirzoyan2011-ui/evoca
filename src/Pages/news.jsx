import React from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import { EvocaNewsCard } from '../Components/EVocaCard1.jsx';
import FeaturedNewsCard from '../Components/FeaturedNewsCard.jsx';

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
];

function News() {
  const featured = news[0];
  const rest = news.slice(1);

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
          />
        )}

        {rest.length > 0 && (
          <section className="mx-auto max-w-[1400px] px-6 py-20">
            <h3 className="text-4xl font-bold text-[#2a0a4a] mb-10">
              Բաց մի թողեք
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <EvocaNewsCard key={item.id} {...item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default News;