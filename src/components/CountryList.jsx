import React from 'react';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
// import CityItem from './CityItem';
import CountryItem from './CountryItem';
import Message from './Message';

function CountryList({ loading, cities }) {
  if (loading) return <Spinner />;
  if (!cities || cities.length === 0)
    return (
      <Message message={'Add your first city by clicking on a city map'} />
    );
  const countries = cities.reduce((acc, city) => {
    const country = acc.find(c => c.country === city.country);
    if (country) {
      country.cities.push(city);
    } else {
      acc.push({
        id: city.country,
        country: city.country,
        emoji: city.emoji,
        cities: [city],
      });
    }
    return acc;
  }, []);
  //
  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
