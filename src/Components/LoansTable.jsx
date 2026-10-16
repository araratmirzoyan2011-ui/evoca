import { useState } from "react";

const Chevron = ({ open }) => (
  <svg
    className={`h-4 w-4 text-[#6D14E8] transition-transform ${
      open ? "rotate-180" : ""
    }`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const cell = "border border-[#E9DCFB] px-4 py-3 align-middle text-[14px] text-[#333]";

function LoanTable({ rows }) {
  if (!rows || !rows.length) {
    return <p className="text-gray-500 py-4">Տվյալները շուտով կավելացվեն։</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-[0_4px_24px_rgba(109,20,232,0.08)]">
      <table className="w-full border-collapse">
        <tbody>
          {rows.map((row, i) => {
            const n = i + 1;

            if (!row.subRows) {
              return (
                <tr key={n}>
                  <td className={`${cell} w-12 text-center`}>{n}.</td>
                  <td className={`${cell} w-56 font-medium`}>{row.label}</td>
                  <td className={cell} colSpan={2}>
                    {row.value}
                  </td>
                </tr>
              );
            }

            return row.subRows.map((sub, j) => (
              <tr key={`${n}-${j}`}>
                {j === 0 && (
                  <>
                    <td
                      rowSpan={row.subRows.length}
                      className={`${cell} w-12 text-center`}
                    >
                      {n}.
                    </td>
                    <td rowSpan={row.subRows.length} className={`${cell} w-56 font-medium`}>
                      {row.label}
                    </td>
                  </>
                )}
                <td className={cell}>{sub.label}</td>
                <td className={`${cell} w-56`}>{sub.value}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function LoansTable({ categories = [] }) {
  // Accordion-ների բաց/փակ վիճակը
  const [openCategories, setOpenCategories] = useState(() => {
    const initialState = {};
    categories.forEach((cat) => {
      initialState[cat.id] = !!cat.isOpenDefault;
    });
    return initialState;
  });

  // Ընտրված ենթաբաժնի ID-ն (լռելյայն՝ 'action')
  const [activeSubId, setActiveSubId] = useState("action");

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Որոնում ենք ընտրված ենթաբաժինը (subItem) բոլոր կատեգորիաներում
  let activeSubItem = null;

  for (const cat of categories) {
    if (cat.subItems) {
      const found = cat.subItems.find((sub) => sub.id === activeSubId);
      if (found) {
        activeSubItem = found;
        break;
      }
    }
  }

  // Եթե ընտրված ենթաբաժին չգտնվի, վերցնում ենք առաջին իսկ հասանելի ենթաբաժինը
  if (!activeSubItem && categories.length > 0 && categories[0].subItems?.length > 0) {
    activeSubItem = categories[0].subItems[0];
  }

  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-10 md:flex-row">
      {/* Sidebar - Accordion մենյու */}
      <aside className="h-fit w-full shrink-0 rounded-2xl bg-white p-3 shadow-[0_4px_24px_rgba(109,20,232,0.12)] md:w-[320px]">
        <ul className="flex flex-col gap-2">
          {categories.map((cat) => {
            const isOpen = openCategories[cat.id];
            const hasActiveSub = cat.subItems?.some((sub) => sub.id === activeSubId);

            return (
              <li key={cat.id} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] font-bold transition-colors ${
                    hasActiveSub
                      ? "text-[#6D14E8]"
                      : "text-[#333] hover:text-[#6D14E8]"
                  }`}
                >
                  <span>{cat.title}</span>
                  <Chevron open={isOpen} />
                </button>

                {isOpen && cat.subItems && (
                  <ul className="flex flex-col pl-3 pb-2">
                    {cat.subItems.map((sub) => {
                      const isSubActive = sub.id === activeSubId;
                      return (
                        <li key={sub.id} className="relative">
                          {isSubActive && (
                            <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#6D14E8] rounded-r" />
                          )}
                          <button
                            type="button"
                            onClick={() => setActiveSubId(sub.id)}
                            className={`w-full text-left py-2 pl-4 pr-2 text-[14px] transition-colors ${
                              isSubActive
                                ? "font-bold text-[#6D14E8]"
                                : "text-[#555] hover:text-[#6D14E8]"
                            }`}
                          >
                            {sub.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="min-w-0 flex-1">
        <h2 className="mb-5 text-[26px] font-extrabold text-[#111]">
          {activeSubItem?.title || activeSubItem?.name}
        </h2>
        <LoanTable rows={activeSubItem?.rows || []} />
      </div>
    </section>
  );
}