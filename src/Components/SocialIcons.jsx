import React from 'react';

const socialIcons = [
  {
    name: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.5H7.4v3.3h2.8V22h3.3z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
      </svg>
    ),
  },
];

export default function SocialIcons({ className = '' }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-md bg-gray-100 p-3 text-gray-500
                  max-[400px]:flex-row max-[400px]:justify-center max-[400px]:gap-6 max-[400px]:p-2
                  ${className}`}
    >
      {socialIcons.map((s) => (
        <span key={s.name} title={s.name} aria-hidden="true">
          {s.icon}
        </span>
      ))}
    </div>
  );
}