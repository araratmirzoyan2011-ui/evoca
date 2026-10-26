import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { collection, onSnapshot } from "firebase/firestore";
import Footer from "../Components/Footer";
import { Header } from "../Components/Header.jsx";
import { db } from "../firebase";

const icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const offlineIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "grayscale opacity-60",
});

const ONLINE_MS = 2 * 60 * 1000;

function FitToMarkers({ users }) {
  const map = useMap();
  const [fitted, setFitted] = useState(false);

  useEffect(() => {
    if (fitted || users.length === 0) return;
    const bounds = L.latLngBounds(users.map((u) => [u.lat, u.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    setFitted(true);
  }, [users, fitted, map]);

  return null;
}
const OnlineMap = () => {
  const [registered, setRegistered] = useState([]); // Users
  const [locations, setLocations] = useState({}); // locations by uid
  const [now, setNow] = useState(Date.now());

  // Բոլոր գրանցված օգտատերերը
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Users"), (snap) => {
      setRegistered(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  // Live տեղադրություններ
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "locations"), (snap) => {
      const map = {};
      snap.docs.forEach((d) => (map[d.id] = d.data()));
      setLocations(map);
    });
    return () => unsub();
  }, []);

  // Ամեն 30 վրկ թարմացնում է «առցանց» կարգավիճակը
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  const people = registered.map((u) => {
    const loc = locations[u.uid || u.id];
    const hasPos = typeof loc?.lat === "number" && typeof loc?.lng === "number";
    const t = loc?.updatedAt?.toMillis?.() ?? 0;
    return {
      id: u.id,
      name: u.displayName || u.fullName || u.email || u.id,
      lat: hasPos ? loc.lat : null,
      lng: hasPos ? loc.lng : null,
      online: hasPos && now - t < ONLINE_MS,
    };
  });

  const onMap = people.filter((p) => p.lat !== null);
  const onlineCount = people.filter((p) => p.online).length;

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Live քարտեզ</h1>

        <div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:flex-1 min-w-0 h-[55vh] md:h-[70vh] rounded-xl overflow-hidden border">
    <MapContainer
      center={[40.1792, 44.4991]}
      zoom={12}
      className="w-full h-full z-0"
    >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {onMap.map((p) => (
                <Marker
                  key={p.id}
                  position={[p.lat, p.lng]}
                  icon={p.online ? icon : offlineIcon}
                >
                  <Popup>
                    {p.name} — {p.online ? "առցանց" : "օֆլայն (վերջին տեղը)"}
                  </Popup>
                </Marker>
              ))}

              <FitToMarkers users={onMap} />
            </MapContainer>
          </div>

          <aside className="w-full md:w-64 border rounded-xl p-3 max-h-[30vh] md:max-h-none md:h-[70vh] overflow-y-auto">
 <h2 className="font-semibold mb-2">
              Գրանցվածներ՝ {people.length} (առցանց՝ {onlineCount})
            </h2>
            <ul className="space-y-2 text-sm">
              {people.map((p) => (
                <li key={p.id} className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      p.online ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <span className="truncate">{p.name}</span>
                  {p.lat === null && (
                    <span className="text-xs text-gray-400 ml-auto">
                      տեղ չկա
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
};
export default OnlineMap