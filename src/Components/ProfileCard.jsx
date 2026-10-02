import React from 'react';

export default function ProfileCard({ photo, name, role }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full max-w-[280px] sm:max-w-xs text-center border border-gray-100 mx-auto transition-all">
      <div className="w-full bg-gray-100 rounded-t-2xl pt-5 pb-2 mb-4 flex justify-center">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-t-full overflow-hidden shadow-sm bg-white flex items-center justify-center">
          <img 
            src={photo} 
            alt={name} 
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1 px-1">
        {name}
      </h2>

      <p className="text-xs sm:text-sm font-medium text-gray-600">
        {role}
      </p>
    </div>
  );
}