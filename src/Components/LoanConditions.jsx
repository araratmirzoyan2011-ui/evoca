import React from "react";

const LoanConditions = ({ conditions = [] }) => {
  if (!conditions.length) {
    return <p className="text-center text-gray-500">Տվյալներ չկան</p>;
  }

  const renderValue = (item) => {
    // Սյունակներով (օր.՝ Անվանական / Փաստացի)
    if (item.columns?.length) {
      return (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${item.columns.length}, minmax(0, 1fr))`,
          }}
        >
          {item.columns.map((col, i) => (
            <div
              key={i}
              className={i > 0 ? "border-l border-purple-100" : ""}
            >
              <div className="border-b border-purple-100 px-5 py-3">
                {col.title}
              </div>
              <div className="px-5 py-3">{col.value}</div>
            </div>
          ))}
        </div>
      );
    }

    // Իրար տակ առանձին բջիջներ
    if (item.rows?.length) {
      return item.rows.map((text, i) => (
        <div
          key={i}
          className={`px-5 py-4 ${
            i !== item.rows.length - 1 ? "border-b border-purple-100" : ""
          }`}
        >
          {text}
        </div>
      ));
    }

    // Մի քանի պարբերություն
    if (Array.isArray(item.value)) {
      return (
        <div className="space-y-4 px-5 py-4">
          {item.value.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      );
    }

    // Պարզ տեքստ
    return <div className="px-5 py-4 whitespace-pre-line">{item.value}</div>;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-purple-100 bg-white text-[15px] leading-6 text-gray-900 shadow-sm">
      {conditions.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-[48px_minmax(0,1fr)] md:grid-cols-[64px_minmax(0,1fr)_minmax(0,2fr)] ${
            index !== conditions.length - 1 ? "border-b border-purple-100" : ""
          }`}
        >
          {/* Համար */}
          <div className="flex items-center justify-center border-r border-purple-100 px-2 py-4">
            {index + 1}.
          </div>

          {/* Վերնագիր */}
          <div className="flex items-center px-5 py-4 md:border-r md:border-purple-100">
            {item.label}
          </div>

          {/* Արժեք */}
          <div className="col-span-2 border-t border-purple-100 md:col-span-1 md:border-t-0">
            {renderValue(item)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanConditions;