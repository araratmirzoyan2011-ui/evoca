import React from 'react';

export default function HumanFirstComponent({ title, description }) {
  return (
    <div className="max-w-xl p-6">
      <h2 className="text-3xl font-bold text-purple-900 mb-4">
        {title}
      </h2>
      <p className="text-gray-700 text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}