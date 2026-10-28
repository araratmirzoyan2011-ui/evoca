import React from "react";

const CardTariffs = ({ tariffs = [] }) => {
  if (!tariffs || tariffs.length === 0) {
    return <div className="py-8 text-center text-gray-500">Սակագներ առկա չեն:</div>;
  }

  return (
    <div className="w-full overflow-x-auto border border-purple-100 rounded-lg shadow-sm bg-white">
      <table className="w-full border-collapse text-left text-sm text-gray-700">
        <tbody>
          {tariffs.map((item, index) => (
            <tr 
              key={index} 
              className="border-b border-purple-50 hover:bg-purple-50/30 transition-colors"
            >
              <td className="py-4 px-6 font-medium text-gray-900 w-3/5 border-r border-purple-50">
                {item.label}
              </td>
              <td className="py-4 px-6 text-gray-700 w-2/5 font-semibold">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardTariffs;