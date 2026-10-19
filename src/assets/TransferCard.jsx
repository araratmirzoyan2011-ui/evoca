const PartnerCard = ({
  logo,
  name,
  description,
  phoneLabel,
  phone,
  scheduleLabel,
  schedule = [],
}) => {
  return (
    <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 text-center shadow-md">
      {logo && (
        <img
          src={logo}
          alt={name}
          className="mx-auto mb-10 h-14 object-contain"
        />
      )}

      <p className="text-[15px] leading-7 text-gray-800">{description}</p>

      <hr className="my-6 border-gray-200" />

      {phoneLabel && (
        <p className="text-sm font-bold text-[#6a00d4]">{phoneLabel}</p>
      )}
      {phone && (
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-1 block text-sm text-gray-800">
          {phone}
        </a>
      )}

      {scheduleLabel && (
        <p className="mt-2 text-sm font-bold text-[#6a00d4]">{scheduleLabel}</p>
      )}
      <div className="mt-1 space-y-1">
        {schedule.map((line, i) => (
          <p key={i} className="text-sm text-gray-800">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PartnerCard;