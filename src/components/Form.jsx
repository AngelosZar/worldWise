import React, { useEffect } from 'react';
import { useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import useUrlPosition from '../hooks/useUrlPosition';
import Message from './Message';
import Spinner from './Spinner';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(true);
  const [emoji, setEmoji] = useState('');
  const [geoCodingError, setGeoCodingError] = useState('');

  const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client?';

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError('');
        if (
          !lat ||
          !lng ||
          isNaN(lat) ||
          isNaN(lng) ||
          Math.abs(lat) > 90 ||
          Math.abs(lng) > 180
        ) {
          throw new Error(
            'Invalid coordinates. Latitude must be between -90 and 90, and longitude between -180 and 180.'
          );
        }

        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        console.log(res);
        console.log(data);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(
            data.description ||
              `Error ${res.status}: Failed to fetch location data`
          );
        }

        if (!data.locality && !data.city) {
          throw new Error('No city found at this location');
        }

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName || '');
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
        console.error('Geocoding error:', error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchCity();
  }, [lat, lng]);
  if (isLoadingGeoCoding) {
    return <Spinner />;
  }
  if (geoCodingError) {
    return (
      <div>
        <Message message={geoCodingError} />
      </div>
    );
  }
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" onChange={e => setDate(e.target.value)} value={date} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
