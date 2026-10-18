import React, { useState } from 'react';

const toArray = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

const normalizeHref = (href) => {
  if (!href) return '#';
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith('//')) return `https:${href}`;
  if (href.startsWith('/')) return `https://www.evoca.am${href}`;
  return `https://${href}`;
};

// տող | { parts } | { text } → parts զանգված
const contentOf = (x) => {
  if (x == null) return [];
  if (typeof x === 'string') return [x];
  if (x.parts != null) return toArray(x.parts);
  if (x.text != null) return [x.text];
  return [];
};

const Rich = ({ parts }) =>
  toArray(parts).map((p, i) => {
    if (typeof p === 'string') return <React.Fragment key={i}>{p}</React.Fragment>;
    const label = p.text ?? p.label ?? p.bold ?? '';
    if (p.href)
      return (
        <a
          key={i}
          href={normalizeHref(p.href)}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-purple-800 underline"
        >
          {label}
        </a>
      );
    return (
      <strong key={i} className="font-bold">
        {label}
      </strong>
    );
  });

const Bullet = ({ item }) => {
  const subs = item && typeof item === 'object' ? toArray(item.sub) : [];

  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
      <div>
        <Rich parts={contentOf(item)} />
        {subs.length > 0 && (
          <ul className="mt-2 space-y-2">
            {subs.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                <div>
                  <Rich parts={contentOf(s)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

const Block = ({ b }) => {
  if (b == null) return null;

  if (typeof b === 'string')
    return (
      <p>
        <Rich parts={[b]} />
      </p>
    );

  if (b.type === 'img')
    return <img src={b.src} alt="" className="max-w-full h-auto" />;

  if (b.items != null)
    return (
      <ul className="space-y-3">
        {toArray(b.items).map((item, j) => (
          <Bullet key={j} item={item} />
        ))}
      </ul>
    );

  return (
    <p>
      <Rich parts={contentOf(b)} />
    </p>
  );
};

const InfoAccordion = ({ title, blocks = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="border border-purple-600 rounded-2xl bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="w-full flex items-center justify-between p-6 text-left focus:outline-none transition-colors"
        >
          <span className="text-lg md:text-xl font-bold text-gray-900 pr-4">
            {title}
          </span>
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-700">
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="px-6 pb-6 pt-4 border-t border-gray-100 text-gray-800 leading-relaxed space-y-4">
            {toArray(blocks).map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoAccordion;