import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };
const yerevan = { lat: 40.1792, lng: 44.4991 };

export default function BranchesMap({ branches, onMapLoad, onSelect }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded) return <div className="w-full h-full bg-gray-100" />;

  const icon = {
    url: '/marker.svg', // public/ թղթապանակում դիր մանուշակագույն V նշանը
    scaledSize: new window.google.maps.Size(40, 50),
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={yerevan}
      zoom={12}
      onLoad={onMapLoad}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      <MarkerClusterer>
        {(clusterer) =>
          branches.map((b) => (
            <Marker
              key={b.id}
              position={{ lat: b.lat, lng: b.lng }}
              icon={icon}
              clusterer={clusterer}
              onClick={() => onSelect(b)}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
}