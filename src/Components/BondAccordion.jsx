import { useState } from "react";
import DocCard from "./DocCard";

const gridCols = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" };

const BondAccordion = ({
  title,
  tableTitle,
  rows = [],
  description,
  note,      // { text, href } → «...կարող եք ծանոթանալ այստեղ»
  docs = [],
  faq = [],  // [{ q, a }]
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const maxCols = Math.max(1, ...rows.map((r) => r.values.length));

  return (
    <div
      className={`w-full overflow-hidden rounded-xl border bg-white transition-colors ${
        open ? "border-[#6a00d6]" : "border-[#e5d6fa]"
      }`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={`shrink-0 text-[#6a00d6] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[13px] font-bold text-gray-700">{title}</span>
      </button>

      {/* Body */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-8">
            {tableTitle && rows.length > 0 && (
              <h3 className="my-6 text-center text-xl font-bold uppercase text-[#6a00d6]">
                {tableTitle}
              </h3>
            )}

            {/* Table */}
            {rows.length > 0 && (
              <div className="overflow-x-auto rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
                <table className="w-full border-collapse text-[13px] text-gray-800">
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="border-b border-[#e5d6fa] last:border-b-0">
                        <td className="w-[28%] border-r border-[#e5d6fa] px-4 py-3">{row.label}</td>
                        {row.values.length === 1 ? (
                          <td colSpan={maxCols} className="px-4 py-3">{row.values[0]}</td>
                        ) : (
                          row.values.map((v, j) => (
                            <td
                              key={j}
                              className={`px-4 py-3 ${j < row.values.length - 1 ? "border-r border-[#e5d6fa]" : ""}`}
                            >
                              {v}
                            </td>
                          ))
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {description && (
              <p className="mt-10 whitespace-pre-line text-[14px] text-gray-800">{description}</p>
            )}

            {/* Documents */}
            {docs.length > 0 && (
              <div
                className={`mt-8 grid grid-cols-1 gap-8 rounded-xl px-6 py-10 shadow-[0_2px_10px_rgba(0,0,0,0.08)] ${
                  gridCols[Math.min(docs.length, 4)]
                }`}
              >
                {docs.map((d, i) => (
                  <DocCard key={i} {...d} />
                ))}
              </div>
            )}

            {note && (
              <p className="mt-6 text-[14px] text-gray-800">
                {note.text}{" "}
                <a href={note.href} target="_blank" rel="noopener noreferrer" className="text-[#6a00d6] underline">
                  այստեղ
                </a>
                :
              </p>
            )}

            {/* FAQ */}
            {faq.length > 0 && (
              <div className="mt-6 space-y-6 text-[14px] text-gray-800">
                {faq.map((item, i) => (
                  <div key={i}>
                    <p className="mb-2 font-bold">
                      <span className="mr-1 text-[#6a00d6]">?</span>
                      {item.q}
                    </p>
                    <p className="whitespace-pre-line leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondAccordion;