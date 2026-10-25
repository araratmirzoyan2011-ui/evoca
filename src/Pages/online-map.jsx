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

// Երբ առաջին անգամ տվյալ է գալիս, քարտեզը կենտրոնանում է բոլոր մարկերների վրա
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
  const [users, setUsers] = useState([]);

useEffect(() => {
  // Լսում է ամբողջ "locations" collection-ը, live
  const unsub = onSnapshot(collection(db, "locations"), (snap) => {
    const list = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((u) => typeof u.lat === "number" && typeof u.lng === "number")
      .filter((u) => {
        const t = u.updatedAt?.toMillis?.() ?? Date.now();
        return Date.now() - t < 2 * 60 * 1000;
      });
    setUsers(list);
  });

  return () => unsub();
}, []);

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Live քարտեզ</h1>

        <div className="w-full h-[70vh] rounded-xl overflow-hidden border">
          <MapContainer
            center={[40.1792, 44.4991]} // Երևան
            zoom={12}
            className="w-full h-full z-0"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {users.map((u) => (
              <Marker key={u.id} position={[u.lat, u.lng]} icon={icon}>
                <Popup>{u.name || u.id}</Popup>
              </Marker>
            ))}

            <FitToMarkers users={users} />
          </MapContainer>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Առցանց օգտատերեր՝ {users.length}
        </p>
      </main>

      <Footer />
    </>
  );
};

export default OnlineMap;