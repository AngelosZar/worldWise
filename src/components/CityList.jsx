import React from 'react';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

function CityList({ loading, cities }) {
  if (loading) return <Spinner />;
  if (!cities || cities.length === 0)
    return (
      <Message message={'Add your first city by clicking on a city map'} />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
