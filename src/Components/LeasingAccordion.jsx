import { useState } from "react";

const PURPLE = "#6a0dde";
const BORDER_LIGHT = "#e3dcfa";

// **bold** support inside text
function Inline({ text = "" }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function BulletList({ items = [], small = false, className = "" }) {
  return (
    <ul className={`${small ? "space-y-2" : "space-y-3"} ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          <span
            className={`shrink-0 rounded-full ${
              small ? "mt-[7px] h-2 w-2" : "mt-[9px] h-2.5 w-2.5"
            }`}
            style={{ backgroundColor: PURPLE }}
          />
          <span>
            <Inline text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

// value: string | string[] | { text, items }
function CellValue({ value }) {
  if (Array.isArray(value)) return <BulletList items={value} small />;
  if (value && typeof value === "object")
    return (
      <div className="space-y-2">
        {value.text && (
          <p>
            <Inline text={value.text} />
          </p>
        )}
        <BulletList items={value.items} small />
      </div>
    );
  return <Inline text={value} />;
}

function Block({ block }) {
  switch (block.type) {
    case "text":
      return (
        <p className="mb-6">
          <Inline text={block.text} />
        </p>
      );
    case "list":
      return <BulletList items={block.items} className="mb-8 pl-3" />;
    case "subtitle":
      return (
        <p className="mb-4 underline underline-offset-2">{block.text}</p>
      );
    case "heading":
      return <h3 className="mb-4 text-lg font-bold">{block.text}</h3>;
    case "table":
      // Multi-column table: { headers: string[], cells: string[][] }
      if (block.headers) {
        return (
          <div className="mb-6 overflow-x-auto rounded-xl shadow-[0_2px_12px_rgba(106,13,222,0.08)]">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#e6d9fb]">
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      className="border-r border-[#e6d9fb] px-4 py-3 text-left font-bold last:border-r-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.cells.map((row, i) => (
                  <tr key={i} className="border-b border-[#e6d9fb] last:border-b-0">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="border-r border-[#e6d9fb] px-4 py-3 last:border-r-0"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      return (
        <div className="mb-6 overflow-x-auto rounded-xl shadow-[0_2px_12px_rgba(106,13,222,0.08)]">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-[#e6d9fb] last:border-b-0">
                  {block.numbered && (
                    <td className="w-12 border-r border-[#e6d9fb] px-4 py-3 align-top text-gray-500">
                      {i + 1}.
                    </td>
                  )}
                  <td
                    className={`border-r border-[#e6d9fb] px-4 py-3 align-middle ${
                      block.numbered ? "w-[35%]" : "w-[45%]"
                    }`}
                  >
                    {row.label}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <CellValue value={row.value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function LeasingAccordion({
  title,
  blocks = [],
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border bg-white transition-colors duration-300"
      style={{ borderColor: open ? PURPLE : BORDER_LIGHT }}
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
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke={PURPLE}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span
          className={`text-base font-bold leading-8 ${
            open ? "text-black" : "text-gray-500"
          }`}
        >
          {title}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-2 text-[15px] leading-relaxed text-[#1f1f1f] md:px-10">
            {blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}