const ResourceLogos = ({ logos = [] }) => {
  if (!logos.length) return null;

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-[0_0_20px_rgba(120,100,255,0.12)] sm:p-6">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {logos.map((logo, i) => (
          <a
            key={logo.id ?? i}
            href={logo.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-[2/1] w-full overflow-hidden transition-transform duration-200 hover:scale-105"
          >
            <img
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourceLogos;