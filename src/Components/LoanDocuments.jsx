import React from "react";

const LoanDocuments = ({ documents = [] }) => {
  if (!documents.length) {
    return <p className="text-center text-gray-500">Տվյալներ չկան</p>;
  }

  return (
    <ol className="mx-auto max-w-4xl space-y-5 text-[16px] leading-7 text-gray-900 md:text-[18px]">
      {documents.map((text, index) => (
        <li key={index} className="flex gap-3">
          <span className="w-6 shrink-0 text-right font-semibold text-[#6a00d8]">
            {index + 1}.
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ol>
  );
};

export default LoanDocuments;