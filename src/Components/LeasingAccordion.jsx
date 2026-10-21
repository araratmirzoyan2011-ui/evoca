import { useState } from "react";

const PURPLE = "#6a0dde";

function BulletList({ items = [], className = "" }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          <span
            className="bullet mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: PURPLE }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LeasingAccordion({
  title,
  intro,
  subjects = [],
  advantagesTitle,
  advantages = [],
  tableTitle,
  rows = [], // [{ label, value }]  value: string | string[]
  footerNote,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: PURPLE }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
            open ? "" : "rotate-180"
          }`}
          fill="none"
          stroke={PURPLE}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 15 12 9 18 15" />
        </svg>
        <span className="text-base font-bold text-black">{title}</span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-2 text-[15px] leading-relaxed text-[#1f1f1f] md:px-10">
            {intro && <p className="mb-6">{intro}</p>}
            {subjects.length > 0 && (
              <BulletList items={subjects} className="mb-8 pl-3" />
            )}

            {advantagesTitle && (
              <p className="mb-4 underline underline-offset-2">
                {advantagesTitle}
              </p>
            )}
            {advantages.length > 0 && (
              <BulletList items={advantages} className="mb-8 pl-3" />
            )}

            {tableTitle && <h3 className="mb-4 text-lg font-bold">{tableTitle}</h3>}

            {rows.length > 0 && (
              <div className="overflow-x-auto rounded-xl shadow-[0_2px_12px_rgba(106,13,222,0.08)]">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <tbody>
                    {rows.map(({ label, value }, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#e6d9fb] last:border-b-0"
                      >
                        <td className="w-[45%] border-r border-[#e6d9fb] px-4 py-3 align-middle">
                          {label}
                        </td>
                        <td className="px-4 py-3 align-middle">
                          {Array.isArray(value) ? (
                            <BulletList
                              items={value}
                              className="space-y-2 [&_.bullet]:mt-[7px] [&_.bullet]:h-2 [&_.bullet]:w-2"
                            />
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {footerNote && <p className="mt-6">{footerNote}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}