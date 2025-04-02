import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCities } from '../contexts/CitiesContext';

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 1]);
  const [searchParams, SetSearchParams] = useSearchParams();
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);
  // const lat = searchParams.get('lat');
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        // center={[lat, lng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
            // eventHandlers={{
            //   click: () => {
            //     setMapPosition([city.position.lat, city.position.lng]);
            //     navigate(`/app/cities/${city.id}`);
            //   },
            // }}
          >
            <Popup>
              <span>
                <span>{city.emoji}</span>
                <p>{city.cityName}</p>
                <p>{city.country}</p>
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, map.getZoom(6));
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
export default Map;
