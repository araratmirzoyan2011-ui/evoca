import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileCard({ id, group, photo, name, degrees, role }) {
  // Works with both shapes: separate `degrees` field, or "NAME, LL.M., MPA" in one string
  const [baseName, ...rest] = (name || '').split(',');
  const deg = degrees || rest.join(',').trim();

  return (
    <Link
      to={`/management/${group}/${id}`}
      className="group mx-auto flex w-full max-w-[240px] cursor-pointer flex-col items-center text-center">
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
        {baseName.trim()}
        {deg && ','}
        {deg && <span className="block text-[13px] font-semibold">{deg}</span>}
      </h3>

      {/* Role */}
      <p className="mt-3 px-3 text-[13px] leading-relaxed text-gray-700">
        {role}
      </p>
    </Link>
  );
}