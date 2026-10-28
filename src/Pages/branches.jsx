import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker } from '@react-google-maps/api';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
const PURPLE = '#6D0AD6';
const YEREVAN = { lat: 40.1792, lng: 44.4991 };

const tabs = [
  { key: 'branches', label: 'Մասնաճյուղեր' },
  { key: 'atms', label: 'Բանկոմատներ' },
  { key: 'terminals', label: 'Արտարժույթի փոխանակման տերմինալներ' },
];

const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
  <path d="M20 0C9 0 0 9 0 20c0 14 20 30 20 30s20-16 20-30C40 9 31 0 20 0z" fill="${PURPLE}"/>
  <path d="M10 13h6l4 11 4-11h6l-8 19h-4z" fill="#fff"/>
</svg>`;
const markerUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markerSvg);

const selectClass =
  'h-11 min-w-[150px] rounded-lg bg-white px-4 text-sm font-medium shadow-md outline-none ' +
  'cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6D0AD6]';

const unique = (list) => [...new Set(list.filter(Boolean))];

function BranchesMap({ items, activeId, onSelect }) {
  const [map, setMap] = useState(null);

  const icon = useMemo(
    () => ({
      url: markerUrl,
      scaledSize: new window.google.maps.Size(40, 50),
      anchor: new window.google.maps.Point(20, 50),
    }),
    []
  );

  const clusterOptions = useMemo(
    () => ({
      renderer: {
        render: ({ count, position }) =>
          new window.google.maps.Marker({
            position,
            label: { text: String(count), color: '#111', fontWeight: '600', fontSize: '13px' },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 16,
              fillColor: '#fff',
              fillOpacity: 1,
              strokeColor: PURPLE,
              strokeWeight: 4,
            },
            zIndex: 1000 + count,
          }),
      },
    }),
    []
  );

  useEffect(() => {
    if (!map || items.length === 0) return;
    if (items.length === 1) {
      map.panTo({ lat: items[0].lat, lng: items[0].lng });
      map.setZoom(15);
      return;
    }
    const bounds = new window.google.maps.LatLngBounds();
    items.forEach((b) => bounds.extend({ lat: b.lat, lng: b.lng }));
    map.fitBounds(bounds, 60);
  }, [map, items]);

  useEffect(() => {
    if (!map || activeId == null) return;
    const b = items.find((x) => x.id === activeId);
    if (!b) return;
    map.panTo({ lat: b.lat, lng: b.lng });
    map.setZoom(16);
  }, [map, activeId, items]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={YEREVAN}
      zoom={12}
      onLoad={setMap}
      onUnmount={() => setMap(null)}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      <MarkerClusterer options={clusterOptions}>
        {(clusterer) =>
          items.map((b) => (
            <Marker
              key={b.id}
              position={{ lat: b.lat, lng: b.lng }}
              icon={icon}
              clusterer={clusterer}
              title={b.name}
              onClick={() => onSelect(b)}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
}

function InfoRow({ children }) {
  if (!children) return null;
  return (
    <div className="flex items-start gap-3 text-sm text-gray-500">
      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C9B3EF]" />
      <span>{children}</span>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// Էջ
// ───────────────────────────────────────────────────────────────
function Branches() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  const [tab, setTab] = useState('branches');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [activeId, setActiveId] = useState(null);

  // Տվյալները պահվում են state-երում՝ Firebase-ից ներբեռնելուց հետո
  const [datasets, setDatasets] = useState({
    branches: [],
    atms: [],
    terminals: [],
  });
  const [loading, setLoading] = useState(true);

  // Տվյալների ներբեռնում Firebase-ից
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [branchesSnap, atmsSnap, terminalsSnap] = await Promise.all([
          getDocs(collection(db, 'branches')),
          getDocs(collection(db, 'atms')),
          getDocs(collection(db, 'terminals')),
        ]);

        const branchesList = branchesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const atmsList = atmsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const terminalsList = terminalsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setDatasets({
          branches: branchesList,
          atms: atmsList,
          terminals: terminalsList,
        });
      } catch (error) {
        console.error('Սխալ Firebase-ից տվյալներ ստանալիս:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const items = datasets[tab] || [];

  const regions = useMemo(() => unique(items.map((b) => b.region)), [items]);

  const districts = useMemo(() => {
    if (region !== 'Երևան') return [];
    return unique(items.filter((b) => b.region === 'Երևան' && b.district).map((b) => b.district));
  }, [items, region]);

  const filtered = useMemo(
    () =>
      items.filter(
        (b) => (!region || b.region === region) && (!district || b.district === district)
      ),
    [items, region, district]
  );

  const changeTab = (key) => {
    setTab(key);
    setRegion('');
    setDistrict('');
    setActiveId(null);
  };

  const changeRegion = (value) => {
    setRegion(value);
    setDistrict('');
    setActiveId(null);
  };

  const changeDistrict = (value) => {
    setDistrict(value);
    setActiveId(null);
  };

  return (
    <>
      <Header />

      <div className="mx-auto max-w-[1920px]">
        <div className="px-6 pb-0 pt-12 lg:px-[280px]">
          <h1 className="mb-10 text-4xl font-bold text-gray-900">
            Բանկի հասցեները և աշխատաժամերը
          </h1>

          <div className="flex flex-wrap gap-x-12">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => changeTab(t.key)}
                className={`border-b-4 px-4 pb-3 text-sm transition-colors ${
                  tab === t.key
                    ? 'border-[#6D0AD6] font-semibold text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-[715px] flex-col md:flex-row">
          <div className="max-h-[300px] w-full shrink-0 overflow-y-auto shadow-md md:max-h-none md:w-[355px]">
            {loading && <p className="p-8 text-sm text-gray-500">Բեռնվում է Firebase-ից...</p>}

            {!loading && filtered.length === 0 && (
              <p className="p-8 text-sm text-gray-500">
                Այս ընտրությամբ արդյունք չի գտնվել։ Փոխիր մարզը կամ համայնքը։
              </p>
            )}

            {!loading &&
              filtered.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveId(b.id)}
                  className={`block w-full space-y-3 border-b border-gray-100 px-9 py-7 text-left transition-colors hover:bg-gray-50 ${
                    activeId === b.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <h3 className="text-base font-semibold text-gray-900">{b.name}</h3>
                  <InfoRow>{b.hours}</InfoRow>
                  <InfoRow>{b.city !== 'Երևան' ? `${b.city}, ${b.address}` : b.address}</InfoRow>
                  <InfoRow>{b.phone}</InfoRow>
                  {b.cashIn && <InfoRow>Կանխիկի մուտք՝ Այո</InfoRow>}
                </button>
              ))}
          </div>

          <div className="relative flex-1">
            {loadError && (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                Քարտեզը չհաջողվեց բեռնել
              </div>
            )}
            {!loadError && !isLoaded && <div className="h-full w-full bg-gray-100" />}
            {isLoaded && (
              <BranchesMap items={filtered} activeId={activeId} onSelect={(b) => setActiveId(b.id)} />
            )}

            <div className="absolute right-4 top-4 z-10 flex gap-3">
              <select
                value={region}
                onChange={(e) => changeRegion(e.target.value)}
                className={selectClass}
                aria-label="Մարզ"
              >
                <option value="">Մարզ</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <select
                value={district}
                onChange={(e) => changeDistrict(e.target.value)}
                className={selectClass}
                aria-label="Համայնք"
                disabled={region !== 'Երևան'}
              >
                <option value="">Համայնք</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Branches;