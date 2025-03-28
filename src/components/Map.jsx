import React from 'react';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Map() {
  const navigate = useNavigate();
  const [searchParams, SetSearchParams] = useSearchParams();
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form');
      }}
    >
      <h1>
        Position {lng} {lat}
      </h1>
      button
      <button
        onClick={() => {
          SetSearchParams({ lat: 10, lng: 20 });
        }}
      >
        Update
      </button>
    </div>
  );
}

export default Map;
