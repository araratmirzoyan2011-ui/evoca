import { useState } from "react";
import DocCard from "./DocCard";

const BondAccordion = ({
  title,
  tableTitle,
  rows = [],
  description,
  docs = [],
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full rounded-2xl border border-[#6a00d6] bg-white overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={`text-[#6a00d6] transition-transform duration-300 ${open ? "" : "rotate-180"}`}
        >
          <path d="M5 15l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm font-semibold text-black">{title}</span>
      </button>

      {/* Body */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-8">
            {tableTitle && (
              <h3 className="my-6 text-center text-xl font-bold uppercase text-[#6a00d6]">
                {tableTitle}
              </h3>
            )}

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
              <table className="w-full border-collapse text-[13px] text-gray-800">
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-[#e5d6fa] last:border-b-0">
                      <td className="w-[28%] border-r border-[#e5d6fa] px-4 py-3">
                        {row.label}
                      </td>
                      {row.values.length === 1 ? (
                        <td colSpan={2} className="px-4 py-3">{row.values[0]}</td>
                      ) : (
                        row.values.map((v, j) => (
                          <td
                            key={j}
                            className={`w-[36%] px-4 py-3 ${j === 0 ? "border-r border-[#e5d6fa]" : ""}`}
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

            {description && (
              <p className="mt-12 text-[14px] text-gray-800">{description}</p>
            )}

            {/* Documents */}
            {docs.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-8 rounded-xl px-6 py-10 shadow-[0_2px_10px_rgba(0,0,0,0.08)] sm:grid-cols-3">
                {docs.map((d, i) => (
                  <DocCard key={i} {...d} />
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