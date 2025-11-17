// app/components/ContactMap.jsx
'use client';
import { useState, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { color } from 'framer-motion';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '480px',
  border: 0,
  borderRadius: '28px',
  color: '#000',
};

const center = {
  lat: 41.351512,
  lng: 69.273897,
};

const nightModeStyles = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#181818' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#181818' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1b1b1b' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#2c2c2c' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8a8a8a' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#373737' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#3c3c3c' }],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{ color: '#4e4e4e' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f2f2f' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3d3d3d' }],
  },
];

export default function ContactMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyACq1hsNMwws3pkrQvHCgTR6lnZX23BPuc',
  });
  const [map, setMap] = useState(null);
  const [infoOpen, setInfoOpen] = useState(true);
  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={{ styles: nightModeStyles, disableDefaultUI: true }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={center}
        title="Наш адрес"
        icon={undefined}
        onClick={() => setInfoOpen(true)}
      />
      {infoOpen && (
        <InfoWindow
          position={center}
          onCloseClick={() => setInfoOpen(false)}
          options={{
            pixelOffset: new window.google.maps.Size(0, -40),
          }}
        >
          <div style={{ minWidth: 180 }}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Наш адрес</div>
            <div>г. Ташкент, ул. Бектемир, 87</div>
            <div>
              Тел:{' '}
              <a
                href="tel:+998901234567"
                style={{ color: '#2563eb' }}
              >
                +998 90 123-45-67
              </a>
            </div>
            <div>
              Email:{' '}
              <a
                href="mailto:info@divid.uz"
                style={{ color: '#2563eb' }}
              >
                info@divid.uz
              </a>
            </div>
            <div style={{ marginTop: 6 }}>
              <a
                href="https://maps.google.com/?q=41.351512,69.273897"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2563eb', fontWeight: 500 }}
              >
                Открыть в Google Maps
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div className="flex items-center justify-center w-full h-full min-h-[480px] text-slate-400">
      Загрузка карты...
    </div>
  );
}
