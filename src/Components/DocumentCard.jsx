import React from 'react';

export function DocumentCard({ title}) {
  return (
    <div
      className="flex items-center justify-between p-4 bg-[#f9f8fc] hover:bg-[#f2eff8] rounded-xl transition-colors cursor-pointer shadow-sm border border-transparent hover:border-[#7c3aed]/20"
    >
      <div className="flex items-center space-x-4">
        <div className="text-[#7c3aed]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-8 h-8"
          >
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A9.75 9.75 0 0 0 12.75 3H5.625zM12 9.75a.75.75 0 0 1 .75.75v3.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22v-3.69a.75.75 0 0 1 .75-.75z" />
            <path d="M12.75 1.5v3a.75.75 0 0 0 .75.75h3l-3.75-3.75z" />
          </svg>
        </div>
        <div>
          <h3 className="text-gray-900 font-semibold text-lg select-none">
            {title}
          </h3>
          
        </div>
      </div>
    </div>
  );
}