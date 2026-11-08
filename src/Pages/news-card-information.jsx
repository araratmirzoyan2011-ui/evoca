import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Header } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import NewsCard from "../Components/NewsCard.jsx";
import { useDeepLocalized } from "../Usedeeplocalized.js";

const ALLOWED_COLLECTIONS = [
  'news',
  'newsFeatured',
  'newsBottom',
  'news1',
  'newsFeautured2',
  'newsBottom2',
  'salaryNewsCollection',
  'awards',
  'DepartmentCardNews',
];

const FIRESTORE_COLLECTIONS = ALLOWED_COLLECTIONS.filter(
  (c) => c !== 'awards' && c !== 'DepartmentCardNews'
);

const BLOG_COLLECTIONS = ['news1', 'newsFeautured2', 'newsBottom2'];

const toTime = (s) => {
  const [d, m, y] = String(s || "").trim().split(".").map(Number);
  return y ? new Date(y, m - 1, d).getTime() : 0;
};

// **թավ** և *շեղ* տեքստը՝ երկուսն էլ մանուշակագույն
const renderInline = (text) =>
  String(text || "").split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-bold text-[#5B12D6]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic text-[#5B12D6]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });

const renderContent = (content) => {
  const blocks = [];
  String(content || "")
    .split(/\\n|\n/)
    .filter((l) => l.trim())
    .forEach((line) => {
      if (line.startsWith("- ")) {
        const last = blocks[blocks.length - 1];
        if (last?.type === "list") last.items.push(line.slice(2));
        else blocks.push({ type: "list", items: [line.slice(2)] });
      } else if (line.startsWith("## ")) {
        blocks.push({ type: "heading", text: line.slice(3) });
      } else {
        blocks.push({ type: "p", text: line });
      }
    });

  return blocks.map((b, i) => {
    if (b.type === "heading") {
      return (
        <h2 key={i} className="font-bold text-[#5B12D6]">
          {renderInline(b.text)}
        </h2>
      );
    }
    if (b.type === "list") {
      return (
        <ul key={i} className="space-y-2">
          {b.items.map((it, j) => (
            <li key={j} className="flex gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#5B12D6]" />
              <span>{renderInline(it)}</span>
            </li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{renderInline(b.text)}</p>;
  });
};

const SocialIcons = () => {
  const url = encodeURIComponent(window.location.href);

  const items = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
          <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8h3.1z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
          <rect x="3" y="9" width="4" height="12" />
          <circle cx="5" cy="5" r="2.2" />
          <path d="M10 9h3.8v1.7c.6-1.1 2-2 3.9-2 3.6 0 4.3 2.3 4.3 5.4V21h-4v-5.9c0-1.4 0-2.9-1.9-2.9S14 13.7 14 15.1V21h-4z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/evocabank/",
      icon: (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <circle cx="17.3" cy="6.7" r="1.2" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="fixed left-0 top-[197px] z-20 hidden w-[52px] flex-col items-center gap-3 rounded-r-md bg-gray-100 py-3 text-gray-500 lg:flex">
      {items.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="transition-colors hover:text-[#5B12D6]"
        >
          {s.icon}
        </a>
      ))}
    </aside>
  );
};

export default function NewsCardInformation() {
  const { collection: collectionName, id } = useParams();
  const deep = useDeepLocalized();

  const [item, setItem] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);

  const isBlog = BLOG_COLLECTIONS.includes(collectionName);
  const isAwards = collectionName === "awards" || collectionName === "DepartmentCardNews";

  const backTo = isAwards ? "/awards" : isBlog ? "/blog" : "/news";
  const backLabel = isAwards
    ? "Վերադառնալ մրցանակներ"
    : isBlog
    ? "Վերադառնալ բլոգ"
    : "Վերադառնալ նորություններ";
  const othersTitle = isAwards ? "Այլ մրցանակներ" : "Այլ նորություններ";

  const loadCollection = async (name) => {
    const snap = await getDocs(collection(db, name));
    const rawItems = snap.docs.flatMap((d) => {
      const data = d.data();
      if (Array.isArray(data.items)) {
        return data.items.map((it, idx) => ({
          ...it,
          id: String(it.id ?? idx),
          collection: name,
        }));
      }
      return [{ ...data, id: d.id, collection: name }];
    });
    return rawItems.map((it) => deep(it));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!ALLOWED_COLLECTIONS.includes(collectionName)) {
      setItem(null);
      setOthers([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      try {
        if (isAwards) {
          const docRef = doc(db, "DepartmentCardNews", id);
          const docSnap = await getDoc(docRef);

          if (cancelled) return;

          if (docSnap.exists()) {
            setItem(deep({ id: docSnap.id, ...docSnap.data() }));
          } else {
            setItem(null);
          }

          const querySnapshot = await getDocs(collection(db, "DepartmentCardNews"));
          const allAwards = querySnapshot.docs.map((d) =>
            deep({
              id: d.id,
              ...d.data(),
              collection: collectionName,
              image: d.data().image || d.data().logoUrl,
            })
          );

          setOthers(
            allAwards
              .filter((o) => String(o.id) !== String(id))
              .slice(0, 3)
          );
        } else {
          const lists = await Promise.all(FIRESTORE_COLLECTIONS.map(loadCollection));
          if (cancelled) return;

          const ownListIndex = FIRESTORE_COLLECTIONS.indexOf(collectionName);
          const own = lists[ownListIndex] || [];
          const foundItem = own.find((o) => String(o.id) === String(id));
          
          setItem(foundItem || null);

          setOthers(
            lists
              .flat()
              .filter(
                (o) =>
                  !(o.collection === collectionName && String(o.id) === String(id))
              )
              .sort((a, b) => toTime(b.date) - toTime(a.date))
              .slice(0, 3)
          );
        }
      } catch (err) {
        console.error("Error loading item:", err);
        if (!cancelled) setItem(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadData();
    return () => {
      cancelled = true;
    };
  }, [collectionName, id, isAwards]); // <- Վերացվեց անվերջանալի ցիկլի պատճառ դարձող deep կախվածությունը

  return (
    <>
      <Header />
      <SocialIcons />

      <main className="pt-12">
        {loading ? (
          <div className="py-40 text-center text-gray-500">Բեռնվում է...</div>
        ) : !item ? (
          <div className="py-40 text-center text-gray-500">
            <p>Նորությունը չի գտնվել։</p>
            <Link
              to={backTo}
              className="mt-4 inline-block font-semibold text-[#5B12D6] underline"
            >
              {backLabel}
            </Link>
          </div>
        ) : (
          <>
            {/* Վերևի բաժին */}
            <section className="mx-auto grid max-w-[1200px] items-start lg:grid-cols-[550px_1fr]">
              <div className="rounded-bl-[60px] bg-gradient-to-b from-white to-[#f1ecfa] px-6 py-10 lg:min-h-[400px] lg:rounded-bl-[100px] lg:pb-12 lg:pl-[58px] lg:pr-10 lg:pt-[46px]">
                <div className="flex items-center gap-3">
                  <span className="block h-[14px] w-[30px] bg-[#5B12D6]" />
                  <span className="text-[14px] font-semibold text-[#2a0a4a]">
                    {item.category || "Մրցանակներ"}
                  </span>
                </div>

                <h1 className="mt-6 text-[26px] font-medium leading-[38px] text-[#333] lg:text-[28px] lg:leading-[40px]">
                  {item.title}
                </h1>

                {item.description && (
                  <p className="mt-6 text-[15px] leading-[25px] text-gray-500">
                    {item.description}
                  </p>
                )}

                <p className="mt-10 text-[14px] text-gray-500">
                  {item.date || item.year}
                </p>
              </div>

              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (item.logoUrl && e.currentTarget.src !== item.logoUrl) {
                      e.currentTarget.src = item.logoUrl;
                    }
                  }}
                  className="aspect-[650/463] w-full object-cover"
                />
              )}
            </section>

            {/* Հոդվածի տեքստ */}
            <section className="mx-auto max-w-[788px] px-6 pb-20 pt-14">
              <div className="max-w-[750px] space-y-6 text-[15px] leading-6 text-black">
                {item.content && renderContent(item.content)}

                {item.articleLink && (
                  <p>
                    Ամբողջական հոդվածը՝{" "}
                    <a
                      href={item.articleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#5B12D6] underline"
                    >
                      այստեղ
                    </a>
                    :
                  </p>
                )}
              </div>

              {others.length > 0 && (
                <>
                  <h3 className="mt-12 text-[18px] font-semibold text-black">
                    {othersTitle}
                  </h3>

                  <div className="mt-5 grid gap-x-[30px] gap-y-10 sm:grid-cols-3">
                    {others.map((o) => (
                      <NewsCard
                        key={`${o.collection}-${o.id}`}
                        item={o}
                        collection={o.collection}
                      />
                    ))}
                  </div>
                </>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}