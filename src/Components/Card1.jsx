export function EvocaCard({ label, title, description }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 w-full h-full flex flex-col">
      <div className="inline-block self-start bg-gray-100 text-purple-900 text-xs font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl mb-3 sm:mb-6">
        {label}
      </div>

      <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default EvocaCard;