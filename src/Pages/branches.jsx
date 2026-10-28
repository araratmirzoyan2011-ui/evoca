import { useRef, useState } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import BranchesMap from '../Components/BranchesMap.jsx';

const branches = [
  {
    id: 1,
    name: 'Գլխամասային գրասենյակ',
    hours: '09:30 - 17:00',
    address: 'Հանրապետության 44/2',
    phone: '+374 10 60 55 55',
    lat: 40.1766,
    lng: 44.5126,
  },
  // ... մնացածը (հետո կարող ես Firestore-ից բերել)
];

function Branches() {
  const mapRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const focusBranch = (b) => {
    setActiveId(b.id);
    mapRef.current?.panTo({ lat: b.lat, lng: b.lng });
    mapRef.current?.setZoom(16);
  };

  return (
    <>
      <Header />

      <div className="flex h-[715px] max-w-[1920px] mx-auto">
        {/* Ձախ ցանկ */}
        <div className="w-[355px] shrink-0 overflow-y-auto shadow-md">
          {branches.map((b) => (
            <div
              key={b.id}
              onClick={() => focusBranch(b)}
              className={`p-8 border-b cursor-pointer hover:bg-gray-50 ${
                activeId === b.id ? 'bg-gray-50' : ''
              }`}
            >
              <h3 className="font-semibold mb-3">{b.name}</h3>
              <p className="text-sm text-gray-500">{b.hours}</p>
              <p className="text-sm text-gray-500">{b.address}</p>
              <p className="text-sm text-gray-500">{b.phone}</p>
            </div>
          ))}
        </div>

        {/* Քարտեզ */}
        <div className="flex-1">
          <BranchesMap
            branches={branches}
            onMapLoad={(map) => (mapRef.current = map)}
            onSelect={focusBranch}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Branches;