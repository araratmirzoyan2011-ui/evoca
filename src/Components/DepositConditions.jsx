import React from "react";

const DepositConditions = ({ conditions }) => {
  const { tables = [], sections = [] } = conditions ?? {};

  return (
    <div className="space-y-12">
      {tables.map((table, tIndex) => (
        <div key={tIndex}>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {table.title}
          </h3>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {table.headers.map((header, hIndex) => (
                    <th
                      key={hIndex}
                      className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rIndex) => {
                  const cells = Array.isArray(row) ? row : row.cells;
                  return (
                    <tr
                      key={rIndex}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      {cells.map((cell, cIndex) => (
                        <td
                          key={cIndex}
                          className={`px-4 py-3 whitespace-nowrap ${
                            cIndex === 0
                              ? "font-semibold text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {table.note && (
            <p className="mt-3 text-sm text-gray-500">{table.note}</p>
          )}
        </div>
      ))}

      {sections.map((section, sIndex) => (
        <div key={sIndex}>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {section.title}
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-[16px] leading-[24px] text-gray-800">
            {section.items.map((item, iIndex) => (
              <li key={iIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DepositConditions;