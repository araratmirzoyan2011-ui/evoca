import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };
const YEREVAN = { lat: 40.1792, lng: 44.4991 };
const PURPLE = '#6D0AD6';

// Մանուշակագույն marker՝ առանց արտաքին ֆայլի (կարող ես փոխարինել քո /marker.svg-ով)
const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
  <path d="M20 0C9 0 0 9 0 20c0 14 20 30 20 30s20-16 20-30C40 9 31 0 20 0z" fill="${PURPLE}"/>
  <path d="M10 13h6l4 11 4-11h6l-8 19h-4z" fill="#fff"/>
</svg>`;
const markerUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markerSvg);

export default function BranchesMap({ branches, activeId, onSelect }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });
  const [map, setMap] = useState(null);

  const icon = useMemo(() => {
    if (!isLoaded) return undefined;
    return {
      url: markerUrl,
      scaledSize: new window.google.maps.Size(40, 50),
      anchor: new window.google.maps.Point(20, 50),
    };
  }, [isLoaded]);

  // Կլաստերի մանուշակագույն շրջանակ
  const clusterOptions = useMemo(() => {
    if (!isLoaded) return undefined;
    return {
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
    };
  }, [isLoaded]);

  // Երբ ցանկը (ֆիլտրը/tab-ը) փոխվում է՝ քարտեզը տեղավորում ենք բոլոր կետերի վրա
  useEffect(() => {
    if (!map || branches.length === 0) return;
    if (branches.length === 1) {
      map.panTo({ lat: branches[0].lat, lng: branches[0].lng });
      map.setZoom(15);
      return;
    }
    const bounds = new window.google.maps.LatLngBounds();
    branches.forEach((b) => bounds.extend({ lat: b.lat, lng: b.lng }));
    map.fitBounds(bounds, 60);
  }, [map, branches]);

  // Երբ ընտրվում է կետ՝ մոտենում ենք դրան
  useEffect(() => {
    if (!map || activeId == null) return;
    const b = branches.find((x) => x.id === activeId);
    if (!b) return;
    map.panTo({ lat: b.lat, lng: b.lng });
    map.setZoom(16);
  }, [map, activeId, branches]);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
        Քարտեզը չհաջողվեց բեռնել
      </div>
    );
  }

  if (!isLoaded) return <div className="w-full h-full bg-gray-100" />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={YEREVAN}
      zoom={12}
      onLoad={setMap}
      onUnmount={() => setMap(null)}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      }}
    >
      <MarkerClusterer options={clusterOptions}>
        {(clusterer) =>
          branches.map((b) => (
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