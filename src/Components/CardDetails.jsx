import React, { useState } from "react";
import CardTariffs from "./Components/CardTariffs";

const renderHighlighted = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <span key={i} className="text-[#6a00d8]">
        {part.slice(2, -2)}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const tabs = [
  { id: "about", label: "Քարտի մասին" },
  { id: "tariffs", label: "Սակագներ և դրույքներ" },
];

const CardDetails = ({ details = [], stats = [] }) => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section className="mx-auto w-full max-w-[1310px] px-4 py-10">
      {/* Tab-եր */}
      <div className="flex gap-10 border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px border-b-[3px] px-5 py-4 text-[14px] font-semibold transition ${
                isActive
                  ? "border-[#6a00d8] text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "about" && (
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,570px)_minmax(0,657px)] lg:justify-between">
          {/* Ձախ՝ տեքստ */}
          <div className="space-y-6 text-[18px] leading-[26px] text-gray-900">
            {details.map((paragraph, index) => (
              <p key={index}>{renderHighlighted(paragraph)}</p>
            ))}
          </div>

          {/* Աջ՝ քարտ */}
          <CardTariffs stats={stats} />
        </div>
      )}

      {activeTab === "tariffs" && (
        <div className="mt-12">{/* «Սակագներ և դրույքներ» tab-ի պարունակությունը */}</div>
      )}
    </section>
  );
};

export default CardDetails;