import React from 'react';

export default function ProfileCard({ photo, name, degrees, role }) {
  return (
    <div className="group mx-auto flex w-full max-w-[240px] flex-col items-center text-center">
      {/* Photo + rounded inverted-triangle background */}
      <div className="relative aspect-square w-full">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <polygon
            points="9,9 91,9 50,90"
            strokeWidth="14"
            strokeLinejoin="round"
            className="fill-[#f5f4f8] stroke-[#f5f4f8] transition-colors duration-300 group-hover:fill-[#6b3fa0] group-hover:stroke-[#6b3fa0]"
          />
        </svg>
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain object-bottom"
        />
      </div>

      {/* Name + degrees */}
      <h3 className="mt-5 px-2 text-[15px] font-semibold uppercase leading-snug text-gray-900">
        {name}
        {degrees && ','}
        {degrees && (
          <span className="block text-[13px] font-semibold">{degrees}</span>
        )}
      </h3>

      {/* Role */}
      <p className="mt-3 px-3 text-[13px] leading-relaxed text-gray-700">
        {role}
      </p>
    </div>
  );
}