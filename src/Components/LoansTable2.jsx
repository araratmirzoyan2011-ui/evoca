import { useState } from "react";

const Cell = ({ v }) => (v === null || v === undefined || v === "" ? "-" : v);

const Sidebar = ({ sidebar, onSelect }) => {
  const [open, setOpen] = useState(true);
  const active = sidebar.activeIndex ?? 0;
  return (
    <aside className="w-full lg:w-[280px] shrink-0 self-start rounded-2xl bg-white shadow-md p-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between border-l-4 border-purple-700 pl-3 py-1 text-left font-bold text-purple-700"
      >
        {sidebar.title}
        <span className={`transition-transform ${open ? "" : "rotate-180"}`}>⌃</span>
      </button>
      {open && (
        <ul className="mt-3 space-y-3 pl-4">
          {sidebar.items.map((item, i) => (
            <li key={item} onClick={() => onSelect && onSelect(i)} className={`cursor-pointer text-sm font-semibold ${active === i ? "text-purple-700" : "text-gray-500"}`}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

const NumberedText = ({ items }) => (
  <div className="space-y-4 text-[15px] leading-7 text-gray-800">
    {items.map((t, i) => {
      const item = typeof t === "string" ? { text: t } : t;
      return (
        <div key={i}>
          <p className="whitespace-pre-line">
            <span className="text-purple-700">{i + 1}. </span>
            {item.text}
          </p>
          {item.bullets && (
            <ul className="mt-3 space-y-2 pl-4">
              {item.bullets.map((b, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-purple-700" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {item.after && <p className="mt-3">{item.after}</p>}
        </div>
      );
    })}
  </div>
);

const SimpleTable = ({ head, rows, title }) => (
  <div className="overflow-x-auto rounded-xl bg-white shadow-md my-4">
    <table className="w-full border-collapse text-sm">
      <thead>
        {title && (
          <tr>
            <th colSpan={head.length} className="border border-purple-100 p-3 text-left text-xs font-bold uppercase">{title}</th>
          </tr>
        )}
        <tr>
          {head.map((h) => (
            <th key={h} className="border border-purple-100 p-3 text-left font-semibold">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} className="border border-purple-100 p-3"><Cell v={c} /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Firebase-ից եկած տվյալը կարող է լինել օբյեկտ, JSON տող կամ { json: "..." } — բերում ենք մեկ տեսքի
const normalize = (d) => {
  if (!d) return null;
  if (typeof d === "string") {
    try {
      return normalize(JSON.parse(d));
    } catch {
      return null;
    }
  }
  if (typeof d.json === "string") return normalize(d.json);
  return d;
};

const LoansTable2 = ({ data: rawData, onSelect }) => {
  const data = normalize(rawData);
  const valid = data && data.main && data.sidebar && data.notes && data.extra && data.cards && data.effective;
  if (!valid) {
    if (rawData) console.error("LoansTable2: տվյալի կառուցվածքը սխալ է, ստացվել է՝", rawData);
    return null;
  }
  const { pageTitle, sidebar, sectionTitle, main, notes, earlyTermination, afterTable = [], extra, cards, effective } = data;

  return (
    <div className="mx-auto max-w-[1300px] px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">{pageTitle}</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <Sidebar sidebar={sidebar} onSelect={onSelect} />

        <div className="min-w-0 flex-1">
          <h2 className="mb-4 text-2xl font-bold">{sectionTitle}</h2>

          {/* Main rates table */}
          {main.simple ? (
            <SimpleTable head={main.simple.head} rows={main.simple.rows} />
          ) : (
          <>
          <div className="overflow-x-auto rounded-xl bg-white shadow-md">
            <table className="w-full border-collapse text-center text-sm">
              <thead>
                <tr>
                  <th rowSpan={2} className="border border-purple-100 p-3">{main.amountHeader}</th>
                  <th rowSpan={2} className="border border-purple-100 p-3">{main.methodHeader}</th>
                  <th colSpan={main.periods.length} className="border border-purple-100 p-3">{main.periodsHeader}</th>
                </tr>
                <tr>
                  {main.periods.map((p) => (
                    <th key={p} className="border border-purple-100 p-3 whitespace-nowrap">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {main.groups.map((g) =>
                  g.rows.map((row, i) => (
                    <tr key={g.amount + i}>
                      {i === 0 && (
                        <td rowSpan={g.rows.length} className="border border-purple-100 p-3">{g.amount}</td>
                      )}
                      <td className="border border-purple-100 p-3">{row.method}</td>
                      {row.values.map((v, k) => (
                        <td key={k} className="border border-purple-100 p-3">
                          {v || "-"}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          </>
          )}

          <div className="mt-6">
            <NumberedText items={notes} />
          </div>

          {/* Early termination */}
          {earlyTermination && (
          <>
          <p className="mt-6 text-[15px]"><span className="text-purple-700">{notes.length + 1}. </span>{earlyTermination.text}</p>
          <div className="overflow-x-auto rounded-xl bg-white shadow-md my-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th rowSpan={2} className="border border-purple-100 p-3 text-left">{earlyTermination.valueHeader}</th>
                  <th colSpan={earlyTermination.periods.length} className="border border-purple-100 p-3">{earlyTermination.periodsHeader}</th>
                </tr>
                <tr>
                  {earlyTermination.periods.map((p) => (
                    <th key={p} className="border border-purple-100 p-3">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {earlyTermination.rows.map((r) => (
                  <tr key={r.currency}>
                    <td className="border border-purple-100 p-3">{r.currency}</td>
                    {r.values.map((v, i) => (
                      <td key={i} className="border border-purple-100 p-3">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
          )}
          {afterTable.map((t) => (
            <p key={t.n} className="mt-4 text-[15px]"><span className="text-purple-700">{t.n}. </span>{t.text}</p>
          ))}

          {/* Extra conditions */}
          <h3 className="mt-8 mb-4 text-lg font-bold text-purple-700">{extra.title}</h3>
          <div className="space-y-4 text-[15px] leading-7">
            {extra.points.map((t, i) => (
              <p key={i}><span className="text-purple-700">{i + 1}. </span>{t}</p>
            ))}
          </div>

          <SimpleTable head={cards.head} rows={cards.rows} />

          <ul className="space-y-4 text-[15px] leading-7">
            {cards.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-purple-700" />
                <div>
                  {b.text}
                  {b.sub && (
                    <ul className="mt-3 space-y-3">
                      {b.sub.map((s, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-purple-700">–</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Effective annual rate */}
          <h3 className="mt-10 mb-4 text-lg font-bold text-purple-700">{effective.title}</h3>
          <p className="text-[15px] leading-7 whitespace-pre-line">{effective.intro}</p>

          {effective.simple ? (
            <SimpleTable title={effective.tableTitle} head={effective.simple.head} rows={effective.simple.rows} />
          ) : (
          <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-md">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr>
                  <th colSpan={1 + effective.periods.length * 2} className="border border-purple-100 p-3 text-left text-xs font-bold uppercase">
                    {effective.tableTitle}
                  </th>
                </tr>
                <tr>
                  <th rowSpan={2} className="border border-purple-100 p-3 text-left">{effective.currencyHeader}</th>
                  {effective.periods.map((p) => (
                    <th key={p} colSpan={2} className="border border-purple-100 p-3 text-left">{p}</th>
                  ))}
                </tr>
                <tr>
                  {effective.periods.map((p) => (
                    <FragmentHeads key={p} nominal={effective.nominalHeader} eff={effective.effectiveHeader} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {effective.sections.map((sec) => (
                  <SectionRows key={sec.title} sec={sec} cols={1 + effective.periods.length * 2} />
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FragmentHeads = ({ nominal, eff }) => (
  <>
    <th className="border border-purple-100 p-3 text-left font-semibold">{nominal}</th>
    <th className="border border-purple-100 p-3 text-left font-semibold">{eff}</th>
  </>
);

const SectionRows = ({ sec, cols }) => (
  <>
    <tr>
      <td colSpan={cols} className="border border-purple-100 p-3 font-bold">{sec.title}</td>
    </tr>
    {sec.rows.map((r) => (
      <tr key={r.currency}>
        <td className="border border-purple-100 p-3 font-bold">{r.currency}</td>
        {r.values.map(([nom, eff], i) => (
          <FragmentCells key={i} nom={nom} eff={eff} />
        ))}
      </tr>
    ))}
  </>
);

const FragmentCells = ({ nom, eff }) => (
  <>
    <td className="border border-purple-100 p-3 font-bold">{nom || "-"}</td>
    <td className="border border-purple-100 p-3 font-bold">{eff || "-"}</td>
  </>
);

export default LoansTable2;