import React, { useState } from 'react';

const Rich = ({ parts }) =>
  parts.map((p, i) => {
    if (typeof p === 'string') return <React.Fragment key={i}>{p}</React.Fragment>;
    if (p.href)
      return (
        <a
          key={i}
          href={p.href}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-purple-800 underline"
        >
          {p.text}
        </a>
      );
    return (
      <strong key={i} className="font-bold">
        {p.text}
      </strong>
    );
  });

const Bullet = ({ item }) => (
  <li className="flex items-start gap-3">
    <span className="mt-2 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
    <div>
      <Rich parts={item.parts} />
      {item.sub && (
        <ul className="mt-2 space-y-2">
          {item.sub.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
              <div>
                <Rich parts={s} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </li>
);

const InfoAccordion = ({ title, blocks }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full border border-purple-200 rounded-2xl bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
      >
        <svg
          className={`w-4 h-4 text-purple-700 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7l7 7 7-7" />
        </svg>
        <span className="font-bold text-gray-500 text-base">{title}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 pl-12 text-gray-800 leading-relaxed space-y-4">
          {blocks.map((b, i) => {
            if (b.type === 'p')
              return (
                <p key={i}>
                  <Rich parts={b.parts} />
                </p>
              );
            if (b.type === 'img')
              return <img key={i} src={b.src} alt="" className="max-w-full h-auto" />;
            return (
              <ul key={i} className="space-y-3">
                {b.items.map((item, j) => (
                  <Bullet key={j} item={item} />
                ))}
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InfoAccordion;